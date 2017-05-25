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