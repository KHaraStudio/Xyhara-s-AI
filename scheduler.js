import fs from "fs";
import https from "https";

const KB_PATH = "./knowledge/javascript.json";
const INTERVAL = 6 * 60 * 60 * 1000; // 6 jam

function fetchPage(url) {
  return new Promise((resolve, reject) => {
    https.get(url, res => {
      let data = "";
      res.on("data", c => data += c);
      res.on("end", () => resolve(data));
    }).on("error", reject);
  });
}

export async function scheduledLearn() {
  const kb = JSON.parse(fs.readFileSync(KB_PATH));
  const topic = "function";
  const now = Date.now();

  if (now - kb[topic].lastLearn < INTERVAL) return;

  try {
    const page = await fetchPage(
      "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Functions"
    );

    if (page.includes("function")) {
      kb[topic].level = Math.min(kb[topic].level + 1, 5);
      kb[topic].lastLearn = now;
      fs.writeFileSync(KB_PATH, JSON.stringify(kb, null, 2));
    }
  } catch {
    // silent fail, biar AI ny tetep jalan
  }
}