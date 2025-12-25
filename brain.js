import fs from "fs";

const JS_KB = "./knowledge/javascript.json";

function pick(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

export function think(input) {
  const kb = JSON.parse(fs.readFileSync(JS_KB));
  const msg = input.toLowerCase();

  // gaya manusia
  if (msg.match(/halo|hai|hi/)) {
    return pick([
      "Halo 👋",
      "Hai, ada yang bisa aku bantu?",
      "Yo, apa kabar?"
    ]);
  }

  if (msg.includes("function")) {
    const lvl = kb.function.level;

    if (lvl <= 2)
      return "Aku masih belajar soal function, tapi intinya function dipakai buat membungkus logika.";

    if (lvl <= 4)
      return "Function di JavaScript dipakai biar kode rapi dan bisa dipanggil ulang.";

    return "Function membantu modularisasi kode dan mempermudah maintenance.";
  }

  return pick([
    "Hmm, aku belum nangkep sepenuhnya.",
    "Boleh jelasin dikit lagi?",
    "Menarik, tapi aku perlu konteks tambahan."
  ]);
}