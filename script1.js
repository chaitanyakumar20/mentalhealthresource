document.getElementById('switch').addEventListener('change', function(event) {
    if (event.target.checked) {
        document.body.classList.add('dark-mode');
    } else {
        document.body.classList.remove('dark-mode');
    }
});

function openTextInNewTab(event) {
    event.preventDefault(); // Prevent the default form submission

    var formData = new FormData(event.target);

    fetch('/submit', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        var newWindow = window.open('', '_blank');
        if (newWindow) {
            newWindow.document.write('<html><head><title>Problem Description</title></head><body>');
            newWindow.document.write('<h1>Your Problem:</h1>');
            newWindow.document.write('<p>' + data.problem + '</p>'); // Display the problem text
            newWindow.document.write('</body></html>');
            newWindow.document.close(); // Needed for IE
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
}



const questions = [
    {
        question: "How frequently do you experience sleep disturbances?",
        options: ["Never", "Always", "Often", "Rarely", "Sometimes", "Not at all"]
    },
    {
        question: "How often do you notice changes in your appetite?",
        options: ["Never", "Always", "Often", "Rarely", "Sometimes", "Not at all"]
    },
    {
        question: "How frequently do you feel fatigued or low on energy?",
        options: ["Never", "Always", "Often", "Rarely", "Sometimes", "Not at all"]
    },
    {
        question: "How often do you feel worthless or experience excessive guilt?",
        options: ["Never", "Always", "Often", "Rarely", "Sometimes", "Not at all"]
    },
    {
        question: "How frequently do you have difficulty concentrating?",
        options: ["Never", "Always", "Often", "Rarely", "Sometimes", "Not at all"]
    },
    {
        question: "How often do you experience physical agitation?",
        options: ["Never", "Always", "Often", "Rarely", "Sometimes", "Not at all"]
    },
    {
        question: "How frequently do you have thoughts of self-harm or suicide?",
        options: ["Never", "Always", "Often", "Rarely", "Sometimes", "Not at all"]
    },
    {
        question: "How often do you have issues with sleeping?",
        options: ["Never", "Always", "Often", "Rarely", "Sometimes", "Not at all"]
    },
    {
        question: "How frequently do you feel aggressive?",
        options: ["Never", "Always", "Often", "Rarely", "Sometimes", "Not at all"]
    },
    {
        question: "How often do you experience panic attacks?",
        options: ["Never", "Always", "Often", "Rarely", "Sometimes", "Not at all"]
    },
    {
        question: "How frequently do you feel hopeless?",
        options: ["Never", "Always", "Often", "Rarely", "Sometimes", "Not at all"]
    },
    {
        question: "How often do you feel restless?",
        options: ["Never", "Always", "Often", "Rarely", "Sometimes", "Not at all"]
    },
    {
        question: "How frequently do you lack energy?",
        options: ["Never", "Always", "Often", "Rarely", "Sometimes", "Not at all"]
    }
];

let currentQuestionIndex = 0;
const totalQuestions = questions.length;

const questionContainer = document.getElementById('question-container');
const resultContainer = document.getElementById('result-container');

function showQuestion() {
    const questionData = questions[currentQuestionIndex];
    questionContainer.innerHTML = `
        <div class="question">${questionData.question}</div>
        <ul class="options">
            ${questionData.options.map((option, index) => `
                <li>
                    <label>
                        <input type="radio" name="option" value="${index}" />
                        ${option}
                    </label>
                </li>
            `).join('')}
        </ul>
        <button onclick="previousQuestion()" ${currentQuestionIndex === 0 ? 'disabled' : ''}>&#11160;</button>
        <button onclick="nextQuestion()">&#11162;</button>
    `;
    questionContainer.classList.add('active');
}

function nextQuestion() {
    const selectedOption = document.querySelector('input[name="option"]:checked');
    if (!selectedOption) {
        alert("Please select an option");
        return;
    }

    currentQuestionIndex++;

    if (currentQuestionIndex < totalQuestions) {
        showQuestion();
    } else {
        showResult();
    }
}

function previousQuestion() {
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        showQuestion();
    }
}

function showResult() {
    questionContainer.classList.remove('active');
    resultContainer.classList.add('active');
    resultContainer.innerHTML = `
        <div class="result">
            <h2>Your Depression Level</h2>
            <p>Result goes here based on your selections.</p>
        </div>
    `;
}

document.addEventListener('DOMContentLoaded', showQuestion);
