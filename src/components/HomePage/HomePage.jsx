import React from 'react';

import './HomePage.css';
import UxBoard from '../UxBoard/UxBoard';
import SortingComponent from '../SortingComponent/SortingComponent';
import GettingStarted from '../GettingStarted/GettingStarted';

import { BrowserRouter, Routes, Route, useLocation, useNavigate } from "react-router-dom";

const Header = ({ theme, onToggleTheme }) => {
    const location = useLocation();
    const navigate = useNavigate();

    const isSortingPage = location.pathname === '/sortAlgorithms';
    const isGraphPage = location.pathname === '/graphAlgorithms';
    const showHome = isSortingPage || isGraphPage;

    let title = 'Sorting Visualizer';
    if (isGraphPage) {
        title = 'Graph Traversal Visualizer';
    }

    return (
        <header className="app-header">
            <div className="header-left">
                {showHome ? (
                    <button className="header-home" onClick={() => navigate('/')}>Home</button>
                ) : null}
                <div className="brand">{title}</div>
            </div>
            <div className="header-actions">
                <span className="theme-label">{theme === 'light' ? 'Light' : 'Dark'} mode</span>
                <button className="theme-toggle" onClick={onToggleTheme}>
                    {theme === 'light' ? '🌙' : '☀️'}
                </button>
            </div>
        </header>
    );
};

const HomePage = ({ theme, onToggleTheme }) => {
    return (
        <BrowserRouter>
            <div id='homepage' className='homepage'>
                <Header theme={theme} onToggleTheme={onToggleTheme} />
                <main className="app-content">
                    <Routes>
                        <Route path="/" element={<GettingStarted />} />
                        <Route path="/sortAlgorithms" element={<SortingComponent />} />
                        <Route path="/graphAlgorithms" element={<UxBoard />} />
                    </Routes>
                </main>
            </div>
        </BrowserRouter>
    );
};

export default HomePage;
