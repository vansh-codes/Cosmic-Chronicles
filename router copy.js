const express = require("express");
const router = express.Router();

router.get('/', function(req, res){
    // res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
    req.session.isAuth = true;
    res.sendFile(__dirname + "/index.html");
});

router.get('/login', function(req, res){
    res.sendFile(__dirname + "/login-page.html");
});

router.get('/signin', function(req, res){
    res.sendFile(__dirname + "/signin.html");
});

router.get('/solar-system-explore', function(req, res){
    res.sendFile(__dirname + "/solar.html");
});

 router.get('/planets/:planet', function(req, res){
    const requestedPlanet = req.params.planet;
    if(isValidPlanet(requestedPlanet)){
        return res.sendFile(__dirname + "/planets/" + requestedPlanet + ".html");
    }
    return res.send("<img src='https://http.cat/404'></img>");
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

router.get('/cosmic-blast', isAuth, function(req, res){
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
    return res.send("<img src='https://http.cat/404'></img>");
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


/* ==== Planets ==== */

/* router.get('/planets/:planet', function(req, res){
    const requestedName = req.params.planet.toLowerCase(); // Lowercase for case-insensitive matching

  // Check for valid planets
  if (isValidPlanet(requestedName)) {
    return res.sendFile(__dirname + "/" + requestedName + ".html");
  }
  res.end();
}); */

  // Check for files with .css or .js extension
/*   const extensionMatch = requestedName.match(/\.(css|js)$/i); // Regex for case-insensitive match
  if (extensionMatch) {
    return res.sendFile(__dirname + "/" + requestedName); // Send file without adding .html
  }
    return res.status(404).send("<img src='https://http.cat/404'></img>"); */

/* router.get('/planets/earth', function(req, res){
    res.sendFile(__dirname + "/planets/earth.html");
});

router.get('/planets/mercury', function(req, res){
    res.sendFile(__dirname + "/planets/mercury.html");
});

router.get('/planets/venus', function(req, res){
    res.sendFile(__dirname + "/planets/venus.html");
});

router.get('/planets/mars', function(req, res){
    res.sendFile(__dirname + "/planets/mars.html");
});

router.get('/planets/saturn', function(req, res){
    res.sendFile(__dirname + "/planets/saturn.html");
});

router.get('/planets/jupiter', function(req, res){
    res.sendFile(__dirname + "/planets/jupiter.html");
});

router.get('/planets/neptune', function(req, res){
    res.sendFile(__dirname + "/planets/neptune.html");
});

router.get('/planets/uranus', function(req, res){
    res.sendFile(__dirname + "/planets/uranus.html");
});

router.get('/planets/sun', function(req, res){
    res.sendFile(__dirname + "/planets/sun.html");
});

router.get('/planets/moon', function(req, res){
    res.sendFile(__dirname + "/planets/moon.html");
}); */




/* ==== THEORIES ==== */
/* router.get('/theory/big-bang', function(req, res){
    res.sendFile(__dirname + "/theory/big-bang.html");
});

router.get('/theory/black-hole', function(req, res){
    res.sendFile(__dirname + "/theory/black-hole.html");
});

router.get('/theory/parallel-universe', function(req, res){
    res.sendFile(__dirname + "/theory/parallel-universe.html");
});

router.get('/theory/dark-matter', function(req, res){
    res.sendFile(__dirname + "/theory/dark-matter.html");
});

router.get('/theory/stars-theory', function(req, res){
    res.sendFile(__dirname + "/theory/stars.html");
});

router.get('/theory/galaxies', function(req, res){
    res.sendFile(__dirname + "/theory/galaxies.html");
}); */