var spookySound
var PLAY=1;
var END=0;
var gameState=PLAY;
var tower,towerImg;
var door,doorImg,doorGroup;
var climberImg,climber,climberGroup;
var ghost,ghostImg;
var invBlock,invBlockGroup;
function preload(){
  towerImg=loadImage("tower.png");
  doorImg=loadImage('door.png');
  climberImg=loadImage("climber.png");
  ghostImg=loadImage('ghost-standing.png');
   spookySound=loadSound("spooky.wav");
  
}
function setup(){
 createCanvas(600,600);
  tower=createSprite(300,300,500,500);
  tower.addImage(towerImg);
  tower.velocityY=1;
  doorGroup = new Group();
  climberGroup = new Group();
  ghost=createSprite(200,200,50,50);
  ghost.addImage(ghostImg);
  ghost.scale=0.3;
  invBlockGroup=new Group();
 spookySound.loop();
}
function draw(){
  background(0);
  
  
  if(gameState===PLAY){
    if(tower.y>400){
    tower.y=300;
  }
  
  if(keyDown("left_arrow")){
     ghost.x = ghost.x-3;
     }
  if(keyDown("right_arrow")){
    ghost.x=ghost.x+3;
  }
  if(keyDown("space")){
    ghost.velocityY=-5;
    
    
  }
  
  ghost.velocityY=ghost.velocityY+0.8
  if(climberGroup.isTouching(ghost)){
    ghost.velocityY=0;
    
  }
  if(invBlockGroup.isTouching(ghost)||ghost.Y>600){
    ghost.destroy();
    gameState=END;
  }

  
  spawnDoors();
  drawSprites();
  }
  if(gameState===END){
    
    fill("yellow");
    textSize(30);
    text("GameOver",230,250);
  }

}
function spawnDoors(){
  if(frameCount%280===0){
    var door=createSprite(200,-50);
   
     var climber=createSprite(200,10);
    door.addImage(doorImg);
    climber.addImage(climberImg);
     var invBlock=createSprite(200,15);
    invBlock.width=climber.width;
    invBlock.Height=2;
    
    door.x=Math.round(random(120,400))
    climber.x=door.x;
    invBlock.x=door.x;
    invBlock.velocityY=1;
    door.velocityY=1;

    climber.velocityY=1;
   door.depth=ghost.depth;
    ghost.depth=ghost.depth+1;
    door.lifetime=800;
    doorGroup.add(door);
    climber.lifetime=800;
    climberGroup.add(climber);
      invBlockGroup.add(invBlock);
    invBlock.debug=true;
    invBlock.visible=false;
     
    
  }
  
}

  
