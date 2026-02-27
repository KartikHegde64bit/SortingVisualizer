import { swap } from './helpers';

const heapSort = (array, position, arraySteps, colorSteps) => {
    const heapify = (n, i) => {
        let largest = i;
        const left = 2 * i + 1;
        const right = 2 * i + 2;

        if (left < n && array[left] > array[largest]) {
            largest = left;
        }

        if (right < n && array[right] > array[largest]) {
            largest = right;
        }

        if (largest !== i) {
            array = swap(array, i, largest);
            const colorKey = colorSteps[colorSteps.length - 1].slice();
            colorKey[i] = 1;
            colorKey[largest] = 1;
            arraySteps.push(array.slice());
            colorSteps.push(colorKey.slice());
            heapify(n, largest);
        }
    };

    const n = array.length;

    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
        heapify(n, i);
    }

    for (let end = n - 1; end > 0; end--) {
        array = swap(array, 0, end);
        const sortedKey = colorSteps[colorSteps.length - 1].slice();
        sortedKey[end] = 2;
        arraySteps.push(array.slice());
        colorSteps.push(sortedKey.slice());
        heapify(end, 0);
    }

    const finalKey = new Array(array.length).fill(2);
    arraySteps.push(array.slice());
    colorSteps.push(finalKey);
};

export default heapSort;
