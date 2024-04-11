const questions=[
  {
   question:"What does 'ASCII' stand for in character encoding?",
   options:["American Standard Code for Information Interchange","Advanced Standard Character Input Interface","Automated Symbol Code for Interactive Information Exchange","Automated Standard Code for Internet Interaction"],
   answer:0,
 },
 {
   question:"What is the primary purpose of CSS in web development?",
   options:["Creating server-side scripts","Enhancing website security","Styling and formatting web pages","Managing server databases"],
   answer:2,
 },
 {
   question:"In SQL, what does the 'SELECT' statement do?",
   options:["Update data in a database","Delete records from a table","Retrieve data from a database","Create a new database"],
   answer:2,
 },
 {
  question:"What does 'XML' stand for in data markup and exchange?",
  options:["Extended Markup Language","External Metadata Language","Extensible Markup Language","Expressive Metadata Language"],
  answer:2,
},
{
  question:"In Python, what does 'PEP' stand for in the context of coding conventions?",
  options:["Python Enhancement Protocol","Python Enhancement Process","Python Evolution Plan","Python Extension Proposal"],
  answer:1,
},
{
  question:"What does 'API' stand for when referring to software interfaces?",
  options:["Application Protocol Interface","Application Programming Interface","Advanced Programming Integration","Application Process Integration"],
  answer:1,
},
{
  question:"In PHP, what does 'PHP' itself stand for in the context of server-side scripting?",
  options:["Personal Home Page","Pre-Hypertext Processor","PHP Hypertext Preprocessor","Public Hosting Platform"],
  answer:2,
},
{
  question:"What does 'URL' stand for in the context of web addresses?",
  options:["Uniform Resource Locator","Unified Reference Link","Universal Resource Language","Uniform Resource Language"],
  answer:0,
},
{
  question:"In C++, what does 'STL' stand for in the context of libraries?",
  options:["Standard Template Library","Simple Text Library","System Transformation Language","Structured Template Language"],
  answer:0,
},
{
  question:"What does 'IDE' stand for in the context of software development environments?",
  options:["Integrated Development Engine","Integrated Development Environment","Interactive Development Environment","Intelligent Development Environment"],
  answer:1,
},
 ];
 const quiz = document.querySelector("#quiz");
 const ansElement = document.querySelectorAll(".answer");
 const [queElement, option1, option2, option3] = document.querySelectorAll("#question", ".option1", "option2", ".option3");
 const nextBtn = document.querySelector("#next");
 const submitBtn = document.querySelector("#submit");
 // const reviewBtn = document.querySelector("#review");
 
 let curQuestion = 0;
 let score = 0;
 let timer; // Declare timer variable
 let timings = [];
 
 const displayQuestion = () => {
   startTimer();
   const { question, options } = questions[curQuestion];
   queElement.innerText = `${curQuestion + 1}: ${question}`;
   option1.innerText = options[0];
   option2.innerText = options[1];
   option3.innerText = options[2];
   option4.innerText = options[3];
   // startTimer(); // Start the timer when displaying a new question
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
 // const getSelectedAnswer = (index) => {
 //   const selectedOptionIndex = getSelectedOption();
 //   return selectedOptionIndex !== undefined ? questions[index].options[selectedOptionIndex] : 'Not attempted';
   
   
 // };
 
 const deselectAnswers = () => {
   ansElement.forEach((curElem) => (curElem.checked = false));
 };
 
 
 const displayResult = () => {
   const totalQuestions = questions.length;
   const marksObtained = score;
   const incorrectAnswers = totalQuestions - marksObtained;
   const correctPercentage = ((marksObtained / totalQuestions) * 100).toFixed(2);
   const incorrectPercentage = ((incorrectAnswers / totalQuestions) * 100).toFixed(2);
 
   quiz.innerHTML = `
     <link rel="stylesheet" type="text/css" href="styles.css"></link>
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
       <a href="index.html" id="home"><button id="home-btn">HOME</button></a>
       <a href="review.html" id="review"><button id="review-btn">REVIEW</button></a>
       <canvas id="pieChart" width="250" height="250"></canvas>
     
     </div>
   `;
 
   // const reviewBtn = document.querySelector("#review-btn");
   // reviewBtn.addEventListener("click", displayReview);
 
   // Generate the pie chart
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
   if (selectedOptionIndex === questions[curQuestion].answer) {
     score++;
   }
   timings.push(timerElement.innerText);
   curQuestion++;
   if (curQuestion < questions.length) {
     deselectAnswers();
     displayQuestion();
     displayNextButton(); // Display next button if it's not the last question
   } else {
     displayResult();
   }
 });
 
 submitBtn.addEventListener("click", () => {
   const selectedOptionIndex = getSelectedOption();
   if (selectedOptionIndex === questions[curQuestion].answer) {
     score++;
   }
   timings.push(timerElement.innerText);
   timerElement.style.display = "None"; 
   stopTimer(); // Stop the timer when submitting answer
   displayResult();
 });
 
 const startQuiz = () => {
   
   displayQuestion();
   displayNextButton();
 };
 
 // Start the quiz when the page loads
 startQuiz();
}