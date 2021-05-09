var path,mainCyclist,cycleBell;
var pathImg,mainRacerImg1,mainRacerImg2,mr3;
var cyclebell,redCG,pinkCG,yellowCG;
var redP,r1,r2;
var pinkP,p1,p2;
var yellowP,y1,y2;
var END =0;
var PLAY =1;
var gameState = PLAY;
var gameoverImg,gameover;
var distance=0
var score=0;
var obsGroup,obstacle,ob1,ob2,ob3;
var rCG,pCG,yCG;
var arrow,arrowImg,arrowG;
var end;


function preload(){
  pathImg = loadImage("images/Road.png");
  mainRacerImg1 = loadAnimation("images/mainPlayer1.png","images/mainPlayer2.png");
  mainRacerImg2= loadImage("images/mainPlayer3.png");
  p1=loadAnimation("images/opponent1.png","images/opponent2.png");
  p2=loadAnimation("images/opponent3.png");
  y1=loadAnimation("images/opponent4.png","images/opponent5.png");
  y2=loadAnimation("images/opponent6.png");
         
  r1=loadAnimation("images/opponent7.png","images/opponent8.png");
  r2=loadAnimation("images/opponent9.png"); 
  gameoverImg=loadImage("images/gameOver.png");
  ob1=loadImage("images/obstacle1.png");
  ob2=loadImage("images/obstacle2.png");
  ob3=loadImage("images/obstacle3.png");
  arrowImg=loadImage("images/arrow0.png");
}

function setup(){ 
  canvas = createCanvas(900,300);
    
  end=createSprite(4300,150,20,300);
  end.shapeColor="red";

  //creating boy running
  mainCyclist  = createSprite(70,150,20,20);
  mainCyclist.addAnimation("SahilRunning",mainRacerImg1);
  mainCyclist.addAnimation("boyFalling",mainRacerImg2);
  mainCyclist.scale=0.07;

  gameover=createSprite(250,130,50,40);
  gameover.addImage("gameover",gameoverImg);
  gameover.scale=0.8;
  gameover.visible=false;

  rCG=new Group();
  pCG=new Group();
  yCG=new Group();
  obsGroup=new Group();
  arrowG=new Group();

 

}

function draw() {
  background(0);
  image(pathImg,0,0,900*5,300);
  drawSprites();
  textSize(20);
  fill(255);
  //text("Distance: "+ distance,camera.position.x+300,30);
  text("Score: "+distance,camera.position.x+300,30); 
  console.log(mainCyclist.x);    
  if(gameState===PLAY){

    gameover.visible=false;
    mainCyclist.changeAnimation("SahilRunning",mainRacerImg1);
  
    
    if(keyDown("RIGHT_ARROW") && distance<4280){
      mainCyclist.x +=20;
      if(distance<=3500){
        camera.position.x+=20;
      }
      distance+=20;
    }
  
    if(keyDown("UP_ARROW")){
      mainCyclist.y -=20;
    }

    if(keyDown("DOWN_ARROW")){
      mainCyclist.y +=20;
    }

    if(distance>4270){
      gameState="win";
    }

    if(mainCyclist.isTouching(rCG)){
      redP.changeAnimation("fallingRed",r2);
      gameState=END;
    }

    if(mainCyclist.isTouching(yCG)){
      yellowP.changeAnimation("fallingYellow",y2);
      gameState=END;
    }

    if(mainCyclist.isTouching(pCG)){
      pinkP.changeAnimation("fallingPink",p2);
      gameState=END;
    }

    if(mainCyclist.isTouching(arrowG)){
      arrowG.destroyEach();
      gameState=END;
    }

    if(mainCyclist.isTouching(obsGroup)){
      obsGroup.destroyEach();
      gameState=END;
    }

    spawnPlayer();
    spawnOb();
    spawnArrow();
    
  }  
  else if (gameState===END){
   
    textSize(20);
    fill(255);
    text("Press Space Key to Restart the Game",camera.position.x-160,200);
   
    if (keyDown("space")){
      reset();
    }

    gameover.x=camera.position.x;
    gameover.visible=true;
    mainCyclist.changeAnimation("boyFalling",mainRacerImg2);
    mainCyclist.velocityX=0;
    rCG.setVelocityXEach(0);
    yCG.setVelocityXEach(0);
    pCG.setVelocityXEach(0);
    arrowG.setVelocityXEach(0);
    obsGroup.setVelocityXEach(0);

      
  }else if(gameState==="win"){

    textSize(20);
    fill(255);
    text("Press Space Key to Restart the Game",camera.position.x-160,200);

    textSize(35);
    fill("green");
    strokeWeight(3);
    stroke(255);
    text("YOU WIN",camera.position.x-50,120);

    rCG.setVelocityXEach(0);
    yCG.setVelocityXEach(0);
    pCG.setVelocityXEach(0);
    arrowG.setVelocityXEach(0);
    obsGroup.setVelocityXEach(0);


    if (keyDown("space")){
      reset();
    }

  }
}

function reset(){

  camera.position.x=400;
  mainCyclist.position.x=30;
  mainCyclist.position.y=150;
  gameState=PLAY;
  pCG.destroyEach();
  rCG.destroyEach();
  yCG.destroyEach();
  distance=0;
  arrowG.destroyEach();
  obsGroup.destroyEach();
  
}

function spawnPlayer(){

  if(frameCount%150===0){
    var rand=Math.round(random(1,3));
    switch(rand){

      case 1 : redPlayer();
        break;
      case 2 : pinkPlayer();
        break;
      case 3 : yellowPlayer();
        break;
      default:break;
    }
  }
}

function redPlayer(){

  redP=createSprite(camera.position.x+450,500);
  redP.y=Math.round(random(50,250));
  redP.addAnimation("runningRed",r1);
  redP.addAnimation("fallingRed",r2);
  redP.velocityX=-3;
  redP.scale=0.06;
  rCG.add(redP);
}


function pinkPlayer(){

  pinkP=createSprite(camera.position.x+450,500);
  pinkP.y=Math.round(random(50,250));
  pinkP.addAnimation("runningPink",p1);
  pinkP.addAnimation("fallingPink",p2);
  pinkP.velocityX=-3;
  pinkP.scale=0.06;
  pCG.add(pinkP);
}


function yellowPlayer(){

  yellowP=createSprite(camera.position.x+450,500);
  yellowP.y=Math.round(random(50,250));
  yellowP.addAnimation("runningYellow",y1);
  yellowP.addAnimation("fallingYellow",y2);
  yellowP.velocityX=-3;
  yellowP.scale=0.06;
  yCG.add(yellowP);
}

function spawnArrow(){

  if(frameCount%200===0){

  arrow=createSprite(camera.position.x+450,500);
  arrow.y=Math.round(random(50,250));
  arrow.addImage(arrowImg);
  arrow.velocityX=-3;
  arrow.scale=0.2;
  arrowG.add(arrow);

  }
}

function spawnOb(){

  if(frameCount%250===0){

  obstacle=createSprite(camera.position.x+450,500);
  obstacle.y=Math.round(random(50,250));
  obstacle.velocityX=-3;
  obstacle.scale=0.1;
  obsGroup.add(obstacle);

  var rand = Math.round(random(1,3));
  switch(rand){

    case 1 : obstacle.addImage(ob1);
      break;
    case 2 : obstacle.addImage(ob2);
      break;
    case 3 : obstacle.addImage(ob3);
      break;
    default:break;

  }
  }
}