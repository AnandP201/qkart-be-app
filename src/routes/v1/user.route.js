const express = require("express");
const validate = require("../../middlewares/validate");
const userValidation = require("../../validations/user.validation");
const userController = require("../../controllers/user.controller");

const router = express.Router();

router.use('/',validate(userValidation.getUser),(req, res, next) => {
    next()
})
  

// TODO: CRIO_TASK_MODULE_UNDERSTANDING_BASICS - Implement a route definition for `/v1/users/:userId`
router.get("/:id",userController.getUser)
router.get("/",userController.getUser)




module.exports = router;
