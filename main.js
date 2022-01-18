const holes = document.querySelectorAll('.hole');
const moles = document.querySelectorAll('.mole');
const scoreBoard = document.querySelector('.score');
const startBtn = document.querySelector('.btn-start');
const game = document.querySelector('.game');
const levelBoard = document.querySelector('.level');

const endGame = document.createElement('div');
endGame.classList.add('endgame');


const lastHole ='';
let score = 0;
let level = 1;
let showMoleTime = 1000; //miliseconds
const gameDuration = 15000; //miliseconds
const moleDelay = 1000;
let inverval;

const randomHole = () => {
    let maxHoles = holes.length;
    let hole = parseInt(Math.random() * (maxHoles - 0) + 0);
    return hole;
}

const showMole = () => {
    let hole = randomHole();
    let actualHole = holes[hole];
    actualHole.classList.add('up');
    setTimeout(() => {
        actualHole.classList.remove('up');
    }, showMoleTime);
          
}

const execShowMole = () => {
    interval = setInterval( () => {
        showMole();
    },moleDelay);
}

const startGame = () => {
    scoreBoard.textContent = 0;
    timeUp = false;
    score = 0;
    setTimeout(() =>{
        timeUp = true;
        clearInterval(interval);
        document.body.insertBefore(endGame, game);
        endGame.innerHTML = `
        ${score > 9 ? '<img src="./images/homerhappy.png">' : '<img src="./images/angryhomer.jpg"></img>'}
        <h2>Level ${ score > 9 ? level + ' cleared' : level + ' failed'}, <br>Score:<span style="color:${score > 9 ? 'green' : 'red'}">${score}</span></h2>
        <small>Click on start button to play again.</small>`;

        if(score > 9) {
            level++;
            levelBoard.textContent = level;
            showMoleTime = showMoleTime - 100;
            if(showMoleTime === 100) {
                endGame.innerHTML = `
                ${score > 9 ? '<img src="./images/homerhappy.png">' : '<img src="./images/angryhomer.jpg"></img>'}
                <h2>Final Level ${ score > 9 ? level + ' cleared' : level + ' failed'}, <br>Score:<span style="color:${score > 9 ? 'green' : 'red'}">${score}</span></h2>
                <small>Click on start button to play again.</small>`;

                level = 1;
                showMoleTime = 1000;
                levelBoard.textContent = level;
                score = 0;
                scoreBoard.textContent = score;
            }
        } else {
            level = 1;
            showMoleTime = 1000;
            levelBoard.textContent = level;
        }
        score = 0;
        scoreBoard.textContent = score;

    }, gameDuration);
    
    execShowMole();
    endGame.remove();

}

const wack = () => {
    moles.forEach( mole => {
        mole.addEventListener('click', () => {
            score++;
            scoreBoard.textContent = score;
            mole.parentElement.classList.remove('up');
        });  
       
    });
}
wack();

//events
startBtn.addEventListener('click', startGame);




