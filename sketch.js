const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body

var helicopter, helicopterImage, package, packageImage, backGround, backgroundImage;
var packageBody, red1, red2, red3;// the bodies
var backGroundMusic, dropIt;

function preload() {
	helicopterImage = loadImage("helicopter.png");
	packageImage = loadImage("package.png");
	backgroundImage = loadImage("background.png");

	backgroundMusic = loadSound("Creepy background noise.mp3");
	dropIt = loadSound("Drop.wav");
}

function setup() {
    createCanvas(windowWidth, windowHeight);

	//background
	backGround = createSprite(width/2, height/2.6, 10, 10);
	backGround.addImage(backgroundImage);
	backGround.scale = 0.8;

	//package properties
	package = createSprite(width/2, height/5.2, 10, 10);
	package.addImage(packageImage);
	package.scale = 0.2;
	package.velocityX = 5;

	//helicopter properties
	helicopter  = createSprite(width/2, height/5.2, 10, 10);
	helicopter.addImage(helicopterImage);
	helicopter.scale =0.7;
	//helicopter.velocityX = 1;

	//the drop zone sprite
	red1 = createSprite(width/2, height - 40, 200, 20);
	red1.shapeColor = "red";
	red2 = createSprite(width - 550, height - 100, 20, 100);
	red2.shapeColor = "red";
	red3 = createSprite(width - 730, height - 100, 20, 100);
	red3.shapeColor = "red";

	//creating a world
	engine = Engine.create();
	world = engine.world;

	//package's body. This will contain all the physical properties of the package.
	packageBody = Bodies.circle(width/2, height/5.2, 5, {restitution: 0.6, isStatic: true});
	World.add(world, packageBody);

	//helicopter
	helicopter = Bodies.circle(width/2, height/5.2, 10, {isStatic:true});
	World.add(world, helicopter);

	//the drop zone
	red1 = Bodies.rectangle(width/2, height - 40, 200, 20, {isStatic: true});
	World.add(world, red1);
	red2 = Bodies.rectangle(width - 550, height - 80, 20, 100, {isStatic: true});
	World.add(world, red2);
	red3 = Bodies.rectangle(width - 550, height - 80, 20, 100, {isStatic: true});
	World.add(world, red3);


	Engine.run(engine);
	backgroundMusic.play();
}

function draw() {
	Engine.update(engine)

	package.position.x = helicopter.position.x;
	package.position.y = helicopter.position.y;
	package.x = packageBody.position.x;
	package.y = packageBody.position.y;
	helicopter.x = helicopter.position.x;
	helicopter.y = helicopter.position.y;

	drop();

	drawSprites();
	textSize(20);
	stroke("red");
	fill(rgb(243, 209, 209));
	text("Press the down arrow key to help the people in the apocolypse.", width/1.8, height/6);
}


function drop() {
	if(keyDown('down')) {
		Body.setStatic(packageBody, false);
		dropIt.play();
	}
}
