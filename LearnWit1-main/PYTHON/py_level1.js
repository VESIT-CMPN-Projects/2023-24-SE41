const questions=[
  {
    question: "How do you define a function in Python?",
    options: ["func myFunction():", "def myFunction():", "define myFunction():", "function myFunction():"],
    answer: 1,
  },
  {
    question: " What is the output of the following segment  chr(ord('A'))",
    options: ["A","B","a","Error"],
    answer: 0,
  },
  {
    question: "What is Python primarily known for?",
    options: ["Web development", "Data science and machine learning", "Game development", "All of the above"],
    answer: 3,
  },
  {
    question: "What is Python?",
    options: ["A type of snake", "A programming language", "A data structure", "A software application"],
    answer: 1,
  },
  {
    question: " _____ is used to create an object",
    options: ["Class","constructor","User-defined functions","in-built function"],
    answer: 1,
  },
  {
    question: "How do you write a comment in Python?",
    options: ["//This is a comment", "/*This is a comment*/", "#This is a comment", "'This is a comment'"],
    answer: 2,
  },
  {
    question: "Which function is used to get user input in Python?",
    options: ["get()", "input()", "user_input()", "read()"],
    answer: 1,
  },
  {
    question: "What is the correct way to write a Python function named 'multiply' that takes two parameters?",
    options: ["function multiply(a, b):", "def multiply(a, b):", "define multiply(a, b):", "func multiply(a, b):"],
    answer: 2,
  },
    {
      "question": "What is the purpose of a Python decorator?",
      "options": [
        "To define a reusable piece of code that can be applied to multiple functions",
        "To dynamically change the behavior of a function or method",
        "To encapsulate code within a class definition",
        "To optimize the execution speed of Python code"
      ],
      "answer": 1
    },
    {
      "question": "What will be the output of the following Python code snippet?",
      "code": "class Parent:\n    def __init__(self):\n        self.value = 4\n    \n    def add_value(self, value):\n        self.value += value\n\nclass Child(Parent):\n    def __init__(self):\n        super().__init__()\n    \n    def add_value(self, value):\n        super().add_value(value)\n        self.value *= value\n\nobj = Child()\nobj.add_value(3)\nprint(obj.value)",
      "options": [
        "12",
        "16",
        "24",
        "Error: Method 'add_value' cannot be called on object 'Child'"
      ],
      "answer": 1
    }

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
userData[userEmail]['py_level1'] = userData[userEmail]['py_level1'] || {}; // Create 'subject' object if it doesn't exist
userData[userEmail]['py_level1']['level1'] = userData[userEmail]['py_level1']['level1'] || {}; // Create 'level' object if it doesn't exist
userData[userEmail]['py_level1']['level1'].questions = userData[userEmail]['py_level1']['level1'].questions || []; // Create 'questions' array if it doesn't exist
userData[userEmail]['py_level1']['level1'].questions.push({
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
          <a href="py_l1_review.html" ><button>REVIEW</button></a>
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
     
      
    
    
    
    
    
    