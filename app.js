

window.requestAnimFrame = (function(callback) {
    return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame ||
        function(callback) {
            window.setTimeout(callback, 1000 / 60);
        };
})();

var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');

var objectSpeed = 1;

var recTop = {
    x: -180,
    y: 0,
    width: 200,
    height: 20,
    isMoving: false,
    speed: objectSpeed
};

var recRight = {
    x: 480,
    y: -130,
    width: 20,
    height: 200,
    isMoving:false,
    speed: -objectSpeed
};

var recBottom = {
    x: 480,
    y: 480,
    width: 200,
    height: 20,
    isMoving:false,
    speed: -objectSpeed
};

var recLeft = {
    x: 0,
    y: 480,
    width: 20,
    height: 200,
    isMoving:false,
    speed: objectSpeed
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



    if(recTop.x < 0){
        recTop.x = 0;
        squareXSpeed = objectSpeed;
    } else if(recTop.x > canvas.width-recTop.width){
        recTop.x = canvas.width-recTop.width;
        squareXSpeed = -objectSpeed;
    }

    recTop.x += squareXSpeed;
    //
    if(recRight.y < 0){
        recRight.y = 0;
        squareYSpeed = objectSpeed;
    } else if(recRight.y > canvas.height-recRight.height){
        recRight.y = canvas.height-recRight.height;
        squareYSpeed = -objectSpeed;
    }

    recRight.y += squareYSpeed;

    // if(recBottom.x = canvas.width){
    //     recBottom.x = canvas.width;
    //     squareXSpeed = objectSpeed;
    // } else if(recBottom.x < canvas.width-recBottom.width){
    //     recBottom.x = canvas.width-recBottom.width;
    //     squareXSpeed = -objectSpeed
    // }
    //
    // recBottom.x -= squareXSpeed;
    //
    // if(recLeft.y < 0){
    //     recLeft.y = 0;
    //     squareYSpeed = speed;
    // } else if(recLeft.y > canvas.height-recLeft.height){
    //     recLeft.y = canvas.height-recLeft.height;
    //     squareYSpeed = -speed;
    // }
    //
    // recLeft.y += squareYSpeed;


    // clear
    context.clearRect(0, 0, canvas.width, canvas.height);

    drawRecTop(recTop, context);
    drawRecRight(recRight, context);
    // drawRecBottom(recBottom, context);
    // drawRecLeft(recLeft, context);


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
