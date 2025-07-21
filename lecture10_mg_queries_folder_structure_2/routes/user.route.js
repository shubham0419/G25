const express = require("express");
const User = require("../models/user.model");
const { createUser, updateUser, deleteUser } = require("../controllers/user.controller");
const router = express.Router();

router.post("/user/create",createUser);

router.put("/user/update/:id",updateUser);

router.delete("/user/:id/delete",deleteUser);

module.exports = router;