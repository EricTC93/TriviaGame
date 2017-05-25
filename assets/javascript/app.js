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

$("#question").text(questionList[0].question);

$("#answerA").text(questionList[0].possibleAnswers[0]);
$("#answerB").text(questionList[0].possibleAnswers[1]);
$("#answerC").text(questionList[0].possibleAnswers[2]);
$("#answerD").text(questionList[0].possibleAnswers[3]);

$(".answer").on("click",function() {
	console.log($(this).text());
});

var timer = 30;
var intervalId;
$("#timeRemaining").text(timer);
intervalId = setInterval(countdown,1000);

function countdown () {
	timer--;
	$("#timeRemaining").text(timer);

	if (timer === 0) {
		clearInterval(intervalId);
	}
}

