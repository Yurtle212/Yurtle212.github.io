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

function encodeHuffmanTree(frequencyChart) {
    //Sort the frequency chart by frequency of each letter's appearence
    let sortedFChart = Object.entries(frequencyChart).sort((a, b) => a[1] - b[1]);

    while (sortedFChart.length > 2) {
        // Merge bottom 2 values then sort it back into the array
        sortedFChart[0] = [[sortedFChart[0], sortedFChart[1]], sortedFChart[0][1] + sortedFChart[1][1]];
        sortedFChart.splice(1, 1);
        sortedFChart = sortedFChart.sort(compareSecondColumn);
    }

    // Merge final 2 values so decoding will work correctly in this implementation.
    sortedFChart = [[sortedFChart[0], sortedFChart[1]], sortedFChart[0][1] + sortedFChart[1][1]];
    sortedFChart = sortedFChart.sort(compareSecondColumn);
    return sortedFChart;
}

function decodeHuffmanTree(bin, hTree) {
    let currentPosition = hTree;
    let dir = 0;
    let output = "";
    bin = bin.split("").reverse().join("");

    while (bin.length > 0) {
        //Get the direction to go
        dir = parseInt(bin[bin.length-1]);
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