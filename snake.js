const data = {
    snake: {
        tail: 5,
        positionX: 10,
        positionY: 10,
        movingX: 0,
        movingY: 0
    },
    apple: {
        appleX: 15,
        appleY: 15,
    },
    action: {
        gridSize: 20,
        tileCounter: 20,
        trail: []
    },
    canvas: null,
    canvasContext: null
}

window.onload = function() {
    data.canvas = document.getElementById("gc")
    data.canvasContext = data.canvas.getContext("2d")
    document.addEventListener("keydown", keyPush)
    setInterval(init,1000/15)
}

function init() {
    snakeAction()
    resetCanvas()
    drawSnake()
    drawApple()
    reachedApple()
}

function snakeAction() {
    data.snake.positionX += data.snake.movingX
    data.snake.positionY += data.snake.movingY
    if(data.snake.positionX < 0) {
        data.snake.positionX = data.action.tileCounter - 1
    }

    if(data.snake.positionX > data.action.tileCounter - 1) {
        data.snake.positionX = 0
    }

    if(data.snake.positionY < 0) {
        data.snake.positionY = data.action.tileCounter - 1
    }

    if(data.snake.positionY > data.action.tileCounter - 1) {
        data.snake.positionY = 0
    }
}

function resetCanvas() {
    data.canvasContext.fillStyle = 'black'
    data.canvasContext.fillRect(0, 0, data.canvas.width, data.canvas.height)
}

function drawSnake() {
    data.canvasContext.fillStyle = 'lime'
    for(var i = 0; i < data.action.trail.length; i++) {
        data.canvasContext.fillRect(
            data.action.trail[i].x * data.action.gridSize,
            data.action.trail[i].y * data.action.gridSize,
            data.action.gridSize - 2,
            data.action.gridSize - 2
            )
        if (data.action.trail[i].x === data.snake.positionX && data.action.trail[i].y === data.snake.positionY) {
            data.snake.tail = 5
        }
    }
    data.action.trail.push({x: data.snake.positionX, y: data.snake.positionY})

    while(data.action.trail.length > data.snake.tail) {
        data.action.trail.shift()
    }
}

function drawApple() {
    data.canvasContext.fillStyle = "red"
    data.canvasContext.fillRect(
        data.apple.appleX * data.action.gridSize,
        data.apple.appleY * data.action.gridSize,
        data.action.gridSize - 2,
        data.action.gridSize - 2
    );
}

function reachedApple() {
    if(data.apple.appleX === data.snake.positionX && data.apple.appleY === data.snake.positionY) {
        data.snake.tail++
        data.apple.appleX = Math.floor(Math.random() * data.action.tileCounter)
        data.apple.appleY = Math.floor(Math.random() * data.action.tileCounter)
    }
}

function keyPush(e) {
    switch(e.keyCode) {
        case 37:
            data.snake.movingX = -1
            data.snake.movingY = 0
            break
        case 38:
            data.snake.movingX = 0
            data.snake.movingY = -1
            break
        case 39:
            data.snake.movingX = 1
            data.snake.movingY = 0
            break
        case 40:
            data.snake.movingX = 0
            data.snake.movingY = 1
            break
    }
}