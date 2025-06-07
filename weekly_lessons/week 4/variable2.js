var text1;
var text2;
var tex3;

text1 = "Hello everyone on the planet"
text2 = "I love learning JS!"
tex3 = "... JS is awesome"

var numA = 7;
var numB = 10;

document.getElementById("heading1").innerHTML=(text1);
document.getElementById("paragraph").innerHTML=(text2 + tex3);
document.getElementById("paragraph2").innerHTML=('The answer is: ' + numA + "x" + numB + "=" + numA * numB);