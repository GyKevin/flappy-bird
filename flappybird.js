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
};