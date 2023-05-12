// Get DOM elements
const intro = document.getElementById('intro');
const startButton = document.getElementById('startButton');
const quizContainer = document.getElementById('quizContainer');
const questionElement = document.getElementById('question');
const answersElement = document.getElementById('answers');
const gameOver = document.getElementById('gameOver');
const youWin = document.getElementById('youWin');
const timerElement = document.getElementById('timer');
const highScoresLink = document.getElementById('highScoresLink');
const highScoresPage = document.getElementById('highScoresPage');
const highScoresList = document.getElementById('highScoresList');
const goBackButton = document.getElementById('goBack');
const saveScoreButtonYouWin = document.getElementById('saveScoreYouWin');
const saveScoreButtonGameOver = document.getElementById('saveScoreGameOver');
const initialsInputGameOver = document.getElementById('initialsGameOver');
const initialsInputYouWin = document.getElementById('initialsYouWin');
const clearHighScoresButton = document.getElementById('clearHighScores');

// Quiz questions
const questions = [
  {
    question: 'HTML tags are composed of three things: an opening tag, content and ______ ___',
    answers: ['A) ending tag', 'B) heading tag', 'C) HTML element', 'D) style properties'],
    correctAnswer: 0
  },
  {
    question: 'Which HTML tag is used to define an internal style tag?',
    answers: ['A) <script>', 'B) <link>', 'C) <css>', 'D) <style>'],
    correctAnswer: 3
  },
  {
    question: 'What is the correct syntax for reffering to an external script called "abc.js"',
    answers: ['A) <script href="abc.js">', 'B) <script name = abc.js>', 'C) <script src="abc.js">', 'D) <script name="abc.js">'],
    correctAnswer: 2
  },
  {
    question: 'The ___________ property is used to align flex items in the center of the flex container along the cross axis',
    answers: ['A) align-items', 'B) justify-content', 'C) align-content', 'D) flex-align'],
    correctAnswer: 0
  },
  {
    question: 'Local Storage in JavaScript allows you to store data __________________',
    answers: ['A) on the server', 'B) in the web browser', 'C) in a database', 'D) in a cookie'],
    correctAnswer: 1
  },
  {
    question: 'Which event is fired when a key is pressed continuously and held down?',
    answers: ['A) keypress', 'B) keydown', 'C) keyhold', 'D) keyrepeat'],
    correctAnswer: 1
  },
  {
    question: 'What does the Math.random() method in JavaScript return?',
    answers: ['A) A random decimal number between 0 and 1', 'B) A random integer between 0 and 1', 'C) A random integer between 0 and 100', 'D) A random decimal number between 0 and 100'],
    correctAnswer: 0
  },
  {
    question: 'What does HTML stand for?',
    answers: ['A) HomeTool Markup Langueage', 'B) Hyperlinks and Text Markup Language', 'C) High-level Text Markup Language', 'D) HyperText Markup Language'],
    correctAnswer: 3
  }
];

// State variables
let currentQuestionIndex = 0;
let timer = 60;
let interval;
let score = 0;

// Start quiz
startButton.addEventListener('click', () => {
  intro.style.display = 'none';
  quizContainer.style.display = 'block';
  interval = setInterval(countdown, 1000);
  showQuestion();
});

// Display high scores
highScoresLink.addEventListener('click', (event) => {
  event.preventDefault();
  showHighScores();
});

// Go back to intro
goBackButton.addEventListener('click', () => {
  hideHighScores();
});

// Countdown timer
function countdown() {
    timer--;
    if (timer < 0) {
      timer = 0; // Set the timer to 0 if it goes below 0
      clearInterval(interval); // Stop the interval if timer reaches 0
      endGame();
    }
    timerElement.textContent = `Time: ${timer}`;
  }
  


// Show current question
function showQuestion() {
    const question = questions[currentQuestionIndex];
    questionElement.textContent = question.question;
    answersElement.innerHTML = '';
    document.getElementById('resultMessage').textContent = ''; // Clear the "Correct" message
    question.answers.forEach((answer, index) => {
        const buttonContainer = document.createElement('div');
        const button = document.createElement('button');
        const message = document.createElement('span');
        button.textContent = answer;
        button.addEventListener('click', () => {
            if (index === question.correctAnswer) {
                score++;
                currentQuestionIndex++;
                resultMessage.style.display = 'block'; // Show the result message
                resultMessage.textContent = 'Correct!'; // Update the result message
                if (currentQuestionIndex < questions.length) {
                    setTimeout(() => {
                        resultMessage.style.display = 'none'; // Hide the result message after 0.3 seconds
                        showQuestion();
                    }, 300);
                } else {
                    clearInterval(interval);
                    endGame();
                }
            } else {
                timer -= 15;
                resultMessage.style.display = 'block'; // Show the result message
                resultMessage.textContent = 'Incorrect!'; // Update the result message
                setTimeout(() => {
                    resultMessage.style.display = 'none'; // Hide the result message after 0.3 seconds
                }, 500);
            }
        });
        buttonContainer.appendChild(button);
        buttonContainer.appendChild(message);
        answersElement.appendChild(buttonContainer);
    });
}


// End game and show result
function endGame() {
  clearInterval(interval);
  quizContainer.style.display = 'none';

  if (currentQuestionIndex === questions.length) {
    youWin.style.display = 'block';
    gameOver.style.display = 'none';
    document.getElementById('finalScoreYouWin').textContent = score;
  } else {
    gameOver.style.display = 'block';
    youWin.style.display = 'none';
    document.getElementById('finalScoreGameOver').textContent = score;
  }
}

// Restart the quiz
function restartQuiz() {
  gameOver.style.display  = 'none';
  youWin.style.display = 'none';
  intro.style.display = 'block';
  highScoresPage.style.display = 'none';
  currentQuestionIndex = 0;
  timer = 60;
  timerElement.textContent = `Time: ${timer}`;
  score = 0;
}

// Save high score and restart the quiz
function saveScore(initialsInputElement) {
  const initials = initialsInputElement.value;
  if (initials.trim() === '') return;
  const highScores = JSON.parse(localStorage.getItem('highScores')) || [];
  const newScore = { initials, score };
  highScores.push(newScore);
  localStorage.setItem('highScores', JSON.stringify(highScores));
  initialsInputElement.value = '';
  restartQuiz();
}

// Save high score and restart the quiz for Game Over
saveScoreButtonGameOver.addEventListener('click', () => {
  saveScore(initialsInputGameOver);
  restartQuiz();
});

// Save high score and restart the quiz for You Win
saveScoreButtonYouWin.addEventListener('click', () => {
  saveScore(initialsInputYouWin);
  restartQuiz();
});

// Show high scores page
function showHighScores() {
    currentQuestionIndex = 0; // Reset the question index to 0
    intro.style.display = 'none';
    gameOver.style.display = 'none';
    youWin.style.display = 'none';
    quizContainer.style.display = 'none';
    highScoresPage.style.display = 'block';
    clearHighScoresButton.style.display = 'block'; // Show the clear high scores button

    timer = 60;
    timerElement.textContent = `Time: ${timer}`;
  
    clearInterval(interval); // Stop the countdown
  
    const highScores = JSON.parse(localStorage.getItem('highScores')) || [];
    highScoresList.innerHTML = '';
    highScores.forEach(({ initials, score }) => {
      const li = document.createElement('li');
      li.textContent = `${initials} - ${score}`;
      highScoresList.appendChild(li);
    });
  }

// Hide high scores page
function hideHighScores() {
    highScoresPage.style.display = 'none';
    clearHighScoresButton.style.display = 'none'; // Hide the clear high scores button
    intro.style.display = 'block';
  }
  

  clearHighScoresButton.addEventListener('click', () => {
    clearHighScores();
  });
  
  // Function to clear high scores
  function clearHighScores() {
    localStorage.removeItem('highScores'); // Remove the 'highScores' item from localStorage
    highScoresList.innerHTML = ''; // Clear the high scores list by setting its HTML content to an empty string
  }
