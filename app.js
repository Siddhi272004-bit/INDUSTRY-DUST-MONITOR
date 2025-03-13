require('dotenv').config();
const express=require('express');
const app=express()
const path=require('path')
const cors=require('cors')
const mongoose = require('mongoose');
const User=require('./models/User')
const bcrypt = require('bcrypt');
// to verify if a user is logged in.
const jwt = require('jsonwebtoken');


app.set("view engine","ejs");
app.use(express.json());
app.use(cors())
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname,"public")))

mongoose.connect('mongodb+srv://s51741248:h2ZNgA7GILexRGbN@cluster0.82ebe.mongodb.net/dustcollector?retryWrites=true&w=majority&appName=Cluster0&ssl=true')
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log(err));

const SECRET_KEY = process.env.SECRET_KEY || "Siddhi_Samridhi_123";
// #routes

// register route:
app.post('/register',async(req,res)=>{
    const {username,email,password} =req.body;
    try{
        // Hash the password before saving
        const hashedPassword = await bcrypt.hash(password, 10);
        const user=new User({username,email,password:hashedPassword});
        await user.save();
        res.send('User Registered Successfully')
    }catch(err){
        res.status(500).send('Error while Registering')
    }
});
// login route:
app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).send('Invalid Credentials');
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).send('Invalid Credentials');
        }

        const token = jwt.sign({ userId: user._id }, SECRET_KEY, { expiresIn: '1h' });

        res.json({
            message: "Login Successful",
            token
        });

    } catch (err) {
        res.status(500).send('Error while Logging In');
    }
});
// ✅ User authentication was successful.
// ✅ Password hashing and verification with bcrypt worked.
// ✅ JWT token generation is working fine.
app.listen(3001, () => {
    console.log("Server running on port 3001");
});