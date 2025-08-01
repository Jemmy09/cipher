function atbashCipher(text) {
  const A = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const Z = [...A].reverse();

  let result = "";
  for (let char of text.toUpperCase()) {
    const idx = A.indexOf(char);
    result += idx !== -1 ? Z[idx] : char;
  }

  const solution = 
    `Plain:   ${A.split('').join(" ")}\n` +
    `Cipher:  ${Z.join(" ")}`;

  return { result, solution };
}