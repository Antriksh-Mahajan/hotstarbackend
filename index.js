const express = require("express");
const app = express();
const mongoose = require("mongoose");

const SliderDataSchema = require("./schema/SliderDataSchema");
const CardImagesSchema = require("./schema/cardImageSchema");

const port = 5000;
const cors = require("cors");
app.use(cors());
app.get("/", (req, res) => {
  res.send("hotstar backend");
});
mongoose
  .connect("mongodb+srv://admin:3305@hotstar.48age4c.mongodb.net/", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.info("Connection established with database");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });

app.get("/Sliderdata", async (req, res) => {
  try {
    const SliderData = await SliderDataSchema.find();
    res.json(SliderData);
  } catch (error) {
    return res.status(500).json({ error: "error occuered" });
  }
});

app.get("/cardImages", async (req, res) => {
  try {
    const cardimage = await CardImagesSchema.find();
    res.json(cardimage);
  } catch (error) {
    return res.status(500).json({ error: "An error occurred while fetch c" });
  }
});

app.listen(port, () => {
  console.log("server is listening on ", port);
});
