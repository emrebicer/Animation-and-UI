var fft;
var spectrumSample = 1024;
var song;
var playButton;
var amplitude;
var volume;
var randomR, randomG, randomB;
var recR,recG,recB;
var figures = [];
var rings = [];
var cornerCircles = [];

function preload(){
  song = loadSound("songname.mp3");
}


function setup(){
  createCanvas(1920 ,1080);
  amplitude = new p5.Amplitude();
  fft = new p5.FFT();
  playButton = createButton('play');
  playButton.mousePressed(buttonPressed);
  randomR = Math.floor(Math.random() * 255);
  recR = randomR;
  randomG = Math.floor(Math.random() * 255);
  recG = randomG;
  randomB = Math.floor(Math.random() * 255);
  recB = randomB;

  //setup corner circles.
  /*
  var topLeft = new cornerCircle(0,0);
  cornerCircles.push(topLeft);
  var topRight = new cornerCircle(width,0);
  cornerCircles.push(topRight);
  var bottomLeft = new cornerCircle(0,height);
  cornerCircles.push(bottomLeft);
  var bottomRight = new cornerCircle(width,height);
  cornerCircles.push(bottomRight);
  var middleCirc = new cornerCircle(width/2,height/2);
  cornerCircles.push(middleCirc);
*/


  angleMode(DEGREES);

}

function draw(){
  handleBackground();
  handleCornerCircles();
  handleFigures();
  handleFrequencyBars();
}


function handleCornerCircles(){
  for(var i = 0;i<cornerCircles.length ; i++){
    cornerCircles[i].update();
    cornerCircles[i].show();
  }
}

function handleFrequencyBars(){
  strokeWeight(0.2);
  stroke(255);
  smooth(0.9);
  var spectrum = fft.analyze();
  for(var i = 0;i<spectrum.length;i++){
    if(spectrum[i] > 3){
      var y = (height * 90 / 100) * spectrum[i] / 256;
      var x = width * i / spectrum.length;
      //Upper line
      line(x , height/2 , x , height/2 - y / 2);
      //lower line
      line(x , height/2 , x , height/2 + y / 2);
    }
  }
}

let bgLerpValue = 0.1;
function handleBackground(){
  volume = amplitude.getLevel();
  if(volume > 0.2){
    recR = lerp(recR,114,bgLerpValue);
    recG = lerp(recG,56,bgLerpValue);
    recB = lerp(recB,114,bgLerpValue);
  }
  else{
    recR = lerp(recR,randomR,bgLerpValue);
    recG = lerp(recG,randomG,bgLerpValue);
    recB = lerp(recB,randomB,bgLerpValue);
  }
  background(volume*(255-recR) + recR,volume*(255-recG) + recG , volume*(255-recB) + recB,50);

  //Not bad but not sure
  //background(volume*(255-randomR) + randomR,volume*(255-randomG) + randomG , volume*(255-randomB) + randomB,volume*50);


}

function handleFigures(){
  if(figures.length < 12){
    var newFig = new figure();
    figures.push(newFig);
  }

  for(var i = 0;i<figures.length;i++){
    //if a figure is dead delete it.
    if(figures[i].isDead == true){
        figures[i] = null;
        figures.splice(i, 1);
    }
    else{
      //if not dead show and update the figure
      figures[i].update();
      figures[i].show();
    }
  }

  for(var i = 0;i<rings.length;i++){
    if(rings[i].radius < width / 2){
      //Draw
      rings[i].update();
      rings[i].show();
    }
    else{
      //delete
      rings[i] = null;
      rings.splice(i, 1);
    }
  }


}

function cornerCircle(x,y){
  this.xPos = x;
  this.yPos = y;
  this.radius = 0.1;
  this.circles = [];

  this.update = function(){
    if(volume > 0.4){
      var newCircle = this.radius;
      this.circles.push(newCircle);
    }

    //Update circles
    for(var i = 0;i<this.circles.length;i++){
      this.circles[i] += 8;
    }

    //Delete circles
    for(var i = 0;i<this.circles.length;i++){
      if(this.circles[i] > height){
        this.circles[i] = null;
        this.circles.splice(i, 1);
      }
    }
  }
  this.show = function(){
    noFill();
    stroke(61);
    for(var i = 0;i<this.circles.length;i++){
      ellipse(this.xPos,this.yPos,this.circles[i],this.circles[i]);
    }
  }
}


function ring(x,y,r){
  this.xPos = x;
  this.yPos = y;
  this.radius = r;

  this.update = function(){
    this.radius += 10;
  }

  this.show = function(){
    strokeWeight(0.1);
    stroke(255);
    noFill();
    ellipse(this.xPos,this.yPos,this.radius,this.radius);
  }
}

function figure(){
  this.radius = Math.random() * (height/4) + (height/8);
  //this.radius = Math.random() * 80 + 20;
  this.shape = Math.random() * 5;
  this.xPos = width/2;
  this.yPos = height/2;
  this.xVel = (Math.random() * 2 - 1);
  this.yVel = (Math.random() * 2 - 1);
  if(randomR > 80){
    this.R = randomR + ( Math.floor(Math.random() * 50 - 25) );
  }
  else{
    this.R = randomR;
  }
  if(randomR > 80){
    this.G = randomG + ( Math.floor(Math.random() * 50 - 25) );
  }
  else{
    this.G = randomG;
  }
  if(randomR > 80){
    this.B = randomB + ( Math.floor(Math.random() * 50 - 25) );
  }
  else{
    this.B = randomB;
  }
  this.displayRadius = this.radius;
  this.IntenseColor = Math.max(this.R,this.G,this.B);
  this.rotationAngle = 0;
  this.rotationSpeed = 0;
  while(Math.abs(this.rotationSpeed) < 1){
    this.rotationSpeed = Math.random() * (3) - 1.5;
  }


  this.update = function(){

    //ring creation
    if(volume > 0.2){
      var newRing = new ring(this.xPos,this.yPos,this.radius);
      rings.push(newRing);
    }


    if(song.isPlaying()){
      //Handle movement
      this.xPos += this.xVel;
      this.yPos += this.yVel;
    }

    //Handle collisions
    //Bottom corner
    if(this.yPos + this.radius >= height){
      this.yVel = -this.yVel;
    }
    //Top corner
    if(this.yPos - this.radius <= 0){
      this.yVel = -this.yVel;
    }
    //Right corner
    if(this.xPos + this.radius >= width){
      this.xVel = -this.xVel;
    }
    //Left corner
    if(this.xPos - this.radius <= 0){
      this.xVel = -this.xVel;
    }


    if(song.isPlaying()){
      //Change the radius based on the amplitude
      this.displayRadius = this.radius + (height / 3)*amplitude.getLevel();
    }
    else{
      if(this.displayRadius > 0.2){
        this.displayRadius -= 0.2;
      }
    }

  }
  this.show = function(){
      /* this works fine
      noStroke();
      fill(color(this.R, this.G, this.B));
      ellipse(this.xPos,this.yPos,this.displayRadius,this.displayRadius);
      */

      noStroke();
      var colorFactor = 0.3;
      for(var i = 0;i<36;i++){
        if(this.IntenseColor == this.R){
          fill(color((this.R - i*colorFactor) % 255, this.G - volume * 40, this.B - volume * 40));
        }
        else if(this.IntenseColor == this.G){
          fill(color(this.R - volume * 40, (this.G - i*colorFactor) % 255, this.B - volume * 40));
        }
        else if(this.IntenseColor == this.B){
          fill(color(this.R - volume * 40, this.G - volume * 40, (this.B - i*colorFactor)%255));
        }
        else{
          console.log("error on intense color");
          fill(color(this.R , this.G, this.B));
        }
        arc(this.xPos,this.yPos,this.displayRadius,this.displayRadius,this.rotationAngle + 10 * i,this.rotationAngle + 10 * i + 10 );
      }
      this.rotationAngle += this.rotationSpeed;
      if(this.rotationSpeed > 0){
        this.rotationAngle += 5 * volume;
      }
      else{
        this.rotationAngle += -5 * volume;
      }


      if(this.rotationAngle > 360){
        this.rotationAngle = 0;
      }
      else if(this.rotationAngle < -360){
        this.rotationAngle = 0;
      }

      //debug
      /*
      strokeWeight(0.2);
      stroke(255);
      ellipse(this.xPos,this.yPos,this.radius,this.radius);
      */

  }

}

function buttonPressed(){
  if(song.isPlaying()){
    song.pause();
  }
  else{
    song.play();
  }
}
