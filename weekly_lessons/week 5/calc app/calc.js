//boolen variable, determines if the next thing the user types should be on the new line.

var newLine = true;
var value1;
var currentOperator;

// event handler for when any digit button is pressed.

function digitBtnPressed(button) {

    if (newLine == true) {
        document.getElementById("inputBox").value = button;
        newLine = false;       
    } else {
            var currentValue = document.getElementById("inputBox").value;
            document.getElementById("inputBox").value = currentValue + button;
    }
}

// Event handler for when the AC button is pressed

function btnACPressed() {
    document.getElementById("inputBox").value = 0;
    newLine = true;
}

// operator button event handler

function operatorBtnPressed(operator) {
    currentOperator = operator;
    value1 = parseInt(document.getElementById("inputBox").value);
    newLine = true;
    
}
