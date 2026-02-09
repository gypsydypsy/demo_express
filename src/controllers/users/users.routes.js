const express = require("express");

const {
    httpGetAllUsers,
    httpCreateUser,
    httpLoginUser,
    httpGetSingleUser,
    httpUpdateUser,
    httpDeleteUser,
    httpGetUserSubscriptions,
} = require("./users.controller");
const isAuth = require("../../middlewares/isAuth");

const router = express.Router();

router.post("/", httpCreateUser);
router.get("/", /* isAuth, */ httpGetAllUsers);
router.get("/:id", /* isAuth, */ httpGetSingleUser);
router.put("/:id", /* isAuth, */ httpUpdateUser);
router.delete("/:id", /* isAuth, */ httpDeleteUser);
router.post("/login", httpLoginUser);
router.get("/:id/subscriptions", /* isAuth, */ httpGetUserSubscriptions);

module.exports = router;
