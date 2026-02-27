import { swap } from './helpers';

const quickSort = (array, position, arraySteps, colorSteps) => {
    const partition = (arr, low, high) => {
        const pivot = arr[high];
        let i = low;

        for (let j = low; j < high; j++) {
            const colorKey = colorSteps[colorSteps.length - 1].slice();
            colorKey[high] = 1;
            colorKey[j] = 1;
            arraySteps.push(arr.slice());
            colorSteps.push(colorKey.slice());

            if (arr[j] < pivot) {
                arr = swap(arr, i, j);
                const swapKey = colorSteps[colorSteps.length - 1].slice();
                swapKey[i] = 1;
                swapKey[j] = 1;
                arraySteps.push(arr.slice());
                colorSteps.push(swapKey.slice());
                i++;
            }
        }

        arr = swap(arr, i, high);
        const partitionKey = colorSteps[colorSteps.length - 1].slice();
        partitionKey[i] = 2;
        arraySteps.push(arr.slice());
        colorSteps.push(partitionKey.slice());

        return i;
    };

    const sort = (arr, low, high) => {
        if (low < high) {
            const pivotIndex = partition(arr, low, high);
            sort(arr, low, pivotIndex - 1);
            sort(arr, pivotIndex + 1, high);
        }
    };

    sort(array, 0, array.length - 1);

    const sortedKey = new Array(array.length).fill(2);
    arraySteps.push(array.slice());
    colorSteps.push(sortedKey);
};

export default quickSort;
