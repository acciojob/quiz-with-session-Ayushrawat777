   const questions = [
      {
        question: "What is the capital of France?",
        choices: ["Paris", "London", "Berlin", "Madrid"],
        correct: "Paris"
      },
      {
        question: "What is 2 + 2?",
        choices: ["3", "4", "5", "6"],
        correct: "4"
      },
      {
        question: "Which planet is known as the Red Planet?",
        choices: ["Earth", "Mars", "Jupiter", "Saturn"],
        correct: "Mars"
      },
      {
        question: "What is the largest ocean on Earth?",
        choices: ["Atlantic", "Indian", "Arctic", "Pacific"],
        correct: "Pacific"
      },
      {
        question: "Who wrote 'To Be, or Not to Be'?",
        choices: ["Shakespeare", "Hemingway", "Tolstoy", "Twain"],
        correct: "Shakespeare"
      }
    ];

    document.addEventListener('DOMContentLoaded', () => {
      const quizContainer = document.getElementById('questions');
      const scoreContainer = document.getElementById('score');
      const submitBtn = document.getElementById('submit');

      // Load progress from session storage
      const loadProgress = () => JSON.parse(sessionStorage.getItem('progress')) || {};

      // Save progress to session storage
      const saveProgress = (progress) => sessionStorage.setItem('progress', JSON.stringify(progress));

      // Load score from local storage
      const loadScore = () => localStorage.getItem('score');

      // Save score to local storage
      const saveScore = (score) => localStorage.setItem('score', score);

      // Render questions
      const renderQuestions = () => {
        const userAnswers = loadProgress();
        quizContainer.innerHTML = '';
        for (let i = 0; i < questions.length; i++) {
          const question = questions[i];
          const questionElement = document.createElement("div");
          const questionText = document.createTextNode(question.question);
          questionElement.appendChild(questionText);

          for (let j = 0; j < question.choices.length; j++) {
            const choice = question.choices[j];
            const choiceElement = document.createElement("input");
            choiceElement.setAttribute("type", "radio");
            choiceElement.setAttribute("name", `question-${i}`);
            choiceElement.setAttribute("value", choice);
            if (userAnswers[`question-${i}`] === choice) {
              choiceElement.setAttribute("checked", true);
            }
            const choiceText = document.createTextNode(choice);
            questionElement.appendChild(choiceElement);
            questionElement.appendChild(choiceText);
          }
          quizContainer.appendChild(questionElement);
        }
      };

      // Calculate and display score
      const calculateScore = () => {
        const userAnswers = loadProgress();
        let score = 0;
        for (let i = 0; i < questions.length; i++) {
          if (userAnswers[`question-${i}`] === questions[i].correct) {
            score++;
          }
        }
        return score;
      };

      // Handle form changes to save progress
      quizContainer.addEventListener('change', (event) => {
        const userAnswers = loadProgress();
        userAnswers[event.target.name] = event.target.value;
        saveProgress(userAnswers);
      });

      // Handle form submission
      submitBtn.addEventListener('click', () => {
        const score = calculateScore();
        scoreContainer.textContent = `Your score is ${score} out of 5.`;
        saveScore(score);
      });

      // Load and display existing score
      const existingScore = loadScore();
      if (existingScore !== null) {
        scoreContainer.textContent = `Your previous score was ${existingScore} out of 5.`;
      }

      // Initial render of questions
      renderQuestions();
    });
 