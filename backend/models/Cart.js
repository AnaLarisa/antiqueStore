const mongoose = require("mongoose");

const CartSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    bookId: {type: String, required: true},
    title: {type: String, required: true},
    author: {type: String, required: true},
    img: {type: String, required: true},
    price: {type: Number, required: true},
  },
  { timestamps: true }
);

module.exports = mongoose.model("Cart", CartSchema);
