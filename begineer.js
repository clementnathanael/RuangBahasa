const questions = [
    {
        question: "Nomor 1: Pilihlah kata yang baku!",
        options: {
            a: "Absorpsi",
            b: "Aktifitas",
            c: "Alumunium"
        },
        answer: "a"
    },
    {
        question: "Nomor 2: Pilihlah kata yang baku!",
        options: {
            a: "Ambulan",
            b: "Apotik",
            c: "Asas"
        },
        answer: "c"
    },
    {
        question: "Nomor 3: Pilihlah kata yang baku!",
        options: {
            a: "Atmosfir",
            b: "Efektivitas",
            c: "Familier"
        },
        answer: "b"
    },
    {
        question: "Nomor 4: Pilihlah kata yang baku!",
        options: {
            a: "Goa",
            b: "Hafal",
            c: "Hipotesa"
        },
        answer: "b"
    },
    {
        question: "Nomor 5: Pilihlah kata yang baku!",
        options: {
            a: "Import",
            b: "Nopember",
            c: "Gudeg"
        },
        answer: "c"
    },
    {
        question: "Nomor 6: Pilihlah kata yang baku!",
        options: {
            a: "Menyontek",
            b: "Mensukseskan",
            c: "Mempengaruhi"
        },
        answer: "a"
    },
    {
        question: "Nomor 7: Pilihlah kata yang baku!",
        options: {
            a: "Merk",
            b: "Meterai",
            c: "Milyar"
        },
        answer: "b"
    },
    {
        question: "Nomor 8: Pilihlah kata yang baku!",
        options: {
            a: "Solat",
            b: "Sedekah",
            c: "Seprei"
        },
        answer: "b"
    },
    {
        question: "Nomor 9: Pilihlah kata yang baku!",
        options: {
            a: "Sop",
            b: "Sreg",
            c: "Smash"
        },
        answer: "a"
    },
    {
        question: "Nomor 10: Pilihlah kata yang baku!",
        options: {
            a: "Wirausaha",
            b: "Terimakasih",
            c: "Orang tua"
        },
        answer: "c"
    }
];

let currentQuestionIndex = 0;
const userAnswers = {};
let isSubmitted = false;

function loadQuestion() {
    const currentQuestion = questions[currentQuestionIndex];
    document.getElementById('question').innerText = currentQuestion.question;

    const optionsContainer = document.getElementById('options');
    optionsContainer.innerHTML = ''; // Clear previous options

    for (const [key, value] of Object.entries(currentQuestion.options)) {
        const optionId = `q${currentQuestionIndex + 1}${key}`;
        const optionLabel = document.createElement('label');
        optionLabel.setAttribute('for', optionId);
        optionLabel.innerText = `${key}) ${value}`;

        const optionInput = document.createElement('input');
        optionInput.setAttribute('type', 'radio');
        optionInput.setAttribute('id', optionId);
        optionInput.setAttribute('name', `q${currentQuestionIndex + 1}`);
        optionInput.setAttribute('value', key);

        optionsContainer.appendChild(optionInput);
        optionsContainer.appendChild(optionLabel);
        optionsContainer.appendChild(document.createElement('br'));

        // Restore previous selection if any
        if (userAnswers[currentQuestionIndex] === key) {
            optionInput.checked = true;
        }

        // Disable radio buttons if the quiz has been submitted
        if (isSubmitted) {
            optionInput.disabled = true;
        }

        optionInput.addEventListener('change', (event) => {
            userAnswers[currentQuestionIndex] = event.target.value;
            document.getElementById(`nav-${currentQuestionIndex + 1}`).classList.add('answered');
        });
    }

    // Highlight correct answer if the quiz has been submitted
    if (isSubmitted) {
        const correctAnswer = questions[currentQuestionIndex].answer;
        const correctLabel = document.querySelector(`label[for="q${currentQuestionIndex + 1}${correctAnswer}"]`);
        if (correctLabel) {
            correctLabel.style.backgroundColor = 'lightgreen';
        }
    }

    updateNavigation();
    updateButtons();
}

function navigateToQuestion(index) {
    currentQuestionIndex = index;
    loadQuestion();
}

function updateButtons() {
    document.getElementById('prev-btn').style.display = currentQuestionIndex > 0 ? 'inline-block' : 'none';
    document.getElementById('next-btn').style.display = currentQuestionIndex < questions.length - 1 ? 'inline-block' : 'none';
    document.getElementById('submit-btn').style.display = (currentQuestionIndex === questions.length - 1 && !isSubmitted) ? 'inline-block' : 'none';
    document.getElementById('finish-btn').style.display = isSubmitted ? 'inline-block' : 'none';
}

function updateNavigation() {
    document.querySelectorAll('.nav-item').forEach((box, index) => {
        box.classList.remove('current');
        if (index === currentQuestionIndex) {
            box.classList.add('current');
        }
    });
}

document.getElementById('next-btn').addEventListener('click', () => {
    const selectedOption = document.querySelector(`input[name="q${currentQuestionIndex + 1}"]:checked`);
    if (selectedOption) {
        userAnswers[currentQuestionIndex] = selectedOption.value;
        document.getElementById(`nav-${currentQuestionIndex + 1}`).classList.add('answered');
    }
    
    currentQuestionIndex++;
    loadQuestion();
});

document.getElementById('prev-btn').addEventListener('click', () => {
    currentQuestionIndex--;
    loadQuestion();
});

document.getElementById('quizForm').addEventListener('submit', function(event) {
    event.preventDefault();

    let score = 0;
    for (let i = 0; i < questions.length; i++) {
        const questionId = `q${i + 1}`;
        const selectedOption = userAnswers[i];
        const correctAnswer = questions[i].answer;
        
        if (selectedOption) {
            if (selectedOption === correctAnswer) {
                document.getElementById(`nav-${i + 1}`).classList.add('true');
                score++;
            } else {
                document.getElementById(`nav-${i + 1}`).classList.add('wrong');
            }
        } else {
            // Mark unanswered questions as wrong
            document.getElementById(`nav-${i + 1}`).classList.add('wrong');
        }

        // Highlight correct answer
        const correctLabel = document.querySelector(`label[for="q${i + 1}${correctAnswer}"]`);
        if (correctLabel) {
            correctLabel.style.backgroundColor = 'lightgreen';
        }
    }

    document.getElementById('result').innerText = 'Nilaimu adalah: ' + score * 10;
    isSubmitted = true;
    updateButtons();

    // Disable all radio buttons
    questions.forEach((question, index) => {
        document.querySelectorAll(`input[name="q${index + 1}"]`).forEach(input => {
            input.disabled = true;
        });
    });
});

document.getElementById('finish-btn').addEventListener('click', () => {
    window.location.href = 'index2.html';
});

loadQuestion();