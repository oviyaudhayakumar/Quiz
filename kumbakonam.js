const questions = [
    {
        question: "The tallest is the eastern tower, with 11 stories and a height of 128 feet (39 m)",
        optionA: "Kasi  Viswanathar Temple",
        optionB: "Adi Kumbeswarar Temple",
        optionC: "Ramaswamy temple",
        optionD: "Chakrapani temple",
        correctOption: "optionB"
    },

    {
        question :"The tallest is the western tower, with seven stories and a height of 72 feet (22 m).",
        optionA: "Kasi  Viswanathar Temple",
        optionB: "Adi Kumbeswarar Temple",
        optionC: "Ramaswamy temple",
        optionD: "Chakrapani temple",
        correctOption: "optionA"
    },

    {
        question: "The town is bounded by two rivers, the __ River to the north and ___ River to the south.",
        optionA: "Kaveri , Arasalar",
        optionB: "Kaveri , Ganga",
        optionC: "Ganga , Bharmaputira",
        optionD: "All the above",
        correctOption: "optionA"
    },

    {
        question: "The temple complex covers __ acres and is located close to the Mahamaham tank.",
        optionA: "6",
        optionB: "4",
        optionC: "2",
        optionD: "3",
        correctOption: "optionC"
    },

    {
        question: "The tank is surrounded by sixteen small Mandapams (shrines) and has 21 wells inside the tank.",
        optionA: "All the below ",
        optionB: "Maham tank ",
        optionC: "Maha tank ",
        optionD: "Mahamaham tank ",
        correctOption: "optionD"
    },

    {
        question: "The tank is located in the heart of Kumbakonam town. It covers an area of 6.2 acres and is __ in shape.",
        optionA: "trapezoidal",
        optionB: "Square",
        optionC: "Triangle",
        optionD: "Rectangle",
        correctOption: "optionA "
    },

    {
        question: "Aditya Chola constructed this temple during the 9th century",
        optionA: "Nageswaran Kovil",
        optionB: "Ramaswamy temple",
        optionC: "Chakeapani temple",
        optionD: "None of the above",
        correctOption: "optionA"
    },

    {
        question: "The rajagopuram (the main gateway) has eleven tiers and has a height of ___ ",
        optionA: "173 ft",
        optionB: "174 ft",
        optionC: "172 ft",
        optionD: "171 ft",
        correctOption: "optionA"
    },

    {
        question : "The temple has beautiful architecture pieces and has been built by the Thanjavur Nayak kings and Govinda Dikshitar, the prime minister of the Nayaks, constructed the temple. ",
        optionA: "Chakrapani temple",
        optionB: "Adi Kumbeswarar Temple",
        optionC: "Sarangapani temple",
        optionD: "Ramaswamy temple",
        correctOption: "optionD"
    },

    {
        question: "__ is a Hindu temple dedicated to Vishnu located in Kumbakonam, Tamil Nadu, India. This temple is located 2 km, away towards North West from the Kumbakonam Railway Station. ",
        optionA: "Ramaswamy temple",
        optionB: "Sarangapani temple",
        optionC: "Adi Kumbeswarar Temple",
        optionD: "Chakrapani temple",
        correctOption: "optionD"
    },


]


let shuffledQuestions = [] 

function handleQuestions() { 
    
    while (shuffledQuestions.length <= 9) {
        const random = questions[Math.floor(Math.random() * questions.length)]
        if (!shuffledQuestions.includes(random)) {
            shuffledQuestions.push(random)
        }
    }
}


let questionNumber = 1 
let playerScore = 0  
let wrongAttempt = 0 
let indexNumber = 0 


function NextQuestion(index) {
    handleQuestions()
    const currentQuestion = shuffledQuestions[index]
    document.getElementById("question-number").innerHTML = questionNumber
    document.getElementById("player-score").innerHTML = playerScore
    document.getElementById("display-question").innerHTML = currentQuestion.question;
    document.getElementById("option-one-label").innerHTML = currentQuestion.optionA;
    document.getElementById("option-two-label").innerHTML = currentQuestion.optionB;
    document.getElementById("option-three-label").innerHTML = currentQuestion.optionC;
    document.getElementById("option-four-label").innerHTML = currentQuestion.optionD;

}


function checkForAnswer() {
    const currentQuestion = shuffledQuestions[indexNumber] 
    const currentQuestionAnswer = currentQuestion.correctOption 
    const options = document.getElementsByName("option");
    let correctOption = null

    options.forEach((option) => {
        if (option.value === currentQuestionAnswer) {
            
            correctOption = option.labels[0].id
        }
    })

   
    if (options[0].checked === false && options[1].checked === false && options[2].checked === false && options[3].checked == false) {
        document.getElementById('option-modal').style.display = "flex"
    }

    
    options.forEach((option) => {
        if (option.checked === true && option.value === currentQuestionAnswer) {
            document.getElementById(correctOption).style.backgroundColor = "green"
            playerScore++ 
            indexNumber++ 
            
            setTimeout(() => {
                questionNumber++
            }, 1000)
        }

        else if (option.checked && option.value !== currentQuestionAnswer) {
            const wrongLabelId = option.labels[0].id
            document.getElementById(wrongLabelId).style.backgroundColor = "red"
            document.getElementById(correctOption).style.backgroundColor = "green"
            wrongAttempt++ 
            indexNumber++
            
            setTimeout(() => {
                questionNumber++
            }, 1000)
        
function handleNextQuestion() {
    checkForAnswer() 
    unCheckRadioButtons()
    
    setTimeout(() => {
        if (indexNumber <= 9) {

            NextQuestion(indexNumber)
        }
        else {
            handleEndGame()
        }
        resetOptionBackground()
    }, 1000);
}


function resetOptionBackground() {
    const options = document.getElementsByName("option");
    options.forEach((option) => {
        document.getElementById(option.labels[0].id).style.backgroundColor = ""
    })
}


function unCheckRadioButtons() {
    const options = document.getElementsByName("option");
    for (let i = 0; i < options.length; i++) {
        options[i].checked = false;
    }
}


function handleEndGame() {
    let remark = null
    let remarkColor = null

    
    if (playerScore <= 3) {
        remark = "Bad Grades, Keep Practicing."
        remarkColor = "red"
    }
    else if (playerScore >= 4 && playerScore < 7) {
        remark = "Average Grades, You can do better."
        remarkColor = "orange"
    }
    else if (playerScore >= 7) {
        remark = "Excellent, Keep the good work going."
        remarkColor = "green"
    }
    const playerGrade = (playerScore / 10) * 100

    
    document.getElementById('remarks').innerHTML = remark
    document.getElementById('remarks').style.color = remarkColor
    document.getElementById('grade-percentage').innerHTML = playerGrade
    document.getElementById('wrong-answers').innerHTML = wrongAttempt
    document.getElementById('right-answers').innerHTML = playerScore
    document.getElementById('score-modal').style.display = "flex"

}


function closeScoreModal() {
    questionNumber = 1
    playerScore = 0
    wrongAttempt = 0
    indexNumber = 0
    shuffledQuestions = []
    NextQuestion(indexNumber)
    document.getElementById('score-modal').style.display = "none"
}


function closeOptionModal() {
    document.getElementById('option-modal').style.display = "none"
}
