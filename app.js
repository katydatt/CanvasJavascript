

window.requestAnimFrame = (function(callback) {
    return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame ||
        function(callback) {
            window.setTimeout(callback, 1000 / 60);
        };
})();

function drawRectangle(myRectangle, context) {
    context.beginPath();
    context.rect(myRectangle.x, myRectangle.y, myRectangle.width, myRectangle.height);
    context.fillStyle = '#FB0202';
    context.fill();

}

function animateUp(myRectangle, canvas, context, startTime) {
    // update
    myRectangle.x ++;

    if (myRectangle.x == (canvas.width - 25)) {
        for (var i = 0; i < (canvas.height - 20) ; i++) {
            myRectangle.y ++;
            // console.log(myRectangle.y);
        }
    }

    if (myRectangle.y == canvas.height - 20)  {
        for(var i = 0; i < 480; i++) {
            myRectangle.x --;
        }

        console.log(myRectangle.x);
        // console.log(myRectangle.y);

    }

    if (myRectangle.x == canvas.width - 20 && myRectangle.y == 480) {
        console.log('hurray');
    }


        // for(var i = 0; i < (canvas.height - 20); i++) {
        //     myRectangle.y --;
        // }



    // clear
    context.clearRect(0, 0, canvas.width, canvas.height);

    drawRectangle(myRectangle, context);


    // request new frame
    requestAnimFrame(function() {
        animateUp(myRectangle, canvas, context, startTime);
    });
}



var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');

var myRectangle = {
    x: 0,
    y: 0,
    width: 20,
    height: 20
};


drawRectangle(myRectangle, context);

// wait one second before starting animation
setTimeout(function() {
    var startTime = (new Date()).getTime();
    animateUp(myRectangle, canvas, context, startTime);
}, 1000);
