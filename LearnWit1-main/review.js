// Global variables
const correctQuestionsContainer = document.getElementById('correct-questions');
const wrongQuestionsContainer = document.getElementById('wrong-questions');
const graphContainer = document.getElementById('graph');
const userEmail = localStorage.getItem("userEmail");

// Function to get user activity
const getUserActivity = (userEmail) => {
    const userData = JSON.parse(localStorage.getItem(userEmail)) || {};
    const uniqueQuestions = new Set(); // Set to store encountered questions
    const questions = userData[userEmail]?.['quick-quiz']?.questions || [];

    const uniqueQuestionData = [];
    // Iterate through questions array starting from the last index
    for (let i = questions.length - 1; i >= 0; i--) {
        const question = questions[i];
        if (!uniqueQuestions.has(question.question)) {
            uniqueQuestions.add(question.question);
            uniqueQuestionData.unshift(question); // Add question to the beginning of uniqueQuestionData array
        }
    }

    userData[userEmail]['quick-quiz'] = { questions: uniqueQuestionData }; // Update userData with unique questions
    return userData;
};

// Function to display user activity
const displayUserActivity = () => {
    const userData = getUserActivity(userEmail);
    if (userData && userData[userEmail] && userData[userEmail]['quick-quiz'] && userData[userEmail]['quick-quiz'].questions && userData[userEmail]['quick-quiz'].questions.length > 0) {
        let totalCorrect = 0;
        let totalWrong = 0;

        userData[userEmail]['quick-quiz'].questions.forEach(q => {
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

// Event listener for analyze button
const analyzeBtn = document.getElementById("analyze-btn");
analyzeBtn.addEventListener("click", () => {
    displayUserActivity();
});

// Event listener for home button
const homeBtn = document.getElementById("home-btn");
homeBtn.addEventListener("click", () => {
    window.location.href = "index.html";
});

// Event listener for download button
const downloadBtn = document.getElementById("download-btn");
downloadBtn.addEventListener("click", () => {
    const canvas = document.getElementById('graph');
    const imageURL = canvas.toDataURL('image/png');

    const link = document.createElement('a');
    link.href = imageURL;
    link.download = 'quiz_results.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
});

// Event listener for share button (Facebook)
const shareBtn = document.getElementById("share-btn");
shareBtn.addEventListener("click", () => {
    shareAchievement('facebook');
});

// Event listener for share button (WhatsApp)
const shareWhatsAppBtn = document.getElementById("share-whatsapp-btn");
shareWhatsAppBtn.addEventListener("click", () => {
    shareAchievement('whatsapp');
});

// Event listener for share button (Instagram)
const shareInstagramBtn = document.getElementById("share-instagram-btn");
shareInstagramBtn.addEventListener("click", () => {
    shareAchievement('instagram');
});

// Event listener for share button (LinkedIn)
const shareLinkedInBtn = document.getElementById("share-linkedin-btn");
shareLinkedInBtn.addEventListener("click", () => {
    shareAchievement('linkedin');
});

// Event listener for share via email button
const shareEmailBtn = document.getElementById("share-email-btn");
shareEmailBtn.addEventListener("click", () => {
    sendEmail();
});

// Function to share achievement on social media
const shareAchievement = (platform) => {
    let shareURL = 'https://example.com/share'; // Replace with your actual share URL or content

    // Customize the share URL based on the selected platform
    switch (platform) {
        case 'facebook':
            shareURL = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareURL)}`;
            break;
        case 'whatsapp':
            shareURL = `https://api.whatsapp.com/send?text=${encodeURIComponent(shareURL)}`;
            break;
        case 'instagram':
            shareURL = `https://www.instagram.com/sharer.php?u=${encodeURIComponent(shareURL)}`;
            break;
        case 'linkedin':
            shareURL = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareURL)}`;
            break;
        default:
            // Default to the generic share URL
            break;
    }

    // Open a new window with the share URL or use social media APIs for sharing
    window.open(shareURL, '_blank');
};

// Function to send email with quiz results
const sendEmail = () => {
    const userEmailData = JSON.parse(localStorage.getItem(userEmail));
    const userEmailContent = JSON.stringify(userEmailData[userEmail]['quick-quiz'].questions, null, 4);

    // Send email using your email service provider's API or backend server
    // This is just a placeholder and won't actually send an email

    fetch('https://api.youremailprovider.com/send-email', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            to: userEmail, // User's email address
            subject: 'Quiz Results',
            body: userEmailContent // JSON content of quiz results
        })
    })
    .then(response => {
        if (response.ok) {
            alert('Email sent successfully!');
        } else {
            alert('Failed to send email. Please try again later.');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Failed to send email. Please try again later.');
    });
};