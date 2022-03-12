const nodeSize = 100;

function drawLine(x1, y1, x2, y2) {
    let canvas = document.getElementById("treeCanvas");
    let ctx = canvas.getContext("2d");
    ctx.lineWidth = 5;
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
}

function drawNode(x, y, text, isChar) {
    let img = new Image();
    if (isChar) {
        img.src = '../img/letterNode.png';
    }
    else {
        img.src = '../img/node.png';
    }

    let canvas = document.getElementById("treeCanvas");
    let ctx = canvas.getContext("2d");
    ctx.font = `${.3*nodeSize}px Arial`;
    img.onload = function() {
        ctx.drawImage(img, x-(nodeSize/2), y-(nodeSize/2), nodeSize, nodeSize)
        ctx.textAlign = "center";
        ctx.fillText(text, x, y+(nodeSize/10));
    }
}

function drawTree(tree, level, x, y, spread) {
    if (typeof(tree[0]) != "object") {
        drawNode(x, y, tree[0][0], true);
        return;
    }

    spread = spread/2;
    let levelHeight = 250;

    drawNode(x, y, tree[1], false);
    drawLine(x, y, x + spread, y + levelHeight)
    drawLine(x, y, x - spread, y + levelHeight)
    drawTree(tree[0][0], level + 1, x + spread, y + levelHeight, spread);
    drawTree(tree[0][1], level + 1, x - spread, y + levelHeight, spread);
}