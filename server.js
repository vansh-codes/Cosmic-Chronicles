// app.js
const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const mongoDBSession = require('connect-mongodb-session')(session);
const app = express();
app.use(express.static('./'));

const UserModel = require('./js/users');
const newsModel = require('./js/newsletter');

const mongoURI = 'mongodb://localhost:27017/sessions';

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

    /* const isAuth = (req, res, next) => {
        if(req.session.isAuth){
            next();
        }
        else{
            res.redirect('/login');
        }
    } */

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
            res.status(200).redirect('/');}
        else{
            user = new newsModel({
                email
            });
            await user.save();
            return res.redirect('/');
   
        }
    });


const myRouterApp = require('./router');

app.use(myRouterApp);

app.listen(2000, () => {
    console.log('Server is running on http://localhost:2000');
});



// app.get('/', (req, res) => {
//     // res.sendFile(__dirname + '/game.html');
//     // res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
//     req.session.isAuth = true;
//     res.sendFile(__dirname + '/index.html');
// });