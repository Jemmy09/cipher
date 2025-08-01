function polyalphabeticCipher(text, key, mode) {
  const A = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const cleanText = text.toUpperCase().replace(/[^A-Z]/g, "");
  const cleanKey = key.toUpperCase().replace(/[^A-Z]/g, "");
  if (!cleanKey) return { result: text, solution: "Invalid key" };

  let result = "";
  let solution = "Plain:    ";
  let cipherMap = "Key Char: ";

  for (let i = 0; i < cleanText.length; i++) {
    const textChar = cleanText[i];
    const keyChar = cleanKey[i % cleanKey.length];

    const textIndex = A.indexOf(textChar);
    const keyIndex = A.indexOf(keyChar);

    if (textIndex === -1) {
      result += textChar;
      solution += "  ";
      cipherMap += "  ";
      continue;
    }

    let cipherIndex;
    if (mode === "encrypt") {
      cipherIndex = (textIndex + keyIndex) % 26;
    } else {
      cipherIndex = (textIndex - keyIndex + 26) % 26;
    }

    const cipherChar = A[cipherIndex];
    result += cipherChar;
    solution += textChar + " ";
    cipherMap += keyChar + " ";
  }

  return {
    result,
    solution: `${solution.trim()}\nCipher:   ${result.trim()}\n${cipherMap.trim()}`
  };
}
