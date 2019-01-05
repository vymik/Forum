"use strict";

var localStorageUserID = window.localStorage.getItem("userID");
var username = document.querySelector(".username");
let answerArea = document.querySelectorAll(".answerArea");
let answerSubmit = document.querySelectorAll(".answerSubmit");
let answerButton = document.querySelectorAll(".answerButton");

let myfun = () => {
  username.textContent = "User ID: " + localStorageUserID;
};

myfun();

let counter = 0;

for (let i = 0; i < answerArea.length; i++) {
  answerButton[i].addEventListener("click", () => {
    answerArea[i].classList.toggle("hidden");
    answerSubmit[i].classList.toggle("hidden");
  });
}
