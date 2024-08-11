const words = [
    "manzana", "banana", "naranja", "mango", "pera", "kiwi", "uva", "sandía",
    "melón", "piña", "cereza", "fresa", "papaia", "ciruela", "granada", "mora",
    "frambuesa", "durazno", "nectarina", "limón", "mandarina", "coco", "higo",
    "pasa", "aguacate", "guayaba", "maracuyá", "jengibre", "rambutan", "lichi",
    "cabeludina", "pomelo", "púlpito", "dátil", "membrillo", "arándano", "honeydew",
    "tamarindo", "chirimoya", "quince", "pita", "zapote", "yaca", "nuez", "feijoa",
    "albaricoque", "fruta de dragón", "soursop", "cacahuate", "aceituna", "mamey",
    "plátano", "fruta del monje", "longan", "tamarillo", "granadilla", "aguacate",
    "jícama", "rambutan", "zapallo", "camote", "uva espina", "piña colada", "chayote",
    "caqui", "cabeludina", "plum", "guaraná", "cabeludina", "baya de goji", "fruta de la pasión",
    "membrillo", "kiwano", "chirimoya", "pistacho", "arándano", "mango", "nuez moscada",
    "jengibre", "escarola", "fruta estrella", "coco verde", "caja de cacao", "ciruela pasa",
    "café", "camote", "mango amarillo", "tamarindo", "fresa", "piña morada", "menta",
    "palo de rosa", "almedra", "pita", "nuez de cola", "banana enana", "fruta de león",
    "arándano rojo", "espino", "baya de saúco", "nuez de tierra", "pina colada", "raíz de jengibre",
    "fruta de jaca", "fruta del dragón", "jengibre fresco", "nuez de cola", "chirimoya", "yaca",
    "manzana verde", "arándano morado", "cereza negra", "coco rallado", "pimienta de cayena",
    "mango maduro", "piña colada", "membrillo maduro", "pasta de coco", "guaraná", "dátil seco",
    "jengibre en polvo", "aguacate maduro", "pista de almendra", "fruta del cactus", "manzana roja",
    "sésamo", "ciruela roja", "arándano fresco", "café arábica", "café robusta", "fruta de papaya"
];

let selectedWord = '';
let wordDisplay = '';
let guessedLetters = [];
let maxTries = 6;
let remainingTries = maxTries;

const wordDisplayElement = document.getElementById('wordDisplay');
const messageElement = document.getElementById('message');
const lettersElement = document.getElementById('letters');
const alphabetElement = document.getElementById('alphabet');
const hangmanImage = document.getElementById('hangmanImage');
const restartButton = document.getElementById('restart');

const hangmanImages = [
    'images/0.png', 'images/1.png', 'images/2.png', 'images/3.png',
    'images/4.png', 'images/5.png', 'images/6.png'
];

function getRandomWord() {
    const randomIndex = Math.floor(Math.random() * words.length);
    return words[randomIndex];
}

function startGame() {
    selectedWord = getRandomWord();
    wordDisplay = '_'.repeat(selectedWord.length);
    guessedLetters = [];
    remainingTries = maxTries;
    updateDisplay();
}

function updateDisplay() {
    wordDisplayElement.textContent = wordDisplay.split('').join(' ');
    lettersElement.textContent = guessedLetters.join(', ');
    messageElement.textContent = `Intentos restantes: ${remainingTries}`;
    hangmanImage.src = hangmanImages[maxTries - remainingTries];

    if (wordDisplay === selectedWord) {
        messageElement.textContent = '¡Ganaste!';
        disableAlphabetButtons();
    } else if (remainingTries <= 0) {
        messageElement.textContent = `Perdiste. La palabra era "${selectedWord}".`;
        disableAlphabetButtons();
    }
}

function guessLetter(letter) {
    if (guessedLetters.includes(letter) || remainingTries <= 0) return;

    guessedLetters.push(letter);
    let updatedWordDisplay = '';
    let correctGuess = false;

    for (let i = 0; i < selectedWord.length; i++) {
        if (selectedWord[i] === letter) {
            updatedWordDisplay += letter;
            correctGuess = true;
        } else {
            updatedWordDisplay += wordDisplay[i];
        }
    }

    if (correctGuess) {
        wordDisplay = updatedWordDisplay;
    } else {
        remainingTries--;
    }

    updateDisplay();
}

function createAlphabetButtons() {
    const letters = 'abcdefghijklmnopqrstuvwxyz';
    alphabetElement.innerHTML = '';
    letters.split('').forEach(letter => {
        const button = document.createElement('button');
        button.textContent = letter;
        button.addEventListener('click', () => {
            button.disabled = true;
            guessLetter(letter);
        });
        alphabetElement.appendChild(button);
    });
}

function disableAlphabetButtons() {
    Array.from(alphabetElement.getElementsByTagName('button')).forEach(button => {
        button.disabled = true;
    });
}

restartButton.addEventListener('click', () => {
    startGame();
    createAlphabetButtons();
});

startGame();
createAlphabetButtons();