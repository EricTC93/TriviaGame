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
		question: "Who is the protagonist of the 4th game in the Ace Attorney series?",
		possibleAnswers: ["Apollo Justice","Athena Cykes","Phoenix Wright","Ray Shields"],
		answer: "Apollo Justice",
		img: "https://vignette3.wikia.nocookie.net/aceattorney/images/5/54/Apollo_Embarrassed_3.gif/revision/latest?cb=20120904191913"
	},

	{
		question: "Which of the original 6 characters from Mario Party (1) is not playable in every sequel?",
		possibleAnswers: ["Donkey Kong","Toad","Waluigi","Wario"],
		answer: "Donkey Kong",
		img: "assets/images/dkMarioPartyWin.gif"
	},

	{
		question: "What's a pokemon that only appears as a pure flying type?",
		possibleAnswers: ["Flygon","Pidgeot","Sivally","Tornadus"],
		answer: "Tornadus",
		img: "assets/images/641TornadusGen5.gif"
	},

	{
		question: "What was Cream the Rabbit's first appearance?",
		possibleAnswers: ["Sonic Advance 2","Sonic Adventure 2","Sonic Battle","Sonic Rush"],
		answer: "Sonic Advance 2",
		img: "assets/images/creamSelect.gif"
	},

	{
		question: "Who is the leader of red team from the Halo based web series, Red vs. Blue?",
		possibleAnswers: ["Church","Doc","Sarge","Washington"],
		answer: "Sarge",
		img: "https://media.giphy.com/media/yYeAHaB8NYaXu/giphy.gif"
	},

	{
		question: "Besides Dr. Eggman, who is a major antagonist in Sonic the Hedgehog 3?",
		possibleAnswers: ["Chaos","Knuckles","Metal Sonic","Shadow"],
		answer: "Knuckles",
		img: "assets/images/knucklesLaugh.gif"
	},

	{
		question: "Which is the first Fire Emblem to be released in the US?",
		possibleAnswers: ["Blazing Blade","Binding Blade","Sacred Stones","Shadow Dragon"],
		answer: "Blazing Blade",
		img: "https://vignette1.wikia.nocookie.net/fireemblem/images/f/fc/Eliwood_knightlord_durandal_critical.gif/revision/latest?cb=20120201034953"
	},

	{
		question: "Who's Mario first partner in Paper Mario: The Thousand Year Door?",
		possibleAnswers: ["Goombella","Goombaria","Goombangela","Goobmama"],
		answer: "Goombella",
		img: "https://media.giphy.com/media/pyhzil2FDtGwM/giphy.gif"
	},

	{
		question: "Which Kong duo were the protagonists of Donkey Kong Country 2?",
		possibleAnswers: ["Donkey and Diddy","Diddy and Dixie","Dixie and Baby","Donkey and Dixie"],
		answer: "Diddy and Dixie",
		img: "https://media.giphy.com/media/XQjAAqvEwSdA4/giphy.gif"
	},

	{
		question: "Who represents kindness in Mario Party 3?",
		possibleAnswers: ["Daisy","Mario","Peach","Yoshi"],
		answer: "Yoshi",
		img: "https://media.giphy.com/media/n7QA2wItASTWE/giphy.gif"
	},

	{
		question: "What is the default name for the player's avatar in Fire Emblem Awakening?",
		possibleAnswers: ["Alex","Corrin","Reflect","Robin"],
		answer: "Robin",
		img: "https://vignette1.wikia.nocookie.net/fireemblem/images/3/39/Robin_SSB4.png/revision/latest?cb=20160516080711"
	},

	{
		question: "Who is the female member of Team Dark from the Sonic series?",
		possibleAnswers: ["Amy","Blaze","Shade","Rouge"],
		answer: "Rouge",
		img: "https://media.giphy.com/media/J1JGyqiQ9BRYY/giphy.gif"
	}

];

swapElements(questionList);

var quesNum = Math.floor(Math.random()*questionList.length);
var quesPerRound = 5;
var quesCount = 0;

var correctCount = 0;
var incorrectCount = 0;
var unansweredCount = 0;

var timeLimit = 30 //Seconds
var timer = timeLimit;
var intervalId;

// var imageURL = "";
var quesImage;

var j = 0;

setInterval(function(){
	if (j === -1800) {
		j = 0;
	}

	var style = "url(assets/images/checkered3.png) right bottom " + --j + "px repeat-y, " +
				"url(assets/images/checkered3.png) left top " + --j + "px repeat-y, " + 
				"url(assets/images/checkered.png) repeat";

	$("#body").css("background", style);

},10);

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
	// quesNum = -1;
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

	quesImage = new Image();
	quesImage.src = questionList[quesNum].img;
	// console.log(quesImage);

	$("#question").text(questionList[quesNum].question);

	var answerDisArr = swapElements(questionList[quesNum].possibleAnswers);
	$("#answerA").text(answerDisArr[0]);
	$("#answerB").text(answerDisArr[1]);
	$("#answerC").text(answerDisArr[2]);
	$("#answerD").text(answerDisArr[3]);

	timer = timeLimit;
	$("#timeRemaining").text(timer);
	intervalId = setInterval(countdown,1000);
}

function checkAnswer (response) {
	clearInterval(intervalId);
	var ans = questionList[quesNum].answer;
	$("#correctAnswer").text("The correct answer was " + ans)
		.show();

	if (response === "timeUp") {
		console.log("Time Up")
		unansweredCount++;
		quesImage.src = "assets/images/sonicPointing.gif"
		$("#response").text("Time Up");
	}

	else if (response === ans) {
		console.log("right");
		correctCount++;
		// imageURL = "assets/images/tailsVictory.gif"
		$("#response").text("Correct");
		$("#correctAnswer").hide();
	}

	else {
		console.log("wrong");
		incorrectCount++;
		// imageURL = "assets/images/knucklesLaugh.gif"
		$("#response").text("Wrong");
	}

	$("#questionAnswer").hide();
	// $("#questionImage").attr("src",imageURL);
	$("#questionImageRow").html(quesImage);
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

function swapElements (arr) {

	for (var i = 0; i <64; i++) {
		var a = Math.floor(Math.random()*arr.length);
		var b = Math.floor(Math.random()*arr.length);
		var temp = arr[a];
		arr[a] = arr[b];
		arr[b] = temp;
	}

	return arr;
}
