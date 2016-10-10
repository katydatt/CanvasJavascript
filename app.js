

window.requestAnimFrame = (function(callback) {
    return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame ||
        function(callback) {
            window.setTimeout(callback, 1000 / 60);
        };
})();

var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");



var objectSpeed = 8;

var snakeWidth = 20;
var snakeHeight = 300;
var maxWidth = canvas.width;
var maxHeight = canvas.height;

var recTop = {
    x: -snakeHeight,
    y: 0,
    width: snakeHeight,
    height: snakeWidth,
    isMoving: true

};

var recRight = {
    x: (maxWidth - snakeWidth),
    y: -(maxWidth - snakeWidth),
    width: snakeWidth,
    height: snakeHeight,
    isMoving:false

};

var recBottom = {
    x: maxWidth,
    y: (maxWidth - snakeWidth),
    width: snakeHeight,
    height: snakeWidth,
    isMoving:false

};

var recLeft = {
    x: 0,
    y: maxWidth,
    width: snakeWidth,
    height: snakeHeight,
    isMoving:false

};

var snake = [recTop, recRight, recBottom, recLeft];

// Drawing the snake

function drawSnake(snake, context) {

    drawCanvas.start();

    for (var i = 0 ; i < snake.length ; i ++) {
        ctx.beginPath();
        ctx.rect(snake[i].x, snake[i].y, snake[i].width, snake[i].height);
        ctx.fillStyle = "#f44242";
        ctx.fill();
    }
}

// Animate the snake

function animate(myRectangle, canvas, context, startTime) {

    if(recTop.isMoving){
        if(recTop.x > maxWidth - snakeHeight && !recRight.isMoving){
            //START RIGHT RECTANGLE MOVEMENT
            recRight.isMoving = true;
            recRight.y = - snakeHeight + snakeWidth;

        } else if(recTop.x >= maxWidth){
            recTop.isMoving = false;
        }
    } else {
        recTop.x = -snakeHeight;
    }

    if(recRight.isMoving){
        if(recRight.y > maxHeight - snakeHeight && !recBottom.isMoving){
            //START BOTTOM RECTANGLE MOVEMENT
            recBottom.isMoving = true;
            recBottom.x = maxWidth - snakeWidth;

        } else if(recRight.y >= maxHeight ){
            recRight.isMoving = false;
        }
    } else {
        recRight.y = -snakeHeight;

    }

    if(recBottom.isMoving){
        if(recBottom.x < 0 && !recLeft.isMoving){
            //START LEFT RECTANGLE MOVEMENT
            recLeft.isMoving = true;
            recLeft.y = maxHeight - snakeWidth;

        } else if(recBottom.x < -snakeHeight){
            recBottom.isMoving = false;
        }
    } else {
        recBottom.x = maxWidth;
    }

    if(recLeft.isMoving){
        if(recLeft.y < 0 && !recTop.isMoving){
            //START TOP RECTANGLE MOVEMENT
            recTop.isMoving = true;
            recTop.x = -snakeHeight + snakeWidth;

        } else if(recLeft.y <= -snakeHeight){
            recLeft.isMoving = false;
        }
    } else {
        recLeft.y = maxHeight;
    }

    if(recTop.isMoving)recTop.x += objectSpeed;
    if(recRight.isMoving)recRight.y += objectSpeed;
    if(recBottom.isMoving)recBottom.x -= objectSpeed;
    if(recLeft.isMoving)recLeft.y -= objectSpeed;



    // clear
    ctx.clearRect(0, 0, maxWidth, maxHeight);


    drawSnake(snake, ctx);


    // request new frame
    requestAnimFrame(function() {
        animate(snake, canvas, ctx, startTime);
    });

}



// wait one second before starting animation
setTimeout(function() {
    var startTime = (new Date()).getTime();
    animate(snake, canvas, ctx, startTime);
}, 1000);
