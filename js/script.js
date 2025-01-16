// variabili globali

// numeri casuali generati
let randomNumbers = [];

// tempo rimanente timer
let countdown = 5;


// selezioni gli elementi html
const countdownElement = document.getElementById('countdown');
const numbersList = document.getElementById('numbers-list');
const answerForm = document.getElementById('answer-form');
const messageElement = document.getElementById('message');
const submitButton = document.querySelector('#answer-form button');



// genero 5 numeri casuali
function generateRandomNumbers() {
    const numbers = new Set();
    while (numbers.size < countdown) {
        // imposto numeri casuali da 1 a 50
        const randomNumber = Math.floor(Math.random() * 50) + 1;
        numbers.add(randomNumber);
    }
    // salvo i numeri nella variabile globale
    return Array.from(numbers);
}



// mostro i numeri random in pagina
function displayNumbers(numbers) {
    console.log('numeri da visualizzare', numbers);
    
    
    numbersList.innerHTML = numbers.map(num => `<li>${num}</li>`).join('');
    
}

// nascondo numeri e mostro il form
function toggleVisibility() {
    numbersList.classList.add('d-none');
    answerForm.classList.remove('d-none');
}


// valuto risposta utente
function checkAnswer() {
    const userInputs = Array.from(document.querySelectorAll('#answer-form input'))
          .map(input => parseInt(input.value) || 0);
    const correctNumbers = userInputs.filter(num => randomNumbers.includes(num));
    const message = `hai vinto ${correctNumbers.length} numeri: ${correctNumbers.join(', ')}`;
    messageElement.textContent = message;
}

// resetto gioco
function initializeGame() {
    
    generateRandomNumbers();
    displayNumbers();
}

// timer 5 secondi
const timer = setInterval(() => {
    countdown--;
    countdownElement.textContent = `${countdown}s`;
    if (countdown <= 0) {
        clearInterval(timer);
        toggleVisibility();
    }
}, 1000);

// submit del form
submitButton.addEventListener('click', (event) => {
    event.preventDefault();
    checkAnswer();
});


// eseguo gioco
document.addEventListener('DOMContentLoaded', initializeGame);
