class Game {
    constructor (){

    } 
    getState(){
        var gameStateRef=database.ref("gameState");
        gameStateRef.on("value",function(data){
            gameState=data.val();
        })
    }
    update(state){
        database.ref("/").update({
            gameState:state
        });
    } 
    async start(){
        if (gameState===0){
            player=new Player();
            var playerCountRef=await database.ref("playerCount").once("value");
            if(playerCountRef.exists()){
                playerCount=playerCountRef.val();
                player.getCount();
            }
           
            form=new Form();
            form.display();
        }
        car1=createSprite(100,100);
        car2=createSprite(200,100);
        car3=createSprite(300,100);
        car4=createSprite(400,100);
       
        car1.addImage(car1Image);
        car2.addImage(car2Image);
        car3.addImage(car3Image);
        car4.addImage(car4Image);
        cars=[car1,car2,car3,car4];
    }
    play (){
        form.hide();
        
        Player.getPlayerInfo();
        player.getCarsAtEnd();

        if(allPlayers!==undefined){
            background(ground);
            image(track,0,-displayHeight*4,displayWidth,displayHeight*5);
            var index=0;
            var x =190;
            var y;
        for(var plr in allPlayers){
            index=index+1;
            
            x=x+200;
            y=displayHeight-allPlayers[plr].distance;
            cars[index-1].x=x;
            cars[index-1].y=y;
            if(index===player.index){
              // cars[index-1].shapeColor="green";
              //console.log(index);
              stroke(10);
              fill ("blue");
              rect(cars[index-1].x,cars[index-1].y,200,20);
               camera.position.x=displayWidth/2;
               camera.position.y=cars[index-1].y;
            }
    }
}
    if(keyIsDown(UP_ARROW)&& player.index!==null){
        player.distance=player.distance+50;
        player.update();
    }  
    if (player.distance>3800){
        gameState=2;
        player.rank=player.rank+1;
        Player.updateCarsAtEnd(player.rank);
    }  
    drawSprites();
}
end(){
    console.log("gameEnded");
    console.log(player.rank);
}
}
