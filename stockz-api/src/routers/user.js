const express = require("express");

const auth = require("../middleware/auth");
const User = require("../models/user");

const router = new express.Router();

router.post("/register", async (req, res) => {
    const { email, password } = req.body;

    // Check if already an existing user with the same password
    const checkUser = await User.findOne({
        email,
    });

    if (checkUser) {
        return res.status(409).send({
            message: `${email} is already being used`,
        });
    }

    const user = new User({ email, password });
    try {
        await user.save();
        const token = await user.generateAuthToken();
        res.status(201).send({ user, token });
    } catch (e) {
        console.log(e);
        res.status(400).send(e);
    }
});

router.post("/login", async (req, res) => {
    const { email, password } = req.body;
    // Check if email exists
    const emailExists = await User.findOne({
        email,
    });

    if (!emailExists) {
        return res.status(400).send({
            message: `${email} does not exist`,
        });
    }
    try {
        const user = await User.findByCredentials(email, password);
        const token = await user.generateAuthToken();
        res.send({ user, token });
    } catch (e) {
        res.status(400).send({ message: "Unable to login" });
    }
});

router.post("/logout", auth, async (req, res) => {
    try {
        req.user.tokens = [];
        await req.user.save();

        res.status(200).send();
    } catch (e) {
        console.log(error);
        res.status(500).send(e);
    }
});

module.exports = router;
