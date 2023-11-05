const express = require("express");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const User = require("./models/User.js");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const bcrypt = require("bcrypt");
const app = express();
const PORT = 3001;

const SECRET_KEY = "middleware";
const bcryptSalt = bcrypt.genSaltSync(10);
app.use(express.json());

// In-memory database for simplicity (Can replace with actual database)
const users = [];

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
// Register a new user
app.post("/register", async (req, res) => {
  console.log("register2");
  console.log(req.body);
  const { userName, email, password } = req.body;

  // Check if the username is already taken
  // if (users.some(user => user.username === username)) {
  //   return res.status(400).json({ message: 'Username already taken' });
  // }

  // // Store user data in the database
  // users.push({ username, password, email });
  // console.log(users);
  console.log("register3");
  const user = await User.findOne({ email: email });
  console.log(user);
  if (user) {
    next(createError(400, "User already exists"));
  } else {
    try {
      const user = await User.create({
        userName,
        email,
        password: bcrypt.hashSync(password, bcryptSalt),
      });
      res.status(201).json({ message: "User created", user });
    } catch (error) {
      next(error);
    }
  }
  // res.status(201).json({ message: 'User registered successfully' });
});

// User login
app.post("/login", async (req, res) => {
  // const { email, password } = req.body;

  // // Check if the user exists and the password is correct
  // const user = users.find(user => user.username === username && user.password === password);

  // if (user) {
  //   // Generate a token for the authenticated user
  //   const token = jwt.sign({ username }, SECRET_KEY);
  //   console.log(token);
  //   res.json({ token });
  // } else {
  //   res.status(401).json({ message: 'Invalid credentials' });
  // }
  console.log("login2");
  console.log(req.body);
  const { email, pass } = req.body;
  const user = await User.findOne({ email: email });
  console.log("USER:::", user);
  if (user) {
    const isCorrect = bcrypt.compareSync(pass, user.password);
    const { password, ...others } = user._doc;
    if (isCorrect) {
      const token = jwt.sign(
        { id: user._id, userName: user.userName, email: user.email },
        SECRET_KEY,
        { expiresIn: "1h" }
      );
      res
        .cookie("access_token", token, {
          httpOnly: true,
        })
        .status(200)
        .json({ message: "User signed in", user });
      // res.status(200).json({message:"User signed in", user});
    } else {
      next(createError(400, "Incorrect password"));
    }
  } else {
    next(createError(400, "User not found"));
  }
});

// Account recovery (basic implementation, just for demonstration)
app.post("/recover", (req, res) => {
  const { email } = req.body;

  // Check if the email exists in the database
  const user = users.find((user) => user.email === email);

  if (user) {
    // For simplicity, in a real scenario, you might send a recovery email to the user.
    res.json({ message: "Recovery email sent successfully" });
  } else {
    res.status(404).json({ message: "User not found" });
  }
});

mongoose
  .connect(
    "mongodb+srv://chamath:henagona1@cluster0.ivkpws5.mongodb.net/sricare"
  )
  .then(() =>
    app.listen(PORT, () => {
      console.log("API Gateway is running on port " + PORT);
    })
  )
  .catch((error) => {
    console.log(error.message);
  });
