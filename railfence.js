function railFenceCipher(text, key, mode) {
  const numRails = parseInt(key);
  if (isNaN(numRails) || numRails < 2) return { result: text, solution: "Invalid rail number" };

  const cleanText = text.replace(/\s/g, "");

  const rails = Array.from({ length: numRails }, () => []);

  if (mode === "encrypt") {
    let row = 0, dir = 1;
    for (let char of cleanText) {
      rails[row].push(char);
      row += dir;
      if (row === 0 || row === numRails - 1) dir *= -1;
    }
    const result = rails.flat().join("");
    const solution = rails.map((r, i) => `Rail ${i + 1}: ${r.join("")}`).join("\n");
    return { result, solution };
  } else {
    // Decryption
    let pos = Array(cleanText.length).fill(0);
    let row = 0, dir = 1;

    for (let i = 0; i < cleanText.length; i++) {
      pos[i] = row;
      row += dir;
      if (row === 0 || row === numRails - 1) dir *= -1;
    }

    const count = Array(numRails).fill(0);
    for (let p of pos) count[p]++;
    
    const chars = [];
    let k = 0;
    for (let i = 0; i < numRails; i++) {
      chars[i] = cleanText.slice(k, k + count[i]).split("");
      k += count[i];
    }

    let result = "";
    for (let p of pos) {
      result += chars[p].shift();
    }

    const solution = `Rail pattern:\n${pos.map((r, i) => `Char ${i + 1}: Rail ${r + 1}`).join("\n")}`;
    return { result, solution };
  }
}
