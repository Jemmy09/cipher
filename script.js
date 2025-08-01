window.addEventListener("DOMContentLoaded", () => {
  // Load header and footer content
  fetch("header.html")
    .then(res => res.text())
    .then(data => {
      document.getElementById("header").innerHTML = data;
    });

  fetch("footer.html")
    .then(res => res.text())
    .then(data => {
      document.getElementById("footer").innerHTML = data;
    });
});

function process(mode) {
  const cipher = document.getElementById("cipher").value;
  const input = document.getElementById("inputText").value;
  const key = document.getElementById("key").value;

  let result = "";
  let solution = "";

  switch (cipher) {
    case "caesar":
      ({ result, solution } = caesarCipher(input, key, mode));
      break;
    case "atbash":
      ({ result, solution } = atbashCipher(input));
      break;
    case "monoalphabetic":
      ({ result, solution } = monoalphabeticCipher(input, key, mode));
      break;
    case "polyalphabetic":
      ({ result, solution } = polyalphabeticCipher(input, key, mode));
      break;
    case "railfence":
      ({ result, solution } = railFenceCipher(input, key, mode));
      break;
    case "columnar":
      ({ result, solution } = columnarCipher(input, key, mode));
      break;
    default:
      result = "Invalid cipher";
      solution = "";
  }

  document.getElementById("resultText").value = result;
  document.getElementById("solutionText").value = solution;
}

function copyToClipboard(id) {
  const textElement = document.getElementById(id);
  textElement.select();
  textElement.setSelectionRange(0, 99999); // for mobile
  document.execCommand("copy");
}
