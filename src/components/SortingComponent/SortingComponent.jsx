import React, { Component } from 'react';

// Algorithms
import BubbleSort from '../../algorithms/BS';
import InsertionSort from '../../algorithms/insertionSort';
import SelectionSort from '../../algorithms/selectionSort';
import MergeSort from '../../algorithms/mergeSort';
import QuickSort from '../../algorithms/quickSort';
import HeapSort from '../../algorithms/heapSort';

// Icons
import PlayIcon from '@material-ui/icons/PlayCircleOutlineRounded';
import ForwardIcon from '@material-ui/icons/SkipNextRounded';
import BackwardIcon from '@material-ui/icons/SkipPreviousRounded';
import ResetIcon from '@material-ui/icons/RotateLeft';

// Other Components
import Bar from '../Bar/Bar';
import './SortingComponent.css';

class SortingComponent extends Component {
    state = {
        array: [],
        arraySteps: [],
        colorKey: [],
        colorSteps: [],
        currentStep: 0,
        count: 20,
        delay: 500,
        algorithm: 'Bubble Sort',
        timeouts: [],
    };

    ALGORITHMS = {
        'Bubble Sort': BubbleSort,
        'Selection Sort': SelectionSort,
        'Insertion Sort': InsertionSort,
        'Merge Sort': MergeSort,
        'Quick Sort': QuickSort,
        'Heap Sort': HeapSort,
    };

    componentDidMount() {
        this.generateRandomArray();
    }

    generateSteps = () => {
        const arrayCopy = [...this.state.array];
        const steps = [...this.state.arraySteps];
        const colorSteps = [...this.state.colorSteps];

        const algorithmFn = this.ALGORITHMS[this.state.algorithm];
        if (!algorithmFn) {
            return;
        }

        algorithmFn(arrayCopy, 0, steps, colorSteps);

        this.setState({
            arraySteps: steps,
            colorSteps: colorSteps,
        });
    };

    clearTimeouts = () => {
        this.state.timeouts.forEach((timeout) => clearTimeout(timeout));
        this.setState({ timeouts: [] });
    };

    clearColorKey = () => {
        const blankKey = Array(this.state.count).fill(0);
        this.setState({
            colorKey: blankKey,
            colorSteps: [blankKey],
        });
    };

    handleAlgorithmChange = (event) => {
        const algorithm = event.target.value;
        const blankKey = Array(this.state.count).fill(0);

        this.clearTimeouts();
        this.setState(
            (prevState) => ({
                algorithm,
                colorKey: blankKey,
                colorSteps: [blankKey],
                arraySteps: [prevState.array],
                currentStep: 0,
            }),
            this.generateSteps
        );
    };

    generateRandomNumber = (min, max) => Math.floor(Math.random() * (max - min) + min);

    generateRandomArray = () => {
        this.clearTimeouts();
        this.clearColorKey();

        const randomArray = Array.from({ length: this.state.count }, () =>
            this.generateRandomNumber(50, 200)
        );

        this.setState(
            {
                array: randomArray,
                arraySteps: [randomArray],
                currentStep: 0,
            },
            this.generateSteps
        );
    };

    changeArray = (index, value) => {
        const updatedArray = [...this.state.array];
        updatedArray[index] = value;

        this.setState(
            {
                array: updatedArray,
                arraySteps: [updatedArray],
                currentStep: 0,
            },
            this.generateSteps
        );
    };

    previousStep = () => {
        if (this.state.currentStep > 0) {
            this.setState((prevState) => ({
                currentStep: prevState.currentStep - 1,
                array: prevState.arraySteps[prevState.currentStep - 1],
                colorKey: prevState.colorSteps[prevState.currentStep - 1],
            }));
        }
    };

    nextStep = () => {
        if (this.state.currentStep < this.state.arraySteps.length - 1) {
            this.setState((prevState) => ({
                currentStep: prevState.currentStep + 1,
                array: prevState.arraySteps[prevState.currentStep + 1],
                colorKey: prevState.colorSteps[prevState.currentStep + 1],
            }));
        }
    };

    start = () => {
        this.clearTimeouts();

        const { arraySteps, colorSteps, currentStep, delay } = this.state;
        const timeouts = [];

        arraySteps.slice(currentStep).forEach((_, index) => {
            const timeout = setTimeout(() => {
                this.setState((prevState) => ({
                    currentStep: prevState.currentStep + 1,
                    array: arraySteps[prevState.currentStep + 1],
                    colorKey: colorSteps[prevState.currentStep + 1],
                }));
            }, delay * index);

            timeouts.push(timeout);
        });

        this.setState({ timeouts });
    };

    render() {
        const { array, colorKey, arraySteps, currentStep, algorithm } = this.state;

        const bars = array.map((value, index) => (
            <Bar
                key={index}
                index={index}
                length={value}
                color={colorKey[index]}
                changeArray={this.changeArray}
            />
        ));

        const playButton =
            currentStep === arraySteps.length ? (
                <button className="controller" onClick={this.generateRandomArray}>
                    <ResetIcon />
                </button>
            ) : (
                <button className="controller" onClick={this.start}>
                    <PlayIcon />
                </button>
            );

        return (
            <div className="sortingcomponent">
                <div className="parent">
                    <div className="sort-selection">
                        <h3>Sorting Algorithms</h3>
                        <select value={algorithm} onChange={this.handleAlgorithmChange}>
                            {Object.keys(this.ALGORITHMS).map((algo) => (
                                <option key={algo} value={algo}>
                                    {algo}
                                </option>
                            ))}
                        </select>
                        <button className="generate-button" onClick={this.generateRandomArray}>
                            New Array
                        </button>
                        <div className="step-counter">
                            Step {currentStep + 1} / {arraySteps.length}
                        </div>
                    </div>
                    <div>
                        <div className="frame">
                            <div className="barsDiv container card">{bars}</div>
                        </div>
                        <div className="control-panel">
                            <div className="control-buttons">
                                <button className="controller" onClick={this.previousStep}>
                                    <BackwardIcon />
                                </button>
                                {playButton}
                                <button className="controller" onClick={this.nextStep}>
                                    <ForwardIcon />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default SortingComponent;
