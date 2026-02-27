import React, { Component } from 'react';
//CSS
import './App.css';

import HomePage from './components/HomePage/HomePage';

class App extends Component {
	state = {
		theme: 'light',
	};

	componentDidMount() {
		this.applyTheme();
	}

	componentDidUpdate(_, prevState) {
		if (prevState.theme !== this.state.theme) {
			this.applyTheme();
		}
	}

	applyTheme = () => {
		document.documentElement.setAttribute('data-theme', this.state.theme);
	};

	toggleTheme = () => {
		this.setState((prev) => ({ theme: prev.theme === 'light' ? 'dark' : 'light' }));
	};

	render() {
		return (
			<div className="app-shell">
				<HomePage theme={this.state.theme} onToggleTheme={this.toggleTheme} />
			</div>
		);
	}
}

export default App;