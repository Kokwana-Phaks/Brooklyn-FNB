import { useState } from "react";

export default function Counter() {
    const [Count, SetCount] = useState (0);

    function Increasement(){
        SetCount(Count + 1)
    }

    function Decreament() {
        SetCount(Count - 1)
    }

    return (
        <div>
            <h1>The Count is: {Count}</h1>
            <button onClick={Increasement}>Increase</button>
            <button onClick={Decreament}>Decrease</button>
        </div>
    );
}