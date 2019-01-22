let nums = [0x7E, 0x30, 0x6D, 0x79, 0x33, 0x5B, 0x5F, 0x70, 0x7F, 0x7B,0x77,0x1F,0x4E,0x3D,0x4F,0x47];
let index=0;


window.setInterval(function(){
  sevenSegment(nums[index]);
  index = (index + 1) % nums.length;
}, 1000);


function getColor(val, shift) {
  let r = 255;
  let g = 0;
  let b = 0;
  let a = ((val >> shift) & 1);
  if(a == 0){
    r = 150;
    g = 150;
    b = 150;
    a = 0.3;
  }
  return "rgb("+r+","+g+","+b+","+a+")";
}


function sevenSegment(val) {

  // A
  var recRGB = (getColor(val, 6));
  $('#a').css("background-color",recRGB);
  // B
  recRGB = (getColor(val, 5));
  $('#b').css("background-color",recRGB);
  // C
  recRGB = (getColor(val, 4));
  $('#c').css("background-color",recRGB);
  // D
  recRGB = (getColor(val, 3));
  $('#d').css("background-color",recRGB);
  // E
  recRGB = (getColor(val, 2));
  $('#e').css("background-color",recRGB);
  // F
  recRGB = (getColor(val, 1));
  $('#f').css("background-color",recRGB);
  // G
  recRGB = (getColor(val, 0));
  $('#g').css("background-color",recRGB);

}
