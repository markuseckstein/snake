const tiles = 50;
let dy = dx = 0;
let tailLength = 3;
let apple = randomPoint();
const middle = Math.floor(tiles / 2);
let currentPos = [{ x: middle, y: middle }];
const board = document.getElementById('snake');
const tileSizeX = board.width / tiles;
const tileSizeY = board.height / tiles;
const ctx = board.getContext("2d");
let started = false;

function gameLoop() {
    let newPosition = { x: currentPos[0].x + dx, y: currentPos[0].y + dy };
    for (let i = currentPos.length - 1; i >= 0; i--) {
        if (started && currentPos[i].x === newPosition.x && currentPos[i].y === newPosition.y) {
            clearInterval(timerId);
            ctx.fillStyle = 'red';
            ctx.font = '48px sans-serif';
            ctx.fillText('Game over!', 50, 50);
            return;
        }
        const previousPoint = currentPos[i - 1];
        if (previousPoint) {
            currentPos[i] = previousPoint;
        }
    }
    currentPos[0] = newPosition;
    if (currentPos[0].x === apple.x && currentPos[0].y === apple.y) {
        currentPos.push({ x: currentPos[0].x, y: currentPos[0].y });
        apple = randomPoint();
    }

    if (currentPos[0].x < 0) {
        currentPos[0].x = tiles - 1;
    } else if (currentPos[0].x > tiles - 1) {
        currentPos[0].x = 0;
    }

    if (currentPos[0].y < 0) {
        currentPos[0].y = tiles - 1;
    } else if (currentPos[0].y > tiles - 1) {
        currentPos[0].y = 0;
    }

    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, board.width, board.height);

    ctx.fillStyle = 'white';
    currentPos.forEach(point => {
        paintTile(ctx, point.x, point.y, 'white');
    });

    paintTile(ctx, apple.x, apple.y, 'lime');
}

function paintTile(ctx, x, y, color) {
    ctx.fillStyle = color;
    ctx.fillRect(x * tileSizeX, y * tileSizeY, tileSizeX, tileSizeY);
}

function randomPoint() {
    const x = Math.floor(Math.random() * tiles + .5);
    const y = Math.floor(Math.random() * tiles + .5);
    return { x, y };
}

function handleKey(evt) {
    if (evt.key === 'ArrowDown') {
        dy = 1;
        dx = 0;
    } else if (evt.key === 'ArrowUp') {
        dy = -1;
        dx = 0;
    } else if (evt.key === 'ArrowLeft') {
        dy = 0;
        dx = -1;
    } else if (evt.key === 'ArrowRight') {
        dy = 0;
        dx = 1;
    }
    started = true;
}

document.addEventListener('keydown', handleKey);
let timerId = setInterval(gameLoop, 50);