const hamburger = document.querySelector(".hamburger");
const navLinks = document.querySelector(".navbar-links");
const links = document.querySelectorAll(".navbar-links li");

hamburger.addEventListener('click', function(){
//Animate Links
    navLinks.classList.toggle("open");
    links.forEach(link => {
        link.classList.toggle("fade");
    });

    //Hamburger Animation
    hamburger.classList.toggle("toggle");
});