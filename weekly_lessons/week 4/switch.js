function btnPressed() {
    var weatherSelected = document.getElementById("weather").value;
    var advice;

    switch (weatherSelected) {
        case "sunny":
            advice = "Wear your sunglasses";
            break;
        case "windy":
            advice = "Wear a jacket";
            break;
        case "rainy":
            advice = "Wear a rain coat and carry an umbrella";
            break;
        case "snowy":
            advice = "Dress warmly";
            break;
        case "cloudy":
            advice = "Carry a jacket. it might rain"
            break;
    }
    document.getElementById("output").innerHTML = "Weather advice: " + advice;
}