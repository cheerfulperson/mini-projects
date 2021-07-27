window.onload = function(){
    let view = {
        hod : 0, 
        divShower : document.getElementById('messeg'),
        ShowImage: function(){
            var image = document.getElementById('img');
            this.hod++
            if (this.hod === 1) {
                image.src = './img/2.png';
            }else if(this.hod === 2){
                image.src = './img/3.png';
            }else if(this.hod === 3){
                image.src = './img/4.png';
            }else if(this.hod === 4){
                image.src = './img/5.png';
                process.youLosse(process.strForWord);
            }
        },
        arrAllWord : [],
        allIndex : [],
        ShowYouGood:function(lett){
            this.divShower.innerHTML = "";
            var indexLetter = process.strForWord.split("").indexOf(lett,0);
            this.arrAllWord[indexLetter] = lett;
            var pos = 0;
            while (true) {
                var foundPos = process.strForWord.split("").indexOf(lett, pos);
            if (foundPos == -1) break;
            this.arrAllWord[foundPos] = lett;
            this.allIndex.push(foundPos);
            pos = foundPos + 1; 
            }
            document.getElementById('word').innerHTML = "[" + this.arrAllWord.join("][").toString() + "]";   
            let word = process.strForWord.length;
            if(word == this.allIndex.length ){
                process.youWin()
            }           
        },
        showBad:function(){
            this.divShower.innerHTML = "Enter 1 letter, please";
        },
        enterNotLetter : function () {
            this.divShower.innerHTML = "You must enter letter, which you did not enter"
        }
    }        
    let process = {
        strForWord : null,          
        youWin : function(){
            document.getElementById('close').innerHTML = '<div class="poleForCose"></div><div class="closeWindow">' + 
                 '<button id="buttonRepite">repeat</button>'
                + '</div>';
            document.getElementById('buttonRepite').onclick = this.newGame; 
        },
        youLosse : function (wordForLosser) {
            document.getElementById('close').innerHTML = '<div class="poleForCose"></div><div class="closeWindow">' + 
                '<p class="Losse">You losse, but you can repite just click on button. And this word was ' 
                + this.strForWord 
                + '</p>' 
                + '<button id="buttonRepite">repeat</button>'+
            '</div>';
            document.getElementById('buttonRepite').onclick = this.newGame;  
        },
        newGame : function(){
           window.location.reload();
        },
        workWithLetter : function(letter){                            
            let word = this.strForWord.split("").indexOf(letter);
                if (word >= 0) {
                    view.ShowYouGood(letter);                       
                }else{
                    view.ShowImage();
                    document.getElementById('messeg').innerHTML = "";                        
                }
        },
    }
    function getInputText(){
        document.getElementById('close').innerHTML = "";
        document.getElementById("button").onclick = processInputText;
        document.getElementById("input").onkeypress = onEnter;
    };
    function onEnter(e){
        if(e.keyCode === 13){
            document.getElementById("button").click();
        return false;
        }
    }
    function processInputText(){
        let text = document.getElementById('input').value;
        if (text.length === 1) {
            if (view.arrAllWord[view.arrAllWord.indexOf(text)] != text) {
                process.workWithLetter(text.toLowerCase()); 
                        
                document.getElementById('input').value = ""; 
            }else{
                view.enterNotLetter();
                document.getElementById('input').value = ""; 
            }
        }else{
            view.showBad();
            
            document.getElementById('input').value = "";
        }
        console.log(text.toLowerCase())    
    };
    function game() {
        document.getElementById('buttonStart').onclick = startGame;
    }
    var firstInput = null;
    function startGame(){
        process.strForWord = document.getElementById('valueWord').value.toLowerCase();
        let secondInput = document.getElementById('valueAbout').value;
        var lengthWord = process.strForWord.length;
        if (process.strForWord != undefined || process.strForWord != null) {
            document.getElementById('about').innerHTML = secondInput + " word length is " + lengthWord;
            getInputText();  
        }else{
            alert('Entere word and about it')
        }
    }
   game();            
}