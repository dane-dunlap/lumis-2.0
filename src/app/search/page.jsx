'use client'
import { useState,useEffect } from "react"


export default function SearchPage(){
    const [apps,setApps] = useState([]);
    const [error,setError] = useState(null);

    useEffect(()=>{

        async function fetchData() {
            try {
                const response = await fetch('/api/follow_app');
                const data = await response.json();

                if (response.ok) {
                    setApps(data);
                }
                else {
                    setError(data.error);
                }
            }
            catch (err) {
                setError(err.message);
            }
        }
        fetchData();
    },[]);
    return (
        <div>
            <h1>App search results</h1>
            {error && <p>Error:{error}</p>}
            <ul>
                {apps.map(app =>(
                    <li key ={app.id}>App ID:{app.id} \\ App title:{app.title} </li>
                ))}
            </ul>
        </div>
    )

}


