

window.requestAnimFrame = (function(callback) {
    return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame ||
        function(callback) {
            window.setTimeout(callback, 1000 / 60);
        };
})();

var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');


var objectSpeed = 10;

var recTop = {
    x: -300,
    y: 0,
    width: 300,
    height: 20,
    isMoving: true,

};

var recRight = {
    x: 480,
    y: -300,
    width: 20,
    height: 300,
    isMoving:false,

};

var recBottom = {
    x: 500,
    y: 480,
    width: 300,
    height: 20,
    isMoving:false,

};

var recLeft = {
    x: 0,
    y: 500,
    width: 20,
    height: 300,
    isMoving:false,

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


var squareXSpeed = objectSpeed;
var squareYSpeed = objectSpeed;


function animate(myRectangle, canvas, context, startTime) {



    if(recTop.x > canvas.width - recTop.width && !recRight.isMoving){
        //START RIGHT RECTANGLE MOVEMENT
        recRight.y = -recRight.height + recRight.width;
        recRight.isMoving = true;
    }
    if(recTop.x > canvas.width){
        //TOP RECTANGLE HAS LEFT THE STAGE
        recTop.isMoving = false;
    }

    if(recRight.y > canvas.height - recRight.height && !recBottom.isMoving){
        //START BOTTOM RECTANGLE MOVEMENT
        recBottom.x = recBottom.height;
        recBottom.isMoving = true;
    }
    if(recRight.x > canvas.width){
        //BOTTOM RECTANGLE HAS LEFT THE STAGE

        recRight.isMoving = false;
    }

    if(recBottom.x == 0 && !recLeft.isMoving){
        //START LEFT RECTANGLE MOVEMENT
        recLeft.y = recLeft.width;
        recLeft.isMoving = true;
    }
    if(recBottom.x < - recBottom.width){
        //LEFT RECTANGLE HAS LEFT THE STAGE
        recBottom.isMoving = false;
    }

    if(recLeft.y == 0 && !recTop.isMoving){
        //START BOTTOM RECTANGLE MOVEMENT
        recTop.x = recTop.height;
        recTop.isMoving = true;
    }
    if(recLeft.x < - canvas.height){
        //BOTTOM RECTANGLE HAS LEFT THE STAGE
        recLeft.isMoving = false;
    }


    if(recTop.isMoving)recTop.x += objectSpeed;
    if(recRight.isMoving)recRight.y += squareXSpeed;
    if(recBottom.isMoving)recBottom.x -= squareXSpeed;
    if(recLeft.isMoving)recLeft.y -= squareXSpeed;




    // clear
    context.clearRect(0, 0, canvas.width, canvas.height);

    drawRecTop(recTop, context);
    drawRecRight(recRight, context);
    drawRecBottom(recBottom, context);
    drawRecLeft(recLeft, context);


    // request new frame
    requestAnimFrame(function() {
        animate(recTop, canvas, context, startTime);
    });
}






// wait one second before starting animation
setTimeout(function() {
    var startTime = (new Date()).getTime();
    animate(recBottom, canvas, context, startTime);
}, 1000);
