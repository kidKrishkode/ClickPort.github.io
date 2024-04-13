const clickLevels = [
    [0, 100, "Turtle level", "You are among the 20% of the world's population"],
    [101, 200, "Mouse level", "You are among the 15% of the world's population"],
    [201, 400, "Rabbit level", "You are among the 10% of the world's population"],
    [401, 600, "Buffalo level", "You are among the 6% of the world's population"],
    [601, 800, "Fox level", "You are among the 4% of the world's population"],
    [801, 1000, "Rhino level", "You are among the 2% of the world's population"],
    [1001, 2000, "Gorilla level", "You are among the 1% of the world's population"],
    [2001, 4000, "Elephant level", "You are among the 0.3% of the world's population"],
    [4001, 6000, "Tiger level", "You are among the 0.2% of the world's population"],
    [6001, 8000, "Lion level", "You are among the 0.08% of the world's population"],
    [8001, 10000, "Dragon level", "You are among the 0.05% of the world's population"],
    [10001, Infinity, "God level", "You are among the top 0.03% of the world's population"]
];


let isGameOver = false;
let clickCount = 0;
document.addEventListener("DOMContentLoaded", function(){
    const targetDiv = document.getElementById("targetDiv");
    const clickScreen = document.getElementById("click");
    function handleClick(){
        if(!isGameOver){
            clickCount++;
            clickScreen.value = clickCount;
        }else{
            gameOver();
        }
    }
    targetDiv.addEventListener("click", handleClick);
    targetDiv.addEventListener("touchstart", function(event){
        if(clickCount<=1){
            clickStart();
        }
        event.preventDefault();
        handleClick();
    });
});
function clickStart(){
    const targetDiv = document.getElementById("targetDiv");
    targetDiv.innerHTML="";
    document.getElementById("time").disabled=true;
    setTimeout(()=>{
        gameOver();
    }, limitInSec());
}
function gameOver(){
    isGameOver = true;
    messageOpen();
}
function messageOpen(){
    document.getElementById("message").style.display = "block";
    document.getElementById("cps").textContent = (clickCount/(limitInSec()/1000)).toFixed(1)+" CPS";
    document.getElementById("cit").textContent = clickCount+" Clicks in "+limitInSec()/1000+" Seconds";
    batchUpdate();
}
function messageClose(){
    document.getElementById("message").style.display = "none";
    isGameOver = false;
    clickCount = 0;
    document.getElementById("targetDiv").innerHTML = "<span>Click here to start the test</span>";
    document.getElementById("time").disabled=false;
    document.getElementById("click").value = 0;
}
function limitInSec(){
    let limit = document.getElementById("time").value;
    limit = limit.split(' sec',1);
    limit = limit[0].split(' min',1);
    if(limit[0]=="30"){
        return 30000;
    }else{
        return (limit[0]*1)*60000;
    }
}
function batchUpdate(){
    let score = limitInSec()/1000;
    let point;
    if(score<=30){
        point = clickCount * 2;
    }else{
        point = clickCount / (score/60);
    }
    for(let i=0; i<clickLevels.length; i++){
        if(point>=clickLevels[i][0] && point<=clickLevels[i][1]){
            document.getElementById("batch").style.backgroundImage = `url('./img/${[i+1]}.png')`;
            document.getElementById("level").textContent = clickLevels[i][2];
            document.getElementById("comment").textContent = clickLevels[i][3];
            break;
        }
    }
}