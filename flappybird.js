//board width and height
let board;
let boardWidth = 360;
let boardHeight = 640;
let context;

// bird width and height
let birdWidth = 34;
let birdHeight = 24;
let birdX = boardWidth / 8;
let birdY = boardHeight / 2;
let birdImg;

// bird positioning and movement
let bird ={
    x: birdX,
    y: birdY,
    width: birdWidth,
    height: birdHeight,
}

//pipe width and height
let pipeArray = [];
let pipeWidth = 64;
let pipeHeight = 512;
let pipeX = boardWidth;
let pipeY = 0;

//pipe image
let pipeImg;
let bottompipeImg;

//physics engine
let velocityX = -2; //make the pipes move left
let velocityY = 0; //make the bird fall down or jump up
let gravity = 0.08; //give the bird gravity so it falls down

// game over
let gameOver = false;
//pause the game
let pause = false;
//score
let score = 0;

// onload change the board size to the boardWidth and boardHeight
window.onload = function() {
    board = document.getElementById("board");
    board.height = boardHeight;
    board.width = boardWidth;
    //this is used for drawing on the board
    context = board.getContext("2d");

    //load the bird image
    birdImg = new Image();
    birdImg.src = "./img/flappybird.png";
    birdImg.onload = function() {
        context.drawImage(birdImg, bird.x, bird.y, bird.width, bird.height);
    }

    //load the pipe image
    pipeImg = new Image();
    pipeImg.src = "./img/toppipe.png";

    bottompipeImg = new Image();
    bottompipeImg.src = "./img/bottompipe.png";

    requestAnimationFrame(update);
    // place pipes every 1000 ms
    setInterval(placepipe, 1000);

    // add event listener for keydown
    document.addEventListener("keydown", moveBird);
};

// if i press escape, pause is true
document.addEventListener("keydown", function(e) {
    if (e.code == "Escape") {
        pause = true;
    } else {
        pause = false;
        document.getElementsByClassName("pause")[0].style.display = "none";
    }
});

//update the board and redraw bird image everytime the frame updates
function update() {
    requestAnimationFrame(update);
    // if game over, stop painting the canvas
    if (gameOver) {
        // display game over text
        document.getElementsByClassName("gameOver")[0].style.display = "block";
        return;
    }
    
    if(pause == true) {
        document.getElementsByClassName("pause")[0].style.display = "block";
        return;
    }
    context.clearRect(0, 0, boardWidth, boardHeight);
    
    // add gravity to the bird by retracting the gravity from the velocity
    velocityY += gravity;
    // add velocity to the bird everytime it jumps and make the limit 0 so it doesnt go out of the canvas
    bird.y = Math.max(bird.y + velocityY, 0);
    //draw the bird inside the frame
    context.drawImage(birdImg, bird.x, bird.y, bird.width, bird.height);

    // if the bird hits the ground, game over
    if (bird.y + bird.height >= boardHeight) {
        gameOver = true;
    }

    //geef de pipe een velocity zodat het naar links beweegt
    for (let i = 0; i < pipeArray.length; i++) {
        let pipe = pipeArray[i];
        pipe.x += velocityX;
        context.drawImage(pipe.Img, pipe.x, pipe.y, pipe.width, pipe.height);

        // check if the bird hits the pipes, if it does, game over
        if (checkCollision(bird, pipe)) {
            gameOver = true;
        }
    }

    // if the bird passes the pipe, add 1 to the score
    context.fillStyle = "white";
    context.font = "24px Verdana";
    context.fillText("Score: " + score, 10, 30);
    for (let i = 0; i < pipeArray.length; i++) {
        let pipe = pipeArray[i];
        if (bird.x > pipe.x + pipe.width && !pipe.passed) {
            score+= 0.5;
            pipe.passed = true;
        }
    }
    // save the highes score in local storage
    if (localStorage.getItem("highscore") < score) {
        localStorage.setItem("highscore", score);
    }
    // display the highscore    
    context.fillText("Highscore: " + localStorage.getItem("highscore"), 10, 60);
}

// place the pipes
function placepipe() {
    // if game over, stop placing pipes
    if (gameOver) {
        return;
    }
    if (pause == true) {
        return;
    }

    //place random pipes based on pipeHeight
    let randomPipeY = pipeY - pipeHeight/4 - Math.random() *(pipeHeight/2);
    // space between the pipes (this should make it so that the space is allways the same size)
    let openingspace = board.height/5;

    let topPipe = {
        Img: pipeImg,
        x: pipeX,
        y: randomPipeY,
        width: pipeWidth,
        height: pipeHeight,
        passed: false,
    }
    pipeArray.push(topPipe);

    let bottomPipe = {
        Img: bottompipeImg,
        x: pipeX,
        y: randomPipeY + pipeHeight + openingspace,
        width: pipeWidth,
        height: pipeHeight,
        passed: false,
    }
    pipeArray.push(bottomPipe);
}

// if the mousebutton is pressed, set the velocity to -6 which makes the bird go up
// - velocityY makes the bird go up and + velocityY makes the bird go down
function moveBird(e) {
    if (e.code == "Space") {
        // make the bird jump
        velocityY = -4;
    }
}

// check if the bird hits the pipes
// this whole function is made by github copilot lmao
function checkCollision(a,b) {
    return a.x < b.x + b.width &&
              a.x + a.width > b.x &&
                a.y < b.y + b.height &&
                    a.y + a.height > b.y;
}

// reload the page when the restart button is pressed
function restart() {
    window.location.reload();
}