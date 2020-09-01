class Player {
     constructor(){
            this.rank=null;
            this.index=null;
            this.distance=0;
            this.name=null;
     }
     getCount(){
         var getCountRef=database.ref("playerCount")
         getCountRef.on("value",function(data){
             playerCount=data.val();
         })
     }
     updateCount(count){
         database.ref("/").update({
             playerCount:count
         })
     }
     update(){
         var playerIndex="players/player"+this.index;
         database.ref(playerIndex).set({
             name:this.name,
             distance:this.distance

         })
     }
     static getPlayerInfo(){
         var playerInfoRef = database.ref("players");
         playerInfoRef.on("value",(data)=>{
             allPlayers= data.val();
         })
     }
     getCarsAtEnd(){
         database.ref("CarsAtEnd").on("value", (data)=>{
             this.rank=data.val();
         })
     }
     static updateCarsAtEnd(rank){
         database.ref("/").update({
             CarsAtEnd:rank
         })
     }
}
