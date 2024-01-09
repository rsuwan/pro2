const express = require('express');
const User = require('../DataBase/schema/user'); // Import User model
const Log = require('../DataBase/schema/log'); // Import User model
const router = express.Router();

router.post('/signUp', async (req, res) => {
    // console.log("sss");
    const { first_name, last_name, email, password } = req.body;
    const userDB = await User.findOne({ email });
    if (userDB) {
        res.status(401).send({ msg: 'User already exists' });
    } else {
        const {role} = "user";
        const newUser = await User.create({ email, first_name, last_name});
        const newLog = await Log.create({ email, role , password});
        // newUser.save();
        res.send("User created successfully");
    }
});

module.exports = router;