
class Snake {

    constructor (selector, options = {}) {
        this.options = {
            thickness: options.thickness || 20,
            length: options.length || 300,
            speed: options.speed || 4,
            x: options.x,
            y: options.y
        }

        this.selector = typeof selector === 'string'
            ? document.querySelector(selector)
            : selector

        this._globalVars()
        this._init()

        return this
    }

    _globalVars () {

        this.isSnakeMoving = false
        this.canvas = false
        // this.snake = []

    }

    _throttle (callback, delay) {
        let last
        let timer
        return function () {
            let context = this
            let now = +new Date()
            let args = arguments
            if (last && now < last + delay) {
                clearTimeout(timer)
                timer = setTimeout(function () {
                    last = now
                    callback.apply(context, args)
                }, delay)
            } else {
                last = now
                callback.apply(context, args)
            }
        }
    }

    _init () {
        this._createCanvas()
        this._createSnake()
        this._bindEvents()
    }

    _createCanvas () {
        if (!this.canvas) {
            this.canvas = document.createElement("canvas")
            this.canvas.width = this.selector.clientWidth
            this.canvas.height = this.selector.clientHeight
            this.canvas.id = "canvas"
            this.selector.appendChild(this.canvas)
        }
    }

    _createSnake () {
        var ctx = this.canvas.getContext('2d')

        ctx.beginPath()
        ctx.rect(
            this.options.x,
            this.options.y,
            this.options.length,
            this.options.thickness)
        ctx.fillStyle = "#f44242"
        ctx.fill()
        // snake.push(rec)
    }


    _animateSnake () {

        this._animateSnakeTop ()
        this._animateSnakeRight ()
        this._animateSnakeBottom ()
        this._animateSnakeLeft ()

    }

    _animateSnakeTop () {
        if (this.isSnakeMoving) {
             if(this.x > canvas.width - this.length && !snakeRight.isSnakeMoving) {
                 this.isSnakeMoving = true;
                 this.y = - this.thickness + this.length;
             } else if(this.x >= canvas.width ) {
                 this.isSnakeMoving = false;
             } else {
                 this.x = - this.thickness;
             }

             this.x += speed;

        }
    }
    _animateSnakeRight() {
        if (this.isSnakeMoving) {
             if(this.x > canvas.height - this.length && !snakeBottom.isSnakeMoving) {
                 this.isSnakeMoving = true;
                 this.x = canvas.width - this.thickness;
             } else if(this.x >= canvas.width ) {
                 this.isSnakeMoving = false;
             } else {
                 this.x = - this.length;
             }

             this.y += speed;

        }
    }
    _animateSnakeBottom() {
        if (this.isSnakeMoving) {
             if(this.x < 0 && !snakeLeft.isSnakeMoving) {
                 this.isSnakeMoving = true;
                 this.y = canvas.height - this.thickness;
             } else if(this.x < - this.length ) {
                 this.isSnakeMoving = false;
             } else {
                 this.x = canvas.width;
             }

             this.x -= speed;

        }
    }
    _animateSnakeLeft() {
        if (this.isSnakeMoving) {
             if(this.y < 0 && !snakeTop.isSnakeMoving) {
                 this.isSnakeMoving = true;
                 this.x = -this.length + this.thickness;
             } else if(this.x < - this.length ) {
                 this.isSnakeMoving = false;
             } else {
                 this.y = canvas.height;
             }

             this.y -= speed;

        }
    }


    _bindEvents () {
    // create events listeners
        this.resizeCanvas = this._throttle(function (event) {
            this._resizeCanvas()
        }.bind(this), 250)

        window.addEventListener('resize', this.resizeCanvas, false)
    }

    _unbindEvents () {
    // remove events listeners
        window.removeEventListener('resize', this.resizeCanvas, false)
    }

    _resizeCanvas () {
        // resize canvas
        var canvasRatio = this.canvas.height / this.canvas.width;
        console.log("canvas ratio " + canvasRatio)
        var windowRatio = window.innerHeight / window.innerWidth;
        console.log("window ratio " + windowRatio)
        var width;
        var height;

        if (windowRatio < canvasRatio) {
            height = window.innerHeight;
            width = height / canvasRatio;
        } else {
            width = window.innerWidth;
            height = width * canvasRatio;
        }

        this.canvas.style.width = width + 'px';
        this.canvas.style.height = height + 'px';
        console.log(this.canvas.style.width + " " + this.canvas.style.height);
    }


    start () {

        this._animateSnake ()

    }

    stop () {
        // clearInterval(animation)
    }

}


let snake = new Snake('.snakeContainer', {
    thickness: 20,
    length: 300,
    x: -300,
    y: 0
})


setTimeout(function () {

    snake.start()

    setTimeout(function () {
        // snake.stop()

    }, 5000)

}, 1000)