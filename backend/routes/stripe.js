const router = require("express").Router();
const KEY = process.env.STRIPE_KEY
const stripe = require("stripe")(process.env.STRIPE_KEY);

router.post("/payment", (req, res) => {
    // noinspection JSIgnoredPromiseFromCall
    stripe.charges.create(
        {
            source: req.body.tokenId,
            amount: req.body.amount,
            currency: "RON",
        },
        (stripeErr, stripeRes) => {
            if (stripeErr) {
                res.status(500).json(stripeErr);
            } else {
                res.status(200).json(stripeRes);
            }
        }
    );
});

module.exports = router;
