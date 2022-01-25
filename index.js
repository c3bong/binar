//connect to module
const fs = require("fs");
const express = require("express");
const app = express();
const expressLayouts = require("express-ejs-layouts");
const { v4: uuidv4 } = require("uuid");

// const users = require("./router/users.js");

//setup server
const PORT = 3000;

//setup view engine
app.set("view engine", "ejs");
app.use(expressLayouts);

// //setup access to folder & file
app.set("views", ["./views/pages", "./views/partials"]);
app.use(express.static("assets"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const usersData = "data/users.json";



// //setup front end
app.get("/", (req, res) => {
  res.status(201);
  res.render("index", {
    layout: "layout",
    title: "Gemes Games",
    css: "../CSS/style.css",
  });
});

app.get("/trial", (req, res) => {
  res.status(201);
  res.render("trial", {
    layout: "layout",
    title: "Trial Suwit",
    css: "../CSS/styleTrial.css",
  });
});

// app.use("/user", users);

app.get("/login", (req, res) => {
  app.post('/login', (req, res) => {
    const { username, password } = req.body
    const searchUser = fs.readFileSync(usersData, 'utf-8')
    const parseSearchUser = JSON.parse(searchUser)
    const foundUsers = parseSearchUser.find((user) => user.username == username)

    if(!foundUsers){
        res.redirect('/login')
    } else if(foundUsers.password == password){
        res.redirect('/')
    } else{
        res.redirect('/login')
    }
})

  
  
  res.status(201);
  res.render("login", {
    layout: "layout",
    title: "Login Gemes Games",
    css: "../CSS/style.css",
  });
});

app.get("/register", (req, res) => {
  res.status(201);
  res.render("register", {
    layout: "layout",
    title: "Register Gemes Games",
    css: "../CSS/style.css",
  });
});

app.post("/register", (req, res) => {

  const { username, password } = req.body;
  const readUsersData = fs.readFileSync(usersData, 'utf-8');
  const data = JSON.parse(readUsersData);
  const newUser = {
    id: uuidv4(),
    username,
    password,
  };
  data.push(newUser);
fs.writeFileSync(usersData, JSON.stringify(data, null, 2));
res.redirect("/");

res.status(200).json({
  data,
});
});
//kak, ini aq post lewat postman kog bisa tapi klo dari local host ga bisa??


app.listen(PORT, () => {
  console.log(`ini teh di http://localhost:${PORT}`);
});
