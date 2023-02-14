const router = require("express").Router();
const express = require('express');
const app = express();
const AuthController = require("../controller/auth");
const DashboardController = require("../controller/dashboard");
const middleWare = require("../midleware/checkAuth");


router.post("/signUp", AuthController.signUp);
router.post("/login", AuthController.login);

// app.use(middleWare);
router.get("/dashboard", middleWare,DashboardController.dashboard);

module.exports = router;