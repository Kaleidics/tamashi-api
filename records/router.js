const express = require("express");
const bodyParser = require("body-parser");

const { Record } = require("./models");
const { User } = require("../users/models");
const passport = require("passport");

const router = express.Router();
const jsonParser = bodyParser.json();
const jwtAuth = passport.authenticate("jwt", { session: false });

const mongoose = require("mongoose");

//view all records for a single user
router.get("/user/:id", [jsonParser, jwtAuth], (req, res) => {
    return Record.find({ user: req.params.id })
        .sort([["_id", -1]])
        .then(record => res.status(200).json(record))
        .catch(err => res.status(500).json({ message: "Something went terribly wrong!" }));
});

//create a new record
router.post("/", [jsonParser, jwtAuth], (req, res) => {
    User.findOne({ username: req.user.username })
        .then(user => {
            const { mood, activity, notes } = req.body;
            console.log(user._id)
            Record.create({
                user: user._id,
                mood: mood,
                activity: activity,
                notes: notes
            })
                .then(record => {
                    return res.status(201).json(record);
                })
                .catch(err => {
                    return res.status(500).json({ message: "Something went terribly wrong!" });
                });
        })
        .catch(err => {
            return res.status(500).json({ message: "Something went terribly wrong!" });
        });
});


module.exports = { router };
