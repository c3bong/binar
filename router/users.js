//connect to module,
//kak Icang, tolong komentarin bagian ini ya
//aq ga tahu ini bener apa ga
const fs = require("fs");
const express = require("express");
const usersRouter = express.Router();
const usersData = "data/users.json";
const { v4: uuidv4 } = require("uuid");
const { check, validationResult } = require("express-validator");
const authController = require("../controllers/authController");
const bcrypt = require("bcrypt");
const saltRounds = 13;

usersRouter.get("/register",authController.register);
usersRouter.post("/register",authController.inputregister);
usersRouter.get("/login",authController.login);
usersRouter.post("/login",authController.inputLogin);

module.exports = usersRouter;
