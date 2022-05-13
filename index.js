const encryptRules = { e: "enter", i: "imes", a: "ai", o: "ober", u: "ufat" };
const inputBox = document.querySelector("#input-area");
const input = document.querySelector("#converter-box");
input.select();
const inputAnimationBox = document.createElement("div");
inputAnimationBox.classList.add("inputArea__waitInput");
const inputAnimation = document.createElement("img");
inputAnimation.setAttribute(
  "src",
  "/assets/animation/animation_500_l34sadiq.gif"
);
inputAnimationBox.appendChild(inputAnimation);

const btnEncrypt = document.querySelector("#encrypt-btn");
const btnDecrypt = document.querySelector("#decrypt-btn");
const btnCopy = document.querySelector("#copy-btn");
const btnClear = document.querySelector("#clear-btn");
const result = document.querySelector("#result");
const errorText = document.querySelector("#error-text");
errorText.classList.add("errorArea__text");
const animationArea = document.querySelector("#animation-area");
const actionAnimation = document.createElement("img");
actionAnimation.classList.add("animationArea__gif");
const waitAnimation = document.createElement("img");
/*****************************VALIDACIONES***************************** */
const regExpMayus = /[A-Z]/g;
const regExpCaract = /\W/g;

function inputValue() {
  return input.value;
}

function printError1(letter, caracter) {
  errorText.textContent = `Error: Ingresaste las siguientes letras mayuscula y caracteres: (${letter}),(${caracter})`;
}

function printError2(letter) {
  errorText.textContent = `Error: Ingresaste las siguientes letras en mayuscula: (${letter})`;
}

function printError3(caracter) {
  errorText.textContent = `Error: Ingresaste los siguientes caracteres: (${caracter})`;
}

function getUniques(arr, regExp) {
  const arrayMatch = arr.value.match(regExp);
  const arraySet = [...new Set(arrayMatch)];
  return arraySet;
}

function changes() {
  const letterMayus = getUniques(input, regExpMayus);
  const caracter = getUniques(input, regExpCaract);
  if (letterMayus.length > 0 && caracter.length > 0) {
    printError1(letterMayus, caracter);
  } else if (letterMayus.length > 0) {
    printError2(letterMayus);
  } else if (caracter.length > 0) {
    printError3(caracter);
  } else {
    errorText.textContent = "";
  }
}

function writeResult(text) {
  result.textContent = text;
}

function clearResult() {
  result.textContent = "";
}

function clearInput() {
  input.value = "";
  errorText.textContent = "";
}

function findKey(value) {
  const key = Object.keys(encryptRules).find(
    (key) => encryptRules[key] == value
  );
  return key;
}

function waitAnimationStart() {
  inputBox.removeChild(input);
  inputBox.appendChild(inputAnimationBox);
  setTimeout(() => {
    inputBox.removeChild(inputAnimationBox);
    inputBox.appendChild(input);
  }, 2000);
}

function encryptReplace() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const newText = input.value
        .replaceAll("e", encryptRules.e)
        .replaceAll("i", encryptRules.i)
        .replaceAll("a", encryptRules.a)
        .replaceAll("o", encryptRules.o)
        .replaceAll("u", encryptRules.u);
      writeResult(newText);
      clearInput();
      resolve();
    }, 1000);
  });
}

function decryptReplace() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const newText = input.value
        .replaceAll("enter", findKey("enter"))
        .replaceAll("imes", findKey("imes"))
        .replaceAll("ai", findKey("ai"))
        .replaceAll("ober", findKey("ober"))
        .replaceAll("ufat", findKey("ufat"));
      writeResult(newText);
      clearInput();
      resolve();
    }, 1000);
  });
}

function waitBox() {
  input.rem;
}

function waitStartEncrypt() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      actionAnimation.setAttribute("src", "/assets/animation/13046-locked.gif");
      animationArea.appendChild(actionAnimation);
      resolve();
    }, 2000);
  });
}
function waitStartDecrypt() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      actionAnimation.setAttribute(
        "src",
        "/assets/animation/13047-unlocked.gif"
      );
      animationArea.appendChild(actionAnimation);
      resolve();
    }, 2000);
  });
}

function waitEnd() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      animationArea.removeChild(actionAnimation);
      input.select();
      resolve();
    }, 100);
  });
}

async function encrypt() {
  if (input.value !== "") {
    clearResult();
    await waitStartEncrypt();
    await encryptReplace();
    await waitEnd();
  } else {
    console.log("no hay nada para encriptar");
  }
}

async function decrypt() {
  if (input.value !== "") {
    clearResult();
    await waitStartDecrypt();
    await decryptReplace();
    await waitEnd();
  } else {
    console.log("no hay nada para desencriptar");
  }
}

function copy() {
  result.select();
  result.setSelectionRange(0, 9999);
  document.execCommand("copy");
}

input.oninput = changes;
btnEncrypt.onclick = encrypt;
btnDecrypt.onclick = decrypt;
btnCopy.onclick = copy;
btnClear.onclick = clearResult;
