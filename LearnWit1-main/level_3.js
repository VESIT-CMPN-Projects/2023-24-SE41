const questions=[
  {
   question:"In version control systems like Git, what command is used to make a copy of a repository on your local machine?",
   options:["git pull","git push","git clone","git commit"],
   answer:2,
 },
 {
   question:"What is the purpose of the 'DOCTYPE' declaration in an HTML document?",
   options:["Defines the document's author","Specifies the document's title","Indicates the document's version and type","Provides a description of the document"],
   answer:2,
 },
 {
   question:"In Swift, what does 'ARC' stand for when discussing memory management?",
   options:["Automatic Release Control","Advanced Reference Control","Automatic Reference Counting","Advanced Resource Coordination"],
   answer:2,
 },
 {
  question:"What does 'GNU' stand for in the context of free software and open-source development?",
  options:["General Network Utility","Global Network Union","Global Network Utility","GNU's Not Unix"],
  answer:1,
},
{
  question:"In Perl, what does 'CPAN' stand for when referring to the comprehensive archive of Perl modules?",
  options:["Comprehensive Perl Archive Network","cpCentralized Perl Application Networku","Common Perl Archive Network","Complete Perl Access Network"],
  answer:0,
},
{
  question:"What is the default method for an HTTP request when you open a web page in a browser?",
  options:["POST","PUT","GET","DELETE"],
  answer:2,
},
{
  question:"In Ruby, what does 'IRB' stand for when referring to the interactive Ruby console?",
  options:["Interactive Ruby Browser","Interactive Ruby Build","moInteractive Ruby Consoleuse","Interactive Ruby Box"],
  answer:2,
},
{
  question:"Which programming language is often used for artificial intelligence and machine learning?",
  options:["Java","C++","Python","Ruby"],
  answer:2,
},
{
  question:"In computer science, what does the acronym 'SQL' stand for?",
  options:["Structured Query Language","Sequential Query Language","System Query Language","Standard Query Language"],
  answer:0,
},
{
  question:"Which data structure follows the 'Last-In, First-Out' (LIFO) principle?",
  options:["Queue","Stack"," Linked List","Tree"],
  answer:1,
},
 ];
const quiz=document.querySelector("#quiz");
 const ansElement=document.querySelectorAll(".answer");
const [queElement,option1,option2,option3]=document.querySelectorAll("#question",".option1","option2",".option3");
 const submitbtn=document.querySelector("#submit");
  let curquestion=0;
 let score=0;
 const displayquestion=() =>{
   //curquestion++;
   const {question,options}=questions[curquestion];
   queElement.innerText=`${curquestion+1}:${question}`;
   options.forEach(
     (curOption,index)=>(window[`option${index+1}`].innerText=curOption)
     );
//    console.log(question);
 };
 displayquestion();
const getSelectedOption =()=>{
   let ansindex;
   ansElement.forEach((curOption,index)=>{
 
    if(curOption.checked){
       ansindex=index;
   }
  //  console.log(ansindex);
 });
 return ansindex;
 //let answerElement=Array.from(ansElement);
//return  answerElement.findIndex((curElem,index)=>curElem.checked);
 };
 const deselectedAnswers=()=>{
   ansElement.forEach((curElem)=>curElem.checked=false)
 }
submitbtn.addEventListener('click',()=>{
const selectedoptionIndex=getSelectedOption();
if(selectedoptionIndex===questions[curquestion].answer){
  score++;
}
curquestion++;
 if(curquestion<questions.length){
   deselectedAnswers();
  displayquestion();
 } else{
   //const addhtml=document.querySelectorAll(".quize-section");
   quiz.innerHTML = `
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
     <h3>SCORE ${score}/${questions.length}</h3>
     <button class="reload-button" onclick="location.reload()">PLAY AGAIN</button>
     <a href="index.html" id="home"><button id="home-btn">HOME</button></a>
     <a href="review.html" id="review"><button id="review-btn">REVIEW</button></a>
   </div>
 `;
 }
 });
