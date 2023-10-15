const express = require("express");
require("./seeder");
const SliderDataSchema = require("./schema/SliderDataSchema");
const CardImagesSchema = require("./schema/cardImageSchema");
const jwt = require("jsonwebtoken");
const User = require("./schema/users");
const Favourties = require("./schema/favourites");
const UsersSchema = require("./schema/users");
const mongoose = require("mongoose");
const IN_MEMORY_STORE_FOR_KEYS = {};

const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

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
const secretKey = "asgdawiulyftg37462873gr3y623874y3ifdbsiulag";
const port = 5000;

app.get("/", (req, res) => {
  res.send("hotstar backend");
});

const middlewareFunctionForTokenVerification = (req, res, next) => {
  console.log(req.path);
  if (["/GetMyFavouriteCards", "/AddToFavs"].includes(req.path)) {
    const { token } = req.headers;

    const decodedData = jwt.decode(token);

    if (IN_MEMORY_STORE_FOR_KEYS[decodedData.userId] === token) {
      console.log("idhr aaye kya");
      req.userId = decodedData.userId;
      next();
    } else {
      return res.status(401).json({ message: "INVALID TOKEN" });
    }
  } else {
    next();
  }
};
app.use(middlewareFunctionForTokenVerification);

app.get("/Sliderdata", async (req, res) => {
  try {
    const SliderData = await SliderDataSchema.find();
    res.json(SliderData);
  } catch (error) {
    return res.status(500).json({ error: "error occuered" });
  }
});

app.get("/GetMyFavouriteCards", async (req, res) => {
  try {
    console.log("API TK AA GYE", req.userId);
    const myFavs = await Favourties.find({ userId: req.userId })
      .populate("cardId", "image description", CardImagesSchema)
      .lean();
    const favs = myFavs.map((fav) => ({ ...fav.cardId }));
    console.log({ myFavs });
    return res.status(200).json({ data: favs }); // This line sends the response
  } catch (err) {
    console.error(err);
    return res.status(500).json({ err }); // This line might also send a response
  }
});

app.get("/AddToFavs", async (req, res) => {
  try {
    const { userId } = req;
    const { cardId } = req.query;
    await Favourties.findOneAndUpdate(
      {
        userId,
        cardId,
      },
      { $set: { userId, cardId } },
      { upsert: true }
    );
    return res.status(201).json({ message: "Created successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error });
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

app.post("/Login", async (req, res) => {
  try {
    const { username, password } = req.body; // Assuming your frontend sends "username" and "password" keys
    const user = await UsersSchema.findOne({ username }).lean();
    if (!user) {
      return res.status(401).json({ error: "Invalid credentials." });
    }
    if (user.password !== password) {
      return res.status(401).json({ error: "Invalid credentials." });
    }
    const tokenObject = {
      userId: user._id,
    };
    const token = jwt.sign(tokenObject, secretKey);

    IN_MEMORY_STORE_FOR_KEYS[user._id] = token;

    res.status(200).json({ message: "Login successful.", token });
  } catch (error) {
    console.error("Error processing request:", error);
    res.status(500).json({ error: "Internal server error." });
  }
});

app.listen(port, () => {
  console.log("server is listening on ", port);
});
