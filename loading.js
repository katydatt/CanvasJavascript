
window.requestAnimFrame = (function(callback) {
    return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame ||
        function(callback) {
            window.setTimeout(callback, 1000 / 60);
        };
})();

var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

var myRec: {
    x: 50,
    y:50,
    width: 100,
    height: 20
}
var render = function() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.beginPath();
    ctx.rect(0, 0, 150, 20);
    ctx.fillStyle="red";
    ctx.fill();
}

render();
