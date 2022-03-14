const express = require('express');
const UserController = require('../app/controllers/UserController');
const MiddlewareController = require('../app/controllers/MiddlewareController');
const router = express.Router()

//GET ALL USERS
// router.get("/", UserController.getAllUser);
router.get("/", MiddlewareController.verifytoken, UserController.getAllUser);

//DELETE USER
// router.delete("/:id", UserController.deleteUser);
router.delete("/:id", MiddlewareController.verifyTokenAndAdmin, UserController.deleteUser);

module.exports = router;