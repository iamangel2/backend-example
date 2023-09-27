const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const db = require("./models");

const port = process.env.PORT || 3000;

app.use(bodyParser.json());

const items = [];

const Product = db.product;

// Create an item
app.post("/api/items", async (req, res) => {
  const newItem = req.body;
  try {
    const productCreate = await Product.create(newItem);
    res.status(201).json({
      success: true,
      message: "Data recorded!",
      data: productCreate,
    });
  } catch (error) {
    res.status(500).json(newItem);
  }
});

// Get all items
app.get("/api/items", (req, res) => {
  res.json(items);
});

async function setDB() {
  try {
    const client = await db.sequelize.sync();
    console.info("Connection has been established successfully");
    app.listen(port, () => console.log(`listening on port ${port}`));
    return client;
  } catch (e) {
    console.info(
      "ECONNREFUSED connecting to Mysql, " +
      "maybe container is not ready yet, will retry "
    );
  }
}

setDB();
