function setup() {
    canvas = createCanvas(600, 500);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
    video.center();
    poseNet = ml5.poseNet(video, modelloaded);
    poseNet.on("pose", gotposes);
    
}

function draw() {
    image(video, 0, 0, 600, 500);

    fill("#FF0000");
    stroke("#FF0000");
    circle(leftWrist_x, leftWrist_y, 20);

    InleftWrist=Number(leftWrist_y);
    decimal_remove=floor(InleftWrist*100);

    final_volume=decimal_remove/500;
    document.getElementById("volume_button").innerHTML=" volume = "+ final_volume +" %";
    song.setVolume(final_volume);
}

song="";

function preload() {
    song=loadSound("updated.webm");
}


function play() {
    song.play();
   
    song.rate(1);
}

function stop() {
    song.stop();
}

function modelloaded() {
    console.log("yes the model is loaded");

}

leftWrist_x=0;
leftWrist_y=0;
rightWrist_x=0;
rightWrist_y=0;

score_right=0;
score_left=0;

function gotposes(results) {
    if(results.length>0){
        console.log(results);

        score_right=results[0].pose.keypoints[10].score;
        score_left=results[0].pose.keypoints[9].score;
        console.log("score for right wrist = "+ score_right + " Score for left wrist = " + score_left);

        leftWrist_x = results[0].pose.leftWrist.x;
        leftWrist_y = results[0].pose.leftWrist.y;
        console.log("left wrist x = "+leftWrist_x + " left wrist y = "+leftWrist_y);

        rightWrist_x = results[0].pose.rightWrist.x;
        rightWrist_y = results[0].pose.rightWrist.y;
        console.log("right wrist x = " + rightWrist_x + " right wrist y = " + rightWrist_y);
    }
}

function draw() {
    image(video, 0, 0, 600, 500);

    fill("#FF0000");
    stroke("#FF0000");

    if(score_left > 0.1){

        circle(leftWrist_x, leftWrist_y, 20);

    InleftWrist=Number(leftWrist_y);
    decimal_remove=floor(InleftWrist*100);

    final_volume=decimal_remove/500;
    document.getElementById("volume_button").innerHTML=" volume = "+ final_volume +" %";
    song.setVolume(final_volume);

    }

    if(score_right > 0.1){

        circle(rightWrist_x, rightWrist_y, 20);

        if(rightWrist_y>0 && rightWrist_y<=100){
            document.getElementById("speed_button").innerHTML = "Speed = 2.5x";
            song.rate(2.5);
        }

        else if(rightWrist_y>100 && rightWrist_y<=200){
            document.getElementById("speed_button").innerHTML = "Speed = 2.0x";
            song.rate(2);
        }

        else if(rightWrist_y>200 && rightWrist_y<=300){
            document.getElementById("speed_button").innerHTML = "Speed = 1.5x";
            song.rate(1.5);
        }

        else if(rightWrist_y>300 && rightWrist_y<=400){
            document.getElementById("speed_button").innerHTML = "Speed = 1.0x";
            song.rate(1);
        }

        else if(rightWrist_y>400){
            document.getElementById("speed_button").innerHTML = "Speed = 0.5x";
            song.rate(0.5);
        }
    }
    
}


