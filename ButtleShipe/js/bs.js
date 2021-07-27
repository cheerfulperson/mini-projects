var view = {
    hello : "HI" ,
    displayArea : function(msg){
        var messageArea = document.getElementById("messageArea");
        messageArea.innerHTML = msg;
    },
    displayHit : function(location){
        var cell = document.getElementById(location);
        cell.setAttribute("class", "hit");

    },
    displayMiss : function(location){
        var cell =  document.getElementById(location);
        cell.setAttribute("class", "miss");
    }

};
var model = {
bordsize : 7,
numShips: 3,
shipLength : 3,
shipsSunke : 0,
ships : [{ location: [0,0,0], hits : [ "","","" ] },
{ location: [0,0,0], hits : [ "","","" ] },
{ location: [0,0,0], hits : [ "","","" ] } ],
fire :  function(guess) {
    for(var i = 0;i < this.numShips;i++){
        var ship = this.ships[i];
        var index = ship.location.indexOf(guess);
        if(index >= 0){
            ship.hits[index] = "Hit" ;
            view.displayHit(guess);
            view.displayArea("You hit");         
            if(this.isSunk(ship)){
                view.displayArea("You sank my ship");
                this.shipsSunke++;
            }    
            return true;       
        }      
        
    }
        view.displayMiss(guess);
        view.displayArea("You missed.")
        return false;
},
isSunk : function(ship){
    for(var i=0 ; i<=this.shipLength ;i++){
        if(ship.hits[i] !== "Hit"){
            return false;
        }
    }
    return true;
},
generateShipLocation : function(){
var location;
for (var i=0;i<this.numShips;i++ ){
    do{
location = this.generateShip();
    }while(this.collision(location));
    this.ships[i].location = location;
}
},
generateShip : function() {
    var direction = Math.floor(Math.random()* 2);
    var row,cool;
    if(direction === 1){
        row = Math.floor(Math.random() * this.bordsize);
        cool = Math.floor(Math.random() * (this.bordsize-this.shipLength));   
     } else {
        cool = Math.floor(Math.random() * (this.bordsize-this.shipLength));
        row = Math.floor(Math.random() * this.bordsize);
    }
    
      
    var newShipLocation = [];
    for(var i = 0; i < this.shipLength ; i++){ 
        
    if(direction === 1){
        
       newShipLocation.push(row + "" + (cool + i));
       
    }else{
       
        newShipLocation.push( (row + i) + ""  + cool);
        
    }
    
}
return newShipLocation;
},
collision : function(location){
for(var i = 0 ; i < this.numShips;i++ ){
    var ship = model.ships[i];
    for(var j = 0; j < location.length ; j++){
        if(ship.location.indexOf(location[j]) >= 0){
            return true;
        }
    }
}
return false;
}
};
console.log(model.ships);

var controller = {
    guesses : 0,
   
    progressGUess : function(guess){
        var location = parseGuess(guess);
        if(location){
            this.guesses++;
            var hit = model.fire(location);
                if (hit && model.shipsSunke === model.numShips){
                    view.displayArea("You sank my all ship with  " + this.guesses + "guesess");
                    
                 }
             }
        }
            
    };
    function parseGuess(guess){
        var alphabet = ["A","B","C","D","E","F","G"];

        if(guess === null || guess.length !== 2){
            alert("Please enter a number on the board");
        }
        else{
             var char = guess.charAt(0);
             var row = alphabet.indexOf(char);
             var collumn = guess.charAt(1);
             if (isNaN(row) ||  isNaN(collumn)){
                 alert("That it is not on board");
             }else if(row < 0 || row >= model.bordsize || collumn < 0 || collumn >= model.bordsize){
                 alert("that's of the board")
             }else{
                 return row + collumn;
             }

        }
        return null;
    }  

function init(){
    var fireButtom = document.getElementById("fireButton");
    fireButtom.onclick = handleFireButton;
    var guessInput = document.getElementById("guessInput");
    guessInput.onkeypress = handleKeyPress;
    model.generateShipLocation();
}
function handleKeyPress(e){
    var fireButtom = document.getElementById("fireButton");
    if(e.keyCode === 13){
        fireButtom.click();
        return false;
    }
}
function handleFireButton(){
var guessInput = document.getElementById("guessInput");
var guess = guessInput.value;
controller.progressGUess(guess);

guessInput.value = "";
}
window.onload = init ;
console.log(view.hello);

