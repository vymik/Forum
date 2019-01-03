"use strict";

var localStorageUserID = window.localStorage.getItem("userID");
var username = document.querySelector(".username");

let myfun = () => {

    username.textContent = "User ID: " + localStorageUserID;
}

myfun();
