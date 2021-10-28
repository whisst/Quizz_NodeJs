const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/verify.middlewares")

const siteController = require("../app/controllers/site.controller");

router.get("/",
    authMiddleware.isAuth, 
    siteController.home
);

module.exports = router;