function setup(){
    canvas = createCanvas(600,400);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();
    PoseNet = ml5.poseNet(video,modelLoaded);
    PoseNet.on("pose", gotPoses);
}

function modelLoaded(){
 console.log("PoseNet is ready")
}

function draw(){
    image(video , 0 , 0 , 600 , 400) ;

    fill("red");
    stroke("black");

    if (scoreleftwrist > 0.2) 
    {
    circle(leftWristX,leftWristY,20);
    numberleftwristy = Number(leftWristY);
    removedecimal = floor(numberleftwristy);
    divide = removedecimal/1000;
    multiply = divide*2;
    volume = multiply;
    document.getElementById("vol").innerHTML = "Volume : " + volume;
    song.setVolume(volume);
    }
}

song = "";

function preload(){
    song = loadSound("music.mp3");
}

function play(){
    song.play();
    song.setVolume(1);
    song.rate(1);
}

leftWristX = 0;
leftWristY = 0;

rightWristX = 0;
rightWristY = 0;

function gotPoses(results){
    if(results.length > 0){
        console.log(results);
        scoreleftwrist = results[0].pose.keypoints[9].score;
        console.log("scoreLeftWrist : " + scoreleftwrist);

        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log("leftWristX = " + leftWristX + "leftWristY = " + leftWristY);

        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("rightWristX = " + rightWristX + "rightWristY = " + rightWristY);

    }
}