document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('gameCanvas');
    const context = canvas.getContext('2d');

    const gridSize = 30; // 每个格子的大小
    const gridWidth = Math.floor(canvas.width / gridSize);
    const gridHeight = Math.floor(canvas.height / gridSize);

    let snake = [{x: gridWidth / 2, y: gridHeight / 2}];
    let food = generateFood();

    let dx = 0;
    let dy = 0;

    let score = 0;
    const scoreElement = document.getElementById('score');

    let gameLoop;
    let isGameRunning = false;

    let difficultyLevel = 2; // 默认中等难度
    const difficultySelect = document.getElementById('difficulty-level');
    difficultySelect.addEventListener('change', () => {
        difficultyLevel = parseInt(difficultySelect.value);
    });

    document.addEventListener('keydown', handleKeyPress);
    document.getElementById('startButton').addEventListener('click', startGame);

    function handleKeyPress(event) {
        if (!isGameRunning) return;

        const keyPressed = event.keyCode;
        const validKeys = [37, 38, 39, 40]; // 左、上、右、下箭头键
        const direction = ['left', 'up', 'right', 'down'];
        
        const keyIndex = validKeys.indexOf(keyPressed);
        if (keyIndex > -1 && getOppositeDirection(direction[keyIndex]) !== getCurrentDirection()) {
            setDirection(direction[keyIndex]);
        }
    }

    function getOppositeDirection(direction) {
        if (direction === 'left') return 'right';
        if (direction === 'right') return 'left';
        if (direction === 'up') return 'down';
        if (direction === 'down') return 'up';
    }

    function getCurrentDirection() {
        if (dx === -1) return 'left';
        if (dx === 1) return 'right';
        if (dy === -1) return 'up';
        if (dy === 1) return 'down';
    }

    function generateFood() {
        return {
            x: Math.floor(Math.random() * gridWidth),
            y: Math.floor(Math.random() * gridHeight)
        };
    }

    function drawSnake() {
        context.fillStyle = '#00ff00';
        snake.forEach(segment => {
            context.fillRect(segment.x * gridSize, segment.y * gridSize, gridSize, gridSize);
        });
    }

    function drawFood() {
        context.fillStyle = '#ff0000';
        context.fillRect(food.x * gridSize, food.y * gridSize, gridSize, gridSize);
    }

    function update() {
        const head = { x: snake[0].x + dx, y: snake[0].y + dy };
        snake.unshift(head);

        if (head.x === food.x && head.y === food.y) {
            score++;
            scoreElement.textContent = `Score: ${score}`;
            food = generateFood();
        } else {
            snake.pop();
        }

        if (snake.some((segment, index) => index !== 0 && segment.x === head.x && segment.y === head.y)) {
            endGame();
        }

        if (head.x < 0 || head.x >= gridWidth || head.y < 0 || head.y >= gridHeight) {
            endGame();
        }

        context.clearRect(0, 0, canvas.width, canvas.height);
        drawSnake();
        drawFood();
    }

    function setDirection(direction) {
        if (direction === 'left' && dx !== 1) {
            dx = -1;
            dy = 0;
        } else if (direction === 'up' && dy !== 1) {
            dx = 0;
            dy = -1;
        } else if (direction === 'right' && dx !== -1) {
            dx = 1;
            dy = 0;
        } else if (direction === 'down' && dy !== -1) {
            dx = 0;
            dy = 1;
        }
    }

    function startGame() {
        if (!isGameRunning) {
            isGameRunning = true;
            score = 0;
            scoreElement.textContent = `Score: ${score}`;
            snake = [{x: gridWidth / 2, y: gridHeight / 2}];
            dx = 0;
            dy = 0;
            food = generateFood();
            // 根据难度级别设置游戏速度
            let gameSpeed;
            switch (difficultyLevel) {
                case 1:
                    gameSpeed = 150;
                    break;
                case 2:
                    gameSpeed = 100;
                    break;
                case 3:
                    gameSpeed = 50;
                    break;
                default:
                    gameSpeed = 100;
            }

            clearInterval(gameLoop);
            gameLoop = setInterval(update, gameSpeed);
        }
    }

    function endGame() {
        clearInterval(gameLoop);
        isGameRunning = false;
        alert('游戏结束！');
    }
});
