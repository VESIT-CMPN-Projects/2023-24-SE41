const questions=[
  {
    question: "What is the output of the following program  \ny = 8\nz = lambda x : x * y\nprint (z(6)) ",
    options: ["48","14","64","NONE"],
    answer: 0,
  },
  {
    question: "What is the purpose of using a 'lambda' function in Python?",
    options: [
      "To define a function that can accept any number of arguments",
      "To create an anonymous function without a name",
      "To declare a function that can only be called once",
      "To specify a function with a variable number of arguments"
    ],
    answer: 1
  },
  {
    question: "In Python, what keyword is used to define a function?",
    options: ["func", "define", "def", "function"],
    answer: 2,
  },
  {
    question: " In Regex, [a-n] stands for?",
    options: ["Returns a match for any digit between 0 and 9","Returns a match for any lower case character, alphabetically between a and n","Returns a match for any two-digit numbers from 00 and 59","Returns a match for any character EXCEPT a, r, and n"],
    answer: 1,
  },
  {
    question: "What is the purpose of the \"if\" statement in Python?",
    options: ["To create a loop", "To define a function", "To make a decision", "To perform arithmetic operations"],
    answer: 2,
  },
  {
    question: "What is the output of the following Python code?\ndef add(a, b):\n    return a + b\n\nprint(add(3, '2'))",
    options: [
      "'32'",
      "5",
      "'5'",
      "TypeError: unsupported operand type(s) for +: 'int' and 'str'"
    ],
    answer: 0
  },
  {
    question: "How do you declare a variable in Python?",
    options: ["var x", "variable x", "x = 5", "declare x"],
    answer: 2,
  },
  {
    question: "Which of the following is a valid way to open and read a file in Python?",
    options: ["file.open(\"example.txt\", \"r\")", "open_file(\"example.txt\", \"read\")", "with open(\"example.txt\", \"r\") as file:", "read_file(\"example.txt\")"],
    answer: 2,
  },
  {
    question: "What does the \"len()\" function do in Python?",
    options: ["Returns the length of a string or list", "Returns the square root of a number", "Converts a string to lowercase", "Creates a new list"],
    answer: 0,
  },
  {
    question: "Which operator is used for exponentiation in Python?",
    options: ["^", "**", "//", "*"],
    answer: 1,
  },
]
;
const prevBtn = document.querySelector("#prev");
let marks=0;
const quiz = document.querySelector("#quiz");
const ansElement = document.querySelectorAll(".answer");
const [queElement, option1, option2, option3] = document.querySelectorAll("#question", ".option1", "option2", ".option3");
const nextBtn = document.querySelector("#next");
const submitBtn = document.querySelector("#submit");
// const reviewBtn = document.querySelector("#review");
const timerElement = document.querySelector("#timer");
let selectedOptions = [];
for (let i = 0; i < questions.length; i++) {
    selectedOptions.push(null);
}
// Function to display the previous selected answer


let curQuestion = 0;
let score = 0;
let timer; // Declare timer variable


const displayPrevButton = () => {
  prevBtn.style.display = curQuestion === 0 ? "none" : "block";
};

const displayQuestion = () => {
startTimer();
const { question, options } = questions[curQuestion];
queElement.innerText = `${curQuestion + 1}: ${question}`;
options.forEach((curOption, index) => {
  const optionElement = window[`option${index + 1}`];
  optionElement.innerText = curOption;
  
});
prevBtn.style.display = curQuestion === 0 ? "none" : "block";


};





const startTimer = () => {
let seconds = 0;
timer = setInterval(() => {
  timerElement.innerText = `Time Spent: ${formatTime(seconds)}`;
  seconds++;
}, 1000);
};

const formatTime = (seconds) => {
const minutes = Math.floor(seconds / 60);
const remainingSeconds = seconds % 60;
return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
};

const stopTimer = () => {
clearInterval(timer);
};

const getSelectedOption = () => {
let ansIndex;
ansElement.forEach((curOption, index) => {
  if (curOption.checked) {
    ansIndex = index;
  }
});
return ansIndex;
};

const deselectAnswers = () => {
ansElement.forEach((curElem) => (curElem.checked = false));
};


// Function to display the previous selected answer
const displayPreviousAnswer = () => {

  const selectedOption = selectedOptions[curQuestion];
  if (selectedOption !== null && selectedOption !== undefined) {
    ansElement[selectedOption].checked = true;
} else {
    // If no previous selection, clear all selections
    ansElement.forEach(option => option.checked = false);
}
};

// Other functions remain the same



prevBtn.addEventListener("click", () => {
  score--;
  stopTimer();
  curQuestion--;
  if (curQuestion >= 0) {
      displayQuestion();
      displayNextButton();
    
      displayPreviousAnswer(); // Display the previous selected answer
      prevBtn.style.display = curQuestion === 0 ? "none" : "block";
  }
});


const displayNextButton = () => {
if (curQuestion === questions.length - 1) {
  submitBtn.style.display = "block";
  nextBtn.style.display = "none";
} else {
  submitBtn.style.display = "none";
  nextBtn.style.display = "block";
}
};



nextBtn.addEventListener("click", () => {
 
stopTimer(); // Stop the timer when moving to the next question

const selectedOptionIndex = getSelectedOption();

    
if (selectedOptionIndex !== undefined) {
    selectedOptions[curQuestion] = selectedOptionIndex; // Store the selected option
}


if (selectedOptionIndex === questions[curQuestion].answer) {
  marks=1;
  score++;
}
else{
  marks=0;
}

let useremail= localStorage.getItem("userEmail");
  updateUserActivity(useremail);
curQuestion++;
if (curQuestion < questions.length) {
  
  
  
  displayQuestion();
displayPreviousAnswer(); // Display the previous selected answer

  displayNextButton(); // Display next button if it's not the last question
} 

});



// Function to update user data in local storage
const updateUserActivity = (userEmail) => {



  
  const userData = JSON.parse(localStorage.getItem(userEmail)) || {}; // Retrieve existing user data or create a new object
const currentQuestion = questions[curQuestion];
const selectedOptionIndex = selectedOptions[curQuestion];
const correctanswer = currentQuestion.options[questions[curQuestion].answer];

userData[userEmail] = userData[userEmail] || {}; // Create 'userEmail' object if it doesn't exist
userData[userEmail]['py_level2'] = userData[userEmail]['py_level2'] || {}; // Create 'subject' object if it doesn't exist
userData[userEmail]['py_level2']['level2'] = userData[userEmail]['py_level2']['level2'] || {}; // Create 'level' object if it doesn't exist
userData[userEmail]['py_level2']['level2'].questions = userData[userEmail]['py_level2']['level2'].questions || []; // Create 'questions' array if it doesn't exist
userData[userEmail]['py_level2']['level2'].questions.push({
question: currentQuestion.question,
selectedOption: currentQuestion.options[selectedOptions[curQuestion]],
points: marks,
answer: correctanswer,
timer: timerElement.innerText
});

// localStorage.setItem(userEmail, JSON.stringify(userData)); // Store the updated user data in local storage

  localStorage.setItem(userEmail, JSON.stringify(userData)); // Store the updated user data in local storage
};



submitBtn.addEventListener("click", () => {
  stopTimer();
  const selectedOptionIndex = getSelectedOption();
  if (selectedOptionIndex !== undefined) {
    selectedOptions[curQuestion] = selectedOptionIndex; // Store the selected option
}
  if (selectedOptionIndex === questions[curQuestion].answer) {
    marks=1;
    score++;
    
  }
  else{
    marks=0;
  }
  let useremail= localStorage.getItem("userEmail");
  updateUserActivity(useremail);

  

timerElement.style.display = "None"; 
displayResult();

}

);


// Add event listener for the exit button
const exitBtn = document.querySelector(".exit");

exitBtn.addEventListener("click", () => {
    // Prompt a confirmation dialog before exiting
    const confirmExit = confirm("Are you sure you want to exit the quiz?");
    if (confirmExit) {
        // Reload the window to exit the quiz
        window.location.href = "../index.html";
    }
});

const startQuiz = () => {

displayQuestion();
displayNextButton();
};

// Start the quiz when the page loads
startQuiz();

const displayResult = () => {
  const totalQuestions = questions.length;
  const marksObtained = score;
  const incorrectAnswers = totalQuestions - marksObtained;
  const correctPercentage = ((marksObtained / totalQuestions) * 100).toFixed(2);
  const incorrectPercentage = ((incorrectAnswers / totalQuestions) * 100).toFixed(2);
  
  quiz.innerHTML = `
    <link rel="stylesheet" type="text/css" href="styles.css"></link>
    <link rel="stylesheet" type="text/css" href="SCORE.css"></link>
    <style>
    .quizz{
      padding:110px;
      padding-top:200px;
    }
      .result {
        background-color: #f2f2f2;
        border: 1px solid #ddd;
        border-radius: 5px;
        padding: 20px;
        text-align: center;
      }
      .result h3 {
        color: #333;
        font-size: 24px;
        margin-bottom: 20px;
      }
      .result button {
        background-color: #4CAF50;
        border: none;
        color: white;
        padding: 10px 20px;
        text-align: center;
        text-decoration: none;
        display: inline-block;
        font-size: 16px;
        margin: 4px 2px;
        cursor: pointer;
        border-radius: 5px;
      }
      .result button:hover {
        background-color: #3e8e41;
      }
      #home-btn, #review-btn {
        margin-top: 20px;
        margin-right: 10px;
      }
    </style>
    <div class="result">
      <h3>Your score is ${marksObtained}/${totalQuestions}</h3>
      <button class="reload-button" onclick="location.reload()">Play Again</button>
      <a href="../subject.html" id="home"><button id="home-btn">HOME</button></a>
      <a href="py_l2_review.html" ><button>REVIEW</button></a>
      <canvas id="pieChart" width="250" height="250"></canvas>
    
    </div>
    
  `;
  
 
  const pieChartCanvas = document.getElementById("pieChart");
  const ctx = pieChartCanvas.getContext("2d");
  new Chart(ctx, {
    type: "pie",
    data: {
      labels: ["Correct", "Incorrect"],
      datasets: [{
        label: "Quiz Result",
        data: [marksObtained, incorrectAnswers],
        backgroundColor: ["green", "red"]
      }]
    },
    options: {
      responsive: false,
      title: {
        display: true,
        text: "Quiz Result"
      }
    }
  });
  
  };
 
  





