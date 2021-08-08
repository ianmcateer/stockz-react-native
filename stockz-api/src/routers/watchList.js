const express = require("express");

const auth = require("../middleware/auth");
const Watchlist = require("../models/watchlist");

const router = new express.Router();

// Route to add a symbol to the watchlist and save it to the db
router.put("/watchlist", auth, async (req, res) => {
    const { symbol } = req.body;

    // Check if this user already has this symbol in their watchlist
    const checkSymbol = await Watchlist.findOne({
        owner: req.user._id,
        symbol,
    });
    console.log(checkSymbol, "checkSymbol");

    if (checkSymbol) {
        return res.status(409).send({
            message: `${symbol} already exists in your watchlist`,
        });
    }

    const symbolToWatch = new Watchlist({
        symbol,
        owner: req.user._id,
    });

    try {
        await symbolToWatch.save();
        return res.status(200).send(symbolToWatch);
    } catch (e) {
        console.log(e);
        return res.status(400).send(e);
    }
});

// Route to get the users watchlist from the db
router.get("/watchlist", auth, async (req, res) => {
    try {
        const watchList = await Watchlist.find({ owner: req.user._id }).select(
            "symbol"
        );
        res.status(200).send(watchList);
    } catch (err) {
        res.status(400).send(e);
    }
});

module.exports = router;
