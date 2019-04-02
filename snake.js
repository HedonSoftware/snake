const CANVAS_HEIGHT = 400,
      CANVAS_WIDTH = 400

function resetCanvas() {
    return {
        color: 'black',
        fromX: 0,
        fromY: 0,
        width: CANVAS_WIDTH,
        height: CANVAS_HEIGHT
    }
}

function drawSnake(snake, action) {

    let data  = {
        color: 'lime',
        snake: []
    }

    for(var i = 0; i < action.trail.length; i ++) {
        data.snake.push([
            action.trail[i].x * action.gridSize,
            action.trail[i].y * action.gridSize,
            action.gridSize - 2,
            action.gridSize - 2
        ])
        if (action.trail[i].x === data.positionX && data.action.trail[i].y === data.positionY) {
            data.snake.tail = 5
        }
    }
    data.action.trail.push({x: data.snake.positionX, y: data.snake.positionY})

    while(data.action.trail.length > data.snake.tail) {
        data.action.trail.shift()
    }
}

function loop() {
    let table = [
        resetCanvas(),
        drawSnake(snake, direction)
    ]
}
