var backImage,backgr;
var monkey, monkey_running;
var ground,ground_img;
var food, bananaImage, stone, stoneImage;
var bananaGroup, stoneGroup;
var gameOverImg, gameOver;
var score = 0;
var END =0;
var PLAY =1;
var gameState = PLAY;

function preload(){
  backImage=loadImage("jungle.jpg");
  monkey_running = loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
  bananaImage = loadImage("banana.png");
  stoneImage = loadImage("stone.png");
  gameOverImage = loadImage("gameOver.png");

}

function setup() {
  createCanvas(800,400);
  
  backgr=createSprite(0,0,800,400);
  backgr.addImage(backImage);
  backgr.scale=1.5;
  backgr.x=backgr.width/2;
  backgr.velocityX=-4;
  
  monkey = createSprite(100,340,20,50);
  monkey.addAnimation("Running",monkey_running);
  monkey.scale = 0.1;
  
  ground = createSprite(400,350,800,10);
  ground.x=ground.width/2;
  ground.visible = false;

  gameOver = createSprite(350,200);
  gameOver.visible = false;
  

  bananaGroup = createGroup();
  stoneGroup = createGroup();

  var score = 0;
  
}

function draw() {
  background(0);

  
  if(gameState===PLAY){
    score = Math.ceil(frameCount / frameRate());
  
  if(backgr.x<100){
    backgr.x=backgr.width/2;
  }
  
    if(keyDown("space") && monkey.y > 100) {
      monkey.velocityY = -12;
    }

    if (ground.x < 300) {
      ground.x = ground.width/2;
    }

    if (bananaGroup.isTouching(monkey)){
      bananaGroup.destroyEach();
      score = score + 2;
      monkey.scale = 0.1;
    }

    monkey.velocityY = monkey.velocityY + 0.8;
    if (stoneGroup.isTouching(monkey)){
      gameState = END;

    }

    spawnStone();
    spawnfood();
      
    }

    
  else if (gameState === END){

  backgr.velocityX = 0;
  monkey.visible = false;

  bananaGroup.destroyEach();
  stoneGroup.destroyEach();
    gameOver.visible = true;
 gameOver.addImage(gameOverImage);

}
  
    


  
monkey.collide(ground);

  

  drawSprites();

  stroke("white");
  textSize(20);
  fill("white");
  
  text("Score: " + score, 350, 50);


} 


  function spawnfood() {
    if (frameCount % 80 === 0) {
      var banana = createSprite(600, 50, 40, 10);
      banana.y = Math.round(random(120, 200));
      banana.addImage(bananaImage);
      banana.scale = 0.1;
      banana.velocityX = -3;

      //assign lifetime to the variable
      banana.lifetime = 500;
      monkey.depth = banana.depth + 1;


     //add each banana to the group
     bananaGroup.add(banana);
    }
  }

  function spawnStone() {
    if (frameCount % 300 === 0) {
      var stone = createSprite(600, 315, 10, 40);
      stone.addImage(stoneImage);
      stone.scale = 0.2;
      stone.velocityX = -6;

      // assign lifetime to the variable
      stone.lifetime = 300;

      stoneGroup.add(stone);

    }
  }

