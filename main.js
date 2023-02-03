rightwristx=0;
leftwristy=0;
leftwristx=0;
rightwristy=0;
score_rightwrist=0;
score_leftwrist=0;
function preload(){
song=loadSound("music.mp3");
}
function setup(){
canvas=createCanvas(600,500);
video=createCapture(VIDEO);
canvas.center();
video.hide();
poseNet=ml5.poseNet(video,modelloaded);
poseNet.on('pose',gotPoses);
}
function modelloaded(){
console.log("poseNet is initialized");
}
function gotPoses(results){
if(results.length>0){
    score_rightwrist=results[0].pose.keypoints[10].score;
    score_leftwrist=results[0].pose.keypoints[9].score;
    rightwristx=results[0].pose.rightWrist.x;
rightwristy=results[0].pose.rightWrist.y;
leftwristx=results[0].pose.leftWrist.x;
leftwristy=results[0].pose.leftWrist.y;
console.log("scoreRightWrist = " + score_rightwrist + " scoreLeftWrist = " + score_leftwrist);
console.log("RightWristx= "+ rightwristx + "RightWristy= "+ rightwristy);
console.log("LeftWristx= "+ leftwristx + "LeftWristy= "+ leftwristy);
}
}
function draw(){
    image(video,0,0,600,500);
    fill("#FF0000");
    stroke("#FF0000");
    if(score_rightwrist>0.2){
        circle(rightwristx,rightwristy,20);
        if(rightwristy>0&&rightwristy<=100){
            document.getElementById("speed").innerHTML="Speed = 0.5x";
        song.rate(0.5);
        }
        else if(rightwristy>100&&rightwristy<=200){
document.getElementById("speed").innerHTML="Speed = 1x";
song.rate(1);
        }
    else if(rightwristy>200&&rightwristy<=300){
        document.getElementById("speed").innerHTML="Speed = 1.5x";
        song.rate(1.5);
    }
    else if(rightwristy>300&&rightwristy<=400){
        document.getElementById("speed").innerHTML+"Speed = 2x";
        song.rate(2);
    }
    else if (rightwristy>400){
        document.getElementById("speed").innerHTML="Speed = 2.5x";
        song.rate(2.5);
    }
    }
    if(leftwristy>0.2){
        circle(leftwristx,leftwristy,20);
        number_left_wrist_y=Number(leftwristy);
        new_leftwrist_y=floor(number_left_wrist_y*2);
        left_wrist_y1000=new_leftwrist_y/1000;
        document.getElementById("volume").innerHTML="Volume = "+left_wrist_y1000;
song.setVolume(left_wrist_y1000);
    }
}
function play(){
song.play();
song.setVolume(1);
song.rate(1);
}