var right = "Верно!";
var wrong = "Неверно!";

function answerOnFirstTask(userAnswer)
{
	actionFirstTask(userAnswer, userText);
}

function actionFirstTask(userAnswer, formula)
{
	if(executeFirstTask(formula) == userAnswer)
		formAnswerText("messageTask1", right);
	else formAnswerText("messageTask1", wrong);
}

function answerOnSecondTask(userAnswer)
{
	actionSecondTask(userAnswer, userText1, userText2);
}

function actionSecondTask(userAnswer, mainFormula, formula)
{
	if(executeSecondTask(mainFormula, formula) == userAnswer)
		formAnswerText("messageTask2", right);
	else formAnswerText("messageTask2", wrong);
}

function formAnswerText(id, check)
{
	if(check == right) document.getElementById(id).style = "color:#228B22";
	else document.getElementById(id).style = "color:#930";
	document.getElementById(id).innerHTML = check;
}