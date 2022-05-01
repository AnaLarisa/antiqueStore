
// for mongoDB 

const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const userRoute = require("../src/routes/user");
const authRoute = require("../src/routes/auth");
const bookRoute = require("../src/routes/book");
const cartRoute = require("../src/routes/cart");
const orderRoute = require("../src/routes/order");

dotenv.config();

mongoose
    .connect(process.env.MONGO_URL)
    .then(() => console.log("DB Connection Successful!"))
    .catch((err) => {
        console.log(err);
    });

app.use(express.json());
app.use("/api/users", userRoute);
app.use("/api/auth", authRoute);
app.use("/api/books", bookRoute);
app.use("/api/carts", cartRoute);
app.use("/api/orders", orderRoute);

app.listen(process.env.PORT || 2000, () => {
    console.log("Backend server is running!");
});