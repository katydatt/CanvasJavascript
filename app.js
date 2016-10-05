

window.requestAnimFrame = (function(callback) {
    return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame ||
        function(callback) {
            window.setTimeout(callback, 1000 / 60);
        };
})();

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
    // update
    recTop.x ++;
    recRight.y ++;
    recBottom.x -- ;
    recLeft.y --;

    // clear
    context.clearRect(0, 0, canvas.width, canvas.height);

    drawRecTop(recTop, context);
    drawRecRight(recRight, context);
    drawRecBottom(recBottom, context);
    drawRecLeft(recLeft, context);


    // request new frame
    requestAnimFrame(function() {
        animate(myRectangle, canvas, context, startTime);
    });
}



var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');

var recTop = {
    x: -180,
    y: 0,
    width: 150,
    height: 20
};

var recRight = {
    x: 480,
    y: 0,
    width: 20,
    height: 150
};

var recBottom = {
    x: 480,
    y: 480,
    width: 150,
    height: 20
};

var recLeft = {
    x: 0,
    y: 480,
    width: 20,
    height: 150
};



// wait one second before starting animation
setTimeout(function() {
    var startTime = (new Date()).getTime();
    animate(recTop, canvas, context, startTime);
}, 2000);
