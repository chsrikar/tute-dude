var start = new Date().getTime();

function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function move() {
    var left = Math.random() * 300;
    var top = Math.random() * 300;
    var wh = ((Math.random() * 400) + 100);

    var shape = document.getElementById("shape");

    shape.style.left = left + "px";
    shape.style.top = top + "px";
    shape.style.width = wh + "px";
    shape.style.height = wh + "px";
    shape.style.backgroundColor = getRandomColor();
    shape.style.display = "block";

    start = new Date().getTime();
}

// Wait for DOM to be ready
window.onload = function () {
    move();

    document.getElementById("shape").onclick = function () {
        document.getElementById("shape").style.display = "none";
        var end = new Date().getTime();
        var timeTaken = (end - start) / 1000;
        alert("Reaction Time: " + timeTaken + " seconds");
        move();
    };
};