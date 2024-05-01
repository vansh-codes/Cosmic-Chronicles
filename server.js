// app.js
const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const mongoDBSession = require('connect-mongodb-session')(session);
const app = express();
app.use(express.static('./'));
require('dotenv').config();
const Mailgen = require('mailgen');

const nodemailer = require('nodemailer');

const UserModel = require('./js/users');
const newsModel = require('./js/newsletter');

const mongoURI = process.env.MONGO_URL;
const PORT = process.env.PORT || 2000;

mongoose.connect(mongoURI).then((res) => {
    console.log("mongoDB Connected");
});

const store = new mongoDBSession({
    uri : mongoURI,
    collection: 'mySessions',
});

// Initialize session middleware
app.use(session({
    secret: 'secret session key', // Change this to a more secure secret for production
    resave: false,
    saveUninitialized: false,
    store: store,
}));

app.use(bodyParser.urlencoded({ extended: true }));

    app.post("/login", async (req, res) => {
        const {email, password} = req.body;
        const user = await UserModel.findOne({email});
        if(!user){
            // res.send({type: 'error', message: 'Invalid email or password'});
            return res.redirect('/login');
        }
        
        const isMatch = await bcrypt.compare(password, user.password);
        
        if(!isMatch){
            // res.send({type: 'error', message: 'Invalid email or password'})
            return res.redirect('/login');
        }
    
        req.session.isAuth = true;
        res.redirect('/home');
    });
    
    app.post("/signin", async (req,res) => {
        const {username, email, password} = req.body;
    
        let user = await UserModel.findOne({email});
    
        if(user){
            return res.redirect('/signin');
        }
    
        const hashedPassword = await bcrypt.hash(password, 12);
        user = new UserModel({
            username,
            email,
            password: hashedPassword
        });
    
        await user.save();

        // res.send('alert("You have succesfully signed in. Login to continue")');
        res.redirect('/login');
    });
    
    app.post("/logout", (req, res) => {
        req.session.destroy((err) => {
            if(err) throw err;
            // res.send('alert("You have been logged out")');
            // req.flash('success', 'You have been successfully logged out.');
            res.redirect('/');
        })
    });

    app.post("/subscribe",async (req, res) => {
        const {email} = req.body;
        let user = await newsModel.findOne({email});
        if(user){
            console.log("user exists");
            res.status(200).redirect('/');
        }
        else{
            user = new newsModel({
                email
            });
        
        let transporter = nodemailer.createTransport({
            service: 'gmail',
            host: "smtp.gmail.com",
            auth: {
                // user: "vanshchaurasiya1557@gmail.com",
                // pass: "prjh qvus hhde mamb"
                user: process.env.EMAIL_ID,
                pass: process.env.EMAIL_APP_PASS
            }
        });

        let mailOptions = {
            from: 'vanshchaurasiya1557@gmail.com',
            to: email,
            subject: 'Sending Email using Node.js',
            html: `<center><b>COSMIC CHRONICLES</b> <br><br>
            <p>Thank you for subscribing to our newsletter. You will now receive all the latest news and updates from our website.</p></center>`,
            // text: 'That was easy!'
        };

        transporter.sendMail(mailOptions).then((info) => {
            console.log("Email sent!!");
            return res.status(201).redirect('/');
        }).catch((err) => {
            return res.status(500).json({ msg: err });
        });
            
        await user.save();
        // return res.redirect('/');
   
        }
    });

const myRouterApp = require('./router');

app.use(myRouterApp);

app.listen(PORT, () => {
    console.log('Server is running on http://localhost:2000');
});