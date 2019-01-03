var fs = require("fs");
var express = require('express');
var router = express.Router();
let loggedUser;
let loggedUserId;

/* GET home page. */
router.get('/', function(req, res, next) {
  let userDB  = fs.readFileSync("./database/users.json");
  let users = JSON.parse(userDB);

  res.render('index', {loggedUser: loggedUser, loggedUserId: loggedUserId });
});

router.get("/login", (req, res) => {
  res.render("login");
});

router.get("/register", (req, res) => {
  res.render("register");
});

router.get("/forum", (req, res) => {
  if(loggedUser){
    let commentDB = fs.readFileSync("./database/posts.json");
    let comments = JSON.parse(commentDB);
  
    res.render("forum", {loggedUser: loggedUser, loggedUserId: loggedUserId, comments: comments });
  } else {
    res.render("login", {loggedUser: loggedUser, loggedUserId: loggedUserId });
  }
});

router.post("/register", (req,res) => {

  let newUser = req.body;
  let userDB  = fs.readFileSync("./database/users.json");
  let users = JSON.parse(userDB);
  newUser.id = users.length;

  users.push(newUser);
  console.log(newUser);
  fs.writeFileSync("./database/users.json", JSON.stringify(users));
  res.redirect("/login");
});


router.post("/login", (req,res) => {

  let login = req.body;
  let userDB  = fs.readFileSync("./database/users.json");
  let users = JSON.parse(userDB);
  console.log("ivestis",login);
  
  for(let i = 0; i < users.length; i++){
    if(users[i].name == login.name && users[i].psw == login.psw){
      loggedUser = users[i].name;
      loggedUserId = users[i].id;
      res.redirect("/forum");
    } 
  }

});

router.post("/forum", (req,res) => {
  let newComment = req.body;
  let commentDB = fs.readFileSync("./database/posts.json");
  let comments = JSON.parse(commentDB);
  newComment.userID = loggedUserId;

  comments.push(newComment);
  fs.writeFileSync("./database/posts.json", JSON.stringify(comments));
  res.redirect('/forum');
})

module.exports = router;
