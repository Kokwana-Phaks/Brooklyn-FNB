var newLine = true;

function digitBtnPressed(button) {

    if (newLine == true) {
        document.getElementById("inputBox").value = button;
        newLine = false;       
    } else {
            var currentValue = document.getElementById("inputBox").value;
            document.getElementById("inputBox").value = currentValue + button;
    }
}

function btnACPressed() {
    document.getElementById("inputBox").value = 0;
    newLine = true;
}