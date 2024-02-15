const Router = require("express");
const router = new Router();
const clothesController = require("../controller/clothes.controller");

router.get("/clothes", clothesController.getClothesByHuman_c);
router.get("/clothes", clothesController.getAllClothes);

module.exports = router;
