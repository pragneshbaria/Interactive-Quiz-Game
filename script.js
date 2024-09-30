// Quiz questions and answers
const quizQuestions = [
    {
        question: "What is the capital of France?",
        options: {
            a: "Berlin",
            b: "Paris",
            c: "Madrid"
        },
        correctAnswer: "b"
    },
    {
        question: "Which planet is known as the Red Planet?",
        options: {
            a: "Earth",
            b: "Mars",
            c: "Jupiter"
        },
        correctAnswer: "b"
    },
    {
        question: "What is the largest ocean on Earth?",
        options: {
            a: "Atlantic",
            b: "Indian",
            c: "Pacific"
        },
        correctAnswer: "c"
    },
    {
        question: "Who wrote 'Romeo and Juliet'?",
        options: {
            a: "William Shakespeare",
            b: "Charles Dickens",
            c: "Mark Twain"
        },
        correctAnswer: "a"
    }
];

// Function to build the quiz
function buildQuiz() {
    const quizContainer = document.getElementById('quiz');
    const output = [];

    quizQuestions.forEach((currentQuestion, questionNumber) => {
        const options = [];
        for (letter in currentQuestion.options) {
            options.push(
                `<label>
                    <input type="radio" name="question${questionNumber}" value="${letter}">
                    ${letter}: ${currentQuestion.options[letter]}
                </label>`
            );
        }

        output.push(
            `<div class="question">${currentQuestion.question}</div>
             <div class="options">${options.join('')}</div>`
        );
    });

    quizContainer.innerHTML = output.join('');
}

// Function to show results
function showResults() {
    const answerContainers = document.querySelectorAll('.options');
    let score = 0;

    quizQuestions.forEach((currentQuestion, questionNumber) => {
        const answerContainer = answerContainers[questionNumber];
        const selectedOption = `input[name=question${questionNumber}]:checked`;
        const userAnswer = (answerContainer.querySelector(selectedOption) || {}).value;

        // Clear previous classes for visual feedback
        const allOptions = answerContainer.querySelectorAll('label');
        allOptions.forEach(option => option.classList.remove('correct-answer', 'incorrect-answer'));

        // If the user answer is correct
        if (userAnswer === currentQuestion.correctAnswer) {
            score++;
            const correctOption = answerContainer.querySelector(`input[value=${currentQuestion.correctAnswer}]`);
            correctOption.parentElement.classList.add('correct-answer'); // Green box for correct answer
        } else {
            // Mark the user's selected answer in red
            const incorrectOption = answerContainer.querySelector(`input[value=${userAnswer}]`);
            if (incorrectOption) {
                incorrectOption.parentElement.classList.add('incorrect-answer'); // Red box for incorrect answer
            }

            // Show the correct answer in green
            const correctOption = answerContainer.querySelector(`input[value=${currentQuestion.correctAnswer}]`);
            correctOption.parentElement.classList.add('correct-answer');
        }
    });

    const resultsContainer = document.getElementById('results');
    resultsContainer.innerHTML = `You scored ${score} out of ${quizQuestions.length}`;
}

// Display the quiz on page load
buildQuiz();

// Add event listener to the submit button
document.getElementById('submit').addEventListener('click', showResults);
