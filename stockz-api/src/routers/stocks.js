const express = require("express");
const auth = require("../middleware/auth");
const { fetchSymbolsList, fetchStockQuote } = require("../services/fmp");

const router = new express.Router();

// Get symbols list from fmp
router.get("/stocks", auth, async (req, res) => {
    console.log("Received call for GET /stocks");
    try {
        const { data } = await fetchSymbolsList();
        console.log("Successful");
        return res.status(200).send(data);
    } catch (err) {
        console.log("error fetching available stocks", err);
    }
});

// Batch Request stock companies price from fmp
router.get(
    "/historical-price-full/:symbol/:timeSeries",
    auth,
    async (req, res) => {
        const symbol = req && req.params && req.params.symbol;
        const timeSeries = req && req.params && req.params.timeSeries;
        console.log(symbol, "symbol");
        try {
            const response = await fetchStockQuote(symbol, timeSeries);
            console.log(response, "response");
            const { data } = response;
            res.status(200).send(data);
        } catch (err) {
            console.log("error retreiving stock ingor", err);
            throw new Error("Error retreiving stock information");
        }
    }
);

module.exports = router;
