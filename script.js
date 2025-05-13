"use strict";

// select all input in the app
let billInput = document.getElementById("bill");
let customInput = document.getElementById("custom-input");
let peopleInput = document.getElementById("people");
let tipAmount = document.getElementById("tip-amount");
let total = document.getElementById("total-amount");

// select the buttons
let btnCalc = document.getElementById("btn-calc");
let btnReset = document.getElementById("btn-reset");
let btnTip = document.querySelectorAll(".tip");
let btnCustom = document.getElementById("btn-custom");

// select the icons and error messages
let iconDollar = document.getElementById("icon-dollar");
let iconsPerson = document.getElementById("icon-person");
let errorMessage1 = document.getElementById("error-message1");
let errorMessage2 = document.getElementById("error-message2");
let errorMessage3 = document.getElementById("error-message3");

// starting the tip calculate
let billValue = 0;
let tipValue = 0;
let numberOfPeopleValue = 0;
let tipAmountValue = 0;
let totalValue = 0;

// getting tip value also changing the background-color and apply border to the tip button selected

btnTip.forEach(button => {
  button.addEventListener("click", () => {
    // if the user chose a selected tip the custom button will display otherwise it will hide
    showCustomInput();

    // remove the class "btn-tip-active" from all buttons if exsit
    removeClassTip();

    // apply the class "btn-tip-active" to the button selected
    button.classList.add("btn-tip-active");

    // if the user click on tip button the error message it will hide
    tipErrorHide();

    // store the bill input and tip selected to the bill value and tip value variables
    tipValue = parseFloat(button.dataset.value);
    console.log(`selected tip is ${tipValue}`);
  });
});

// handling Custom button click
btnCustom.addEventListener("click", function () {
  this.classList.add("hidden");
  customInput.classList.remove("hidden");
  customInput.classList.add("btn-tip-active");
  removeClassTip();
});

// handling custom button input
customInput.addEventListener("input", () => {
  tipValue = parseFloat(customInput.value);
  console.log(`Custom tip selected: ${tipValue}%`);
  // On typing in custom tip input the error message will disappear
  errorMessage2.classList.add("hidden");
});

// handling the Calculate Button
btnCalc.addEventListener("click", function () {
  // get the bill input value
  billValue = Number(document.getElementById("bill").value);

  // get the number of people
  numberOfPeopleValue = Number(document.getElementById("people").value);

  if (billValue <= 0 && tipValue <= 0 && numberOfPeopleValue <= 0) {
    billError();
    tipErrorShow();
    peopleError();
  } else if (billValue && tipValue <= 0 && numberOfPeopleValue <= 0) {
    tipErrorShow();
    peopleError();
  } else if (billValue && tipValue && numberOfPeopleValue <= 0) {
    peopleError();
  } else if (billValue && tipValue <= 0 && numberOfPeopleValue) {
    tipErrorShow();
  } else if (billValue <= 0 && tipValue && numberOfPeopleValue) {
    billError();
  } else if (billValue <= 0 && tipValue && numberOfPeopleValue <= 0) {
    billError();
    peopleError();
  } else if (billValue <= 0 && tipValue <= 0 && numberOfPeopleValue) {
    billError();
    tipErrorShow();
  } else {
    calcTip();
  }
});

/*- function calcul tip-*/
function calcTip() {
  tipAmountValue = Number((billValue * (tipValue / 100)).toFixed(2));
  tipAmount.textContent = `$${tipAmountValue}`;
  calcTotal();
}

/*- function calcul total-*/
function calcTotal() {
  totalValue = (billValue + tipAmountValue * numberOfPeopleValue).toFixed(2);
  total.textContent = `$${totalValue}`;
}

/*- function show the custom tip input -*/
function showCustomInput() {
  btnCustom.classList.remove("hidden");
  customInput.classList.add("hidden");
}

/*- function removing the border from all tip button -*/
function removeClassTip() {
  btnTip.forEach(btn => btn.classList.remove("btn-tip-active"));
}
/*-------------------------------------------------------------------*/
/*- Start Error Message functions -*/
function billError() {
  billInput.classList.add("border-red-input");
  iconDollar.classList.add("border-red-icon");
  errorMessage1.classList.remove("hidden");
}

function tipErrorShow() {
  errorMessage2.classList.remove("hidden");
}

function tipErrorHide() {
  errorMessage2.classList.add("hidden");
}

function peopleError() {
  peopleInput.classList.add("border-red-input");
  iconsPerson.classList.add("border-red-icon");
  errorMessage3.classList.remove("hidden");
}
/*- End Error Message functions -*/

// On typing in bill input  the error message will disappear
billInput.addEventListener("input", () => {
  billInput.classList.remove("border-red-input");
  iconDollar.classList.remove("border-red-icon");
  errorMessage1.classList.add("hidden");
});

// On typing in people input the error message will disappear
peopleInput.addEventListener("input", () => {
  peopleInput.classList.remove("border-red-input");
  iconsPerson.classList.remove("border-red-icon");
  errorMessage3.classList.add("hidden");
});

// prevent the app from refrech when click on the button Calculate
let form = document.querySelector("form");

form.addEventListener("submit", function (event) {
  event.preventDefault();
});

// button reset
btnReset.addEventListener("click", () => {
  location.reload();
});
