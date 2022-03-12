function getCharFrequency(string) {
    let frequencyChart = {}

    // Go through each character in a string and find their frequencies
    for (let i = 0; i < string.length; ++i) {
        if (string[i] in frequencyChart) {
            frequencyChart[string[i]]++;
        }
        else {
            frequencyChart[string[i]] = 1;
        }
    }
    return frequencyChart;
}

function encodeHuffmanTree(string) {
    //Sort the frequency chart by frequency of each letter's appearence
    let frequencyChart = getCharFrequency(string);
    let sortedFChart = Object.entries(frequencyChart).sort((a, b) => a[1] - b[1]);
    let pathChart = {};

    while (sortedFChart.length > 2) {
        // Update encoding table so it can be decoded later
        let leftChars = getAllCharsFromTree(sortedFChart[0]);
        let rightChars = getAllCharsFromTree(sortedFChart[1]);
        pathChart = updatePath(pathChart, leftChars, rightChars);

        // Merge bottom 2 values then sort it back into the array
        sortedFChart[0] = [[sortedFChart[0], sortedFChart[1]], sortedFChart[0][1] + sortedFChart[1][1]];
        sortedFChart.splice(1, 1);
        sortedFChart = sortedFChart.sort(compareSecondColumn);
    }

    let leftChars = getAllCharsFromTree(sortedFChart[0]);
    let rightChars = getAllCharsFromTree(sortedFChart[1]);
    pathChart = updatePath(pathChart, leftChars, rightChars);

    // Merge final 2 values so decoding will work correctly in this implementation.
    sortedFChart = [[sortedFChart[0], sortedFChart[1]], sortedFChart[0][1] + sortedFChart[1][1]];

    sortedFChart = sortedFChart.sort(compareSecondColumn);
    return {tree: sortedFChart, path: pathChart, encoded: getCodedText(string, pathChart), stringTree: JSON.stringify(sortedFChart)};
}

function getCodedText(normal, path) {
    let output = ""
    for (let i = 0; i < normal.length; i++) {
        output += path[normal[i]];
    }
    return output;
}

function insertChar(str, index, value) {
    return str.substr(0, index) + value + str.substr(index);
}

function updatePath(pathChart, leftChars, rightChars) {
    // Update the path for each character in the tree

    for (let i = 0; i < leftChars.length; i++) {
        if (leftChars[i] in pathChart) {
            pathChart[leftChars[i]] = "1" + pathChart[leftChars[i]];
        }
        else {
            pathChart[leftChars[i]] = "1";
        }
    }

    for (let i = 0; i < rightChars.length; i++) {
        if (rightChars[i] in pathChart) {
            pathChart[rightChars[i]] = "0" + pathChart[rightChars[i]];
        }
        else {
            pathChart[rightChars[i]] = "0";
        }
    }
    return pathChart;
}

function getAllCharsFromTree(tree) {
    //Get all the characters contained within a branch of the tree recursively

    if (typeof(tree[0]) != "object") {
        return tree[0];
    }

    let chars = "";
    chars += getAllCharsFromTree(tree[0][0]);
    chars += getAllCharsFromTree(tree[0][1]);
    return chars;
}

function decodeHuffmanTree(bin, hTree) {
    let currentPosition = hTree;
    let dir = 0;
    let output = "";
    bin = bin.split("").reverse().join("");

    while (bin.length > 0) {
        //Get the direction to go
        dir = +!parseInt(bin[bin.length-1]); // Need to flip the bit because I am dumb
        bin = bin.substring(0, bin.length - 1);

        //Get the next node in the tree
        currentPosition = currentPosition[0][dir];

        //Check if it's an endpoint, if it is, add it to the output.
        if (typeof(currentPosition[0]) != "object") {
            output += currentPosition[0];
            currentPosition = hTree;
        }
    }
    return output;
}

function compareSecondColumn(a, b) {
    if (a[1] === b[1]) {
        return 0;
    }
    else {
        return (a[1] < b[1]) ? -1 : 1;
    }
}