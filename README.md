[![make.fun · ai-excited-01](https://make.fun/badge/ai-excited-01.svg)](https://make.fun/bounty/ai-excited-01?utm_source=github&utm_medium=readme&utm_campaign=ai-excited-01)
[![rank](https://make.fun/badge/ai-excited-01/Holladitt/makefun-ai-excited-01-entry-fresh/rank.svg)](https://make.fun/bounty/ai-excited-01/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=ai-excited-01)
[![reward](https://make.fun/badge/ai-excited-01/Holladitt/makefun-ai-excited-01-entry-fresh/reward.svg)](https://make.fun/bounty/ai-excited-01?utm_source=github&utm_medium=readme&utm_campaign=ai-excited-01)

Lihat halaman bounty: https://make.fun/bounty/ai-excited-01

# Whale Mage — Lightning Orb

Entry untuk bounty make.fun **ai-excited-01**: gambar penyihir paus
dengan bola petir.

`main.ts` membaca `entry.png` yang ada di sebelahnya, menyalin byte-nya
secara identik ke direktori output (`MAKEFUN_OUTPUT_DIR`, atau `/output`
bila env tidak diset), lalu membaca kembali file output dan gagal bila
byte-nya berbeda dari source. Program me-log resolved absolute path,
ukuran byte source dan output, format, serta sha256 source dan output.
