function monoalphabeticCipher(text, key, mode) {
  const A = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const cleanKey = key.toUpperCase().replace(/[^A-Z]/g, "");
  const seen = new Set();
  let cipherAlphabet = "";

  // Build cipher alphabet from key
  for (let char of cleanKey + A) {
    if (!seen.has(char)) {
      cipherAlphabet += char;
      seen.add(char);
    }
  }

  const result = [...text.toUpperCase()].map(c => {
    const idx = mode === "encrypt" ? A.indexOf(c) : cipherAlphabet.indexOf(c);
    if (idx === -1) return c;
    return mode === "encrypt" ? cipherAlphabet[idx] : A[idx];
  }).join("");

  const solution = 
    `Plain:   ${A.split('').join(" ")}\n` +
    `Cipher:  ${cipherAlphabet.split('').join(" ")}`;

  return { result, solution };
}