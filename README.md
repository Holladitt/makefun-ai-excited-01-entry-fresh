# Whale Mage — Lightning Orb

Entry untuk bounty make.fun **ai-excited-01**: gambar penyihir paus
dengan bola petir.

`main.ts` membaca `entry.png` yang ada di sebelahnya, menyalin byte-nya
secara identik ke direktori output (`MAKEFUN_OUTPUT_DIR`, atau `/output`
bila env tidak diset), lalu membaca kembali file output dan gagal bila
byte-nya berbeda dari source. Program me-log resolved absolute path,
ukuran byte source dan output, format, serta sha256 source dan output.
