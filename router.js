const express = require("express");
const router = express.Router();

router.get('/', function(req, res){
    // res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
    if(!req.session.isAuth)
    res.sendFile(__dirname + "/login-page.html");
    else{
        res.sendFile(__dirname + "/home.html")
    }
});

router.get('/login', function(req, res){
    res.sendFile(__dirname + "/login-page.html");
});

router.get('/signin', function(req, res){
    res.sendFile(__dirname + "/signin.html");
});

/* router.get('/solar-system', function(req, res){
    res.sendFile(__dirname + "/solar-index.html");
}); */

router.get('/solar-system-explore', function(req, res){
    res.sendFile(__dirname + "/solar.html");
});

 router.get('/planets/:planet', function(req, res){
    const requestedPlanet = req.params.planet;
    if(isValidPlanet(requestedPlanet)){
        return res.sendFile(__dirname + "/planets/" + requestedPlanet + ".html");
    }
    return res.send("<img src='https://http.cat/404'></img><br><a href='/'><h3>Go to Home page</h3></a>");
}); 

function isValidPlanet(planetName) {
    const validPlanets = ['mercury', 'venus', 'earth', 'mars', 'jupiter', 'saturn', 'uranus', 'neptune', 'sun', 'moon'];
    return validPlanets.includes(planetName);
}

router.get('/blogs', function(req, res){
    res.sendFile(__dirname + "/blogs.html");
});

const isAuth = (req, res, next) => {
    if(req.session.isAuth){
        next();
        
    }
    else{
        res.redirect('/login');
    }
}
router.get('/home',isAuth, function(req, res){
    res.sendFile(__dirname + "/home.html");
});
router.get('/cosmic-blast', function(req, res){
    res.sendFile(__dirname + "/game.html");
});

router.get('/rockets', function(req, res){
    res.sendFile(__dirname + "/rockets.html");
});

router.get('/about', function(req, res){
    res.sendFile(__dirname + "/about.html");
});

router.get('/theory/:theories', function(req, res){
    const requestedTheory = req.params.theories;
    if(isValidTheory(requestedTheory)){
        return res.sendFile(__dirname + "/theory/" + requestedTheory + ".html");
    }
    return res.send("<img src='https://http.cat/404'></img><br><a href='/'><h3>Go to Home page</h3></a>");
}); 

function isValidTheory(theoryName) {
    const validPlanets = ['big-bang', 'black-hole', 'parallel-universe', 'dark-matter', 'stars', 'galaxies'];
    return validPlanets.includes(theoryName);
}

router.get('/missions/:mission', function(req, res){
    const requestedMission = req.params.mission;
    if(isValidMission(requestedMission)){
        return res.sendFile(__dirname + "/missions/" + requestedMission + ".html");
    }
    return res.send("<img src='https://http.cat/404'></img><br><a href='/'><h3>Go to Home page</h3></a>");
}); 

function isValidMission(missionName) {
    const validPlanets = ['mission-mars', 'chandrayaan-I', 'chandrayaan-II'];
    return validPlanets.includes(missionName);
}

module.exports = router; 