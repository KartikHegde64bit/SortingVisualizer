import { swap } from './helpers';

const insertionSort = (array, position, arraySteps, colorSteps) => {
    let colorKey = colorSteps[colorSteps.length - 1].slice();

    for (let i = 1; i < array.length; i++) {
        let j = i;

        while (j > 0 && array[j - 1] > array[j]) {
            array = swap(array, j, j - 1);

            colorKey[j] = 1;
            colorKey[j - 1] = 1;
            arraySteps.push(array.slice());
            colorSteps.push(colorKey.slice());
            colorKey[j] = 0;
            colorKey[j - 1] = 0;

            j--;
        }
    }

    const sortedKey = new Array(array.length).fill(2);
    arraySteps.push(array.slice());
    colorSteps.push(sortedKey);
};

export default insertionSort;
