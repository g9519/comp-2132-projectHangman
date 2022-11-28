const keyboard = document.getElementById("letters-container")
const hint = document.getElementById("hint-container")
const hintInfo = document.getElementById("hintinfo-container")
const wordContainer = document.getElementById("word-container")
const livesContainer = document.getElementById("lives")
const hangmanImg    = document.getElementById("hangmanImg")

const gameStatus = document.getElementById("popup-content")
const correctWord = document.getElementById("popup-span")

const hintBtn = document.getElementById("hint-btn")
const resetBtn = document.getElementById("reset-btn")

const popup = document.getElementById("popup");

const playAgainBtn = document.getElementById("playagain-btn")



let selectedWord = "";
let livesCounter = 6 ;
let mistakes = 0;
let counter;
livesContainer.innerHTML = livesCounter;
popup.setAttribute('hidden', true);



// key = word, value = hint
const wordsToGuess = new Map([
    ['apple', 'round and edible'],
    ['orange', 'also a color'],
    ['banana', 'long and yellow']
])
//words to guess
words = [...wordsToGuess.keys()];

// get a random word from the wordsToGuess list
function getRandomWord(){
    selectedWord = words[Math.floor(Math.random() * words.length)];
    let displayItem = selectedWord.replace(/./g, '<span class="dashes">_ </span>');
    wordContainer.innerHTML = displayItem;
    console.log(selectedWord);
    return selectedWord;
}
//todo
// set up game play/while playing etc
let letterBtn;
//letter buttons
function generateButtons() {
    letterBtn = 'qwertyuiopasdfghjklzxcvbnm'.split('').map(letter =>
        ` 
        <button
                class="letterBtn"
                id='`+ letter +`'
                onClick="handleGuess('` + letter + `')">
                ${letter.toUpperCase()}
                 </button>
                            `).join('');
   ;
        keyboard.innerHTML = letterBtn;
        keyboard.removeAttribute('hidden');
    }    

    

// when keyboard letter is clicked
//adds letter to guessed word OR
//decreases lives
    function handleGuess(chosenLetter){
        let dashes = document.getElementsByClassName("dashes");
        let charArray = selectedWord.split("");
        document.getElementById(chosenLetter).setAttribute('disabled', true);
        if(charArray.includes(chosenLetter))
        {
            charArray.forEach((char, i) =>
            {
                if(char === chosenLetter)
                {
                    dashes[i].innerHTML = char;
                    console.log('inside if ')

                }
            })
            console.log(chosenLetter);
        }
        else{decreaseLives()}
        updateImg();
        checkGameStatus();
    }

    //decreases the lives by 1
    function decreaseLives() {
        livesCounter --;
        console.log(livesCounter);
        livesContainer.textContent = livesCounter;
        mistakes ++;

    }

    // checks if game is won or lost
    function checkGameStatus() {
        correctWord.innerHTML = selectedWord;
        resetBtn.disabled = false;
        // resetBtn.setAttribute('disabled', false);

        if (livesCounter == 0 ) {
            console.log("inside game status lost");
            gameStatus.innerHTML = "You lost!!";
            // for(btn in letterBtn){
            //     btn.disabled = true;
            // }
            console.log(letterBtn);
            keyboard.setAttribute('hidden', true);
            // showPopUp();
            setTimeout(showPopUp, 500);
        }
        if ( wordContainer.innerText === selectedWord) {
            gameStatus.innerHTML = "You won!!";
            keyboard.setAttribute('hidden', true);
            // showPopUp();
            setTimeout(showPopUp, 500);

        }     
   
    }

    //shows hint for word to be guessed
    hintBtn.addEventListener('click', function () {
        hintInfo.innerHTML = wordsToGuess.get(selectedWord);
        hintInfo.removeAttribute('hidden');
        hintBtn.disabled = true;
        
    })

    //sets new word to be guessed
    //
    resetBtn.addEventListener('click',reset);

    //resets to new word, lives back to 6
    function reset(){
        livesCounter = 6;
        mistakes = 0;
        livesContainer.innerHTML = livesCounter;
        hintBtn.disabled = false;
        hintInfo.setAttribute('hidden', true);
        resetBtn.disabled = false;
        getRandomWord();
        generateButtons();
        updateImg();


    }

    playAgainBtn.addEventListener('click', function(){
        reset();
        popup.setAttribute('hidden', true);
    })

    // show pop up, with end of game status


    function showPopUp(){
        popup.removeAttribute('hidden');
  }

  function updateImg(){
    hangmanImg.src = `./images/Hangman-${mistakes}.png`

  }

  function HangManAnimate() {
    if(keyPress != null){
        wordContainer.innerHTML = ``;
        for(let i = 0; i < count; i++){
            if (word[i] == keyPress) {
                arr.push(keyPress);
            }

            if(arr.includes(word[i])){
                wordContainer.innerHTML +=  `<span>${word[i]}</span>`;
            } else if  (word[i] == ` `) {
                wordContainer.innerHTML += `<span> </span>`;
            } else {
                wordContainer.innerHTML +=  `<span>_${i}</span>`;
            }
        
        }
        keyPress = null;
    }
    
    requestAnimationFrame(HangManAnimate);
    console.log(keyPress);
}

addEventListener(`keydown`, (key)=>{
    keyPress = key.key;
    console.log(keyPress);
})
getRandomWord();
generateButtons();
