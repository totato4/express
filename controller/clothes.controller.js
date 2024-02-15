const db = require("../db");

class ClothesController {
  async getClothesByHuman_c(req, res) {
    const human_c = req.params.human_c;
    const clothes = await db.query(`select * from clothes where human_c = $1`, [
      human_c,
    ]);
    res.json(clothes.rows);
  }
}

module.exports = new ClothesController();
