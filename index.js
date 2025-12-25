#!/usr/bin/env node
import readline from "readline";
import { think } from "./brain.js";
import { scheduledLearn } from "./scheduler.js";

console.log("🤖 XyHara AI");
console.log("AI yang bisa berpikir & belajar pelan-pelan");
console.log("Ketik 'exit' untuk keluar\n");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: "You > "
});

// scheduler jalan di background
setInterval(() => {
  scheduledLearn();
}, 60 * 1000);

rl.prompt();

rl.on("line", line => {
  if (line.trim().toLowerCase() === "exit") {
    console.log("XyHara AI > Sampai jumpa.");
    rl.close();
    return;
  }

  setTimeout(() => {
    console.log("XyHara AI >", think(line));
    rl.prompt();
  }, 400 + Math.random() * 600);
});