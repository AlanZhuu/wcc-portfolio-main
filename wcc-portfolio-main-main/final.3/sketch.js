// Yingcheng Zhu
// "Seawave Sound visualization"
// reference from "The Coding Train", "Colorful Coding"


var sound;
var volHistory = [];
var amp; 
var button;


function toggleSound(){
  if (sound. isPlaying()){
 sound.pause();
}else{
  sound.play();
}
}

function preload(){
sound = loadSound('SeaWave.mp3');//load "Seawave" sound from file

}
function setup() {
  createCanvas(1100, 800);
 
  button = createButton('toggle');
  button.mousePressed(toggleSound);
  sound.play();
  noiseDetail(2);// Set noise detials
  
  color (HSB);
  angleMode(DEGREES);
  rectMode(CENTER);
  frameCount=120;
  amp = new p5.Amplitude();
  //mic.start();

}

function draw() {
  background(20,12,3);
  var vol = amp.getLevel(); //sound volue
  volHistory.push(vol);

  translate(width/2,height/2);
 
  var r= map(sin(frameCount),-1,1,50,255);// set red color range
  var g= map(cos(frameCount/2),-1,1,50,255);// set green color range
  var b= map(sin(frameCount/4),-1,1,50,255);// set blue color range

  stroke(r,g,b);
  for ( let i=0; i<volHistory.length; i++){
    
    for (let k=0; k<600;k+=160){
      
    let p = map(volHistory[i],0,1, height,0);
      
    rotate (sin(frameCount+i)*0.5);
  
      noFill();

    var xoff= map(cos(i),-1,1,0,3);// set noise range
    var yoff= map(sin(i),-1,1,0,3);// set noise range

    var n=noise (xoff + volHistory[i], yoff + volHistory[i]);
    var h= map (n,0,1,-150,150)//this can influence where pattern will be on canvas
   
   strokeWeight(1);
    push();
    stroke(r,i,b);
    ellipse(i,0.2*p,0.3*h,0.3*h);
    ellipse(i,-0.5*p,h);
    ellipse(i,0.8*p,0.3*h,0.3*h);
    pop();
      
    stroke(i,g,b);
    point(i,0.1*p);
    point(i,-0.2*p);
    point(i,0.5*p);
    point(i,0.8*p);
    point (i,-p*0.5,vol*2*h,vol*-0.2);
    point (i,p*0.7,-h,1.3);
    point (-i,p*0.3,vol*5*h,0.5);
    point (i,-p*0.9,5*h,-0.5);
    
    point(-p*0.1,i,1.5*h,0.5*h);
    point(p*0.2,i,2*h,-1.4*h);
    point(p*0.3,-i,3*h,1.3*h);
    point(-p*0.4,i,1.3*h,0.5*h);
    rect(p*0.4,-i,0.3*h,0.5*h);
    rect(-p*0.75,i,0.3*h,0.5*h);
    point(p*0.5,i,0.5*h,0.5*h);
    point(p*0.6,i,0.2*h,0.4*h);
    point(p*0.7,-i,3*h,0.3*h);
    point(p*0.8,i,0.3*h,0.5*h);
    point(-p*0.9,i,vol*6*h,vol*9*h);

    }

  }
    
  console.log(vol);

  if (volHistory.length>width){
    volHistory.splice(0,1); 
  }
  
   if (volHistory.length>height){
    volHistory.splice(0,1); 
  }
}
