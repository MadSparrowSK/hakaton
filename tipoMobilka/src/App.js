import './App.css';
import {useEffect, useState} from "react";

import img from './assets/Слой 1.svg'
function App() {

    const [key, setKey] = useState('');

    useEffect(() => {
        fetchKey()
    }, [key])

    function fetchKey() {
        const eventSource = new EventSource('http://localhost:5000/hot-key/key/6235ddb144d29ab50df99853?email=theflash02@list.ru');
        eventSource.onmessage = (e) => {
            const data = e.data;
            setKey(data)
        }
        eventSource.onerror = (e) => {

        }
    }

    return (
        <div>
            <img src={img}/>
            <h1>{key}</h1>
        </div>
    );
}

export default App;
