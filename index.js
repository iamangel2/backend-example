const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const db = require("./db");

const port = process.env.PORT || 3000;

app.use(bodyParser.json());

const Product = db.product;

// Create an item
app.post("/api/items", async (req, res) => {
  const newItem = req.body;

  const attributes = ["price", "name", "stock"];

  let missingAttr = [];
  for (const attr of attributes) {
    if (!(attr in newItem)) {
      missingAttr.push(attr);
    }
  }

  if (missingAttr.length > 0) {
    return res.status(400).json({
      success: false,
      message: `${missingAttr.join(" ")} missing!`,
    });
  }

  try {
    const productCreate = await Product.create(newItem);
    res.status(201).json({
      success: true,
      message: "Data recorded!",
      data: productCreate,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error!",
    });
  }
});

// Get all items
app.get("/api/items", async (req, res) => {
  try {
    const products = await Product.findAll();
    res.status(200).json({
      success: true,
      message: "This is you data!",
      data: products,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error!",
    });
  }
});

async function setDB() {
  try {
    await db.sequelize.sync();
    console.info("Connection has been established successfully");
    app.listen(port, () => console.log(`listening on port ${port}`));
  } catch (e) {
    console.info(
      "ECONNREFUSED connecting to Mysql, " +
      "maybe container is not ready yet, will retry "
    );
  }
}

setDB();
