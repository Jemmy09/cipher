function columnarCipher(text, key, mode) {
  const cleanKey = key.toUpperCase().replace(/[^A-Z]/g, "");
  const cleanText = text.replace(/\s/g, "");
  const keyLength = cleanKey.length;
  if (keyLength < 2) return { result: text, solution: "Invalid key" };

  const sortedKey = cleanKey.split('').slice().sort();
  const keyMap = cleanKey.split('').map(k => sortedKey.indexOf(k));

  if (mode === "encrypt") {
    const rows = Math.ceil(cleanText.length / keyLength);
    const matrix = Array.from({ length: rows }, (_, i) =>
      cleanText.slice(i * keyLength, (i + 1) * keyLength).split("")
    );

    const resultCols = keyMap.map(index => 
      matrix.map(row => row[index] || '').join('')
    );

    const result = resultCols.join('');
    const solution = `Key:        ${cleanKey.split('').join(" ")}\n` +
                     `Order:      ${keyMap.map(i => i + 1).join(" ")}\n` +
                     matrix.map((row, i) => `Row ${i + 1}:    ${row.join(" ")}`).join("\n");

    return { result, solution };
  } else {
    // Decryption
    const totalLen = cleanText.length;
    const numRows = Math.ceil(totalLen / keyLength);
    const shortCols = keyLength - (numRows * keyLength - totalLen);
    const colLens = Array(keyLength).fill(numRows).map((len, i) => i >= shortCols ? len - 1 : len);

    const columns = [];
    let k = 0;
    const sortedMap = keyMap.map((val, i) => ({ val, i })).sort((a, b) => a.val - b.val);
    for (let { i } of sortedMap) {
      const len = colLens[i];
      columns[i] = cleanText.slice(k, k + len).split('');
      k += len;
    }

    let result = '';
    for (let i = 0; i < numRows; i++) {
      for (let j = 0; j < keyLength; j++) {
        if (columns[j][i]) result += columns[j][i];
      }
    }

    const solution = `Key:        ${cleanKey.split('').join(" ")}\n` +
                     `Order:      ${keyMap.map(i => i + 1).join(" ")}\n` +
                     `Columns:    ${columns.map(col => col.join("")).join(" | ")}`;

    return { result, solution };
  }
}
