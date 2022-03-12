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
    ctx.font = "30px Arial";
    img.onload = function() {
        ctx.drawImage(img, x-50, y-50, 100, 100)
        ctx.textAlign = "center";
        ctx.fillText(text, x, y+10);
    }
}