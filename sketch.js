// Create ball
// Give it the ball.png image
// Move it
// Avoid it exiting the canvas

var ball, ballImage;
var edges;
var paddle;
var bricksGroup;
var score;
var lives;
var gameState = "start"; // starting state
function preload(){
  ballImage = loadImage("th.jpg");
}

function setup() {
  createCanvas(400, 400);
  score = 0;
  lives = 1;


// Make a new group
bricksGroup = new Group();
createBrickRows(60, "red");
createBrickRows(90, "orange");
createBrickRows(120, "yellow");
createBrickRows(150, "white");

  // create ball
  // xpos, ypos, width, height
  ball = createSprite(200, 200, 15, 15);
  //ball.addImage(ballImage);
  ball.shapeColor = "white";
  //ball.scale = 0.05;

  
  // create paddle 
  paddle= createSprite(250, 350, 60, 10);
  paddle.shapeColor = "blue";
  edges = createEdgeSprites();
}

function draw() {
  background("black");
  fill ("blue") 
  textSize (20);
  // String concatenation => putting 2 or more strings together
  text ('Score:' + score, 10,20)
  text ('Lives:' + lives, 300, 20)

  if (gameState == "start"){
    text("Press spacebar to start the game", 50, 250);
    ball.x = 200;
    ball.y = 200;
    ball.velocityX = 0;
    ball.velocityY = 0;
  }

  if (keyDown("space")){
    gameState = "play";
    ball.x = 200;
    ball.y = 200;
    // How to move right downwards
    // velocity
    ball.velocityX = 2; // +ve -> right; -ve -> left
    ball.velocityY = -3; // +ve -> downwards; -ve -> upwards
    
  }
  if (gameState=='gameover'){
    text('game over', 50, 250)
    ball.remove()
  }   
if (ball.isTouching(edges[3])){
  lifeover();
}
  paddle.x = mouseX;

  ball.bounceOff(paddle);
  ball.bounceOff(edges[0]);
  ball.bounceOff(edges[1]);
  ball.bounceOff(edges[2]);

  ball.bounceOff(bricksGroup, brickHit);


  drawSprites();
}
function brickHit(ball, bricksGroup){
  bricksGroup.remove();
  score = score + 4
}
function createBrickRows(y, color){
  for(var j = 1; j <= 6; j++){
    var brick = createSprite(65 + 54 * (j-1), y, 50, 25); 
    // j will range from 1, 2, 3, 4, 5, 6
    brick.shapeColor = color;
    // adding memebers in the group
    bricksGroup.add(brick);
  }
}

function lifeover(){
  lives = lives - 1;
  if (lives <= 0){
    gameState = "gameover";
  }else{
    gameState = "start";
  }
}

// width - 400
// width of brick - 50
// total - 6
// total width the 6 bricks will take - 50*6 = 300
// left out portion => 400 - 300 = 100
// space - 4
// total space needed -  4 * 5 = 20
// left out => 100 - 20 = 80
// left side => 40
// x pos of 1 st brick => 25 + 40 => 65

// x pos for 2nd brick => 65 + 25 + 4 + 25 => 65 + 54

//  x pos for 3rd brick => 65 + 54 + 25 + 4 + 25  => 65 + 54 + 54

//  x pos for 4th brick => 65 + 54 + 54 + 54

// x pos for 5th brick => 65 + 54 + 54 + 54 + 54