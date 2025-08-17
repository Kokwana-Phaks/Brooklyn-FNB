export default function Fruits(){
    const fruits = ["Apple", "Mango", "Banana", "Orange","Pine"]
    return (
        <div>
            <ul>
                {fruits.map((fruit) => (<li key={fruit}>{fruit}</li>))}
            </ul>
        </div>
    );
}