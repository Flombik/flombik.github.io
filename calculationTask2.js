var NEGATION = "!";

var CONJUNCTION = "&";
var DISJUNCTION = "|";
var IMPLICATION = "->";
var EQUIVALENCE = "~";

var OPENING_BRACKET = "(";
var CLOSING_BRACKET = ")";

function executeSecondTask(mainFormula, examineeFormula) {
	data = getValuesTable(mainFormula, examineeFormula);

	mainFormulaAnswer = data.firstFormulaValues;
	examineeFormulaAnswer = data.secondFormulaValues;

	for (var i = 0; i < examineeFormulaAnswer.length; i++) {
		if (mainFormulaAnswer[i] == 1 && examineeFormulaAnswer[i] == 0)
			return 0;
	}

	return 1;
}

function getValuesTable(firstFormula, secondFormula) {
	var symbols = getSymbolInFormula(firstFormula).concat(getSymbolInFormula(secondFormula));
	symbols = symbols.unique();
	symbols.sort();
	var symbolsLength = symbols.length;
	var n = Math.pow(2, symbolsLength);
	var table = {};
	let firstFormulaAnswer = [];
	let secondFormulaAnswer = [];

	for (var i = 0; i < n; i++) {
		var currentNumber = numberToBinaryString(i, symbolsLength);
		var tempObject = getConstantForSymbol(symbols, currentNumber);
		table[i] = tempObject;
		tempObject[firstFormula] = getAnswer(firstFormula, tempObject);
		tempObject[secondFormula] = getAnswer(secondFormula, tempObject);
		firstFormulaAnswer.push(tempObject[firstFormula]);
		secondFormulaAnswer.push(tempObject[secondFormula]);
	}

	console.log(table);
	return { table: table, firstFormulaValues: firstFormulaAnswer, secondFormulaValues: secondFormulaAnswer }
}

function getSymbolInFormula(formula) {
	var symbol = "([A-Z])";
	symbol = new RegExp(symbol, "g");
	var results = formula.match(symbol);

	if (!results) {
		return new Array;
	} else {
		return results;
	}
}

function numberToBinaryString(number, stringLength) {
	var string = (number >>> 0).toString(2);
	for (var i = string.length; i < stringLength; i++) {
		string = "0" + string;
	}
	return string;
}

function getConstantForSymbol(symbols, currentNumber) {
	var object = {};
	for (var i = 0; i < symbols.length; i++) {
		var symbol = symbols[i];
		object[symbol] = currentNumber[i];
	}

	return object;
}

function getAnswer(formula, tempObject) {
	var constFormula = formula;
	for (var key of Object.keys(tempObject)) {
		var val = tempObject[key];
		constFormula = constFormula.replace(new RegExp(key, 'g'), val);
	}
	return calculateFormula(constFormula);
}

function calculateFormula(formula) {
	var regFormula = "([(][" + NEGATION + "][0-1][)])|" +
		"([(][0-1]((" + CONJUNCTION + ")|(" + "\\" + DISJUNCTION + ")|(" + IMPLICATION + ")|(" + EQUIVALENCE + "))[0-1][)])";
	regFormula = new RegExp(regFormula);
	while (regFormula.exec(formula) != null) {
		var subFormula = regFormula.exec(formula)[0];
		var result = calculateSimpleFormula(subFormula);
		formula = formula.replace(subFormula, result);
	}

	return formula;
}

function calculateSimpleFormula(formula) {
	if (formula.indexOf(NEGATION) > -1) {
		return findNEGATION(formula);
	} else if (formula.indexOf(CONJUNCTION) > -1) {
		return findCONJUNCTION(formula);
	} else if (formula.indexOf(DISJUNCTION) > -1) {
		return findDISJUNCTION(formula);
	} else if (formula.indexOf(IMPLICATION) > -1) {
		return findIMPLICATION(formula);
	} else if (formula.indexOf(EQUIVALENCE) > -1) {
		return findEQUIVALENCE(formula);
	}
}

function findNEGATION(formula) {
	var number = parseInt(formula[2]);
	if (!number) {
		return 1;
	} else {
		return 0;
	}
}

function findCONJUNCTION(formula) {
	var firstValue = parseInt(formula[1]);
	var secondValue = parseInt(formula[3]);
	if (firstValue && secondValue) {
		return 1;
	} else {
		return 0;
	}
}

function findDISJUNCTION(formula) {
	var firstValue = parseInt(formula[1]);
	var secondValue = parseInt(formula[3]);
	if (firstValue || secondValue) {
		return 1;
	} else {
		return 0;
	}
}

function findIMPLICATION(formula) {
	var firstValue = parseInt(formula[1]);
	var secondValue = parseInt(formula[4]);
	if ((!firstValue) || secondValue) {
		return 1;
	} else {
		return 0;
	}
}

function findEQUIVALENCE(formula) {
	var firstValue = parseInt(formula[1]);
	var secondValue = parseInt(formula[3]);
	if (firstValue == secondValue) {
		return 1;
	} else {
		return 0;
	}
}

Array.prototype.unique = function() {
	var res = [];
	var alredy = {};

	for (var i = 0; i < this.length; i++) {
		var val = this[i];

		if (typeof (alredy['z' + val]) == 'undefined') {
			res.push(val);
			alredy['z' + val] = true;
		}
	}

	return res;
}
