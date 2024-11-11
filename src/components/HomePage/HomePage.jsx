import React, { Component } from 'react';
import * as ReactDOM from "react-dom/client";

import './HomePage.css';
import UxBoard from '../UxBoard/UxBoard';
import SortingComponent from '../SortingComponent/SortingComponent';
import GettingStarted from '../GettingStarted/GettingStarted';

import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
    {
        path: "",
        element: <GettingStarted/>
    },
    {
        path: "/sortAlgorithms",
        element: <SortingComponent/>
    },
    {
        path: "/graphAlgorithms",
        element: <UxBoard/>
    }
]);

class HomePage extends Component {
    render() {
        return (
            <div id='homepage' className='homepage'>
                <RouterProvider router={router} />
            </div>
        );
    }
}

const root = ReactDOM.createRoot(document.getElementById("root")); // Ensure you use the correct root ID
root.render(
    <React.StrictMode>
        <HomePage />
    </React.StrictMode>
);

export default HomePage;
