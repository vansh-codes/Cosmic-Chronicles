
function checkUsername() {
    var username = document.getElementById('username').value;
    var usernamespan = document.getElementById('usernamespan');
    // var a=document.getElementById('name').value;
    if (username == ""){
        document.getElementById('usernamespan').innerText="Username should not be left empty";
        document.getElementById("usernamespan").style.color="red";
        return false;   
    }
    else if(!isNaN(username)){
        document.getElementById('usernamespan').innerText="Username should not have only digits"; 
        document.getElementById("usernamespan").style.color="red";
        return false; //so that previous output is not taken by the program
    }    
    usernamespan.innerText = "";
    return true;    
}


function validatePassword() {
    var password = document.getElementById("password").value;
    var confirmPass = document.getElementById("confirmPassword").value;
    
    if (password !== confirmPass) {
        document.getElementById('cnfpswdSpan').innerHTML = "Passwords do not match";
        document.getElementById("cnfpswdSpan").style.color="red";
        return false;
    } else {
        document.getElementById('cnfpswdSpan').innerText = "";
        return true;
    }
}

function checkPasswordStrength() {
    var number = /([0-9])/;
    var upperCase = /([A-Z])/;
    var lowerCase = /([a-z])/;
    var specialChar = /\W/;
    var password = document.getElementById("password").value;
    document.getElementById("passSpan").innerHTML='';
    
    // Check length
    if (password.length < 8) {
        document.getElementById("passSpan").innerHTML = "Password length is too short, minimum 8 characters.";
        document.getElementById("passSpan").style.color="red";
    } else {
        // Check types of characters
        if (!number.test(password)){
            document.getElementById("passSpan").innerHTML = "Include at least one number.";
            document.getElementById("passSpan").style.color="red";
        } 
        else if (!upperCase.test(password)){
            document.getElementById("passSpan").innerHTML = "Include at least uppercase letter.";
            document.getElementById("passSpan").style.color="red";
        } 
        else if (!lowerCase.test(password)){
            document.getElementById("passSpan").innerHTML = "Include at least one lowercase letter.";
            document.getElementById("passSpan").style.color="red";
        }
        else if (!specialChar.test(password)){
            document.getElementById("passSpan").innerHTML = "Include at least one special character.";
            document.getElementById("passSpan").style.color="red";
        }  
        else {
            // If it passes all checks
            document.getElementById("passSpan").innerHTML = "Strong Password";
            document.getElementById("passSpan").style.color="black";
        }
    }
}

function checkEmail() {
    var email = document.getElementById('email').value;
    var emailspan = document.getElementById('emailspan');
    var emailRegex = /^[a-zA-Z0-9._%+-]+@(?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,6}\b/;
    
    if (!emailRegex.test(email)) {
        emailspan.innerHTML = "Please enter a valid email address";
        emailspan.style.color="red";
        return false;
    } else {
        emailspan.innerHTML = "";
        return true;
    }
}

function validateForm() {
    return checkUsername()  && validatePassword() && checkEmail();
}