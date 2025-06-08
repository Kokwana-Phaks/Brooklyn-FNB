var text1 = "10";
var text2 = "2";

var num1 = stringToNumbers(text1);
var num2 = stringToNumbers(text2);

document.getElementById("outputtext").innerHTML = num1 + num2;

function stringToNumbers(text) {
    return parseInt(text);
}
