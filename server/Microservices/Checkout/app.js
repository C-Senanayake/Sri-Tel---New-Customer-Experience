const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const stripe = require("stripe")(
  "sk_test_51O6IFtDKeY8vYVQ9IhQa5ss2hVqAfjTfQvYmtVuuD6WjRUg7tGv7DFF4Psl6cQwUYrbbwlNbyIUyrkNlr57xhxCZ00rGHtLjfQ"
);
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
app.post("/checkout", async (req, res) => {
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

  console.log("checkout");
  //console.log(req.body);

  const item = [
    {
      price_data: {
        currency: "lkr",
        product_data: {
          name: "Sri Care",
          description: `Test`,
        },
        unit_amount: 200 * 100, // by default, amount is in cents
      },
      quantity: 1,
    },
  ];

  const session = await stripe.checkout.sessions.create({
    line_items: item,
    mode: "payment",
    success_url: `payment/success`, // direct when payment is successful
    cancel_url: `payment/unsuccess`, // direct when payment is cancelled / failed
  });

  if (session.url === undefined) {
    throw new Error("Something went wrong!");
  }

  res.status(200).json({
    url: session.url,
  });
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
