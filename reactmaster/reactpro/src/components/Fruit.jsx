export default function Fruit({name, price, emoji}){
    return <div>
        {/* {emoji} {name} {price} */}
        {price > 20 ? (
            <li>
                {emoji} {name} {price}
            </li>
        ) :(
            ""
        )}
        
    </div>;
}