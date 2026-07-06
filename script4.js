
const questions = [
    {question: "Which keyword is used to declare a block-scoped variable in JavaScript?",
     options: ["var", "let", "assign", "set"],
     correctAnswer: 1 },

    {question: "How do you write a comment that spans multiple lines in JavaScript?",
     options: ["// This is a comment", "", "/* This is a comment */", "' This is a comment"],
     correctAnswer: 2 },

    {question: "What is the correct way to check if two variables are equal in both value and type?",
     options: ["x == y", "x = y", "x === y", "x equals y"],
     correctAnswer: 2},

    {question: "Which built-in method removes the last element from an array and returns it?",
     options: ["pop()", "push()", "shift()", "slice()"],
     correctAnswer: 0},

    {question: "Which of the following is NOT a primitive data type in JavaScript?",
     options: ["String", "Boolean", "Object", "Number"],
     correctAnswer: 2 }];

let isSubmitted = false;

const quizContainer = document.getElementById("quizContainer");
const submitBtn = document.getElementById("submitBtn");
const resetBtn = document.getElementById("resetBtn");
const resultDisplay = document.getElementById("resultDisplay");

function loadQuestions() {
    quizContainer.innerHTML = ""; 
    isSubmitted = false; 

    questions.forEach((qData, qIndex) => {
        const questionCard = document.createElement("div");
        questionCard.className = "question-card";
        questionCard.setAttribute("data-question-index", qIndex);

        const questionText = document.createElement("h3");
        questionText.className = "question-text";
        questionText.textContent = `${qIndex + 1}. ${qData.question}`;
        questionCard.appendChild(questionText);

        const optionsList = document.createElement("div");
        optionsList.className = "options-list";

        qData.options.forEach((optionText, oIndex) => {
            const optionElement = document.createElement("div");
            optionElement.className = "option";
            optionElement.setAttribute("data-option-index", oIndex);
            optionElement.textContent = optionText;
            optionsList.appendChild(optionElement);
        });

        questionCard.appendChild(optionsList);
        quizContainer.appendChild(questionCard);
    });}

function selectAnswer(questionIndex, optionIndex) {
    const targetCard = quizContainer.querySelector(`[data-question-index="${questionIndex}"]`);
    if (!targetCard) return;

    const parentOptions = targetCard.querySelectorAll(".option");
    parentOptions.forEach(opt => opt.classList.remove("selected"));

    const selectedOption = targetCard.querySelector(`[data-option-index="${optionIndex}"]`);
    if (selectedOption) {
        selectedOption.classList.add("selected");
    }}

function submitQuiz(){
    if (isSubmitted) return;

    const questionCards = quizContainer.querySelectorAll(".question-card");
    let correctCount = 0;
    let unansweredCount = 0;

    questionCards.forEach(card => {
        const selected = card.querySelector(".option.selected");
        if (!selected) {
            unansweredCount++;
        }
    });

    if (unansweredCount > 0) {
        alert(`You left ${unansweredCount} question(s) unanswered! Please complete all selections before submission.`);
        return; 
    }

    questionCards.forEach(card => {
        const qIndex = parseInt(card.getAttribute("data-question-index"), 10);
        const selectedOption = card.querySelector(".option.selected");
        const chosenIndex = parseInt(selectedOption.getAttribute("data-option-index"), 10);
        const correctIndex = questions[qIndex].correctAnswer;

        const actualCorrectOption = card.querySelector(`[data-option-index="${correctIndex}"]`);
        if (actualCorrectOption) {
            actualCorrectOption.classList.add("correct-answer");
        }

        if (chosenIndex === correctIndex) {
            card.classList.add("correct");
            correctCount++;
        } else {
            card.classList.add("incorrect");
        }
    });

    isSubmitted = true;

    resultDisplay.textContent = `You scored ${correctCount} out of ${questions.length}!`;
    resultDisplay.className = correctCount >= Math.ceil(questions.length / 2) ? "score-good" : "score-bad";
}

function resetQuiz() {
    loadQuestions();
    resultDisplay.textContent = "";
    resultDisplay.className = "";
}


document.addEventListener("DOMContentLoaded", loadQuestions);

quizContainer.addEventListener("click", function(event) {
    if (isSubmitted) return;

    const targetElement = event.target;

    if (targetElement.classList.contains("option")) {
        const parentCard = targetElement.closest(".question-card");
        const qIndex = parentCard.getAttribute("data-question-index");
        const oIndex = targetElement.getAttribute("data-option-index");

        selectAnswer(qIndex, oIndex);
    }
});