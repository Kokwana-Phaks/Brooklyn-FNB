/*local  scope */

someFunction2();

function someFunction2(){
    var someVariable =  "We get things done with local scope";
    document.getElementById("localScope").innerHTML= someVariable;
}

/*globel scope */


var someVariable2 = "We get things done with global scope";
someFunction();

function someFunction(){
    document.getElementById("globalScope").innerHTML= someVariable2;
}