const express = require("express");
const app = express();
const fetch = require('node-fetch');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const userRoute = require("./routes/user");
const authRoute = require("./routes/auth");
const bookRoute = require("./routes/book");
const cartRoute = require("./routes/cart");
const orderRoute = require("./routes/order");
const stripeRoute = require("./routes/stripe");

dotenv.config();

mongoose
    .connect(process.env.MONGO_URL)
    .then(() => console.log("DB Connection Successful!"))
    .catch((err) => {
        console.log(err);
    });

app.use(express.json());
app.use("/users", userRoute);
app.use("/auth", authRoute);
app.use("/books", bookRoute);
app.use("/carts", cartRoute);
app.use("/orders", orderRoute);
app.use("/mycart", stripeRoute);

app.listen(process.env.PORT || 2000, () => {
    console.log("Backend server is running!");
});