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
		answer: 2
	},

	{
		question: "What says Yes?",
		possibleAnswers: ["no","nope","null","yes"],
		answer: 3
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

$("#start").on("click",function() {
	$("#start").hide();
	$("#gameplay").show();
	nextQuestion(quesNum);
})

$(".answer").on("click",function() {
	console.log($(this).text());
	checkAnswer($(this).text());
});

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

	if (response === "timeUp") {
		console.log("Time Up")
		unansweredCount++;
	}

	else if (response === ans) {
		console.log("right");
		correctCount++;
	}

	else {
		console.log("wrong");
		incorrectCount++;
	}

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
}

