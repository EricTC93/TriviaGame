// Create a list of questions
// User clicks start button
// Display question to the user and timer
// User attemps to answer the question with a click
// Tells the user if they are correct or incorrect
// Moves to the next question with a new timer
// Ends the game after a certain amount of questions
// Reset


var questionList = [
	{
		question: "What says Yes?",
		possibleAnswers: ["no","nope","yes","no way"],
		answer: 2,
		img: ""
	},

	{
		question: "Which of the original 6 characters is no longer playable in Mario Party?",
		possibleAnswers: ["Toad","Daisy","Waluigi","Donkey Kong"],
		answer: 3,
		img: ""
	},

	{
		question: "What's a pokemon that only appears as a pure flying type?",
		possibleAnswers: ["Flygon","Tornadus","Pidgeot","Sivalley"],
		answer: 1,
		img: ""
	},

	{
		question: "What was Cream the Rabbit's first appearance?",
		possibleAnswers: ["Sonin Advance 2","Sonic Adventure 2","Sonic Battle","Sonic Rush"],
		answer: 0,
		img: ""
	},

	{
		question: "What says Yes?",
		possibleAnswers: ["no","yes","null","yooo"],
		answer: 1,
		img: ""
	}

];

var quesNum = -1;
var quesPerRound = 5;
var quesCount = 0;

var correctCount = 0;
var incorrectCount = 0;
var unansweredCount = 0;

var timeLimit = 30 //Seconds
var timer = timeLimit;
var intervalId;

var imageURL;

$("#start").on("click",function() {
	$("#start").hide();
	$("#gameplay").show();
	nextQuestion(quesNum);
})

$(".answer").on("click",function() {
	console.log($(this).text());
	checkAnswer($(this).text());
});

$("#reset").on("click",function() {
	quesNum = -1;
	quesCount = 0;

	correctCount = 0;
	incorrectCount = 0;
	unansweredCount = 0;

	$("#reultsScreen").hide();
	$("#gameplay").show();
	nextQuestion();
})

function countdown () {
	timer--;
	$("#timeRemaining").text(timer);

	if (timer === 0) {
		checkAnswer("timeUp");
	}
}

function nextQuestion () {

	quesNum++;
	quesCount++;

	if (quesNum === questionList.length) {
		quesNum = 0;
	}

	$("#question").text(questionList[quesNum].question);

	$("#answerA").text(questionList[quesNum].possibleAnswers[0]);
	$("#answerB").text(questionList[quesNum].possibleAnswers[1]);
	$("#answerC").text(questionList[quesNum].possibleAnswers[2]);
	$("#answerD").text(questionList[quesNum].possibleAnswers[3]);

	timer = timeLimit;
	$("#timeRemaining").text(timer);
	intervalId = setInterval(countdown,1000);
}

function checkAnswer (response) {
	clearInterval(intervalId);
	var ansIndex = questionList[quesNum].answer;
	var ans = questionList[quesNum].possibleAnswers[ansIndex];
	$("#correctAnswer").text("The correct answer is " + ans)
		.show();

	if (response === "timeUp") {
		console.log("Time Up")
		unansweredCount++;
		imageURL = "assets/images/sonicPointing.gif"
		$("#response").text("Time Up");
	}

	else if (response === ans) {
		console.log("right");
		correctCount++;
		imageURL = "assets/images/tailsVictory.gif"
		$("#response").text("Correct");
		$("#correctAnswer").hide();
	}

	else {
		console.log("wrong");
		incorrectCount++;
		imageURL = "assets/images/knucklesLaugh.gif"
		$("#response").text("Wrong");
	}

	$("#questionAnswer").hide();
	$("#questionImage").attr("src",imageURL);
	$("#responseScreen").show();


	setTimeout(function() {

		$("#responseScreen").hide();
		$("#questionAnswer").show();

		if (quesCount < quesPerRound ) {
			nextQuestion(quesNum);
		}

		else {
			$("#gameplay").hide();
			$("#reultsScreen").show();
			$("#correctCount").text(correctCount);
			$("#incorrectCount").text(incorrectCount);
			$("#unansweredCount").text(unansweredCount);
		}
	}, 5000);
}
