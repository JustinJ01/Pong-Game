// This page is for the javascript logic

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const red = document.getElementById('red');
const blue = document.getElementById('blue');
const ball = document.getElementById('ball');
let playerScore=0;
let enemyScore=0;


const player = {
    w: 25,
    h:150,
    x:30,
    y:200,
    speed: 6,
    dx:0,
    dy:0

};

const enemy = {
    w: 22,
    h:150,
    x:545,
    y:200,
    speed: 5,
    dx:0,
    dy:0
};

const gameball = {
    w: 35,
    h:35,
    x:282.5,
    y:200,
    speed: 5,
    dx:0,
    dy:0
}

//net
const net = {
    w: 5,
    h: canvas.height,
    x: canvas.width / 2 - 5/2,
    y:0,
    color: 'white'
};

function drawNet() {
    ctx.fillStyle = net.color;
    ctx.fillRect(net.x, net.y, net.w, net.h);
}

function drawScorePlayer() {
    ctx.font = "30px Comic Sans MS";
    ctx.fillStyle = '#82EEFD';
    ctx.textAlign = 'center';
    ctx.fillText(playerScore, canvas.width/4, canvas.height/8);
}

function drawScoreEnemy() {
    ctx.font = "30px Comic Sans MS";
    ctx.fillStyle = 'crimson';
    ctx.textAlign = 'center';
    ctx.fillText(enemyScore, canvas.width/4*3, canvas.height/8);
}

function drawPlayer() {
    ctx.drawImage(blue, player.x, player.y, player.w, player.h);
    ctx.drawImage(red, enemy.x, enemy.y, enemy.w, enemy.h);
    ctx.drawImage(ball, gameball.x, gameball.y, gameball.w, gameball.h)
}

function clear() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

}

function newPos() {
    player.y += player.dy;
    enemy.y += enemy.dy;
    gameball.y += gameball.dy;
    gameball.x += gameball.dx;
    detectWalls();
    detectEnemiesPaddles();
    detectPlayersPaddles();
}

function enemyAI() {
    if (gameball.y  < enemy.y + (enemy.h/2)) {
        enemy.dy = -1.2;
    }
    if (gameball.y > enemy.y + (enemy.h/2)) {
        enemy.dy = 1.2;
    }
}

function detectWalls() {
    //Player
    // Top wall
    if(player.y < 0) {
        player.y = 0;
    }
    // Bottom wall
    if(player.y + player.h > canvas.height) {
        player.y = canvas.height - player.h;
    }

    // Ball
    //Left wall
    if(gameball.x < 0) {
        gameball.x = 0;
        enemyScore += 1;
        scoreReset();
        alert("Enemy Scored!! Their Score is: " + enemyScore)
        
    }
    //Right wall
    if(gameball.x + gameball.w > canvas.width) {
        gameball.x = canvas.width - gameball.w;
        playerScore += 1;
        scoreReset();
        alert("You Scored!! Current Score is: " + playerScore)

    }
    // Top wall
    if(gameball.y < 0) {
        gameball.y = 0;
        gameball.dy *= -1;
    }
    // Bottom wall
    if(gameball.y + gameball.h > canvas.height) {
        gameball.y = canvas.height - gameball.h;
        gameball.dy *= -1;
    }
    // Enemy
    // Top wall
    if(enemy.y < 0) {
        enemy.y = 0;
    }
    // Bottom wall
    if(enemy.y + enemy.h > canvas.height) {
        enemy.y = canvas.height - enemy.h;
    }
}

function detectPlayersPaddles() {
    // Player's paddle
    if ((player.x < gameball.x && player.x + player.w > gameball.x) && (player.y < gameball.y + gameball.h && (player.y + player.h) > gameball.y)){
        console.log('Hit players paddle')
        gameball.dx *= -1.1;
        if ((player.x < gameball.x && player.x + player.w > gameball.x)&& ((player.y == gameball.y + gameball.h) || (player.y + player.h == gameball.y)) ){
            gameball.dy *= 1.1;
        }
    }

   
}
function detectEnemiesPaddles() {
 // Enemy's paddle
    if ((enemy.x  < gameball.x + gameball.w && enemy.x + enemy.w > gameball.x) && (enemy.y < (gameball.y + gameball.h) && (enemy.y + enemy.h) > gameball.y)){
        console.log('Hit Enemies paddle')
        gameball.dx *= -1.1;
        if ((enemy.x < gameball.x && enemy.x + enemy.w > gameball.x)&& ((enemy.y == gameball.y + gameball.h) || (enemy.y + enemy.h == gameball.y)) ){
            gameball.dy *= 1.1;
        }
}
}
function update() {
    clear();

    enemyAI();

    drawPlayer();
    drawNet();

    newPos();

    drawScorePlayer();
    drawScoreEnemy();

    isGameDone();

    requestAnimationFrame(update);
}

function moveUp() {
    player.dy = - player.speed;
}

function moveDown() {
    player.dy =  player.speed;
}

function keyDown(e) {
    
    if (e.key === 'ArrowUp' || e.key === 'Up') {
        moveUp();
    } else if (e.key === 'ArrowDown' || e.key === 'Down'){
        moveDown();
    }
}

function keyUp(e) {
    if (e.key === 'ArrowUp' || e.key === 'Up' || e.key === 'ArrowDown' || e.key === 'Down') {
        player.dx = 0;
        player.dy = 0;
    }
}

function startGame(event) {
    num1 = randomNum();
    num2 = randomNum();
    gameball.dx = 2 * (num1);
    gameball.dy = 2 * (num2);
    document.getElementById('start').style.color ='green';
    update();
}

function isGameDone() {
    if (playerScore == 20) {
        alert("Player won!")
        endGame();
    }
    if ( enemyScore == 20) {
        alert("Enemy Won")
        endGame();
    }
}

function endGame(event) {
    document.getElementById('end').style.color ='red';
    location.reload();

}

function scoreReset() {
    num1 = randomNum();
    num2 = randomNum();
    gameball.dx = 2 * (num1);
    gameball.dy = 2 * (num2);
    gameball.x=282.5;
    gameball.y=200;
}

function randomNum() {
    return Math.random() < 0.5 ? -1 : 1;
}


document.addEventListener('keydown', keyDown);
document.addEventListener('keyup', keyUp);