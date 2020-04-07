var userText;
var userText1;
var userText2;

var errorMsg = "Вы ввели некорректную формулу. Попробуйте ещё раз!";

var begin = "<form id=\"tasks\"><div id=\"taskLabel\">Задания:</div><br>" +
    "<div>1. Является ли данная строка формулой логики высказываний?</div><br>" +
    "<div id=\"randomFormula\">";
var middle = "</div><br>" +
    "<input type=\"button\" id=\"buttonFirstTaskYes\" value=\"Да\" onclick=\"answerOnFirstTask(1);\"> " +
    "<input type=\"button\" id=\"buttonFirstTaskNo\" value=\"Нет\" onclick=\"answerOnFirstTask(0);\"><br>" +
    "<br><div id=\"messageTask1\"></div><br>" +
    "<div>2. Следует ли формула из заданной формулы: ";
var end = "</div><br>" +
    "<input type=\"button\" id=\"buttonSecondTaskYes\" value=\"Да\" onclick=\"answerOnSecondTask(1);\"> " +
    "<input type=\"button\" id=\"buttonSecondTaskNo\" value=\"Нет\" onclick=\"answerOnSecondTask(0);\"><br>" +
    "<br><div id=\"messageTask2\"> </div></form>";

function showTasks() {
    var userFormula = document.getElementById('userFormula');
    userText = userFormula.value;
    var userFormula1 = document.getElementById('userFormulaSecTask1');
    userText1 = userFormula1.value;
    var userFormula2 = document.getElementById('userFormulaSecTask2');
    userText2 = userFormula2.value;
    validateFormulas(userText1, userText2);

    if (userText == "") {
        userText = createExpression();
    }
    if (userText1 == "") {
        userText1 = generateFormula();
    }
    if (userText2 == "") {
        userText2 = generateFormula();
    }

    trackUsersFormulas(userText, userText1, userText2);
}

function trackUsersFormulas(userFormulaFirstTask, formulaValue1, formulaValue2) {
    document.body.innerHTML = begin + userFormulaFirstTask + middle + formulaValue1 +
        " ?</div><br><div id=\"firstParam\">" + formulaValue2 + end;
}

function validateFormulas(checkUserFormula1, checkUserFormula2) {
    var checkNumb1 = executeFirstTask(checkUserFormula1);
    var checkNumb2 = executeFirstTask(checkUserFormula2);
    if ((checkUserFormula1 != "" && checkUserFormula2 != "") && (!checkNumb1 || !checkNumb2)) {
        alert(errorMsg);
        location.reload();
    }
}

function getRandomNumb(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}