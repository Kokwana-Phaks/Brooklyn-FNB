/*if else statements */

function changeText() {
    if (document.getElementById("heading").innerHTML =='JavaScript') {
        document.getElementById("heading").innerHTML = 'Is awesome';
    } else {
        document.getElementById("heading").innerHTML = 'JavaScript';
    }
}

/* function parameters */

addNumbers(10, 7);

function addNumbers(num1, num2) {
    document.getElementById("addition").innerHTML = num1 + num2;
}
