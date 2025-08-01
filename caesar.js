function caesarCipher(text, key, mode) {
  const shift = parseInt(key) % 26;
  const actualShift = mode === "decrypt" ? (26 - shift) : shift;

  const aCharCode = 'A'.charCodeAt(0);
  const AtoZ = [...Array(26)].map((_, i) => String.fromCharCode(aCharCode + i));
  const shifted = AtoZ.map((_, i) => AtoZ[(i + actualShift) % 26]);

  let result = "";
  for (let char of text.toUpperCase()) {
    if (/[A-Z]/.test(char)) {
      const index = AtoZ.indexOf(char);
      result += shifted[index];
    } else {
      result += char;
    }
  }

  const solution = 
    `Plain:   ${AtoZ.join(" ")}\n` +
    `Cipher:  ${shifted.join(" ")}`;

  return { result, solution };
}