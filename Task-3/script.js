// QUIZ DATA
const quizData = [
  {
    question: "Which language is used for styling web pages?",
    answers: ["HTML", "CSS", "JavaScript", "Python"],
    correct: "CSS"
  },
  {
    question: "Which tag is used for the largest heading in HTML?",
    answers: ["<h1>", "<h6>", "<head>", "<header>"],
    correct: "<h1>"
  },
  {
    question: "Which method is used to fetch data from an API in JavaScript?",
    answers: ["get()", "fetch()", "retrieve()", "load()"],
    correct: "fetch()"
  }
];

let currentQuestion = 0;
let score = 0;

const questionEl = document.getElementById("question");
const answersEl = document.getElementById("answers");
const nextBtn = document.getElementById("nextBtn");
const scoreEl = document.getElementById("score");

function loadQuestion() {
  const q = quizData[currentQuestion];
  questionEl.textContent = q.question;
  answersEl.innerHTML = "";
  q.answers.forEach(answer => {
    const btn = document.createElement("button");
    btn.textContent = answer;
    btn.onclick = () => selectAnswer(answer);
    answersEl.appendChild(btn);
  });
  nextBtn.style.display = "none";
}

function selectAnswer(answer) {
  const correctAnswer = quizData[currentQuestion].correct;
  if (answer === correctAnswer) {
    score++;
  }
  nextBtn.style.display = "block";
  Array.from(answersEl.children).forEach(btn => {
    btn.disabled = true;
    if (btn.textContent === correctAnswer) {
      btn.style.backgroundColor = "#00ffe1";
      btn.style.color = "#0b0c10";
    } else {
      btn.style.opacity = "0.5";
    }
  });
}

nextBtn.onclick = () => {
  currentQuestion++;
  if (currentQuestion < quizData.length) {
    loadQuestion();
  } else {
    questionEl.textContent = "Quiz Finished!";
    answersEl.innerHTML = "";
    nextBtn.style.display = "none";
    scoreEl.textContent = `Your Score: ${score} / ${quizData.length}`;
  }
};

loadQuestion();

// API FETCH - Random Joke
document.getElementById("jokeBtn").addEventListener("click", () => {
  fetch("https://official-joke-api.appspot.com/random_joke")
    .then(res => res.json())
    .then(data => {
      document.getElementById("joke").textContent = `${data.setup} 😂 ${data.punchline}`;
    })
    .catch(() => {
      document.getElementById("joke").textContent = "Oops! Could not fetch a joke.";
    });
});
