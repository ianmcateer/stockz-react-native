const mongoose = require("mongoose");

const watchListSchema = new mongoose.Schema(
    {
        symbol: {
            type: String,
            required: true,
        },
        owner: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "User",
        },
    },
    {
        timestamps: true,
    }
);

const WatchList = mongoose.model("WatchList", watchListSchema);

module.exports = WatchList;
