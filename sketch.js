var dog,dogimage,dogHappy;
var database,foodstock;
var FoodS
var feedtime,lastFed,feed,addfood,foodObj;
function preload()
{
  dogimage = loadImage("images/dogImg.png");
  dogHappy = loadImage("images/dogImg1.png");
}

function setup() {
	createCanvas(800, 700);
  dog = createSprite(400,500,100,100);
  foodObj = new Food();
  feed=createButton("Feed the dog");
  feed.position(700,95);
  feed.mousePressed(feedDog);

  addFood=createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addfood);

  dog.addImage(dogimage);
  dog.scale=0.3;
  database = firebase.database();
  foodstock = database.ref("Food");
  foodstock.on("value",readstock);
}


function draw() {  
background("green")
foodObj.display();
if(keyWentDown(UP_ARROW)){
  writeStock(FoodS);
  dog.addImage(dogHappy);
}
fedTime=database.ref('FeedTime');
  fedTime.on("value",function(data){
    lastFed=data.val();
  });
 
  fill(255,255,254);
  textSize(15);
  if(lastFed>=12){
    text("Last Feed : "+ lastFed%12 + " PM", 350,30);
   }else if(lastFed==0){
     text("Last Feed : 12 AM",350,30);
   }else{
     text("Last Feed : "+ lastFed + " AM", 350,30);
   }
  drawSprites();
  //add styles here

}

function writePosition(x,y){
  database.ref("food").set({
      'x':position.x+x,
      'y':position.y+y
  })

}
function readstock(data){
    FoodS = data.val();
    console.log(FoodS)
}

function writeStock(x){ 
  if(x<=0){ x=0; }
  else{ x=x-1; } 
  database.ref('/').update({ Food:x }) }
  
  function addfoodS(){
    foodS++
    database.ref('/').update({ Food:foodS })
  }

 function feedDog(){
   dog.addImage(dogHappy);
   foodObj.updateFoodStock(foodObj.getFoodStock()-1); 
   database.ref('/').update({ Food:foodObj.getFoodStock(), FeedTime:hour() })
 }

 