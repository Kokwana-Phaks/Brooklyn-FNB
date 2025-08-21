import { useState } from "react";

export default function Todo(){
    const[todo, setTodo]= useState("")
    return (
        <div>
            <form>
                <input type="text"
                value={todo}
                onChange={(e)=> setTodo(e.target.value)}
                 />
                 <button>Add</button>
            </form>
        </div>
    );
}