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
let velocityX = -2; //pipes moving left


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
};

//update the board and redraw bird image
function update() {
    requestAnimationFrame(update);
    context.clearRect(0, 0, boardWidth, boardHeight);
    
    //draw the bird inside the frame
    context.drawImage(birdImg, bird.x, bird.y, bird.width, bird.height);

    //geef de pipe een velocity zodat het naar links beweegt
    for (let i = 0; i < pipeArray.length; i++) {
        let pipe = pipeArray[i];
        pipe.x += velocityX;
        context.drawImage(pipe.Img, pipe.x, pipe.y, pipe.width, pipe.height);
    }

}

// place the pipes
function placepipe() {

    //place random pipes based on pipeHeight
    let randomPipeY = pipeY - pipeHeight/4 - Math.random() *(pipeHeight/2);

    let topPipe = {
        Img: pipeImg,
        x: pipeX,
        y: randomPipeY,
        width: pipeWidth,
        height: pipeHeight,
        passed: false,
    }
    pipeArray.push(topPipe);
}