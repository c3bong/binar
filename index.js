//connect to module
const express = require("express");
const app = express();
const expressLayouts = require("express-ejs-layouts");
const usersRouter = require("./router/users.js");

//setup server
const PORT = 3000;

//setup view engine
app.set("view engine", "ejs");
app.use(expressLayouts);

//setup access to folder & file
app.set("views", ["./views/pages", "./views/partials"]);
app.use(express.static("assets"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// const usersData = "data/users.json";

//setup router
app.use("/users", usersRouter)


//setup front end
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



app.listen(PORT, () => {
  console.log(`ini teh di http://localhost:${PORT}`);
});
