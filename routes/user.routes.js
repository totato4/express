const Router = require("express");
const router = new Router();

const userController = require("../controller/user.controller");

router.post("/user", userController.createUser);
router.delete("/user/:id", userController.deleteUser);
router.get("/user/:id", userController.getOneUser);
router.get("/user", userController.getUsers);
router.put("/user", userController.updateUser);

module.exports = router;
