window.onload = function(){
    var width = window.innerWidth;
    var heigth = window.innerHeight;
    let personID = document.getElementById('person');
    let personCss = getComputedStyle(personID);
    function getNumber(h){
        return parseFloat(h)
    }
    function movePer(X, Y, wid){
        personID.style.cssText = "padding-top:" + Y + "px;" 
        + "\padding-left:" + X + "px;" 
    }
    function newGames(){
        window.location.reload();
    }
    function getYouLose(score){
        let container = document.getElementById('cont');
        container.className = "newContainer"
        container.innerHTML = '<div class="newGame"><p>You score is ' + score + '</p><p>if you want to reapet, you must click on button</p><button id="buttonStart">repeat</button></div>';
        clearInterval(allWork,0);
        clearInterval(zombeGraphix,0);
        clearInterval(interval,0);
        document.getElementById('buttonStart').onclick = newGames;
    }
    function getNextDay(Q,day){
        var container = document.getElementById('close');
        Q += 3;
        container.innerHTML = '<div class="closeWindow"><p> Next day is ' + day + '</p><p>At this day you should kill ' + Q + ' zombe</p></div>';
        setTimeout(()=>{
            container.innerHTML = "";
        },2900);
    }
    var graphix = {
        goLeft : 0,
        getRoad : ()=>{
            let road = document.getElementById('block_road');
            let bigCar = document.getElementById('bigCar');
            let fence = document.getElementById('fence');
            let fenceCss = getComputedStyle(fence);
            let bigCarStyle = getComputedStyle(bigCar)
            let ctyleRoad = getComputedStyle(road);
            let topC = heigth - getNumber(bigCarStyle.height)+5;
            let topF = heigth-getNumber(fenceCss.height)+5;
            let top = heigth - getNumber(ctyleRoad.height)+5;
            let leftF = width - getNumber(fenceCss.width);
            road.style.cssText = "top:" + top + "px;";
            bigCar.style.cssText = "top:" + topC + "px;";
            fence.style.cssText = "top:" + topF + "px;" + "\left:" + leftF + "px";
        },
        getCity : ()=>{
            let city = document.getElementById('forCity');
            let img = document.getElementById('page');
            let cssCity = getComputedStyle(city);
            let road = document.getElementById('block_road');
            let ctyleRoad = getComputedStyle(road);
            img.style =  "height:" + heigth*0.40 + "px;";
            let top = heigth  - getNumber(ctyleRoad.height) - getNumber(cssCity.height) + 10;
            city.style.cssText = "padding-top:" + top + "px;";
            
        },
        getSky : (s)=>{
            let sky = document.getElementById('cont')          
            sky.style = 'background-position-x: ' + s + 'px;';
        },
    };

    function Person(){
        this.x =  width-20;
        this.Y = heigth - parseFloat(personCss.height)*3;
        this.Xspeed = 0;
        this.Yspeed = 0;
        this.size = 0;
        this.sideBullet = 1;
        this.flying = this.x + 10;
        this.topBullet = this.Y + 57;
        this.otherPos = 0;
        this.directionImd = "";
        this.hod = 0;
    }
    Person.prototype.getSpeed = function(){
        this.x += this.Xspeed;
        this.Y += this.Yspeed;
        let road = document.getElementById('block_road');
        let ctyleRoad = getComputedStyle(road);
        if (parseFloat(personCss.paddingTop) > heigth - parseFloat(personCss.height) + 14) {
            this.Y = heigth - parseFloat(personCss.height) + 13;
        }else if (parseFloat(personCss.paddingTop) < heigth - parseFloat(ctyleRoad.height) - parseFloat(personCss.height) + 30) {
            this.Y =  heigth - parseFloat(ctyleRoad.height) - parseFloat(personCss.height) + 30 + 1/100;
        }else if(parseFloat(personCss.paddingLeft) > width - parseFloat(personCss.width)){
            this.x =  width - parseFloat(personCss.width);
        }
    };
    Person.prototype.setDirection = function(direction){
        if (direction == 37) {
            this.Xspeed = -4;
            this.getNewPicture("./img/stepL.png","./img/left.png");
            this.sideBullet = 1;
        }else if (direction == 38) {
            this.Yspeed = -4;
            this.size = -3;
        }else if (direction == 39) {
            this.Xspeed = 4;
            this.getNewPicture("./img/stepR.png","./img/right.png");
            this.sideBullet = 2;
        }else if (direction == 40) {
            this.Yspeed = 4;
            this.size = 3;
        }else if(direction == 90){
            if(this.sideBullet === 1 ){
                this.otherPos = -50;
                this.directionImd = "./img/bullet.png";
                this.getNewPicture("./img/leftFire.png","./img/leftFire1.png")
            }else if(this.sideBullet === 2){
                this.otherPos = 50;
                this.directionImd = "./img/bullet1.png";
                this.getNewPicture("./img/rightFire.png","./img/rightFire1.png")
            }      
            if (this.hod === 10) {
                this.reverseBullet();
            }
        }
    };

    Person.prototype.fire = function(){
        let bullets = document.getElementById('bullet');
        this.topBullet = this.Y + 57;    
        bullets.innerHTML = "<div width='10px' id=\"bull\"><img  width=\"10px\"  src=\"" + this.directionImd + "\"></div>";   
        let bull = document.getElementById('bull')   
        bull.style.cssText = "padding-top:" + this.topBullet + "px;" + "\padding-left:" + this.flying + "px;";
        this.flying += this.otherPos;
        if (this.flying <= 0) {
            this.otherPos = 0;
            this.flying = this.x + 10;
            this.directionImd = "";
            this.hod++;
        }else if (this.flying >= width) {
            this.otherPos = 0;
            this.flying = this.x + 20;
            this.directionImd = "";
            this.hod++;
        }
        
    };
    Person.prototype.reverseBullet = function(){
        
        let newB = document.getElementById('newBullet');
        var load = 0;
        this.directionImd = "";
        var inter = setInterval(()=>{
            load++;
            newB.innerHTML = '<div class="value"><div class="value-box" style="width:' + load + '%;"></div></div>';
            if(load >= 100){
                newB.innerHTML = "";
                load = 0;
                clearInterval(inter,0)
            }
        },40)
        
        clearInterval(interval,0);
        setTimeout(function(){
            interval = setInterval(()=>{
                person.fire();
            },30);
        },4000)

        this.hod = 0;
    }
    Person.prototype.setDirection2 = function(direction){
        if (direction == 37) {
            this.Xspeed = 0;
        }else if (direction == 38) {
            this.Yspeed = 0;
            this.size = 0;
        }else if (direction == 39) {
            this.Xspeed = 0;
        }else if (direction == 40) {
            this.Yspeed = 0;
            this.size = 0;
        }else if(direction == 90){
            if(this.sideBullet === 1 ){
                this.otherPos = -50;
                this.directionImd = "./img/bullet.png";
                this.getNewPicture("./img/left.png","./img/left.png");
            }else if(this.sideBullet === 2){
                this.otherPos = 50;
                this.directionImd = "./img/bullet1.png";
                this.getNewPicture("./img/right.png","./img/right.png");
            } 
        }
    };
    var css = parseFloat(personCss.width);
    var getSizePerson = function(size){ 
        css += size;
        if( css > 200){
            css = 200
        }else if( css < 10){
            css = 10;
        }
        return css;
    };
    var hod = 3;
    Person.prototype.getNewPicture = function(location1,location2){
        let img = document.getElementById('personsImg');
        if(hod % 2 == 0){
            img.src = location1;
            hod++;
        }else if(hod % 2 == 1){
            img.src = location2;
            hod++;
        }
    }
    Person.prototype.getOtherPosition = function(){
        let wid = getSizePerson(this.size);
        movePer(this.x, this.Y, wid);
           
    }
    var zombeId = document.getElementById('zombe');
    var zombeCss = getComputedStyle(zombeId);
    function Zombe(){
        this.yLock = [2,3,4,5,6,7,8,9,10]
        this.numberForRandom = this.yLock.length;
        this.x = 0;
        this.xSpeed = 0;
        this.y = heigth - parseFloat(personCss.height)*3 + 100;
        this.zombeQuantity = 4;
        this.nextDay = this.zombeQuantity;
        this.randArray = [];
        this.zombeLocationArray = ["./img/zombe1.png","./img/zombe.png","./img/zombe2.png"];
        this.lengthArrayLock = this.zombeLocationArray.length;
        this.zomb = [];
        this.zombeArray = [];
        this.upZ = null;
        this.numrandom = null;
        this.hethQuantity = 3;
        this.idOfZombe = [];
        this.zombeIntheC = 0;
        this.numberOfHelth = 0;
        this.score = 0;
        this.day = 0;
        //quantity-количество
    }
    Zombe.prototype.getPicture = function(){
        for (let i = 0; i < this.zombeQuantity; i++) {
            let rand = Math.floor(Math.random() * this.lengthArrayLock);
            this.randArray[i] = rand;
            zombeId.innerHTML += "<div id='zom" + i + "'><img class='imgZom' id='imgZombe" + i + "' src=\"" + this.zombeLocationArray[rand] + "\" width=\"100px\"></div>";
        }

    }

    
    Zombe.prototype.moveZombe = function(){
        for (let i = 0; i < this.zombeQuantity; i++) {  
            
            if(i === 0){
                this.numberForRandom = 2; 

            }else {
                this.numberForRandom = this.yLock.length;

            }     
            this.getNumrandom();
            // this.moveY()
            let zom = document.getElementById('zom' + i);
            let zomCss = getComputedStyle(zom);
            this.zomb[i] = zom;
            zom.setAttribute("class","zomb");
            let paddingUp =  25 * this.yLock[this.numrandom] ;
            // let zomheight = -1 * (parseFloat(zomCss.width)+33) * i;
            this.upZ = paddingUp + this.y;
            this.zombeArray[i] = {x:0,y:this.upZ,};
            zom.style.cssText = "top:" + this.zombeArray[i].y+ "px;";           
            this.getNewSpeed(i);
        }
    };
    Zombe.prototype.getNewSpeed = function(i){
            let randomSpeed = Math.floor(Math.random() * 5);
            let xSpeedArray = [2,3,4,5,6];
            let speed = xSpeedArray[randomSpeed]
            this.zombeArray[i].xSpeed = speed;
    }
    Zombe.prototype.moveY = function(i){
            let paddingUp =  25 * this.yLock[this.numrandom] ;
            let img = document.getElementById('imgZombe' + i)
            let cssZ = getComputedStyle(img);
            let up = paddingUp + this.y;
            this.zomb[i].style.cssText = "top:" + up + "px;";    
    }

    Zombe.prototype.getNumrandom = function(){
        this.numrandom = Math.floor(Math.random() * this.numberForRandom);
        
    }

    Zombe.prototype.getSpeedX = function(){
        for (let i = 0; i < this.zombeQuantity; i++) {
            this.zombeArray[i].x += this.zombeArray[i].xSpeed;  
            if(this.zombeArray[i].x > width){
                this.getLoseFromZombe(i);
                this.getNewSpeed(i);
                this.zombeArray[i].x = width;  
                this.zombeArray[i].xSpeed = 0;  
                this.getNumrandom();
                // this.moveY(i)            
            }   
        }
    };
    Zombe.prototype.setNewzombeQuantity = function(){   
        zombeId.innerHTML = "";
        this.zombeQuantity += 3;
        this.nextDay = this.zombeQuantity
        zombe1.getPicture();
        zombe1.moveZombe();
    }
    Zombe.prototype.getKillZombe = function(){
        
        for (let i = 0; i < this.zombeQuantity; i++) {
            if(this.zombeArray[i].x <= person.flying && this.zombeArray[i].x + 60 >= person.flying && this.zombeArray[i].y+120 >= person.topBullet && this.zombeArray[i].y-100 <= person.topBullet){
                this.zombeArray[i].x = width;
                this.zombeArray[i].xSpeed = 0;
                this.score +=100;
                person.flying = this.x + 10;
                this.nextDay--;
                if (this.nextDay === 0) {  
                    this.day++;                 
                    getNextDay(this.zombeQuantity,this.day); 
                    setTimeout(()=>{
                        this.setNewzombeQuantity();
                    },3000);                   
                    
                    
                }else if(this.zombeArray[i].x >= width && this.zombeArray[i].x <= 5){
                    this.day++;  
                    getNextDay(this.zombeQuantity,this.day);
                    setTimeout(()=>{
                        this.setNewzombeQuantity();
                    },3000); 
                }
                
                
            }
            if(this.zombeArray[i].x <= person.x  && this.zombeArray[i].x + 30 >= person.x  && this.zombeArray[i].y+120 >= person.Y && this.zombeArray[i].y-100 <= person.Y){
                this.zombeArray[i].x = 0;
                this.zombeArray[i].xSpeed = 0;
                this.nextDay--;
                this.setHelth();
            }
            // console.log(this.zombeArray[i].x, person.flying)
        }
    };
    Zombe.prototype.setHelth = function(){
        if(this.numberOfHelth === 0){
            document.getElementById('helth' + 0).setAttribute("class","personsHelth");           
        }else if(this.numberOfHelth === 1){
            document.getElementById('helth' + 1).setAttribute("class","personsHelth");
        }else if(this.numberOfHelth === 2){
            document.getElementById('helth' + 2).setAttribute("class","personsHelth");
            getYouLose(this.score);
        }
        this.numberOfHelth++;
    };
    Zombe.prototype.getLoseFromZombe = function(){
        if(this.zombeIntheC === 0){
            document.getElementById('zombeInTheCity' + 0).setAttribute("class","yesZombe");           
        }else if(this.zombeIntheC === 1){
            document.getElementById('zombeInTheCity' + 1).setAttribute("class","yesZombe");
        }else if(this.zombeIntheC === 2){
            document.getElementById('zombeInTheCity' + 2).setAttribute("class","yesZombe");
            getYouLose(this.score);
        }
        this.zombeIntheC++;
    }
    Zombe.prototype.getScore = function(){
        let score = document.getElementById('score');
        score.innerHTML = this.score;
    }
    Zombe.prototype.getPersonHelth = function(){
        let helth = document.getElementById('helth');
        let zombeInTheCity = document.getElementById('zombeInTheCity');    
        for (let i = 0; i < this.hethQuantity; i++) {
            helth.innerHTML += "<img id='helth" + i + "' src='./img/helth.png' width='40px'></div>";
            zombeInTheCity.innerHTML += "<img id='zombeInTheCity" + i + "' src='./img/zombeForBlock.png' class='noZombe' width='40px'></div>";
        }
    }
    var hodForPicture = 0;
    Zombe.prototype.getGraphixWithPicture = function(){
        for (let i = 0; i < this.zombeQuantity; i++) {
            let idImg = document.getElementById('imgZombe' + i);
                if(hodForPicture % 2 == 0){
                    if(this.randArray[i] == 0){
                        idImg.src = "./img/zombie12.png";
                    }else if(this.randArray[i] == 1){
                        idImg.src = "./img/zombe02.png";
                    }else if(this.randArray[i] == 2){
                        idImg.src = "./img/zombe22.png";
                    }
                }else{
                    if(this.randArray[i] == 0){
                        idImg.src = './img/zombe1.png';
                    }else if(this.randArray[i] == 1){
                        idImg.src = "./img/zombe.png";
                    }else if(this.randArray[i] == 2){
                        idImg.src = "./img/zombe2.png";
                    }                 
                }

            
        }

            hodForPicture++;
        

    }
    Zombe.prototype.moveX = function(){
        for (let i = 0; i < this.zombeQuantity; i++) {
            let zom = document.getElementById('zom' + i);
            zom.style.cssText += "\left:" + this.zombeArray[i].x + "px";                     
        }
    }
    addEventListener("keydown", function(event){
        var keycode = event.keyCode;
        person.setDirection(keycode);
    });
    addEventListener("keyup", function(event){
        var keycode = event.keyCode;
        person.setDirection2(keycode);
    });

    var interval = setInterval(() => {
        
        person.fire()  
    }, 30);
    var zombeGraphix = setInterval(()=>{
        zombe1.getGraphixWithPicture();
    },250);
    var allWork =  setInterval(()=>{
        let goL = graphix.goLeft++ ;
        if (goL >= width) {
            graphix.goLeft = 0;
        }       
        zombe1.getScore();
        zombe1.getKillZombe();
        zombe1.moveX();
        zombe1.getSpeedX()
        person.getOtherPosition();
        person.getSpeed(); 
        graphix.getSky(goL);
        
    },40)
    
    graphix.getCity();
    graphix.getRoad();
    var person = new Person();
    var zombe1 = new Zombe()
    zombe1.getPicture();
    zombe1.moveZombe();
    zombe1.getPersonHelth();
    var loads = document.getElementById('loads');
    var numberLoad = 0;
    function getload(){
        numberLoad += 5;
        loads.innerHTML = '<div class="poleForLoad"><div class="poleForLoad-box" style="width:' + numberLoad + '%;"></div></div>';
    }
    var getIntervalLoad = setInterval(()=>{
        getload()
    },50);
    
    setTimeout(()=>{
        clearInterval(getIntervalLoad,0)
        loads.className = "";
    },1000);

}