import React from 'react'
import "./GettingStarted.css"
import { useNavigate } from 'react-router-dom'
const GettingStarted = () => {
    const navigate = useNavigate();
    const buttonRouteHandler = (route) => {
        switch(route){
            case "sortingRoute":
                navigate("/sortAlgorithms");
                break;
            case "graphRoute":
                navigate("/graphAlgorithms")
        }

    }

    return (
        <div>
            <div className='intro-text'>
                What Would You Like To Do ?
            </div>
            <div>
                <button className='sorting-button' onClick={() => buttonRouteHandler("sortingRoute")}>Visualise Sorting Algorithms</button>

                <button className='graph-button' onClick={() => buttonRouteHandler("graphRoute")}>Visualise Graph Algorithms</button>
            </div>
        </div>
    )
}

export default GettingStarted