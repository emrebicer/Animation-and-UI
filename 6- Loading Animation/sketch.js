var ang = 0;
function setup(){
  createCanvas(600,600);
  angleMode(DEGREES);
  noFill();

}
function draw(){
  background(20,20,20,30);
  strokeWeight(8 + 8*sin(ang));
  push();
  translate(width/2,height/2);
  rotate(ang);
  for(var i = 0; i < 360 ; i++){
    stroke(color(i/2,0,i));
    arc(0 , 0 , width / 2 + sin(ang/2) * 30, width / 2 + sin(ang/2) * 30, i , i + 1);
  }
  var startX = width / 2 + sin(-ang + 90) * width / 4;
  var startY = height / 2 + cos(-ang + 90) * width / 4;
  pop();
  ang+= 4;
}
