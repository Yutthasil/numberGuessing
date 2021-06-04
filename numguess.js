var inputbox = document.getElementsByClassName('input-num');
var timer = document.querySelector("#time");
var box = document.getElementsByClassName('box');
var index = 0;
var chance = 0;
var pos_correct = 0;
var num_correct = 0;
var mark = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
var firstload = 0;
var randnumber;
var wait = true;
var waitsound = true;
var time;

function Gamestart(){//from menu to game
    randnumber = generate();
    console.log(randnumber);
    chance = 0;
    document.getElementsByTagName('mainpage')[0].style.display = "none";
    document.getElementsByTagName('container')[0].style.display = "flex";
    document.getElementById('history').innerHTML = "<tr><th>Number</th><th>Correct Number</th><th>Correct Position</th></tr>"
    audio = new sound("/Sound/SmileSoBright3.mp3")
    click = new sound("/Sound/click.mp3");
    guess = new sound("/Sound/enter.wav");
    error = new sound("/Sound/error2.mp3");
    audio.play();
    var limit = 5;
    time = setInterval(function() {
        timer.innerHTML = "Time : " + limit;
        limit--;
        if (limit < 0){
            badend(time);
        }
    }, 1000);
    if (firstload == 0){
        window.addEventListener('keydown', keyboardnum);//keyboard trigger input
        function keyboardnum(e) {
            if (wait && chance < 10){
                if (e.keyCode === 49 || e.keyCode === 97){inputbox[0].click()}
                if (e.keyCode === 50 || e.keyCode === 98){inputbox[1].click()}
                if (e.keyCode === 51 || e.keyCode === 99){inputbox[2].click()}
                if (e.keyCode === 52 || e.keyCode === 100){inputbox[3].click()}
                if (e.keyCode === 53 || e.keyCode === 101){inputbox[4].click()}
                if (e.keyCode === 54 || e.keyCode === 102){inputbox[5].click()}
                if (e.keyCode === 55 || e.keyCode === 103){inputbox[6].click()}
                if (e.keyCode === 56 || e.keyCode === 104){inputbox[7].click()}
                if (e.keyCode === 57 || e.keyCode === 105){inputbox[8].click()}
                if (e.keyCode === 48 || e.keyCode === 96){inputbox[9].click()}
                if (e.keyCode === 110 || e.keyCode === 46){reset()}
            }
            if ((e.keyCode === 13 && chance == 10) && wait){document.getElementById('again').click()}
        }
    }
    firstload = 1;
}

for (let i = 0; i < inputbox.length; i++){// pick a number
    inputbox[i].addEventListener("click", function() {
        if (mark[i] == 1){ //pop up when picked the same number
            document.getElementById('duplicate').style.display = "flex";
            error.play();
            wait = false;
            setTimeout(() => {
                document.getElementById('duplicate').style.display = "none";
                wait = true;
            }, 600);
        }
        if (index < 4 && mark[i] != 1){
            box[index].innerHTML =  this.innerHTML;
            document.getElementsByClassName('conbox')[index].style.animation = "growing 0.2s"
            mark[i] = 1;
            index++;
            click.play();
            waitsound = false;
            setTimeout(() => {
                waitsound = true;
            },200);
        }
        if (index == 4){ //auto guess when input all four number
            wait = false;
            document.getElementById('waitpage').style.display = "flex";
            check_number(randnumber);
            check_position(randnumber);
            setTimeout(function(){
                document.getElementById('history').innerHTML += "<tr><td>" + box[0].innerHTML + box[1].innerHTML + box[2].innerHTML + box[3].innerHTML + "</td><td>" + num_correct + "</td><td>" + pos_correct + "</td></tr>"
                guess.play();
                document.getElementById('waitpage').style.display = "none";
                chance++;
                if(chance == 10){ // pop up end window
                    badend(time);
                }
                else if (pos_correct == 4){
                    goodend(time);
                }
                wait = true;
                reset();
            }, 1000);
        }
    })
}

function sound(src) {
    this.sound = document.createElement("audio");
    this.sound.src = src;
    this.sound.setAttribute("preload", "auto");
    this.sound.setAttribute("controls", "none");
    this.sound.style.display = "none";
    document.body.appendChild(this.sound);
    this.play = function(){
      this.sound.play();
    }
    this.stop = function(){
      this.sound.pause();
    }
}

mainpage = () => {
    document.getElementsByTagName('mainpage')[0].style.display = "block"
    document.getElementsByTagName('container')[0].style.display = "none";
    document.querySelector('#conclusion').style.display = "none";
    document.querySelector('#winpage').style.display = "none";
}

badend = (time) => {
    reset();
    audio.stop();
    clearInterval(time)
    document.getElementById("conclusion").style.display = "flex";
    chance = 10;
}
goodend = (time) => {
    reset();
    audio.stop();
    clearInterval(time);
    document.getElementById('winpage').style.display = "flex";
    chance = 10;
}

reset = function(){
    index = 0;
    pos_correct = 0;
    num_correct = 0;
    mark = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    for (let i = 0; i < 4; i++){
        box[i].innerHTML = "-";
        document.getElementsByClassName('conbox')[i].style.animation = "none"
    }
}
check_position = function(randnum){
    for (let i = 0; i < 4; i++){
        if (randnum[i] == Number(box[i].innerHTML)){
            pos_correct++;
        }
    }
}
check_number = function(randnum) {
    for (let i = 0; i < 4; i++){
        for (let j = 0; j < 4; j++){
            if (box[i].innerHTML == randnum[j]){
                num_correct++;
            }
        }
    }
}

function generate(){//random number for Game
    let rand = [];
    let j = 0;
    while(j < 4){
        let check_rand = false;
        rand[j] = Math.floor(Math.random()*10);
        for (let i = 0; i < j; i++){
            if (rand[j] == rand[i] && i != j){
                check_rand = true;
                break;
            }
        }
        if (check_rand){
            continue;
        }
        else{
            j++;
        }
    }
    return rand;
}
