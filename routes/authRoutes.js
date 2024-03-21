const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken'); // Corrected import statement
const multer = require('multer');
const bcrypt = require('bcryptjs');
const cors = require('cors');

const User = mongoose.model('User');

require('dotenv').config();

router.post('/addnewuser', async (req, res) => {
    console.log('sent by the Client side - ', req.body);

    const { firstName, lastName, email, password, userID, contact } = req.body; // Corrected variable name

    try {

        const hashedPassword = await bcrypt.hash(password,10)

        const user = new User({
            firstName,
            lastName,
            email,
            password: hashedPassword,
            userID,
            contact
        });

        await user.save();
        res.send({ message: "User Registration Successfully" }); // Removed extra curly brace
    } catch (error) {
        console.log('database error', error);
        return res.status(422).send({ error: error.message });
    }
});



//////////////////user login//////////////////////

router.post('/userlogin', async (req , res) => {

    const { userID, password  } = req.body;

try {

    const user = await User.findOne({userID});

    if(!user){
        return res.status(401).json({error: 'User Not Found'});
    }
    // else
    //     return res.status(201).json({error: 'User Found'});

    const isPasswordValide = await bcrypt.compare(password, user.password);

    if (!isPasswordValide){
        return res.status(201).json({error: 'Invalid Password'});
    }

    const token = jwt.sign({userId: user._id }, process.env.JWT_SECRET );
    // res.status(200).json({message: 'User Loged Successfully'});
    console.log('User Login Succeed');

    res.json({token});

} catch (error) {
    console.error("Login Error", error);
    return res.status(500).json({message : "Internal Server Error"})
    
}



});



















module.exports = router;
