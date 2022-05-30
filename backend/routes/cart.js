const Cart = require("../models/Cart");
const {
    verifyToken,
    verifyTokenAndAuthorization,
    verifyTokenAndAdmin,
} = require("./verifyToken");

const router = require("express").Router();

//CREATE

router.post("/", verifyToken,async (req, res) => {
    const newCart = new Cart({
        userId:req.body.userId,
        books:req.body.books
    });
    console.log("in backend")
    try {
        const savedCart = await newCart.save();
        res.status(200).json(savedCart);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.post("/addCart", verifyToken, async (req, res) => {
    const newCart = new Cart({
        userId:req.body.userId,
        books:req.body.books
    });
    console.log("in backend")
    try {
        const savedCart = await newCart.save();
        console.log("book added " + JSON.stringify(savedCart));
        res.status(201).json(savedCart);
    } catch (err) {
        res.status(500).json(err);
    }
});

//UPDATE
router.put("/:id", verifyTokenAndAuthorization, async (req, res) => {
    try {
        const updatedCart = await Cart.findByIdAndUpdate(
            req.params.id,
            {
                $set: req.body,
            },
            { new: true }
        );
        res.status(200).json(updatedCart);
    } catch (err) {
        res.status(500).json(err);
    }
});

//DELETE
router.delete("/:id", verifyTokenAndAuthorization, async (req, res) => {
    try {
        await Cart.findByIdAndDelete(req.body.id);
        res.status(200).json("Cart has been deleted...");
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get("/find/:id", async (req, res) => {
    console.log("find " + JSON.stringify(req.body));
    try {
        const cart = await Cart.findOne(req.params.id);
        res.status(200).json(cart);
    } catch (err) {
        res.status(500).json(err);
    }
});


//GET ALL
router.get("/", verifyTokenAndAdmin, async (req, res) => {
    try {
        const carts = await Cart.find();
        res.status(200).json(carts);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;
