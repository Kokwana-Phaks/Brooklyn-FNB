import { useEffect, useState } from "react";

export default function FoodDetails({foodId,}) {
    const [food, setFood] = useState({});
    const URL = `https://api.spoonacular.com/recipes/${foodId}/information`
    const API_KEY = "efb163470fb744cc9b32d6dc8c7dceca";

    useEffect(()=>{
        async function fetchFood() {
            const res = await fetch(`${URL}?apiKey=${API_KEY}`);
            const data = await res.json();

            console.log(data);
            setFood(data);
        }
        fetchFood();
    },[foodId])
    
    return(
        <div>food details {foodId}{food.title} <img src={food.image} alt="" />
        </div>
    );
}