window.onload = function(){
    let canvas = document.getElementById('canvas');
    let c = canvas.getContext('2d')
    let width = canvas.width;
    let height = canvas.height;
    var r = document.getElementById('rules');
    var f = document.getElementById('foilR');
    var openOrClose = 1;
    clickR();
    function clickR(){
        r.onclick = getTextRule
    }
    function getTextRule(){
        if(openOrClose % 2 === 0){
            f.innerHTML = ''; 
            f.className = '';
            r.innerHTML = "rules";
            openOrClose++;
        }else{
            f.innerHTML = 'You should go, if you drive off the ' + 
            'road or crash into a car you. You lose. '
            +  'If you driving one car you get 100$ and 500$ if you driving very near car.'; 
            f.setAttribute('class','f');
            r.innerHTML = "close";
            openOrClose++;
        }
    }
    var road = {
        lineY : 10,
        getRoad : function(){
            c.fillStyle = "#252325";
            c.fillRect(width/4, 0, 300, height);            
            c.fillStyle = "white"         
            c.fillRect(width / 4, 0, 2, height);          
            c.fillRect(width / 4 + 4, 0, 2, height);          
            c.fillRect(width / 2 + 4, 0, 2, height);          
            c.fillRect(3 * width / 4, 0, 2, height);          
            c.fillRect(3 * width / 4 - 4, 0, 2, height);  
            for (let i = 0; i < 15; i++) {
                c.fillRect(width / 2 - 70, this.lineY + (i * 40), 2, 20);
                c.fillRect(width / 2 + 75, this.lineY + (i * 40), 2, 20);
            }          
        }
    }
    var recordForGAmer = 0;
    function getBigBonus(){
        recordForGAmer += 500;
        document.getElementById('record').innerHTML = "$ " + recordForGAmer;
    }
    function getBonus(){
        recordForGAmer += 100;
        document.getElementById('record').innerHTML = "$ " + recordForGAmer;
    }
    function getCar(x, y, size){
        c.fillStyle = "gray";
        c.fillRect(x ,y, size, size * 2);
        c.fillStyle = "blue";
        c.fillRect(x + 4, y + 48, size - 8, size - 20);
        c.fillRect(x + 4, y + 18, size - 8, size - 24);
        c.fillStyle = "gold";
        c.fillRect(x + 2, y, size / 5, size / 8);
        c.fillRect(x + 30, y, size / 5, size / 8);
        c.fillStyle = "red";
        c.fillRect(x + 2, y + 79, size / 5, size / 20);
        c.fillRect(x + 30, y + 79, size / 5, size / 20);
        c.fillStyle = "white";
        c.fillRect(x - 1, y + 10, size / 20, size / 2);
        c.fillRect(x + 40, y + 10, size / 20, size / 2);
        c.fillRect(x - 1, y + 55, size / 20, size / 2);
        c.fillRect(x + 40, y + 55, size / 20, size / 2);
        c.fillStyle = "black";
        c.fillRect(x + 2, y + 72, size - 4, size / 20 );
    }
    function newGames(){
        window.location.reload();
    }
    function newGame(){
        var il = null;
        if(recordForGAmer > 1000 && recordForGAmer <= 3000){
            il = "уже лучше";
        }else if(recordForGAmer <= 1000){
            il = "лох";
        } else if(recordForGAmer > 3000 && recordForGAmer <= 5000){
            il = "уже не лох, но играет как рачек";
        }
        if (recordForGAmer > 5000 ) {
            il = "ты молодец < но мой рекорд 100000$"
        }
        recordForGAmer == 0 ? il = "ты играешь как говно" : console.log("sl")
        document.getElementById('close').innerHTML = '<div class="poleForCose"></div><div class="closeWindow">' + 
                    '<p class="Losse">You losse, but you can repite just click on button. Your score is ' 
                    + recordForGAmer + " " +il
                    + '</p>' 
                    + '<button id="buttonStart">repeat</button>'+
                '</div>';
                document.getElementById('buttonStart').onclick = newGames; 
    }

    function Car(){
        this.arr = [175, 250, 325];
        this.x = this.arr[Math.floor(Math.random() * 3)];
        this.y = 600;
        this.xspeed = 0;
        this.yspeed = 0; 
        this.yCarsSpeed = 0;
        this.bool = true;
    }
    Car.prototype.setDirection = function(direction){
        if (direction == 37) {
            this.xspeed = -1;
            this.yspeed = -1; 
            this.yCarsSpeed = -1;
        }else if (direction == 38) {
            this.xspeed = 0;
            this.yspeed = -2;
            this.yCarsSpeed = -1;
        }else if (direction == 39) {
            this.xspeed = 1;
            this.yspeed = -1; 
            this.yCarsSpeed = -1;
        }else if (direction == 40) {
            this.xspeed = 0;
            this.yspeed = 2;
            this.yCarsSpeed = -2;
        }else if (direction == 32) {
            this.xspeed = 0;
            this.yspeed = 0;
            this.yCarsSpeed = 0;
        }else if (direction == 90) {
            this.xspeed = 0;
            this.yspeed = 0;
            this.yCarsSpeed = -2;
        }else if (direction == 88) {
            this.xspeed = 0;
            this.yspeed = -4;
            this.yCarsSpeed = -2;
        }         
    }
    Car.prototype.getNewPosForCars = function(){
        car0.getNewCarsPosition()
        car1.getNewCarsPosition()
        car2.getNewCarsPosition()
        car3.getNewCarsPosition()
        car4.getNewCarsPosition()
    }
    Car.prototype.move = function(){
        this.x += this.xspeed;
        this.y += this.yspeed;
        if (this.y < 0) {
            this.y = height;
            this.getNewPosForCars();
        } else if (this.y > height) {
            this.y = 0;
            this.getNewPosForCars();
        }
    }
    Car.prototype.moveCars = function(){
        car0.drawCars()
        car0.move()
        car1.drawCars()
        car1.move()
        car2.drawCars()
        car2.move()
        car3.drawCars()
        car3.move()
        car4.drawCars()
        car4.move()
    }
    function getCars(x, y, size, num, arr){       
        if (arr[num] == "car1") {
            c.fillStyle = "black";
        }else if (arr[num] == "car2") {
            c.fillStyle = "white";
        }else if (arr[num] == "car3") {
            c.fillStyle = "green";
        }else if (arr[num] == "car4") {
            c.fillStyle = "#00ff9d";
        }else if (arr[num] == "car5") {
             c.fillStyle = "#00eeff";
        }
        c.fillRect(x ,y, size, size * 2);
        c.fillStyle = "blue";
        c.fillRect(x + 4, y + 48, size - 8, size - 20);
        c.fillRect(x + 4, y + 18, size - 8, size - 24);
        c.fillStyle = "gold"
        c.fillRect(x + 2, y, size / 5, size / 8);
        c.fillRect(x + 30, y, size / 5, size / 8);
        c.fillStyle = "red";
        c.fillRect(x + 2, y + 79, size / 5, size / 20);
        c.fillRect(x + 30, y + 79, size / 5, size / 20);
        c.fillStyle = "black"
        c.fillRect(x - 1, y + 10, size / 20, size / 2);
        c.fillRect(x + 40, y + 10, size / 20, size / 2);
        c.fillRect(x - 1, y + 55, size / 20, size / 2);
        c.fillRect(x + 40, y + 55, size / 20, size / 2);
    }
    Car.prototype.drawCar = function(){
        getCar(this.x, this.y, 40);       
    }
    function OtherCars(x, y){
        this.x = x;
        this.y = y;              
        this.cars = ["car1","car2","car3","car4","car5"];
        this.num = Math.floor(Math.random() * 5);
        this.numb = Math.round(Math.random() * 4);
        

    }
    function stopGame(){
        car.yspeed = 0;
        car.yCarsSpeed = 0;
        car.xspeed = 0;
        newGame();
        clearInterval(das,20)
    }
    OtherCars.prototype.newG = function(){
        if (this.y === car.y) {
            return getBonus()
        }
        for (let i = 60; i >= 0; i--) {
            if (car.x == this.x - i && car.y == this.y + 80  || car.x == this.x + i + i && car.y == this.y - 80) {
                return getBigBonus()
            } 

        }
        if (car.x === 145 || car.x === 415) {
            return stopGame();
        }
        for (let i = 81; i >= 0; i--) {
            if (car.x == this.x - 41 && car.y == this.y + i || car.x == this.x + 41 && car.y == this.y + i) {
                return stopGame()
            } 
            if (car.x == this.x - 41 && car.y == this.y - i || car.x == this.x + 41 && car.y == this.y - i) {
                return stopGame()
            } 
        }
        for (let i = 0; i < 41; i++) {
            if (car.x == this.x - i && car.y == this.y + 82 || car.x == this.x - i && car.y == this.y - 82) {
                return stopGame()
            } 
            if (car.x == this.x + i && car.y == this.y + 82 || car.x == this.x + i && car.y == this.y - 82) {
                return stopGame()
            }          
        }
    }
    OtherCars.prototype.drawCars = function(){
        getCars(this.x, this.y, 40, this.num, this.cars);
        this.newG();
    }
    OtherCars.prototype.getNewCarsPosition = function(){
        const arr = [175, 250, 325, 400];
        this.numb = Math.floor(Math.random() * 4);
        this.x = arr[this.numb];
        this.num = Math.floor(Math.random() * 5);
    }
    OtherCars.prototype.move = function(){
        this.y += car.yCarsSpeed;
        if (this.y > height) {
            this.y = 0;
            this.getNewCarsPosition()
        }else if (this.y < 0) {
            this.y = 600;
            this.getNewCarsPosition()
        }
    }
    addEventListener("keydown", function(event){
        var keycode = event.keyCode;
        car.setDirection(keycode);
        
    });
    var das = setInterval(function(){
        c.clearRect(0, 0, width, height);       
        road.getRoad();
        car.moveCars()
        car.drawCar();
        car.move();    
    }, 20);
    
    var car = new Car();  
    var car0 = new OtherCars(250, 100);
    var car1 = new OtherCars(175, 200);
    var car2 = new OtherCars(325, 300);
    var car3 = new OtherCars(400, 400);
    var car4 = new OtherCars(400, 500);













}