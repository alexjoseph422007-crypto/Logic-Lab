// ===============================
// TRUTH TABLE GENERATOR
// ===============================

function generateTable() {

    let connective =
        document.getElementById("connective").value;

    let container =
        document.getElementById("table-container");

    let html = "<table>";


    // ===============================
    // NOT OPERATION
    // ===============================

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


    // ===============================
    // TWO-VARIABLE OPERATIONS
    // ===============================

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


                // AND
                if (connective === "AND") {

                    result = P && Q;

                }


                // OR
                else if (connective === "OR") {

                    result = P || Q;

                }


                // XOR
                else if (connective === "XOR") {

                    result = P !== Q;

                }


                // IMPLICATION
                else if (connective === "IMPLIES") {

                    result = !P || Q;

                }


                // BICONDITIONAL
                else if (connective === "IFF") {

                    result = P === Q;

                }


                // NAND
                else if (connective === "NAND") {

                    result = !(P && Q);

                }


                // NOR
                else if (connective === "NOR") {

                    result = !(P || Q);

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
// 5 QUESTION QUIZ
// ===============================

let currentAnswer;

let score = 0;

let questionNumber = 0;



// ===============================
// QUESTION BANK
// ===============================

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
    },

    {
        question: "What is P ↑ Q when P = True and Q = True?",
        answer: false
    },

    {
        question: "What is P ↑ Q when P = True and Q = False?",
        answer: true
    },

    {
        question: "What is P ↑ Q when P = False and Q = False?",
        answer: true
    },

    {
        question: "What is P ↓ Q when P = True and Q = True?",
        answer: false
    },

    {
        question: "What is P ↓ Q when P = True and Q = False?",
        answer: false
    },

    {
        question: "What is P ↓ Q when P = False and Q = False?",
        answer: true
    }

];



// Store the 5 selected questions

let quizQuestions = [];



// ===============================
// START QUIZ
// ===============================

function startQuiz() {

    score = 0;

    questionNumber = 0;


    // Randomly shuffle the question bank

    let shuffledQuestions =
        [...questionBank].sort(
            () => Math.random() - 0.5
        );


    // Select only 5 questions

    quizQuestions =
        shuffledQuestions.slice(0, 5);


    // Hide restart button

    document.getElementById("restart-button").style.display =
        "none";


    // Show first question

    newQuestion();

}



// ===============================
// DISPLAY NEXT QUESTION
// ===============================

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



// ===============================
// CHECK ANSWER
// ===============================

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
            `❌ Incorrect! Correct answer: ${
                currentAnswer ? "True" : "False"
            }`;

    }


    // Update score

    document.getElementById("score").textContent =
        `Score: ${score}`;


    // Move to next question after 800 milliseconds

    setTimeout(function() {

        newQuestion();

    }, 800);

}



// ===============================
// SHOW FINAL SCORE
// ===============================

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



// ===============================
// START QUIZ WHEN PAGE LOADS
// ===============================

startQuiz();
