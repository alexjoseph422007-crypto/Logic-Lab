function generateTable() {

    let connective =
        document.getElementById("connective").value;

    let container =
        document.getElementById("table-container");

    let html = "<table>";

    // NOT operation
    if (connective === "NOT") {

        html += `
            <tr>
                <th>P</th>
                <th>¬P</th>
            </tr>
        `;

        let values = [true, false];

        values.forEach(function(P) {

            let result = !P;

            html += `
                <tr>
                    <td>${P ? "T" : "F"}</td>
                    <td>${result ? "T" : "F"}</td>
                </tr>
            `;
        });
    }

    // Two-variable operations
    else {

        html += `
            <tr>
                <th>P</th>
                <th>Q</th>
                <th>Result</th>
            </tr>
        `;

        let values = [true, false];

        values.forEach(function(P) {

            values.forEach(function(Q) {

                let result;

                if (connective === "AND") {
                    result = P && Q;
                }

                else if (connective === "OR") {
                    result = P || Q;
                }

                else if (connective === "XOR") {
                    result = P !== Q;
                }

                else if (connective === "IMPLIES") {
                    result = !P || Q;
                }

                else if (connective === "IFF") {
                    result = P === Q;
                }

                html += `
                    <tr>
                        <td>${P ? "T" : "F"}</td>
                        <td>${Q ? "T" : "F"}</td>
                        <td>${result ? "T" : "F"}</td>
                    </tr>
                `;
            });
        });
    }

    html += "</table>";

    container.innerHTML = html;
}



// ===============================
// QUIZ SYSTEM
// ===============================

// ===============================
// 5 QUESTION QUIZ
// ===============================

let currentAnswer;
let score = 0;
let questionNumber = 0;


// Question bank
let questionBank = [

    {
        question: "What is P ∧ Q when P = True and Q = True?",
        answer: true
    },

    {
        question: "What is P ∧ Q when P = True and Q = False?",
        answer: false
    },

    {
        question: "What is P ∧ Q when P = False and Q = False?",
        answer: false
    },

    {
        question: "What is P ∨ Q when P = True and Q = False?",
        answer: true
    },

    {
        question: "What is P ∨ Q when P = False and Q = False?",
        answer: false
    },

    {
        question: "What is ¬P when P = True?",
        answer: false
    },

    {
        question: "What is ¬P when P = False?",
        answer: true
    },

    {
        question: "What is P ⊕ Q when P = True and Q = False?",
        answer: true
    },

    {
        question: "What is P ⊕ Q when P = True and Q = True?",
        answer: false
    },

    {
        question: "What is P → Q when P = True and Q = False?",
        answer: false
    },

    {
        question: "What is P → Q when P = False and Q = True?",
        answer: true
    },

    {
        question: "What is P ↔ Q when P = True and Q = True?",
        answer: true
    },

    {
        question: "What is P ↔ Q when P = True and Q = False?",
        answer: false
    }

];


// Store the 5 selected questions
let quizQuestions = [];


// Start the quiz
function startQuiz() {

    score = 0;
    questionNumber = 0;

    // Randomly shuffle the question bank
    let shuffledQuestions =
        [...questionBank].sort(() => Math.random() - 0.5);

    // Select only 5 questions
    quizQuestions =
        shuffledQuestions.slice(0, 5);

    // Hide restart button
    document.getElementById("restart-button").style.display =
        "none";

    // Show first question
    newQuestion();
}


// Display the next question
function newQuestion() {

    // Check if all 5 questions are finished
    if (questionNumber >= 5) {

        showFinalScore();

        return;
    }


    // Get current question
    let currentQuestion =
        quizQuestions[questionNumber];


    currentAnswer =
        currentQuestion.answer;


    questionNumber++;


    // Display question number
    document.getElementById("question-number").textContent =
        `Question ${questionNumber} of 5`;


    // Display question
    document.getElementById("quiz-question").textContent =
        currentQuestion.question;


    // Clear previous result
    document.getElementById("quiz-result").textContent =
        "";
}


// Check the answer
function checkAnswer(answer) {

    let result =
        document.getElementById("quiz-result");


    if (answer === currentAnswer) {

        score++;

        result.textContent =
            "✅ Correct!";

    }

    else {

        result.textContent =
            `❌ Incorrect! Correct answer: ${currentAnswer ? "True" : "False"}`;
    }


    // Update score
    document.getElementById("score").textContent =
        `Score: ${score}`;


    // Move to next question
    setTimeout(function() {

        newQuestion();

    }, 800);
}


// Show final score
function showFinalScore() {

    document.getElementById("question-number").textContent =
        "🎉 Quiz Completed!";

    document.getElementById("quiz-question").textContent =
        `Your final score is ${score} out of 5.`;

    document.getElementById("quiz-result").textContent =
        score === 5
            ? "🏆 Excellent! Perfect Score!"
            : "👏 Good job! Try again to improve your score.";

    document.getElementById("score").textContent =
        `Final Score: ${score}/5`;

    // Show restart button
    document.getElementById("restart-button").style.display =
        "inline-block";
}


// Start quiz when page loads
startQuiz();