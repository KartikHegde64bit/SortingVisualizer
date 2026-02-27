const mergeSort = (array, position, arraySteps, colorSteps) => {
    const merge = (arr, start, mid, end) => {
        const left = arr.slice(start, mid + 1);
        const right = arr.slice(mid + 1, end + 1);

        let i = 0;
        let j = 0;
        let k = start;

        while (i < left.length && j < right.length) {
            if (left[i] <= right[j]) {
                arr[k] = left[i];
                i++;
            } else {
                arr[k] = right[j];
                j++;
            }

            const colorKey = colorSteps[colorSteps.length - 1].slice();
            colorKey[k] = 1;
            arraySteps.push(arr.slice());
            colorSteps.push(colorKey);
            k++;
        }

        while (i < left.length) {
            arr[k] = left[i];
            i++;
            const colorKey = colorSteps[colorSteps.length - 1].slice();
            colorKey[k] = 1;
            arraySteps.push(arr.slice());
            colorSteps.push(colorKey);
            k++;
        }

        while (j < right.length) {
            arr[k] = right[j];
            j++;
            const colorKey = colorSteps[colorSteps.length - 1].slice();
            colorKey[k] = 1;
            arraySteps.push(arr.slice());
            colorSteps.push(colorKey);
            k++;
        }

        const sortedKey = colorSteps[colorSteps.length - 1].slice();
        for (let idx = start; idx <= end; idx++) {
            sortedKey[idx] = 2;
        }
        arraySteps.push(arr.slice());
        colorSteps.push(sortedKey);
    };

    const divide = (arr, start, end) => {
        if (start >= end) return;

        const mid = Math.floor((start + end) / 2);
        divide(arr, start, mid);
        divide(arr, mid + 1, end);
        merge(arr, start, mid, end);
    };

    divide(array, 0, array.length - 1);

    const finishedKey = new Array(array.length).fill(2);
    arraySteps.push(array.slice());
    colorSteps.push(finishedKey);
};

export default mergeSort;
