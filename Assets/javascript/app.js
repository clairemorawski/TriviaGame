var triviaQuestions = [{
    question: "What is the capital of Illinois?",
    answerList: ["Hartford", "Springfield", "Providence", "Jefferson City"],
    answer: 1
}, {
    question: "What is the capital of Utah?",
    answerList: ["Boise", "Carson City", "Salt Lake City", "Pierre"],
    answer: 2
}, {
    question: "What is the capital of Ohio?",
    answerList: ["Montpelier", "Austin", "Trenton", "Columbus"],
    answer: 3
}, {
    question: "What is the capital of Wisconsin?",
    answerList: ["Madison", "Annapolis", "Lansing", "Topeka"],
    answer: 0
}, {
    question: "What is the capital of Colorado?",
    answerList: ["Phoenix", "Charleston", "Denver", "Cheyenne"],
    answer: 2
}, {
    question: "What is the capital of California?",
    answerList: ["Raleigh", "Helena", "Concord", "Sacramento"],
    answer: 3
}, {
    question: "What is the capital of Massachusetts?",
    answerList: ["Nashville", "Boston", "Baton Rouge", "Indianapolis"],
    answer: 1
}, {
    question: "What is the capital of South Carolina?",
    answerList: ["Olympia", "Columbia", "Salem", "Lincoln"],
    answer: 1
}, {
    question: "What is the capital of Alabama?",
    answerList: ["Hartford", "Montgomery", "Honolulu", "Providence"],
    answer: 1
}, {
    question: "What is the capital of Alaska?",
    answerList: ["Richmond", "Santa Fe", "Bismarck", "Juneau"],
    answer: 3
}];

//Variables.
const maxTries = unlimited;
let currentQuestion = 0;
let correctAnswer = 0;
let incorrectAnswer = 0;
let unanswered = 0;
let seconds;
let time;
let answered;
let userSelect;
let hasFinished = false;        // Flag    
let wins = 0;                   // Set Wins to Zero
let losses = 0;                 // Set Losses to Zero

//User Messages.
var messages = {
    correct: "Brillant!",
    incorrect: "Try Again!",
    endTime: "Out of Time!",
    finished: "Final Score: ",
}

//Buttons.
$('#startBtn').on('click', function () {
    $(this).hide();
    resetGame();
});

$('#startOverBtn').on('click', function () {
    $(this).hide();
    resetGame();
});

//This function is needed upon start of the game and upon either meeting a Game Win or Game Lose condition
function resetGame() {
    remainingGuesses = maxTries;
    document.getElementById("startMsg").innerText = "Choose the correct state captial to the state";
    $('#correctAnswer').empty();
    $('#incorrectAnswer').empty();
    $('#unanswered').empty();
    currentQuestion = 0;
    correctAnswer = 0;
    incorrectAnswer = 0;
    unanswered = 0;
    newQuestion();

    //This function is needed to send to the html the updates and status of where we are in the game instance.
    function updateGameContent() {
        $('#message').empty();
        $('#correctedAnswer').empty();
        answered = true;

        //Generating a new question after user answers a previous question
        $('#currentQuestion').html('Question #' + (currentQuestion + 1) + '/' + triviaQuestions.length);
        $('.question').html('<h2>' + triviaQuestions[currentQuestion].question + '</h2>');
        for (var i = 0; i < 4; i++) {
            var choices = $('<div>');
            choices.text(triviaQuestions[currentQuestion].answerList[i]);
            choices.attr({ 'data-index': i });
            choices.addClass('thisChoice');
            $('.answerList').append(choices);
        }

        //Below is logic I used on a previous assignment. Used for reference when creating this homework assignment.

        //document.getElementById("correctAnswerCount").innerText = wins;
        //document.getElementById("incorrectAnswerCount").innerText = losses;
        //document.getElementById("Win").setAttribute("src", "");
        //document.getElementById("Loss").setAttribute("src", "");
        //updateGameContent();

        //console.log("CurrentWord:", guessingWordText);
        //console.log("GuessingWord:", guessingWord);
        //console.log("CurrentWordIndex:", currentWordIndex);
        //console.log("Questions:", wordBank[currentWordIndex]);
        //document.getElementById("currentWord").innerText = guessingWordText;
        //document.getElementById("remainingChances").innerText = remainingGuesses;
        //document.getElementById("usedLetters").innerText = guessedLetters;
        //document.getElementById("WorldsBestBoss").innerText = Questions[currentWordIndex];
    };

    //This function generates a timer (15 seconds) for users
    function countdown() {
        seconds = 15;
        $('#timeLeft').html('<h3>Time Remaining: ' + seconds + '</h3>');
        answered = true;
        //This function decreases the timer
        time = setInterval(showCountdown, 1000);
    }

    function showCountdown() {
        seconds--;
        $('#timeLeft').html('<h3>Time Remaining: ' + seconds + '</h3>');
        if (seconds < 1) {
            clearInterval(time);
            answered = false;
            answerPage();
        }
    }

    //This function is checks to see if the user answered the question correctly, incorrectly, or left it unanswered.
    function answerPage() {
        // Array to evaluate question and answer in string
        $('#currentQuestion').empty();
        $('.thisChoice').empty();
        $('.question').empty();
        //Unsure if I need this line of code:        console.log("Current Question :", currentQuestion);
        var rightAnswerText = triviaQuestions[currentQuestion].answerList[triviaQuestions[currentQuestion].answer];
        var rightAnswerIndex = triviaQuestions[currentQuestion].answer;
        //Checks to see if question was answered by user correctly, incorrectly, or left it unanswered
        if ((userSelect == rightAnswerIndex) && (answered == true)) {
            correctAnswer++;
            $('#message').html(messages.correct);
        } else if ((userSelect != rightAnswerIndex) && (answered == true)) {
            incorrectAnswer++;
            $('#message').html(messages.incorrect);
            $('#correctedAnswer').html('The correct answer was: ' + rightAnswerText);
        } else {
            unanswered++;
            $('#message').html(messages.endTime);
            $('#correctedAnswer').html('The correct answer was: ' + rightAnswerText);
            answered = true;
        }

        if (currentQuestion == (triviaQuestions.length - 1)) {
            setTimeout(scoreboard, 500)
        } else {
            currentQuestion++;
            setTimeout(newQuestion, 500);
        }
    }

    //This function creates a scoreboard for the user to see their success
    function scoreboard() {
        $('#timeLeft').empty();
        $('#message').empty();
        $('#correctedAnswer').empty();
        $('#gif').empty();

        $('#finalMessage').html(messages.finished);
        $('#correctAnswers').html("Correct Answers: " + correctAnswer);
        $('#incorrectAnswers').html("Incorrect Answers: " + incorrectAnswer);
        $('#unanswered').html("Unanswered: " + unanswered);
        $('#startOverBtn').addClass('reset');
        $('#startOverBtn').show();
        $('#startOverBtn').html('Start Over?');
    }

    // Event listener
    document.onkeydown = function (event) {
        // If we finished a game, dump one keystroke and reset.
        if (hasFinished) {
            resetGame();
            hasFinished = false;
        } else {
            // Check to make sure an answer option was pressed.
            if (event.keyCode >= 65 && event.keyCode <= 90) {
                answerPress(event.key.toLowerCase());
                updateGameContent();
                checkWin();
                checkLoss();
            }
        }
    };