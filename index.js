/*******************REGLAS PARA ENCRIPTAR / DESENCRIPTAR****************** */
const encryptRules = { e: "enter", i: "imes", a: "ai", o: "ober", u: "ufat" };
/*------------------------------------------------------------------------ */

const inputArea = document.querySelector("#input-area");
const inputBox = document.querySelector("#input-box");
const input = document.querySelector("#converter-box");
input.select();

/***********Animacion del INPUT************** */
const inputAnimationBox = document.createElement("div");
inputAnimationBox.classList.add("inputArea__waitInput");
const inputAnimation = document.createElement("img");
inputAnimation.setAttribute("src", "/assets/animation_500_l34sadiq.gif");
inputAnimationBox.appendChild(inputAnimation);
/*------------------------------------------- */

/*********************BOTONES*********************** */
const btnEncrypt = document.querySelector("#encrypt-btn");
const btnDecrypt = document.querySelector("#decrypt-btn");
const btnCopy = document.querySelector("#copy-btn");
const btnClear = document.querySelector("#clear-btn");
/*-------------------------------------------------- */

/**************************SELECTORES*************************** */
const result = document.querySelector("#result");
const errorText = document.querySelector("#error-text");
errorText.classList.add("errorArea__text");
const animationArea = document.querySelector("#animation-area");
const actionAnimation = document.createElement("img");
actionAnimation.classList.add("animationArea__gif");
const waitAnimation = document.createElement("img");
/*-------------------------------------------------------------- */

/*****************************VALIDACIONES***************************** */
const regExpMayus = /[A-Zá-ýÁ-Ý]/g;
const regExpCaract = /[`~@#$%^&*()_+-={\}\\\|:;'"<>?/,.]/g;
/*--------------------------------------------------------------------- */

/*************OBTENER VALORES DEL INPUT************ */
function inputValue() {
  return input.value;
}
/*------------------------------------------------- */

/*****************MOSTRAR ERRORES DE VALIDACION EN PANTALLA****************** */
function printError1(letter, caracter) {
  errorText.textContent = `Error: Ingresaste las siguientes letras y caracteres: (${letter}),(${caracter})`;
}

function printError2(letter) {
  errorText.textContent = `Error: Ingresaste las siguientes letras: (${letter})`;
}

function printError3(caracter) {
  errorText.textContent = `Error: Ingresaste los siguientes caracteres: (${caracter})`;
}
/*--------------------------------------------------------------------------- */

/*********************OBTENGO VALORES UNICOS DE LOS ERRORES INTRODUCIDOS************** */
function getUniques(arr, regExp) {
  const arrayMatch = arr.value.match(regExp);
  const arraySet = [...new Set(arrayMatch)];
  return arraySet;
}
/*------------------------------------------------------------------------------------ */

/************************MODIFICO CLASES EN EL AREA DE RESULTADOS********************* */
function onClass() {
  result.classList.remove("resultArea__resultBox");
  result.classList.add("resultArea__resultBox--active");
}

function offClass() {
  result.classList.remove("resultArea__resultBox--active");
  result.classList.add("resultArea__resultBox");
}
/*------------------------------------------------------------------------------------ */

/*********MODIFICO EL ESTADO DE LOS BOTONES DEL INPUT PARA QUE QUEDEN DESHABILITADOS SI HAY ERRORES******** */
function btnInputState(state) {
  btnEncrypt.disabled = state;
  btnDecrypt.disabled = state;
}
/*--------------------------------------------------------------------------------------------------------- */

/************************SUPERVISO CAMBIOS EN EL INPUT************************* */
function changesInput() {
  const letterMayus = getUniques(input, regExpMayus);
  const caracter = getUniques(input, regExpCaract);
  if (letterMayus.length > 0 && caracter.length > 0) {
    printError1(letterMayus, caracter);
    btnInputState(true);
  } else if (letterMayus.length > 0) {
    printError2(letterMayus);
    btnInputState(true);
  } else if (caracter.length > 0) {
    printError3(caracter);
    btnInputState(true);
  } else {
    errorText.textContent = "";
    btnInputState(false);
  }
}
/*----------------------------------------------------------------------------- */

/*******IMPRIMO LOS RESULTADOS ENCRIPTADOS / DESENCRIPTADOS********* */
function writeResult(text) {
  result.textContent = text;
}
/*------------------------------------------------------------------ */

/****************LIMPIO LOS TEXTAREA***************** */
function clearResult() {
  result.textContent = "";
  offClass();
}

function clearInput() {
  input.value = "";
  errorText.textContent = "";
}
/*--------------------------------------------------- */

/*****************BUSCO LA KEY QUE CORRESPONDE A CADA PALABRA ENCRIPTADA************* */
function findKey(value) {
  const key = Object.keys(encryptRules).find(
    (key) => encryptRules[key] == value
  );
  return key;
}
/*----------------------------------------------------------------------------------- */

/******************REEEMPLAZO DE PALABRAS Y LETRAS**************** */
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
      onClass();
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
      onClass();
      resolve();
    }, 1000);
  });
}
/*--------------------------------------------------------------- */

/*************************PROCESOS Y ANIMACIONES****************************** */
function waitAnimationStart() {
  inputArea.removeChild(input);
  inputArea.appendChild(inputAnimationBox);
  setTimeout(() => {
    inputArea.removeChild(inputAnimationBox);
    inputArea.appendChild(input);
  }, 2000);
}

function waitBox() {
  inputBox.removeChild(input);
  inputBox.appendChild(inputAnimationBox);
  setTimeout(() => {
    inputBox.removeChild(inputAnimationBox);
    inputBox.appendChild(input);
  }, 3000);
}

function waitStartEncrypt() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      animationArea.appendChild(actionAnimation);
      actionAnimation.setAttribute("src", "/assets/13046-locked.gif");
      resolve();
    }, 2000);
  });
}
function waitStartDecrypt() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      animationArea.appendChild(actionAnimation);
      actionAnimation.setAttribute("src", "/assets/13047-unlocked.gif");
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
/*----------------------------------------------------------------------------- */

/******************ENCRIPTADO / DESENCRIPTADO******************** */
async function encrypt() {
  if (input.value !== "") {
    waitBox();
    clearResult();
    await waitStartEncrypt();
    await encryptReplace();
    await waitEnd();
  } else {
    alert("No hay nada para encriptar");
  }
}

async function decrypt() {
  if (input.value !== "") {
    waitBox();
    clearResult();
    await waitStartDecrypt();
    await decryptReplace();
    await waitEnd();
  } else {
    alert("No hay nada para desencriptar");
  }
}
/*--------------------------------------------------------------- */

/*********************COPIAR RESULTADO********************* */
function copy() {
  if (result.value === "") {
    alert("No hay texto para copiar!");
  } else {
    result.select();
    result.setSelectionRange(0, 9999);
    document.execCommand("copy");
  }
}
/*--------------------------------------------------------- */

/************ASIGNACION DE FUNCIONES A CADA BOTON E INPUT************* */
input.oninput = changesInput;
btnEncrypt.onclick = encrypt;
btnDecrypt.onclick = decrypt;
btnCopy.onclick = copy;
btnClear.onclick = clearResult;
/*-------------------------------------------------------------------- */
