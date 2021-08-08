const mongoose = require("mongoose");

mongoose
    .connect(encodeURI(process.env.MONGODB_URI), {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
        useUnifiedTopology: true,
    })
    .then(() => console.log("Database connected!"))
    .catch((err) => console.log(err));
