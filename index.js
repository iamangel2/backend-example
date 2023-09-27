const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const db = require("./models");

const port = process.env.PORT || 3000;

app.use(bodyParser.json());

const items = [];

// Create an item
app.post('/items', (req, res) => {
  const newItem = req.body;
  items.push(newItem);
  res.status(201).json(newItem);
});

// Get all items
app.get('/items', (req, res) => {
  res.json(items);
});


async function setDB() {
  try {
    const client = await db.sequelize.sync();
    console.info("Connection has been established successfully");
    app.listen(port, () => console.log(`listening on port ${port}`));
    console.log(client, "client")
    return client;
  } catch (e) {
    console.info(
      "ECONNREFUSED connecting to Mysql, " +
      "maybe container is not ready yet, will retry "
    );
  }
}

setDB();
