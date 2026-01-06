// Swap function
function swap(el1, el2) {
    let temp = el1.innerText;
    el1.innerText = el2.innerText;
    el2.innerText = temp;
}

// Delay function for animations
function wait(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// Bubble Sort
async function bubbleSort() {
    let blocks = document.querySelectorAll(".block");
    for (let i = 0; i < blocks.length - 1; i++) {
        for (let j = 0; j < blocks.length - i - 1; j++) {
            blocks[j].classList.add("swapping");
            blocks[j + 1].classList.add("swapping");
            await wait(100);
            if (parseInt(blocks[j].innerText) > parseInt(blocks[j + 1].innerText)) {
                swap(blocks[j], blocks[j + 1]);
            }
            blocks[j].classList.remove("swapping");
            blocks[j + 1].classList.remove("swapping");
        }
        blocks[blocks.length - i - 1].classList.add("sorted");
    }
}

// Insertion Sort
async function insertionSort() {
    let blocks = document.querySelectorAll(".block");
    for (let i = 1; i < blocks.length; i++) {
        let key = blocks[i].innerText;
        let j = i - 1;
        while (j >= 0 && parseInt(blocks[j].innerText) > parseInt(key)) {
            blocks[j + 1].innerText = blocks[j].innerText;
            j--;
            await wait(100);
        }
        blocks[j + 1].innerText = key;
    }
}

// Selection Sort
async function selectionSort() {
    let blocks = document.querySelectorAll(".block");
    for (let i = 0; i < blocks.length - 1; i++) {
        let minIndex = i;
        for (let j = i + 1; j < blocks.length; j++) {
            if (parseInt(blocks[j].innerText) < parseInt(blocks[minIndex].innerText)) {
                minIndex = j;
            }
        }
        swap(blocks[i], blocks[minIndex]);
        blocks[i].classList.add("sorted");
        await wait(100);
    }
}

// Quick Sort
async function quickSort(left = 0, right = document.querySelectorAll(".block").length - 1) {
    let blocks = document.querySelectorAll(".block");
    if (left < right) {
        let pivotIndex = await partition(blocks, left, right);
        await quickSort(left, pivotIndex - 1);
        await quickSort(pivotIndex + 1, right);
    }
}

async function partition(blocks, left, right) {
    let pivot = parseInt(blocks[right].innerText);
    let i = left - 1;
    for (let j = left; j < right; j++) {
        if (parseInt(blocks[j].innerText) < pivot) {
            i++;
            swap(blocks[i], blocks[j]);
            await wait(100);
        }
    }
    swap(blocks[i + 1], blocks[right]);
    return i + 1;
}

// Merge Sort
async function mergeSort(arr, left, right) {
    if (left >= right) return;
    let mid = Math.floor((left + right) / 2);
    await mergeSort(arr, left, mid);
    await mergeSort(arr, mid + 1, right);
    await merge(arr, left, mid, right);
}

async function merge(arr, left, mid, right) {
    let blocks = document.querySelectorAll(".block");
    let leftArr = [];
    let rightArr = [];
    for (let i = left; i <= mid; i++) leftArr.push(blocks[i].innerText);
    for (let i = mid + 1; i <= right; i++) rightArr.push(blocks[i].innerText);
    
    let i = 0, j = 0, k = left;
    while (i < leftArr.length && j < rightArr.length) {
        if (parseInt(leftArr[i]) < parseInt(rightArr[j])) {
            blocks[k++].innerText = leftArr[i++];
        } else {
            blocks[k++].innerText = rightArr[j++];
        }
        await wait(100);
    }
    while (i < leftArr.length) blocks[k++].innerText = leftArr[i++];
    while (j < rightArr.length) blocks[k++].innerText = rightArr[j++];
}

// Radix Sort
async function radixSort() {
    let blocks = document.querySelectorAll(".block");
    let maxNum = Math.max(...Array.from(blocks, block => parseInt(block.innerText)));
    let exp = 1;
    while (maxNum / exp > 1) {
        await countingSort(blocks, exp);
        exp *= 10;
    }
}

async function countingSort(blocks, exp) {
    let output = new Array(blocks.length).fill(0);
    let count = new Array(10).fill(0);

    for (let i = 0; i < blocks.length; i++) {
        let index = Math.floor(parseInt(blocks[i].innerText) / exp) % 10;
        count[index]++;
    }
    
    for (let i = 1; i < 10; i++) count[i] += count[i - 1];

    for (let i = blocks.length - 1; i >= 0; i--) {
        let index = Math.floor(parseInt(blocks[i].innerText) / exp) % 10;
        output[count[index] - 1] = blocks[i].innerText;
        count[index]--;
    }

    for (let i = 0; i < blocks.length; i++) {
        blocks[i].innerText = output[i];
        await wait(100);
    }
}

// Bucket Sort
async function bucketSort() {
    let blocks = document.querySelectorAll(".block");
    let bucketCount = Math.ceil(Math.sqrt(blocks.length));
    let buckets = Array.from({ length: bucketCount }, () => []);

    // Distribute elements into buckets
    let maxVal = Math.max(...Array.from(blocks, block => parseInt(block.innerText)));
    for (let block of blocks) {
        let value = parseInt(block.innerText);
        let index = Math.floor((value / maxVal) * (bucketCount - 1));
        buckets[index].push(value);
    }

    // Sort individual buckets
    for (let bucket of buckets) {
        bucket.sort((a, b) => a - b);
    }

    // Reassemble sorted values
    let index = 0;
    for (let bucket of buckets) {
        for (let value of bucket) {
            blocks[index].innerText = value;
            await wait(100);
            index++;
        }
    }
}

function generateNewArray(size = 20) {
    const arrayContainer = document.getElementById("array-container");
    arrayContainer.innerHTML = ""; // Clear previous blocks

    let newArray = [];
    for (let i = 0; i < size; i++) {
        newArray.push(Math.floor(Math.random() * 100) + 1);
    }

    // Display the blocks with numbers
    newArray.forEach(value => {
        const block = document.createElement("div");
        block.classList.add("block");
        block.innerText = value;
        arrayContainer.appendChild(block);
    });

    console.log("New array generated:", newArray);
}

// Export functions
export { bubbleSort, insertionSort, selectionSort, quickSort, mergeSort, radixSort, bucketSort ,generateNewArray };