let questions = [];

function addQuestion() {
  // Get the values from the form
  const question = document.getElementById('question').value;
  const option1 = document.getElementById('option1').value;
  const option2 = document.getElementById('option2').value;
  const option3 = document.getElementById('option3').value;
  const option4 = document.getElementById('option4').value;
  const correctAnswer = document.getElementById('correctAnswer').value;

  // Create a question object and add it to the questions array
  const newQuestion = {
    question,
    options: [option1, option2, option3, option4],
    correctAnswer: correctAnswer  // This is the index of the correct option (1-4)
  };

  questions.push(newQuestion);

  // Clear the form after adding the question
  document.getElementById('questionForm').reset();

  // Display the updated list of questions
  displayQuestions();
}

function displayQuestions() {
  const questionsListDiv = document.getElementById('questionsList');
  questionsListDiv.innerHTML = '';

  questions.forEach((q, index) => {
    questionsListDiv.innerHTML += `
      <div class="question-block">
        <p>${index + 1}. ${q.question}</p>
        <ul>
          <li>1. ${q.options[0]}</li>
          <li>2. ${q.options[1]}</li>
          <li>3. ${q.options[2]}</li>
          <li>4. ${q.options[3]}</li>
        </ul>
      </div>`;
  });
}

function startTest() {
  const testDiv = document.getElementById('questionsList');
  testDiv.innerHTML = '';

  questions.forEach((q, index) => {
    testDiv.innerHTML += `
      <div class="question-block">
        <p>${index + 1}. ${q.question}</p>
        <ul>
          <li><input type="radio" name="answer-${index}" value="1"> ${q.options[0]}</li>
          <li><input type="radio" name="answer-${index}" value="2"> ${q.options[1]}</li>
          <li><input type="radio" name="answer-${index}" value="3"> ${q.options[2]}</li>
          <li><input type="radio" name="answer-${index}" value="4"> ${q.options[3]}</li>
        </ul>
      </div>`;
  });

  // Add submit button to check the answers
  testDiv.innerHTML += `<button onclick="submitTest()">Submit Test</button>`;
}

function submitTest() {
  let correctAnswersCount = 0;

  questions.forEach((q, index) => {
    const userAnswer = document.querySelector(`input[name="answer-${index}"]:checked`);
    if (userAnswer && userAnswer.value === q.correctAnswer) {
      correctAnswersCount++;
    }
  });

  alert(`You got ${correctAnswersCount} out of ${questions.length} questions right!`);
}
