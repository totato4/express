const Router = require("express");
const router = new Router();
const clothesController = require("../controller/clothes.controller");

router.get("/clothes", clothesController.getClothes);

module.exports = router;
