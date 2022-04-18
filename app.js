let inputDir={x:0,y:0};
let speed=8;
let score=0;
let lastPaintTime=0;
let snakeArr=[{x:13,y:15}];
food={x:6,y:7};
//game functions
function main(ctime)
{
    window.requestAnimationFrame(main);
   // console.log(ctime);
    if((ctime-lastPaintTime)/1000<1/speed){
        return;
    }
    lastPaintTime=ctime;
    gameEngine();
}
function isCollide(sarr){
    this.score=0;
    //if you bump into yourself
    for(let i=1;i<snakeArr.length;i++)
    {
        if(snakeArr[i].x===snakeArr[0].x && snakeArr[i].y===snakeArr[0].y){
           return true;
        }
    }
    //if you bump into wall
        if(snakeArr[0].x>=20||snakeArr[0].x<=0 || snakeArr[0].y>=20||snakeArr[0].y<=0){
        return true;
        }
        //return false;
}
function gameEngine(){
    //part 1: updating the snake array and food
     if(isCollide(snakeArr))
     {
         inputDir={x:0,y:0};
         alert("Game Over. Press any key to play again");
         snakeArr=[{x:13,y:15}];
         score=0;
     }
     // if you have eaten the food,increment the score and regenerate the food
     if(snakeArr[0].y===food.y && snakeArr[0].x===food.x)
     {
         score+=1;
         if(score>hiscoreval)
         {
            hiscoreval=score;
            localStorage.setItem("hiscore",JSON.stringify(hiscoreval));
            hiscoreBox.innerHTML="High Score: "+hiscoreval;
         }
         scoreBox.innerHTML="Score:"+score;
         snakeArr.unshift({x: snakeArr[0].x + inputDir.x , y: snakeArr[0].y + inputDir.y});
         let a=2;
         let b=16;
         food={x: Math.round(a+(b-a)*Math.random()),y: Math.round(a+(b-a)*Math.random())};
          if(score>=20)
         {
            var element= document.getElementById("modal");
            element.innerHTML = "Level: "+"Specialist";
             element.style.color="#0099cc";
 
            speed=11;
         }
         if(score>=30)
         {
            var element= document.getElementById("modal");
            element.innerHTML = "Level: "+"Expert";
             element.style.color="#000066";
             speed=13;
         }
         if(score>=40)
         {
            var element= document.getElementById("modal");
            element.innerHTML = "Level: "+"Candidate Master";
             element.style.color="#990000";
             speed=16;
         }
         if(score>=50)
         {
            var element= document.getElementById("modal");
            element.innerHTML = "Level: "+"Master";
             element.style.color="#ff3333";
             speed=19;
         }
         if(score>=60)
         {
            var element= document.getElementById("modal");
            element.innerHTML = "Level: "+"Grand Master";
             element.style.color="#ff0000";
             speed=21;
         }
         if(score>=70)
         {
            var element= document.getElementById("modal");
            element.innerHTML = "Level: "+"Legendary GrandMaster";
             element.style.color="#000000";
             speed=30;
         }
     }
     //moving the snake
     for(let i=snakeArr.length -2 ; i >= 0 ;i--)
     {
         snakeArr[i+1]={...snakeArr[i] };
     }
     snakeArr[0].x += inputDir.x;
     snakeArr[0].y += inputDir.y;

    //part 2: updating the snake and food
    //displaying the snake
    board.innerHTML="";
    snakeArr.forEach((e,index)=>{
         snakeElement=document.createElement("div");
         snakeElement.style.gridRowStart=e.y;
         snakeElement.style.gridColumnStart=e.x;
         if(index===0)
         {
            snakeElement.classList.add("head");
         }
         else
         {
            snakeElement.classList.add("snake");
         }
         board.appendChild(snakeElement);
    });
    //displaying the food
         foodElement=document.createElement("div");
         foodElement.style.gridRowStart=food.y;
         foodElement.style.gridColumnStart=food.x;
         foodElement.classList.add("food");
         board.appendChild(foodElement);
}




// main logic starts here
let hiscore=localStorage.getItem("hiscore");
if(hiscore===null)
{
    hiscoreval=0;
    localStorage.setItem("hiscore",JSON.stringify(hiscoreval));
}
else{
    hiscoreval=JSON.parse(hiscore);
    hiscoreBox.innerHTML="High Score: "+hiscore;
}
window.requestAnimationFrame(main);
window.addEventListener('keydown',e=>{
     inputDir={x: 0, y: 1} //start the game
     switch(e.key){
         case "ArrowUp":
             console.log("ArrowUp");
             inputDir.x=0;
             inputDir.y=-1;
             break;
         case "ArrowDown":
             console.log("ArrowDown");
             inputDir.x=0;
             inputDir.y=1;
             break;
         case "ArrowRight":
             console.log("ArrowRight");
             inputDir.x=1;
             inputDir.y=0;
              break;
          case "ArrowLeft":
             console.log("ArrowLeft");
             inputDir.x=-1;
             inputDir.y=0;
             break;      
     }
});
