function digitBtnPressed(button) {
    var currentValue = document.getElementById("inputBox").value;
    document.getElementById("inputBox").value = currentValue + button;
}