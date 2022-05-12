const input = document.querySelector("#converter-box");
function inputValue() {
  return input.value;
}

const btnEncrypt = document.querySelector("#encrypt-btn");
const btnDecrypt = document.querySelector("#decrypt-btn");
const btnCopy = document.querySelector("#copy-btn");
const result = document.querySelector("#result");
const errorText = document.querySelector("#error-text");
errorText.classList.add("errors");
const regExpMayus = /[A-Z]/g;
const regExpCaract = /\W/g;

function writeResult(text) {
  result.textContent = text;
}
function clearInput() {
  input.value = "";
}
const encryptRules = { e: "enter", i: "imes", a: "ai", o: "ober", u: "ufat" };
function findKey(value) {
  const key = Object.keys(encryptRules).find(
    (key) => encryptRules[key] == value
  );
  return key;
}

function encrypt() {
  const newText = input.value
    .replaceAll("e", encryptRules.e)
    .replaceAll("i", encryptRules.i)
    .replaceAll("a", encryptRules.a)
    .replaceAll("o", encryptRules.o)
    .replaceAll("u", encryptRules.u);
  writeResult(newText);
  clearInput();
}
function decrypt() {
  const newText = input.value
    .replaceAll("enter", findKey("enter"))
    .replaceAll("imes", findKey("imes"))
    .replaceAll("ai", findKey("ai"))
    .replaceAll("ober", findKey("ober"))
    .replaceAll("ufat", findKey("ufat"));
  writeResult(newText);
  clearInput();
}
function copy() {
  result.select();
  result.setSelectionRange(0, 9999);
  document.execCommand("copy");
}

function printError1(letter, caracter) {
  errorText.textContent = `Error: Ingresaste las siguientes letras mayuscula y caracteres: (${letter}),(${caracter})`;
}
function printError2(letter) {
  errorText.textContent = `Error: Ingresaste las siguientes letras en mayuscula: ${letter}`;
}
function printError3(caracter) {
  errorText.textContent = `Error: Ingresaste los siguientes caracteres: ${caracter}`;
}

function changes() {
  const testMayus = regExpMayus.test(input.value);
  const testCaracter = regExpMayus.test(input.value);
  const letterMayus = input.value.match(regExpMayus);
  const caracter = input.value.match(regExpCaract);
  if (testMayus && caracter !== null) {
    printError1(letterMayus, caracter);
  } else if (testMayus) {
    printError2(letterMayus);
  } else if (caracter !== null) {
    printError3(caracter);
  } else {
    errorText.textContent = "";
  }
}

input.oninput = changes;
btnEncrypt.onclick = encrypt;
btnDecrypt.onclick = decrypt;
btnCopy.onclick = copy;
