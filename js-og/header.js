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

const social = document.querySelectorAll("#social");
for(let i=0;i<3;i++){
    social[i].addEventListener('click', function(){
        alert("Social Media not found");
    });
}

const logout = document.querySelector(".login-button");
logout.addEventListener('click', function(){
    alert('Logout Successful');
});