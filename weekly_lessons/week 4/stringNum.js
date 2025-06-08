var text1 = "ten";
var text2 = "2";

var num1 = stringToNumbers(text1);
var num2 = stringToNumbers(text2);

if(isNaN(num1) || isNaN(num2)){
    document.getElementById("outputtext").innerHTML = "You have not entered a valid number. Please enter a number.";
}else{
    document.getElementById("outputtext").innerHTML = num1 + num2;
}
function stringToNumbers(text) {
    return parseInt(text);
}

