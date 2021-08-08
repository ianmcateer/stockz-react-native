require("dotenv").config();
const express = require("express");
const cors = require("cors");

require("./db/mongoose");
const userRouter = require("./routers/user");
const stocksRouter = require("./routers/stocks");
const watchListRouter = require("./routers/watchList");

const app = express();

app.use(cors());

app.use(express.json());
app.use(userRouter);
app.use(stocksRouter);
app.use(watchListRouter);

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log("server is up on port", port);
});
