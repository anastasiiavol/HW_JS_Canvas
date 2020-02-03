'use strict';

let canvas = document.getElementById('demoCanvas');
let context = canvas.getContext('2d');

let figures = [];
let FPS = 30;
let FIGURE_COUNT = 10;
let id = 1;
let squaresCount = 0;
let circlesCount = 0;

function random(min, max) {
    return Math.random() * (max - min) + min;
}

function randColor() {
    return '#' + Math.floor(Math.random() * 16777215).toString(16);
}

class Figure {
    id = 1;
    x = 0;
    y = 0;
    velocityX = 0;
    velocityY = 0;
    color = "#000000";

    constructor(id, x, y, velocity, color) {
        this.id = id;
        this.x = x;
        this.y = y;
        this.velocityX = velocity;
        this.velocityY = velocity;
        this.color = color;
    }

    draw(context) {
        console.log("draw figure")
    }

    move() {
        console.log("move figure")
    }

    calculateSquare() {
        return 0;
    }

    getType() {
        return 'figure';
    }

    printLog() {
        console.log(' Square = ' + Math.round(this.calculateSquare()) + ' Color = ' + this.color + ' id ' + this.id + ' Type ' + this.getType());
    }

}

class Circle extends Figure {
    radius = 5;

    constructor(id, x, y, velocity, color, radius) {
        super(id, x, y, velocity, color);
        this.radius = radius;
    }

    draw(context) {
        context.beginPath();
        context.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        context.fillStyle = this.color;
        context.fill();
    }

    move() {
        this.x += this.velocityX / FPS;
        this.y += this.velocityY / FPS;

        if ((this.x - this.radius) < 0) {
            this.x = this.radius;
            this.velocityX = -this.velocityX;
        }
        if ((this.x + this.radius) > canvas.width) {
            this.x = canvas.width - this.radius;
            this.velocityX = -this.velocityX;
        }
        if ((this.y - this.radius) < 0) {
            this.y = this.radius;
            this.velocityY = -this.velocityY;
        }
        if ((this.y + this.radius) > canvas.height) {
            this.y = canvas.height - this.radius;
            this.velocityY = -this.velocityY;
        }
    }
    calculateSquare() {
        return (Math.PI*(this.radius*this.radius));
    }

    getType() {
        return 'Circle';
    }


}

class Square extends Figure {
    size = 10;

    constructor(id, x, y, velocity, color, size) {
        super(id, x, y, velocity, color);
        this.size = size;
    }

    draw(context) {
        context.beginPath();
        context.rect(this.x, this.y, this.size, this.size);
        context.fillStyle = this.color;
        context.fill();
    }

    move() {
        this.x += this.velocityX / FPS;
        this.y += this.velocityY / FPS;

        if ((this.x) < 0) {
            this.velocityX = -this.velocityX;
        }
        if ((this.x + this.size) > canvas.width) {
            this.x = canvas.width - this.size;
            this.velocityX = -this.velocityX;
        }
        if ((this.y) < 0) {
            this.velocityY = -this.velocityY;
        }
        if ((this.y + this.size) > canvas.height) {
            this.y = canvas.height - this.size;
            this.velocityY = -this.velocityY;
        }
    }
    calculateSquare() {
        return (this.size*this.size);
    }

    getType() {
        return 'Square';
    }
}

function createFigure() {
    let numRand = Math.round(random(0, 1));

    let figure;
    if (numRand && circlesCount < FIGURE_COUNT) {
        figure = new Circle(id++, 0, 0, 100, randColor(), random(15, 40));
        circlesCount++;
    } else if (squaresCount < FIGURE_COUNT) {
        figure = new Square(id++, 0, 0, 100, randColor(), random(30, 60));
        squaresCount++;
    } else {
        return;
    }

    figures.push(figure);
    figure.printLog();
}

function createFinalScene() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < figures.length; i++) {
        figures[i].draw(context);
        figures[i].move();
    }
}

createFigure();
setTimeout(function run() {
    createFigure();
    setTimeout(run, 5000)
}, 5000);


setInterval(createFinalScene, 1000 / FPS);






