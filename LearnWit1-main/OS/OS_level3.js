const questions=[
  {
    question: "What is the primary purpose of an operating system?",
    options: ["Managing hardware resources", "Running applications", "Both a and b", "None of the above"],
    answer: 2,
  },
  {
    question: "Which scheduling algorithm is based on priority?",
    options: ["Round Robin", "First-Come-First-Serve", "Priority Scheduling", "Shortest Job Next"],
    answer: 2,
  },
  {
    question: "Which component of the operating system is responsible for managing memory?",
    options: ["CPU", "RAM", "Hard Disk", "ALU"],
    answer: 1,
  },
  {
    question: "What is the function of the File System in an operating system?",
    options: ["Manage input devices", "Manage files and directories", "Manage the CPU", "Manage network connections"],
    answer: 1,
  },
  {
    question: "What does GUI stand for in the context of operating systems?",
    options: ["General User Interface", "Graphical User Interface", "General Unit Interface", "Graphical Unit Interface"],
    answer: 1,
  },
  {
    question: "Which scheduling algorithm is based on the principle of 'first come, first served'?",
    options: ["Round Robin", "Shortest Job Next", "First-Come-First-Serve", "Priority Scheduling"],
    answer: 2,
  },
  {
    question: "What is the purpose of the 'ls' command in Unix/Linux?",
    options: ["List files and directories", "Print system information", "Create a new file", "Remove a file"],
    answer: 0,
  },
  {
    question: "Which of the following is not an example of an operating system?",
    options: ["Windows", "Linux", "Microsoft Office", "MacOS"],
    answer: 2,
  },
  {
    question: "What is the role of the Kernel in an operating system?",
    options: ["User interface", "Memory management", "File management", "Application execution"],
    answer: 1,
  },
  {
    question: "What is the purpose of virtual memory in an operating system?",
    options: ["Increase physical RAM", "Manage user accounts", "Improve disk performance", "Execute virtual machines"],
    answer: 0,
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
userData[userEmail]['OS_level3'] = userData[userEmail]['OS_level3'] || {}; // Create 'subject' object if it doesn't exist
userData[userEmail]['OS_level3']['level3'] = userData[userEmail]['OS_level3']['level3'] || {}; // Create 'level' object if it doesn't exist
userData[userEmail]['OS_level3']['level3'].questions = userData[userEmail]['OS_level3']['level3'].questions || []; // Create 'questions' array if it doesn't exist
userData[userEmail]['OS_level3']['level3'].questions.push({
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
      <a href="OS_l3_review.html" ><button>REVIEW</button></a>
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
 
  





