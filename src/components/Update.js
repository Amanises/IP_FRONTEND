import React, { useState } from 'react'
// import './Update.css'
import Axios from 'axios'
import { BrowserRouter as Router, /* Switch, */Route, Routes, Link } from 'react-router-dom';
import Active from './Active';

function Update() {

    const [db, setDb] = useState(null);

    const getJoke = () => {
        Axios.get("http://localhost:5000/db").then(
            (response) => {
                console.log(response.data);
                setDb(response.data);
            }
        )
    }
    const consul = () => {
        console.log(db);

    }

    return (
        <>

            <div className='title'>Update</div>
            <button >Get data right now</button>
            <button >click me</button>
            <p id='para'></p>
            <Link to='/active'>go to active</Link>
            <a href="/active"> href link</a>
                {/* <Routes>
                <Route path="/active" element={<Active />} />
                </Routes> */}
           
        </>
    )
}

export default Update