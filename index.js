let input;
function inputValue() {
  input = document.querySelector("#converter-box").value;
  input.placeholder = "ingrese texto";
  return input;
}

const btnEncrypt = document.querySelector("#encrypt-btn");
const btnDecrypt = document.querySelector("#decrypt-btn");
const btnCopy = document.querySelector("#copy-btn");
const result = document.querySelector("#result");

function writeResult(text) {
  result.textContent = text;
}
const encryptRules = { e: "enter", i: "imes", a: "ai", o: "ober", u: "ufat" };
function findKey(value) {
  const key = Object.keys(encryptRules).find(
    (key) => encryptRules[key] == value
  );
  return key;
}

function encrypt() {
  inputValue();

  const newText = input
    .replaceAll("e", encryptRules.e)
    .replaceAll("i", encryptRules.i)
    .replaceAll("a", encryptRules.a)
    .replaceAll("o", encryptRules.o)
    .replaceAll("u", encryptRules.u);
  writeResult(newText);
}
function decrypt() {
  inputValue();
  const newText = input
    .replaceAll("enter", findKey("enter"))
    .replaceAll("imes", findKey("imes"))
    .replaceAll("ai", findKey("ai"))
    .replaceAll("ober", findKey("ober"))
    .replaceAll("ufat", findKey("ufat"));
  writeResult(newText);
}
btnCopy.addEventListener("click", function copy() {
  result.select();
  result.setSelectionRange(0, 9999);
  document.execCommand("copy");
});

btnEncrypt.onclick = encrypt;
btnDecrypt.onclick = decrypt;
