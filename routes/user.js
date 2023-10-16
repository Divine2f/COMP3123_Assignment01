const express = require('express');
const userRoutes = express.Router();
const userModel = require('../models/user')
const bcrypt = require('bcrypt');

userRoutes.route('/')
.get((req, res) => {
    res.send('USERS')
})
.post((req, res) => {
    
})

userRoutes.post('/signup', async (req, res) => {
    try {
        const { username, email, password } = req.body;
    
        if (!username || !email || !password) {
            return res.status(400).send({
                message: "Fields cannot be empty"
            });
        }
    
        const users = new userModel({
            username,
            email,
            password
        });
    
        await users.save();
        res.status(201).send("Account created successfully");
    } catch (error) {
        console.error(error);
        res.status(500).send("An error occurred while adding the user.");
    }
})




userRoutes.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await Login.findOne({ username });

        if (!user) {
            return res.status(401).send("Invalid username or password");
        }

        const passwordMatch = await bcrypt.compare(password, user.password);

        if (passwordMatch) {
            res.status(200).json(
                { 
                    "status": true,
                    "username": username,
                    "message": "User logged in successfully" 
                })
        } else {
            res.status(401).json(
                { 
                    "status": false,
                    "message": "Invalid username or password" 
                }
            )
        }
    } catch (error) {
        console.error(error);
        res.status(500).send("Login failed");
    }
})



module.exports = userRoutes;