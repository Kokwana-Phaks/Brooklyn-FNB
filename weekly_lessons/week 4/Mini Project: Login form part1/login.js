function verifyUser() {
    var username = document.getElementById("usernameInput").value;
    var password = document.getElementById("passwordInput").value;

    checkUserCreds(username, password);
}

function checkUserCreds(username, password) {
    var systemUsername = "Bond";
    var systemPassword = "007";

    if(username == systemUsername && password === systemPassword) {
        document.getElementById("message").innerHTML = "Correct. Logging you in...";
    }else{
        document.getElementById("message").innerHTML = "Username or Password is incorrect";
    }
}