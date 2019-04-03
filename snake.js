window.onload = function() {
    const canvas = document.getElementById("gc");
    const context = canvas.getContext("2d");
    document.addEventListener("keydown", keyPush);
    loop({
        canvas,
        context,
        snakePosition: {x: 10, y: 10},
        applePosition: {x: 15, y: 15},
        tail: DEFAULT_TAIL_LENGTH,
        trail: []
    })
}

const GRID_SIZE = 20;
const TILE_COUNTER = 20;
const DEFAULT_TAIL_LENGTH = 5;

// sorry JS...
const movingDirection = {x: 0, y: 0};

const DEFAULT_INTERVAL = 1000/15;

function loop({canvas, context, snakePosition,
                  applePosition, tail, trail}
) {
    const {x, y} = fixOutOfCanvasPosition(
        calculateNewPosition(snakePosition)
    );

    const didSelfBite = trail.find(({x: trailX, y: trailY}) => {
        return checkCollision({x: trailX, y: trailY}, {x, y})
    });

    const ateApple = checkCollision({x, y}, {x: applePosition.x, y: applePosition.y});

    const newTail = calculateTail(tail, didSelfBite, ateApple);
    const newApplePosition = calculateApple(applePosition, ateApple)

    const shapes = [
        resetCanvas(canvas),
        ...generateSnake(trail),
        generateAppleShape(newApplePosition)
    ]

    const newTrail = calculateTrail(trail, newTail, {x, y});

    drawShapes(context, shapes);

    setTimeout(function() {
        loop({
            canvas,
            context,
            snakePosition: {x, y},
            applePosition: newApplePosition,
            tail: newTail,
            trail: newTrail
        })
    }, DEFAULT_INTERVAL)
}

function calculateNewPosition({x: snakeX, y: snakeY}) {
    return {x: snakeX + movingDirection.x, y: snakeY + movingDirection.y};
}

function fixOutOfCanvasPosition({x, y}) {

    const fix = z => {
        if (z < 0) {
            return TILE_COUNTER - 1;
        }

        if (z > TILE_COUNTER - 1) {
            return 0;
        }

        return z;
    }

    return {
        x: fix(x),
        y: fix(y)
    }
}

function resetCanvas(canvas) {
    return {
        colour: 'black',
        startPoint: {
            x: 0,
            y: 0
        },
        endPoint: {
            x: canvas.width,
            y: canvas.height
        }
    }
}

function generateSnake(trail) {
    return trail.map(({x, y}) => ({
        colour: 'lime',
        startPoint: {
            x: x * GRID_SIZE,
            y: y * GRID_SIZE
        },
        endPoint: {
            x: GRID_SIZE - 2,
            y: GRID_SIZE - 2
        }
    }))
}

function checkCollision({x: xa, y: ya}, {x: xb, y: yb}) {
    return xa == xb && ya == yb;
}

function calculateTail(tail, didSelfBite, ateApple) {
    return didSelfBite
        ? DEFAULT_TAIL_LENGTH
        : ateApple
            ? tail + 1
            : tail;
}

function calculateTrail(trail, tail, {x, y}) {
    const sliceStart = (trail.length + 1) > tail
        ? (trail.length + 1) - tail
        : 0;

    return [...trail, {x, y}].slice(sliceStart);
}

function calculateApple({x, y}, ateApple) {
    return ateApple
        ? generateRandomPoint()
        : {x, y};
}

function generateRandomPoint() {
    const generate = () => Math.floor(Math.random() * TILE_COUNTER);
    return {
        x: generate(),
        y: generate()
    }
}

function generateAppleShape({x, y}) {
    return {
        colour: 'red',
        startPoint: {
            x: x * GRID_SIZE,
            y: y * GRID_SIZE
        },
        endPoint: {
            x: GRID_SIZE - 2,
            y: GRID_SIZE - 2
        }
    }
}

function drawShapes(context, shapes) {
    shapes.forEach(({colour, startPoint: {x: sx, y: sy}, endPoint: {x: ex, y: ey}}) => {
        context.fillStyle = colour;
        context.fillRect(sx, sy, ex, ey);
    });
}

function keyPush(evt) {
    switch(evt.keyCode) {
        case 37:
            movingDirection.x=-1;movingDirection.y=0;
            break;
        case 38:
            movingDirection.x=0;movingDirection.y=-1;
            break;
        case 39:
            movingDirection.x=1;movingDirection.y=0;
            break;
        case 40:
            movingDirection.x=0;movingDirection.y=1;
            break;
    }
}
