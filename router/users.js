//connect to module,
//kak Icang, tolong komentarin bagian ini ya
//aq ga tahu ini bener apa ga
const fs = require("fs");
const express = require("express");
const usersRouter = express.Router();
const usersData = "data/users.json";
const { v4: uuidv4 } = require("uuid");
const { check, validationResult } = require("express-validator");
// const usersController = require("../controllers/users"); ->belum dipakai cuy
const bcrypt = require("bcrypt");
const saltRounds = 13;

usersRouter
  .route("/register")
  .get(function (req, res) {
    res.status(201);
    res.render("./users/register", {
      layout: "layout",
      title: "Register Gemes Games",
      css: "../../CSS/style.css",
    });
  })
  .post(async (req, res) => {
    //read JSON file
    let { username, email, password, passwordConf } = req.body;
    let readUsersData = fs.readFileSync(usersData);
    let data = JSON.parse(readUsersData);
    // check username that haven't been use by others
    let usedUsername = data.find((user) => req.body.username == user.username);
    let usedEmail = data.find((user) => req.body.email == user.email);
    // kak, icang ini gimana y aq bingung banyak bener if else if else

    if (!usedUsername) {
      if (!usedEmail) {
        if (password === passwordConf) {
          let passHash = await bcrypt.hash(req.body.password, saltRounds);
          let newUser = {
            id: uuidv4(),
            username: req.body.username,
            email: req.body.email,
            password: passHash,
          };
          data.push(newUser);
          fs.writeFileSync(usersData, JSON.stringify(data, null, 2));
          res.redirect("/");
          res.status(200).json({
            data,
          });
        } else {
          res.status(400).send({ error: { code: 400, message: "password confirmation different" } });
        }
      } else {
        res.status(400).send({ error: { code: 400, message: "Email already used" } });
      }
    } else {
      //   check('username', 'Username must be 4+ characters long')
      //   .exists()
      //   .isLength({min:4})
      // }
      //tadinya mau pakai validasi, tapi ahhh,, sudah lah..

      res.status(400).send({ error: { code: 400, message: "Username already used" } });
    }
  });
usersRouter.route("/login").get(function (req, res) {
  res.status(201);
  res
    .render("./users/login", {
      layout: "layout",
      title: "Login Gemes Games",
      css: "../../CSS/style.css",
    })
    .post(async (req, res) => {
      let { username, email, password } = req.body;
      let readUsersData = fs.readFileSync(usersData);
      let data = JSON.parse(readUsersData);
      let userMatch = data.find((user) => req.body.username == user.username);
      if (userMatch) {
        res.send(userMatch);
        //validate the password using bcrypt
        let submittedPass = req.body.password; //plain text from browser
        let savedPass = userMatch.password; //that has been hashed
        //TODO: use bcrypt.compare() to actually hash and compare the password
        const passwordDidMatch = await bcrypt.compare(submittedPass, savedPass);
        if (passwordDidMatch) {
          res.status(200);
          res.redirect("/");
        } else {
          res.status(401).send({
            error: { code: 401, message: "invalid username or password." },
          });
        }
      } else {
        //cause a delay to hide the fact that there was no match
        let fakePass = `$2b$${saltRounds}$invalidusernameaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa`;
        await bcrypt.compare(submittedPass, fakePass);
        //to slow down the process
        res.status(401).send({ error: { code: 401, message: "invalid username or password." } });
      }
    });
});

module.exports = usersRouter;
