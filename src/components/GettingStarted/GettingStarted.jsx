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
        <div className='getting-started'>
            <div className='intro-text'>Visualize algorithms without the clutter</div>
            <div className='intro-subtext'>Choose a playground to explore step-by-step animations.</div>
            <div className='start-actions'>
                <button className='primary-button' onClick={() => buttonRouteHandler("sortingRoute")}>
                    Sorting Algorithms
                </button>

                <button className='secondary-button' onClick={() => buttonRouteHandler("graphRoute")}>
                    Graph Algorithms
                </button>
            </div>
        </div>
    )
}

export default GettingStarted