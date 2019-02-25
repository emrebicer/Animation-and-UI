var recHour;
var recMinute;
var recSecond;
let hourRadius;
let minuteRadius;
let secondRadius;
let font;
var spinningAngle = 0;

function preload(){
  font = loadFont("./Montserrat-Bold.otf");
}

function setup(){
  createCanvas(600,600);
  hourRadius = height / 6;
  minuteRadius = height / 4;
  secondRadius = height / 3.5;
  angleMode(DEGREES);
  noStroke();
  textAlign(CENTER);
  textFont(font);
}


function draw(){
  background(20,60);

  //Get the time information.
  recHour = hour();
  recMinute = minute();
  recSecond = second() - 1;
  recSecond = lerp(second()-1,recSecond,0.0001);


  //draw the large circle that covers the clock.
  stroke(200);
  strokeWeight(0.4);
  noFill();
  //ellipse(width/2,height/2,height - height/64,height - height/64);

  for(var i = 0 ; i < 360 ; i++){
    stroke(i * 255 / 360 + 55 , 50 , 100*i / 255);
    arc(width/2,height/2,height - height/64,height - height/64 , i + spinningAngle * 2, i + 1 + spinningAngle * 2);
  }

  strokeWeight(0.2);
  stroke(200,0,100);
  for(var i = 0 ; i < 12 ; i++){
    push();
    translate(width/2,height/2);
    //12    2
    //360   ?
    spinningAngle-= 0.01;
    var angle = 360 * i / 12 + spinningAngle;
    var xPoint = (height * 4 / 12 + (i%2 * height/10) + (height / 32 * recSecond / 60)) * sin(angle);
    var yPoint = (height * 4 / 12 + (i%2 * height/10) + (height / 32 * recSecond / 60)) * cos(angle);
    fill(200);
    ellipse(xPoint,yPoint,height/32,height/32);

    strokeWeight(2);
    stroke(255,200,200,12);
    line(0,0,xPoint,yPoint);

    pop();
  }

  //draw the line for hour.
  push();
  translate(width/2,height/2);
  rotate(180);
  stroke(255);
  strokeWeight(8);
  //Calculate the angle.
  //12        8
  //360    ?
  var ang = 360 * (12 - (recHour % 12)) / 12;
  var xPoint = hourRadius * sin(ang);
  var yPoint = hourRadius * cos(ang);
  line(0,0,xPoint,yPoint);

  pop();


  //draw the line for minute.
  push();
  translate(width/2,height/2);
  rotate(180);
  stroke(120);
  strokeWeight(6);
  //Calculate the angle.
  //60        24min
  //360        ?
  ang = 360 * (60 - recMinute) / 60;
  xPoint = minuteRadius * sin(ang);
  yPoint = minuteRadius * cos(ang);
  line(0,0,xPoint,yPoint);
  pop();


  //draw the line for seconds.
  push();
  translate(width/2,height/2);
  rotate(180);
  stroke(220,0,60);
  strokeWeight(2);
  //Calculate the angle.
  //60        12seconds
  //360        ?
  ang = 360 * (60 - recSecond) / 60;
  xPoint = secondRadius * sin(ang);
  yPoint = secondRadius * cos(ang);
  line(0,0,xPoint,yPoint);
  pop();



  //Write the time as a text.
  fill(200);
  stroke(100);
  recHour = recHour % 12;
  if(recHour < 10){
    recHour = "0" + recHour;
  }
  if(recMinute < 10){
    recMinute = "0" + recMinute;
  }
  textSize(42);
  text(recHour+" : "+recMinute , width/2, height/2 + height / 6);
  textSize(12);
  text(day() + " / " + month() + " / " + year(),width/2, height/2 + height / 4.5);

}
