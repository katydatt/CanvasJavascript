

window.requestAnimFrame = (function(callback) {
    return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame ||
        function(callback) {
            window.setTimeout(callback, 1000 / 60);
        };
})();

var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');


var objectSpeed = 8;

var snakeWidth = 20;

var recTop = {
    x: -300,
    y: 0,
    width: 300,
    height: snakeWidth,
    isMoving: true

};

var recRight = {
    x: 480,
    y: -480,
    width: snakeWidth,
    height: 300,
    isMoving:false

};

var recBottom = {
    x: 500,
    y: 480,
    width: 300,
    height: snakeWidth,
    isMoving:false

};

var recLeft = {
    x: 0,
    y: 500,
    width: snakeWidth,
    height: 300,
    isMoving:false

};

function drawRecTop(recTop, context) {
    context.beginPath();
    context.rect(recTop.x, recTop.y, recTop.width, recTop.height);
    context.fillStyle = '#FB0202';
    context.fill();

}


function drawRecRight(recRight, context) {
    context.beginPath();
    context.rect(recRight.x , recRight.y , recRight.width, recRight.height);
    context.fillStyle = '#FB0202';
    context.fill();

}

function drawRecBottom(recBottom, context) {
    context.beginPath();
    context.rect(recBottom.x , recBottom.y , recBottom.width, recBottom.height);
    context.fillStyle = '#FB0202';
    context.fill();

}

function drawRecLeft(recLeft, context) {
    context.beginPath();
    context.rect(recLeft.x , recLeft.y , recLeft.width, recLeft.height);
    context.fillStyle = '#FB0202';
    context.fill();

}

function animate(myRectangle, canvas, context, startTime) {


    if(recTop.isMoving){
        if(recTop.x > canvas.width - recTop.width && !recRight.isMoving){
            //START RIGHT RECTANGLE MOVEMENT
            recRight.isMoving = true;
            recRight.y = - recRight.height + recRight.width;

        } else if(recTop.x >= canvas.width){
            recTop.isMoving = false;
        }
    } else {
        recTop.x = -recTop.width;
    }

    if(recRight.isMoving){
        if(recRight.y > canvas.height - recRight.height && !recBottom.isMoving){
            //START RIGHT RECTANGLE MOVEMENT
            recBottom.isMoving = true;
            recBottom.x = canvas.width - recBottom.height;

        } else if(recRight.y >= canvas.height ){
            recRight.isMoving = false;
        }
    } else {
        recRight.y = -recRight.height;
    }

    if(recBottom.isMoving){
        if(recBottom.x < 0 && !recLeft.isMoving){
            //START RIGHT RECTANGLE MOVEMENT
            recLeft.isMoving = true;
            recLeft.y = canvas.height - recLeft.width;

        } else if(recBottom.x < -recBottom.width){
            recBottom.isMoving = false;
        }
    } else {
        recBottom.x = canvas.width;
    }

    if(recLeft.isMoving){
        if(recLeft.y < 0 && !recTop.isMoving){
            //START RIGHT RECTANGLE MOVEMENT
            recTop.isMoving = true;
            recTop.x = -recTop.width + recTop.height;

        } else if(recLeft.y <= -recLeft.height){
            recLeft.isMoving = false;
        }
    } else {
        recLeft.y = canvas.height;
    }

    if(recTop.isMoving)recTop.x += objectSpeed;
    if(recRight.isMoving)recRight.y += objectSpeed;
    if(recBottom.isMoving)recBottom.x -= objectSpeed;
    if(recLeft.isMoving)recLeft.y -= objectSpeed;


    //


    // clear
    context.clearRect(0, 0, canvas.width, canvas.height);

    drawRecTop(recTop, context);
    drawRecRight(recRight, context);
    drawRecBottom(recBottom, context);
    drawRecLeft(recLeft, context);


    // request new frame
    requestAnimFrame(function() {
        animate(recLeft, canvas, context, startTime);
    });

}



// wait one second before starting animation
setTimeout(function() {
    var startTime = (new Date()).getTime();
    animate(recBottom, canvas, context, startTime);
}, 1000);
