import Fruits from "./fruits";

function Prices() {
        const prices = [10, 20,30, 40,50]
        return(
            <h1> 
                {prices.map((price) => (<li>{price * 32/100}</li>))}
            </h1>
        );

    }

export default Prices;