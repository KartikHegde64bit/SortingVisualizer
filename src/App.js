import React, {Component} from 'react';

import Bar from './components/Bar';

import './components/Bar.css'
import './App.css';

import BubbleSort from './algorithms/BS';

import Play from '@material-ui/icons/PlayCircleOutlineRounded';
import Forwards from '@material-ui/icons/SkipNextRounded';
import Backward from '@material-ui/icons/SkipPreviousRounded';
import RotateLeft from '@material-ui/icons/RotateLeft';

class App extends Component {
  	state = {
		array: [],
		arraySteps: [],
		colorKey: [],
		colorSteps: [],
		currentStep: 0,
		count: 10,
		delay: 100,
		algorithm: 'Bubble Sort',
		timeouts: [],
	};
	ALGORITHMS = {
		'Bubble Sort': BubbleSort
	}

componentDidMount(){
	this.generteRandomArray();
}

	generateRandomNumber = (min, max) => {
		return Math.floor(Math.random() * (max-min) + min);
	}

	clearTimeouts = () => {
		this.state.timeouts.forEach((timeout) => this.clearTimeouts(timeout) );
		this.setState({
			timeouts: []
		});
	}
	
	clearColorKey = () => {
		let blankKey = new Array(this.state.count).fill(0);
		this.setState({
			colorKey: blankKey,
			colorSteps: [blankKey]
		})
	}

	generteRandomArray = () => {
		this.clearTimeouts();
		this.clearColorKey();
		const count = this.state.count;
		const temp = this.state.array;

		for(let i=0; i < count; i++) {
			temp.push(this.generateRandomNumber(50, 200));
		}
		this.setState({
			array: temp,
			arraySteps: [temp],
			currentStep: 0
		});
	};

	generateSteps = () => {
		let array = this.state.array.slice();
		let steps = this.state.array.slice();
		let colorSteps = this.state.colorSteps.slice();

		this.ALGORITHMS[this.state.algorithm](array, 0, steps, colorSteps);
		this.setState({
			arraySteps: steps,
			colorSteps: colorSteps
		})
	}

	changeArray = (index, value) => {
		let arr = this.state.array;
		arr[index] = value;
		this.setState({
			array: arr,
			arraySteps: [arr],
			currentStep: 0
		}, ()=>{
			this.generateSteps();
		});
	}

	start = () => {
		let steps = this.state.arraySteps;
		let colorSteps = this.state.colorSteps;

		this.clearTimeouts();

		let timeouts = [];
		let i = 0;
		while(i < steps.length - this.state.currentStep) {
			let timeout = setTimeout( ()=> {
				let currentStep = this.state.currentStep;
				this.setState({
					array: steps[currentStep],
					colorKey: colorSteps[currentStep],
					currentStep: currentStep + 1,
				});
				timeouts.push(timeout);
			}, this.state.delay*i);
			i++;
		}
		this.setState({
			timeouts: timeouts
		})
	}

	render() {
		let bars = this.state.array.map((value, index) => (
			<Bar 
				key={index} 
				index={index} 
				length={value} 
				color={0}
				changeArray={this.changeArray}
			/>)
		);

		let playButton;
		if(this.state.arraySteps.length === this.state.currentStep) {
			playButton = (
				<button className='controller'>
					<RotateLeft/>
				</button>
			)
		} else {
			playButton = (
				<button className='controller' onClick={this.start}>
					<Play/>
				</button>
			)
		}
		return (
			<div className='app'>
				<div className='frame'>
					<div className='barsDiv container card'>{bars}</div>
				</div>
				<div className='control-panel'>
					<div className='control-buttons'>
						<button className='controller'>
							<Backward/>
						</button>
						{playButton}
						<button className='controller'>
							<Forwards/>
						</button>
					</div>
				</div>
				<div className='pannel'></div>
			</div>
		)
	}
}

export default App;
