import './App.css'
import {Input} from "@/components/ui/input"
import {Animal} from "@/components/ui/animal";
import {useEffect, useState} from "react";

function App() {

    const [animals, setAnimals] = useState([]);

    useEffect(() => {
        const lastQuery = localStorage.getItem('lastQuery');
        search(lastQuery);
    }, []);

    const search = async (q) => {
        const response = await fetch("http://localhost:3000?" + new URLSearchParams({ q }))
        const data = await response.json();
        setAnimals(data);

        localStorage.setItem('lastQuery', q);
    }

    return (
        <div className="container flex flex-col items-center">
            <h1 className="text-[48px] font-bold text-white">Animal Farm</h1>
            <Input className="max-w-[50vh] text-white" type="text" placeholder="search"
                   onChange={(e) => search(e.target.value)}/>
            <ul>
                {animals.map((animal) => (
                    <Animal key={animal.id} {...animal} />
                ))}
                {animals.length === 0 && 'No animals found'}
            </ul>
        </div>

    )
}

export default App
