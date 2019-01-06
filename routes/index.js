var fs = require("fs");
var express = require("express");
var router = express.Router();
let loggedUser;
let loggedUserId;

/* GET home page. */
router.get("/", function(req, res, next) {
  let userDB = fs.readFileSync("./database/users.json");
  let users = JSON.parse(userDB);

  res.render("index", { loggedUser: loggedUser, loggedUserId: loggedUserId });
});

router.get("/login", (req, res) => {
  res.render("login", { loggedUser: loggedUser, loggedUserId: loggedUserId });
});

router.get("/register", (req, res) => {
  res.render("register", {
    loggedUser: loggedUser,
    loggedUserId: loggedUserId
  });
});

router.get("/forum", (req, res) => {
  if (loggedUser) {
    let subjectDB = fs.readFileSync("./database/posts.json");
    let subjects = JSON.parse(subjectDB);

    let messageDB = fs.readFileSync("./database/messages.json");
    let messages = JSON.parse(messageDB);

    res.render("forum", {
      loggedUser: loggedUser,
      loggedUserId: loggedUserId,
      subjects: subjects,
      messages: messages
    });
  } else {
    res.render("login", { loggedUser: loggedUser, loggedUserId: loggedUserId });
  }
});

router.post("/register", (req, res) => {
  let newUser = req.body;
  let userDB = fs.readFileSync("./database/users.json");
  let users = JSON.parse(userDB);
  newUser.id = users.length;

  if(newUser.psw == newUser.pswrepeat){
    users.push(newUser);
    console.log(newUser);
    fs.writeFileSync("./database/users.json", JSON.stringify(users));
    res.redirect("/login");
  }
});

router.post("/login", (req, res) => {
  let login = req.body;
  let userDB = fs.readFileSync("./database/users.json");
  let users = JSON.parse(userDB);
  console.log("ivestis", login);

  for (let i = 0; i < users.length; i++) {
    if (users[i].name == login.name && users[i].psw == login.psw) {
      loggedUser = users[i].name;
      loggedUserId = users[i].id;
      res.redirect("/forum");
    } 
  }
});

router.post("/forum", (req, res) => {
  let newSubject = req.body;
  console.log(newSubject);
  let subjectDB = fs.readFileSync("./database/posts.json");
  let subjects = JSON.parse(subjectDB);
  let subjectID = subjects.length;
  newSubject.userID = loggedUserId;
  newSubject.subjectID = subjectID + "";

  subjects.push(newSubject);
  fs.writeFileSync("./database/posts.json", JSON.stringify(subjects));

  let newMessage = req.body;
  let messageDB = fs.readFileSync("./database/messages.json");
  let messages = JSON.parse(messageDB);
  delete newMessage.subject;
  newMessage.userID = loggedUserId;
  newMessage.subjectID = subjectID + "";

  messages.push(newMessage);
  fs.writeFileSync("./database/messages.json", JSON.stringify(messages));

  res.redirect("/forum");
});

router.post("/answer", (req, res) => {
  let newMessage = req.body;
  let messageDB = fs.readFileSync("./database/messages.json");
  let messages = JSON.parse(messageDB);
  newMessage.userID = loggedUserId;
  console.log(newMessage);

  if (newMessage.comment) {
    messages.push(newMessage);
    fs.writeFileSync("./database/messages.json", JSON.stringify(messages));
    res.redirect("/forum");
  }
});

router.get("/logout", (req,res) => {
  loggedUser = null;
  loggedUserId = null;
  res.redirect("/");

});

module.exports = router;
