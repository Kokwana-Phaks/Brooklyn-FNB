import { useState } from "react";

export default function Zam() {
    const[Name, setName]= useState({FirstName: "", LastName: ""})

    return (
        <div>
            
            <form>
                <input type="text"
                value={Name.FirstName}
                onChange={(e) => setName({...Name, FirstName: e.target.value})}
                 /> <br></br> <br></br>
                 <input type="text" 
                 placeholder="ljljlj"
                 value={Name.LastName} 
                 onChange={(e) => setName({...Name, LastName: e.target.value})}
                  />
            </form>
        </div>
    );
}