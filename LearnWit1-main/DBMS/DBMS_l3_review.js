
const analyzeBtn = document.getElementById("analyze-btn");
analyzeBtn.addEventListener("click", () => {
    const getUserActivity = (userEmail) => {
        
        const userData = JSON.parse(localStorage.getItem(userEmail)) || {};
        const uniqueQuestions = new Set(); // Set to store encountered questions
        const questions = userData[userEmail]?.['DBMS_level3']?.['level3']?.questions || [];
        
        const uniqueQuestionData = [];
        // Iterate through questions array starting from the last index
        for (let i = questions.length - 1; i >= 0; i--) {
            const question = questions[i];
            if (!uniqueQuestions.has(question.question)) {
                uniqueQuestions.add(question.question);
                uniqueQuestionData.unshift(question); // Add question to the beginning of uniqueQuestionData array
            }
        }
        
        userData[userEmail]['DBMS_level3']['level3'] = { questions: uniqueQuestionData }; // Update userData with unique questions
        return userData;
    };

    const displayUserActivity = (userEmail) => {
        const userData = getUserActivity(userEmail);
        const correctQuestionsContainer = document.getElementById('correct-questions');
        const wrongQuestionsContainer = document.getElementById('wrong-questions');
        const graphContainer = document.getElementById('graph');

        if (userData && userData[userEmail] && userData[userEmail]['DBMS_level3'] && userData[userEmail]['DBMS_level3']['level3'] && userData[userEmail]['DBMS_level3']['level3'].questions && userData[userEmail]['DBMS_level3']['level3'].questions.length > 0) {
            let totalCorrect = 0;
            let totalWrong = 0;

            userData[userEmail]['DBMS_level3']['level3'].questions.forEach(q => {
                const isCorrect = q.answer === q.selectedOption;
                const boxColor = isCorrect ? '#0acb51' : '#b13030';
                const questionHTML = `
                    <div class="question-box" style="background-color: ${boxColor}">
                        <p>Total Time Spent: ${q.timer}</p>
                        <p>${q.question}</p>
                        <p>Correct Answer: ${q.answer}</p>
                        <p>Your Answer: ${q.selectedOption}</p>
                    </div>
                `;

                if (isCorrect) {
                    correctQuestionsContainer.insertAdjacentHTML('beforeend', questionHTML);
                    totalCorrect++;
                } else {
                    wrongQuestionsContainer.insertAdjacentHTML('beforeend', questionHTML);
                    totalWrong++;
                }
            });

            // Update the chart
            const chartData = {
                labels: ['Correct', 'Incorrect'],
                datasets: [{
                    label: 'Score',
                    data: [totalCorrect, totalWrong],
                    backgroundColor: [
                        'rgba(75, 192, 192, 1)', // Correct color
                        'rgba(255, 99, 132, 1)'  // Incorrect color
                    ],
                    borderColor: [
                        'rgba(0, 0, 0, 1)',
                        'rgba(0 ,0 ,0 , 1)'
                    ],
                    borderWidth: 1
                }]
            };

            const chartOptions = {
                // Options for the chart...
            };

            new Chart(graphContainer, {
                type: 'bar',
                data: chartData,
                options: chartOptions
            });
        } else {
            correctQuestionsContainer.innerHTML = "<p>No quiz data available for review.</p>";
        }
    };

    const userEmail = localStorage.getItem("userEmail");
    displayUserActivity(userEmail);
});
const homeBtn = document.getElementById("home-btn");

homeBtn.addEventListener("click", () => {
    window.location.href = "../subject.html";
});