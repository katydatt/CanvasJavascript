

class Loader {

    constructor (width, height) {
        this.width = width
        this.height = height
    }


    _init() {
        this._createCanvas()
        this._bindEvents()
    }
    // create canvas
    _createCanvas () {
        this.canvas = document.createElement("canvas")
        document.body.appendChild(this.canvas)
        this.canvas.id = "canvas"
        this.canvas.width = loader.width
        this.canvas.height = loader.height
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

    // resize canvas
    _resizeCanvas () {
        // resize canvas
        var canvasRatio = this.canvas.height / this.canvas.width;
        var windowRatio = window.innerHeight / window.innerWidth;
        var width;
        var height;

        if (windowRatio < canvasRatio) {
            height = window.innerHeight;
            width = height / canvasRatio;
        } else {
            width = window.innerWidth;
            height = width * canvasRatio;
        }

        this.canvas.width = width
        this.canvas.height = height
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


}



class Snake {
    constructor( options = {} ) {
        this.options = {
            x: options.x,
            y: options.y,
            height: options.height,
            width: options.width,
            isMoving: options.isMoving || false,
            hasDispatched: options.hasDispatched || false,
            nextSnakeCallback: options.nextSnakeCallback || null,
            speed: options.speed || 4
        }
    }

    _init() {
        this._drawSnake()
    }
    start () {
        this.options.isMoving = true;
    }

    stop () {
        this.options.isMoving = false;
    }

    reset () {
        this.options.hasDispatched = false;
    }

    setNextSnakeCallback (callback) {
        this.options.nextSnakeCallback = callback;
    }

    _drawSnake() {
        this.canvas = document.getElementById("canvas")
        this.ctx = this.canvas.getContext("2d")
        this.ctx.beginPath()
        this.ctx.rect(
            this.options.x,
            this.options.y,
            this.options.width,
            this.options.height)
        this.ctx.fillStyle = "#f44242"
        this.ctx.fill()

    }

    _clearSnake () {
        this.ctx.clearRect(0, 0, loader.width, loader.height);
    }

}

class SnakeTop extends Snake {

    constructor (options) {
        super(options)
    }

    _init () {
        super._drawSnake()
        this._moveSnakeToRight()
    }

    reset () {
        this.options.x = this.options.height;
    }

    _moveSnakeToRight () {
        if(this.options.isMoving){
            this._drawSnake()
            if(this.options.x > loader.width - this.options.width && !this.options.hasDispatched){
                this.options.hasDispatched = true;
                if(this.options.nextSnakeCallback) {
                    this.setNextSnakeCallback()
                }
            } else if(this.options.x >= loader.width){
                this.options.isMoving = false;
            }

            this.options.x += this.options.speed
            super._clearSnake()


        }

        window.requestAnimationFrame(this._moveSnakeToRight.bind(this));
    }

}


class SnakeRight extends Snake {

    constructor (options = {}) {
        super(options)
    }

    _init() {
        super._drawSnake()
        super._clearSnake()
        this._moveSnakeDown()
    }

    _moveSnakeDown () {
        if(this.options.isMoving) {

            if(this.options.y > loader.height - this.options.height && !this.options.hasDispatched){
                this.options.hasDispatched = true;
                if(this.options.nextSnakeCallback) {
                    this.setNextSnakeCallback()
                }
            } else if (this.options.y > loader.height) {
                this.options.isMoving = false
            }
                this.options.y += this.options.speed
                console.log(this.options.y + " right.y")
        }
        window.requestAnimationFrame(this._moveSnakeDown.bind(this));

    }
}


class SnakeBottom extends Snake {

    constructor (options = {} ) {
        super(options)
    }
    _init() {
        super._drawSnake()
        super._clearSnake()
        this._moveSnakeToLeft()
    }

    _moveSnakeToLeft () {
        if (this.options.isMoving) {

            if(this.options.x < 0 && !this.options.hasDispatched){
                this.options.hasDispatched = true
                if(this.options.nextSnakeCallback) {
                    this.setNextSnakeCallback()
                }
            } else if (this.options.x < this.options.width) {
                this.options.isMoving = false
            }
            this.options.x -= this.options.speed
            console.log(this.options.x + " bottom.x")

        }
            window.requestAnimationFrame(this._moveSnakeToLeft.bind(this));
    }

}


class SnakeLeft extends Snake {
    constructor(options = {}) {
        super(options)
    }

    _init() {
        super._drawSnake()
        this._moveSnakeUp()
    }

    _moveSnakeUp () {
        if(this.options.isMoving) {
            console.log(`snakeLeft is moving  = ${this.options.isMoving}`)

            if(this.options.y < 0 && !this.options.hasDispatched) {
                this.options.hasDispatched = true
                if(this.options.nextSnakeCallback) {
                    this.setNextSnakeCallback()
                }
            } else if ( this.options.y >  - this.canvas.height) {
                this.options.isMoving = false
            }
            this.options.y -= this.options.speed
            console.log(this.options.y + " left.y")
        }
            window.requestAnimationFrame(this._moveSnakeUp.bind(this));
    }
}




// defining the elements on the DOM

let loader = new Loader (600, 600)
loader._init()

//CREATE SNAKES
let snakeT = new SnakeTop ({
    x: - 300,
    y: 0,
    height: 20,
    width: 300
})
snakeT._init()


//ASSIGN NEXT SNAKE callback
snakeT.setNextSnakeCallback (()=>{
    snakeR.reset();
    snakeR.start();
});

//START FIRST SNAKE
snakeT.start();

//
let snakeR = new SnakeRight ({
    width: 20,
    height: 300,
    x: 580,
    y: - 620
})
//ASSIGN NEXT SNAKE callback
snakeR.setNextSnakeCallback (()=>{
    snakeB.reset();
    snakeB.start();
});
snakeR._init()

//START FIRST SNAKE
snakeR.start();

let snakeB = new SnakeBottom ({
    x: 600,
    y: 580,
    height: 20,
    width: 300,
})
snakeB._init()
//ASSIGN NEXT SNAKE callback
snakeB.setNextSnakeCallback (()=>{
    snakeL.reset();
    snakeL.start();
});
//START FIRST SNAKE
snakeB.start();


let snakeL = new SnakeLeft ({
    x: 0,
    y: 600,
    width: 20,
    height: 300,
})
snakeL._init()
//ASSIGN NEXT SNAKE callback
snakeL.setNextSnakeCallback (()=>{
    snakeT.reset();
    snakeT.start();
});

//START FIRST SNAKE
snakeL.start();
