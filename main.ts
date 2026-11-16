import { createHash } from "node:crypto";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";

function sha256Hex(data: Buffer): string {
  return createHash("sha256").update(data).digest("hex");
}

function detectFormat(data: Buffer): string {
  if (data.length >= 3 && data[0] === 0xff && data[1] === 0xd8 && data[2] === 0xff) {
    return "JPEG";
  }
  if (
    data.length >= 8 &&
    data[0] === 0x89 && data[1] === 0x50 && data[2] === 0x4e && data[3] === 0x47
  ) {
    return "PNG";
  }
  return "unknown";
}

// Direktori main.ts: dari argv[1] (jalan di ESM maupun CJS), fallback ke cwd.
const scriptDir = process.argv[1]
  ? path.dirname(path.resolve(process.argv[1]))
  : process.cwd();
const sourcePath = path.resolve(scriptDir, "entry.png");

if (!existsSync(sourcePath)) {
  console.error(`source not found: ${sourcePath}`);
  process.exit(1);
}

const sourceBytes = readFileSync(sourcePath);
const sourceSha = sha256Hex(sourceBytes);
const sourceFormat = detectFormat(sourceBytes);

// Direktori output dari env, default /output; buat bila belum ada.
const outputDirRaw = process.env.MAKEFUN_OUTPUT_DIR || "/output";
const outputDir = path.resolve(outputDirRaw);
mkdirSync(outputDir, { recursive: true });

// Path output harus berada di dalam MAKEFUN_OUTPUT_DIR.
const outputPath = path.resolve(outputDir, "entry.png");
const rel = path.relative(outputDir, outputPath);
if (rel.startsWith("..") || path.isAbsolute(rel)) {
  console.error(`output path escapes output dir: ${outputPath}`);
  process.exit(1);
}

writeFileSync(outputPath, sourceBytes);

// Baca balik dan gagal bila byte berbeda dari source.
const outputBytes = readFileSync(outputPath);
if (!outputBytes.equals(sourceBytes)) {
  console.error("output bytes differ from source; failing");
  process.exit(1);
}

const outputSha = sha256Hex(outputBytes);
const outputFormat = detectFormat(outputBytes);

console.log(`source: ${sourcePath}`);
console.log(`output: ${outputPath}`);
console.log(`source size: ${sourceBytes.length} bytes`);
console.log(`output size: ${outputBytes.length} bytes`);
console.log(`source format: ${sourceFormat}`);
console.log(`output format: ${outputFormat}`);
console.log(`source sha256: ${sourceSha}`);
console.log(`output sha256: ${outputSha}`);
console.log("verified: output bytes identical to source");
