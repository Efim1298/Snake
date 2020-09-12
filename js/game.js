const canvas = document.getElementById("game");
// отримання формату полотна
const ctx = canvas.getContext("2d");

// підключення зображень
const ground = new Image();
ground.src = "img/ground.png";

const foodImg = new Image();
foodImg.src = "img/food.png";

let box = 32;

let score = 0;

// випадкова поява їжі за координатами
let food = {
  x: Math.floor(Math.random() * 17 + 1) * box,
  y: Math.floor(Math.random() * 15 + 3) * box,
};

// місце положення змії
let snake = [];
snake[0] = {
  x: 9 * box,
  y: 10 * box,
};

// додавання керування змією
document.addEventListener("keydown", direction);

let dir;

function direction(event) {
  if (event.keyCode == 37 && dir != "right") dir = "left";
  else if (event.keyCode == 38 && dir != "down") dir = "up";
  else if (event.keyCode == 39 && dir != "left") dir = "right";
  else if (event.keyCode == 40 && dir != "up") dir = "down";
  // додавання кнопки перезавантаження сторінки
  else if (event.keyCode === 13) {
    dir = "enter";
    window.location.reload();
  }
}

//інтерактивне зображення після завершення гри
function drawPaused() {
  ctx.beginPath();
  ctx.rect(0, 0, box * 19, box * 19);
  ctx.fillStyle = "rgba(87, 233, 74, 0.9)";
  ctx.fill();
  ctx.font = "50px Arial";
  ctx.fillStyle = "black";
  ctx.fillText("Ваш рахунок: " + score, box * 4, box * 9);
  ctx.font = "30px Arial";
  ctx.fillStyle = "black";
  ctx.fillText("Нажміть Enter щоб продовжити", box * 3, box * 11);
}

// зупинка гри при поїданні хвоста
function snakeTail(head, arr) {
  for (let i = 0; i < arr.length; i++) {
    if (head.x == arr[i].x && head.y == arr[i].y) clearInterval(game, drawPaused());
  }
}

// малювання гри
function drawGame() {
  // відображення малюнку за координатами
  ctx.drawImage(ground, 0, 0);

  ctx.drawImage(foodImg, food.x, food.y);

  // малювання змії
  for (let i = 0; i < snake.length; i++) {
    ctx.fillStyle = i == 0 ? "green" : "red";
    ctx.fillRect(snake[i].x, snake[i].y, box, box);
  }

  // малювання рахунку
  ctx.fillStyle = "white";
  ctx.font = "50px Arial";
  ctx.fillText(score, box * 2.5, box * 1.7);

  let snakeX = snake[0].x;
  let snakeY = snake[0].y;

  // поїдання їжі(перевірка чи змія з'їла їжу чи ні)
  if (snakeX == food.x && snakeY == food.y) {
    score++;
    food = {
      x: Math.floor(Math.random() * 17 + 1) * box,
      y: Math.floor(Math.random() * 15 + 3) * box,
    };
  } else {
    snake.pop();
  }

  // зупинка гри через заходження змії за границю поля
  if (snakeX < box || snakeX > box * 17 || snakeY < 3 * box || snakeY > box * 17) clearInterval(game, drawPaused());

  // переміщення змії
  if (dir == "left") snakeX -= box;
  if (dir == "right") snakeX += box;
  if (dir == "up") snakeY -= box;
  if (dir == "down") snakeY += box;

  let newHead = {
    x: snakeX,
    y: snakeY,
  };

  snakeTail(newHead, snake);

  // додавання нової голови при переміщенні
  snake.unshift(newHead);
}
// fps
let game = setInterval(drawGame, 120);
