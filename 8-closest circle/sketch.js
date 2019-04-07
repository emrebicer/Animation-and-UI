
var obstacles = [];
var myCircle;

function setup(){
  //createCanvas(800,600);
  createCanvas(displayWidth,displayHeight);
  for(var i = 0 ; i < 15; i++){
    var ob = new Obstacle();
    obstacles.push(ob);
  }
  myCircle = new ourCircle();

}


function draw(){

  background(81);



  for (var i = 0; i < obstacles.length; i++) {
    obstacles[i].show();
  }


  myCircle.update();
  myCircle.show();



}


function ourCircle(){
  this.x = mouseX;
  this.y = mouseY;
  this.r = 1;


  this.update = function(){
    this.x = mouseX;
    this.y = mouseY;

    var closest = obstacles[0];
    for (var i = 0; i < obstacles.length; i++) {
      if(dist(this.x,this.y,obstacles[i].x,obstacles[i].y) - obstacles[i].r/2 < dist(this.x,this.y,closest.x,closest.y) - closest.r/2 ){
        closest = obstacles[i];
      }
    }

    /* visual color debug */
    /*
    for (var i = 0; i < obstacles.length; i++) {
      if(obstacles[i] == closest){
        closest.color = color(255,0,50);
      }
      else{
        obstacles[i].color = color(100);
      }
    }
    */
    this.r = (dist(this.x,this.y,closest.x,closest.y) - closest.r/2)*2;

  }

    this.show = function(){
      strokeWeight(5);
      stroke(20,20,20);
      fill(0, 167, 228);
      ellipse(this.x,this.y,this.r,this.r);
    }

}


function Obstacle(x,y){

  this.x = Math.random()*width;
  this.y = Math.random()*height;
  this.r = Math.random() * height/5 + height/10;
  /*
  console.log(this);
  while(true){

    var flag = true;
    for(var i = 0 ; i < obstacles.length;i++){
      if(obstacles[i] != this){
        var distance = dist(this.x,this.y,obstacles[i].x,obstacles[i].y);
        if(distance < this.r + obstacles[i].r){
          flag = false;
          console.log("oops");
          break;
        }
      }
    }

    if(flag){
      break;
    }

  }
  */
  this.color = color(Math.random()*255);


  this.update = function(){

  }

  this.show = function(){
    noStroke();
    fill(this.color);
    ellipse(this.x,this.y,this.r,this.r);
  }


}
