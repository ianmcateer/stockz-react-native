const { get } = require("./axios-client");

const fetchSymbolsList = async () => await get("/api/v3/stock/list");

// Batch request historical price information
const fetchStockQuote = async (symbol, timeSeries = 1) =>
    await get(
        `/api/v3/historical-price-full/${symbol}?timeseries=${timeSeries}`
    );

module.exports = {
    fetchSymbolsList,
    fetchStockQuote,
};
