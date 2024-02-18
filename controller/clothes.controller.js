const db = require("../db");

class ClothesController {
  async getClothes(req, res) {
    let {
      human_c = false,
      size_c = false,
      id = false,
      brand_c = false,
      color_c = false,
      price_max = false,
      price_min = false,
      page,
      limit = false,
    } = req.query;

    let size_query;
    if (!size_c) {
      size_query = "SELECT * FROM clothes";
    }
    if (size_c) {
      let size_array = size_c.split(",");
      size_query =
        "SELECT * FROM clothes where size_c in " +
        "(" +
        size_array.map((item) => "'" + item + "'") +
        ")";
    }

    let human_query;
    if (!human_c) {
      human_query = " ";
    } else {
      let human_array = human_c.split(",");
      human_query =
        " INTERSECT " +
        "SELECT * FROM clothes where human_c in " +
        "(" +
        human_array.map((item) => "'" + item + "'") +
        ")";
    }

    let brand_query;

    if (!brand_c) {
      brand_query = " ";
    } else {
      let brand_array = brand_c.split(",");
      brand_query =
        " INTERSECT " +
        "SELECT * FROM clothes where brand in " +
        "(" +
        brand_array.map((item) => "'" + item + "'") +
        ")";
    }

    let color_query;
    if (!color_c) {
      color_query = " ";
    } else {
      let color_array = color_c.split(",");
      color_query =
        " INTERSECT " +
        "SELECT * FROM clothes where color in " +
        "(" +
        color_array.map((item) => "'" + item + "'") +
        ")";
    }

    let price_max_query;
    if (!price_max) {
      price_max_query = " ";
    } else {
      price_max_query =
        " INTERSECT " + `SELECT * FROM clothes where price <=` + price_max;
    }

    let price_min_query;
    if (!price_min) {
      price_min_query = " ";
    } else {
      price_min_query =
        " INTERSECT " +
        `SELECT * FROM clothes where price >=` +
        "'" +
        price_min +
        "'";
    }

    let pag_query;
    if (page !== false && limit !== false) {
      pag_query =
        " " +
        "ORDER BY id OFFSET" +
        " " +
        page * limit +
        " " +
        " LIMIT " +
        " " +
        limit;
    } else {
      pag_query = " " + "ORDER BY id OFFSET 0 LIMIT 12";
    }

    // let count = " SELECT count(*) from clothes";

    const data = await db.query(
      size_query +
        human_query +
        brand_query +
        color_query +
        price_max_query +
        price_min_query +
        pag_query
    );

    const totalCount = await db.query(
      size_query +
        human_query +
        brand_query +
        color_query +
        price_max_query +
        price_min_query
    );

    let totalPages =
      totalCount.rows.length == 0 ? 0 : totalCount.rows.length / limit;

    res.json({ products: data.rows, totalCount: totalCount.rows.length });
  }
}

module.exports = new ClothesController();
