const questions = [
    {
        question:" This temple is situated in Coromandel between two rivers __ and __. It is one of the five element shrines or Pancha Bootha sthalams and is renowned for the worship of lord Siva as representing the element of water (appulinga).",
        optionA: "  Cauvery , coleroon",
        optionB: "  Cauvery , Vaigai",
        optionC: "  Vaigai , Gangai",
        optionD: " None of the above ",
        correctOption: "optionA"
    },

    {
        question: " The space around the mandapam was cleared to a length of __ feet and breadth of __ feet ",
        optionA: " 230 , 80 ",
        optionB: " 240 , 80 ",
        optionC: " 240 , 70 ",
        optionD: " 230 , 70 ",
        correctOption: "optionB"
    },

    {
        question: " Constructed in the Dravidian Architecture, the temple occupies an area of 63 ha with 81 shrines, 21 towers, 39 pavilions and many water tanks integrated into the complex making it the world’s largest functioning Hindu temple. ",
        optionA: "81,21,38",
        optionB: "71,22,39 ",
        optionC: "80,11,49 ",
        optionD: "81,21,39",
        correctOption: "optionD"
    },

    {
        question: " __ is the foremost of the eight self-manifested shrines (Swayam Vyakta Kshetras) of Lord Vishnu  ",
        optionA: " Musiri ",
        optionB: " Thuraiyur ",
        optionC: " Srirangam ",
        optionD: " Manapparai ",
        correctOption: "optionC"
    },

    {
        question: " Tiruchirappalli, situated on the banks of the river __ is the fourth largest city in Tamil Nadu. ",
        optionA: " Bharmaputhira ",
        optionB: " Ganga  ",
        optionC: " Vaigai ",
        optionD: " Cauvery ",
        correctOption: "optionD"
    },

    {
        question: " The Rock Fort temple stands ___ tall perched atop a rock ",
        optionA: " 82 metres ",
        optionB: " 83 metres ",
        optionC: " 81 metres ",
        optionD: " 80 metres ",
        correctOption: "optionB"
    },

    {
        question: " Malaikottai stands around __ feet and takes __ steps to reach the Ucchi Pillayar ",
        optionA: " 273 , 417 ",
        optionB: " 278 , 417 ",
        optionC: " 273 , 410 ",
        optionD: " 267 , 400 ",
        correctOption: "optionA"
    },

    {
        question: " The rock is one of the oldest in the world-approximately ___ years, which makes it as old as the rocks of Greenland and older than the Himalayas. ",
        optionA: " 3,800 million ",
        optionB: " 4,800 million ",
        optionC: " 3,900 million ",
        optionD: " 3,700 million ",
        correctOption: "optionA"
    },

    {
        question: " ___ temple was built in an area close to 18 acres and measures 2500 feet by 1500 feet. ",
        optionA: " Meenakshi ",
        optionB: " Vinagayar ",
        optionC: " Thiruvalluvar ",
        optionD: " Thiruvanaikoil ",
        correctOption: "optionD"
    },

    {
        question: `" The “Swami” (Shivalinga) is installed facing __ and “Ambaal” (Akilandeswari) facing __. "`,
        optionA: " West , South ",
        optionB: " East , North ",
        optionC: " North , South ",
        optionD: " West , East ",
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
