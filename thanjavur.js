const questions = [
    {
        question: " The maze-like complex was constructed partly by the __ who took over Thanjavur in 1535, and partly by a local Maratha dynasty that ruled from 1676 to 1855. ",
        optionA: " Chera ",
        optionB: " Nayaks ",
        optionC: " Chola ",
        optionD: " Pandiya ",
        correctOption: " optionB"
    },

    {
        question : " Thanjavur district is called __ ",
        optionA: " 'The Rice Bowl of Tamil Nadu' ",
        optionB: " The Spring Bowl of Tamil Nadu",
        optionC: " The Temples of Tamil Nadu  ",
        optionD: " None of the above  ",
        correctOption: "optionA"
    },

    {
        question : " Brihadishvara temple, also called Rajarajeswaram or Peruvudaiyār Kōvil, is a Hindu temple dedicated to___ located in South bank of Kaveri river in Thanjavur, Tamil Nadu ",
        optionA: " Meenakshi  ",
        optionB: " Ganesha ",
        optionC: " Muruga ",
        optionD: " Shiva ",
        correctOption: "optionD"
    },

    {
        question4: " The temple of goddess Mariamman is one of the famous temples around Thanjavur District. This temple dedicated to Mariamman a manifestation of Shakti, is about __Kms from the Thanjavur Brihadeeswara temple ",
        optionA: " 6 ",
        optionB: " 4 ",
        optionC: " 5 ",
        optionD: " 3 ",
        correctOption: "optionC"
    },

    {
        question : "The  temple is a part of the ___ World Heritage Site known as the “Great Living Chola Temples”, ",
        optionA: " SNAP ",
        optionB: " WHO ",
        optionC: " UNICEF",
        optionD: " UNESCO ",
        correctOption: "optionD"
    },

    {
        question : " __ is one of the best places for Sangeetha (music) lovers. Also, popular as the ‘Hall of Music’, the place was built in 1600’s during the rule of Nayak King Sevappa Nayak.",
        optionA: " Sageetha Mahal ",
        optionB: "Sageeth Mahal ",
        optionC: " Royal Mahal ",
        optionD: " None of the above",
        correctOption: " optionA "
    },

    {
        question7: " _ tower is situated in the Northwestern side of the Arsenal Tower. This tower is also known as “the wide holed ear pavilion” to the public and designed in the style of the Gingee Nayaks. The seven-story bell tower has superb views of the Big Temple and a bird’s eye view of the city of Thanjavur. ",
        optionA: " Dell ",
        optionB: " Bell ",
        optionC: " Tanjavur ",
        optionD: " None of the above ",
        correctOption: "optionB"
    },

    {
        question8: " The Thanjavur Royal Palace, also called the Thanjavur Maratha Palace Complex or simply Aranmanai, is a sprawling heritage site that lies just ___ of the Brihadeeswarar Temple.",
        optionA: " North ",
        optionB: " South ",
        optionC: " East ",
        optionD: " West ",
        correctOption: "optionA"
    },

    {
        question: " It is one of the oldest libraries in Asia  established during 16th century by Nayakas of Thanjavur and has on display a rare collection of Palm leaf manuscripts and paper written in ___ and a few other languages indigenous to India.  ",
        optionA: " Hindi and Sanskeit ",
        optionB: " English and Hindi ",
        optionC: " Tamil and English ",
        optionD: " Tamil and Sanskrit ",
        correctOption: "optionD"
    },

    {
        question: " In his early age Sarfoji studied under the influence of the German Reverent Schwartz, and learned many languages including ___ ",
        optionA: " French, Italian and Latin",
        optionB: " English, Italian and Latin ",
        optionC: " English, French,  and Latin ",
        optionD: " English, French, Italian and Latin ",
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
        }
    })
}


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
