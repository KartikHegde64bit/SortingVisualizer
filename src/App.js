import React, {Component} from 'react';

import Bar from './components/Bar';

import './components/Bar.css'
import './App.css';
class App extends Component {
  	state = {
		array: [],
		arraySteps: [],
		colorKey: [],
		colorSteps: [],
		currentStep: 0,
		count: 10,
		delay: 100,
		algorithm: '',
		timeouts: [],
	};

componentDidMount(){
	this.generteRandomArray();
}

	generateRandomNumber = (min, max) => {
		return Math.floor(Math.random() * (max-min) + min);
	}

	generteRandomArray = () => {
		const count = this.state.count;
		const temp = this.state.array;

		for(let i=0; i < count; i++) {
			temp.push(this.generateRandomNumber(50, 200));
		}
		this.setState({
			array: temp,
			arraySteps: [temp]
		});
	}

	render() {
		let bars = this.state.array.map((value, index) => (
			<Bar 
				key={index} 
				index={index} 
				length={value} 
				color={0}
			/>)
		);
		return (
			<div className='app'>
				<div className='frame'>
					<div className='barsDiv container card'>{bars}</div>
				</div>
				<div className='control-panel'></div>
				<div className='pannel'></div>
			</div>
		)
	}
}

export default App;
