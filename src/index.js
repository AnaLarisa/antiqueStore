import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css';
import './index.css';
import App from './components/App';
import { CometChat } from '@cometchat-pro/chat';
import config from './config';

CometChat.init(config.appID)

ReactDOM.render(<App />, document.getElementById('root'));

/////de aici
// const express = require("express");
// const app = express();
// const mongoose = require("mongoose");
// const dotenv = require("dotenv");
// const userRoute = require("./routes/user");
// const authRoute = require("./routes/auth");
// const bookRoute = require("./routes/book");
// const cartRoute = require("./routes/cart");
// const orderRoute = require("./routes/order");
//
// dotenv.config();
//
// mongoose
//     .connect(process.env.MONGO_URL)
//     .then(() => console.log("DB Connection Successful!"))
//     .catch((err) => {
//         console.log(err);
//     });
//
// app.use(express.json());
// app.use("/api/users", userRoute);
// app.use("/api/auth", authRoute);
// app.use("/api/books", bookRoute);
// app.use("/api/carts", cartRoute);
// app.use("/api/orders", orderRoute);
//
// app.listen(process.env.PORT || 2000, () => {
//     console.log("Backend server is running!");
// });