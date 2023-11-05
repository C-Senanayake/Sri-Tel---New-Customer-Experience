const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const app = express();
const PORT = 3006;

const SECRET_KEY = "middleware";
app.use(express.json());

app.use(cookieParser());
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));

const corsOptions = {
  origin: "http://localhost:8080",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  preflightContinue: false,
  optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));

// checkout
app.post("/login", async (req, res) => {
  //   console.log("login2");
  //   console.log(req.body);
  //   const { email, pass } = req.body;
  //   const user = await User.findOne({ email: email });
  //   console.log("USER:::", user);
  //   if (user) {
  //     const isCorrect = bcrypt.compareSync(pass, user.password);
  //     const { password, ...others } = user._doc;
  //     if (isCorrect) {
  //       const token = jwt.sign(
  //         { id: user._id, userName: user.userName, email: user.email },
  //         SECRET_KEY,
  //         { expiresIn: "1h" }
  //       );
  //       res
  //         .cookie("access_token", token, {
  //           httpOnly: true,
  //         })
  //         .status(200)
  //         .json({ message: "User signed in", user });
  //     } else {
  //       next(createError(400, "Incorrect password"));
  //     }
  //   } else {
  //     next(createError(400, "User not found"));
  //   }
});

mongoose
  .connect(
    "mongodb+srv://chamath:henagona1@cluster0.ivkpws5.mongodb.net/sricare"
  )
  .then(() =>
    app.listen(PORT, () => {
      console.log("Payment Gateway is running on port " + PORT);
    })
  )
  .catch((error) => {
    console.log(error.message);
  });
