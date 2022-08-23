const wordEL =document.getElementById('word');
const textEL =document.getElementById('text');
const scoreEl =document.getElementById('score');
const timeEL =document.getElementById('time');

const btnLevelEl =document.getElementById('level-btn');
const settingsEl=document.getElementById('settings');
const levelFormEl =document.getElementById('level-form');
const levelEl =document.getElementById('level');
const gameoverEl =document.getElementById('gameover-container');

const words = ["งูเห็นนมไก่","น้ำขึ้นให้รีบตัก","เข็นครกขึ้นภูเขา","เขียนเสือให้วัวกลัว","ลูกไก่ในกำมือ","หัวล้านได้หวี"];

let randomText;
let score=0;
let time= 20;//easy =>20,medium => 15 , hard => 10
const saveMode= localStorage.getItem('mode') !==null ?localStorage.getItem('mode'):'medium';

let level='medium';

const timeInterval=setInterval(updateTime,1000);

function getrandomWords(){
    return words[Math.floor(Math.random()*words.length)]
}

function displayWordToUI(){
    randomText=getrandomWords();
    wordEL.innerHTML = randomText;
    timeEL.innerHTML=time;
    
}

textEL.addEventListener('input',(e)=>{
    const inputText=e.target.value;
    if(inputText === randomText){
       
     if(saveMode=='easy'){
        time+=5;
    }else if(saveMode=='medium'){
        time +=3;
    }else{ 
        time +=2;
    } 
    displayWordToUI();  
        updateScore();
        e.target.value='';
    }
});

function updateScore(){
    score+=10;
    scoreEl.innerHTML=score;
}

function updateTime(){
    time--;
    timeEL.innerHTML=time;
    if(time === 0){
        clearInterval(timeInterval);
        gameover();
    }
}
function gameover(){
    gameoverEl.innerHTML=`
    <h1>จบเกมเเล้วนะครับ</h1>
    <p>คะเเนนของคุณ = ${score}</p>
    <button onclick="location.reload()">เล่นอีกครั้ง</button>`;
    gameoverEl.style.display='flex';
}
btnLevelEl.addEventListener('click',()=>{
    settingsEl.classList.toggle('hide');
})

levelEl.addEventListener('change',(e)=>{
    level=e.target.value;
    localStorage.setItem("mode",level);
    
});

function startgame(){
    
    levelEl.value=saveMode; 
    console.log("saveMode",saveMode);

    if(saveMode=='easy'){
        time = 20;
    }else if(saveMode=='medium'){
        time = 15;
    }else{ 
        time = 10;
    }   
    displayWordToUI();
}
startgame();
textEL.focus();