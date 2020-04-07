	var answerFirstTask = 0;

	function executeFirstTask(formula)
	{
		formula = formula.replace(/\s+/g,"");
		if(formula.length > 1)
		{
			var leftBracket = rightBracket = 0;
			for(var i = 0; i<formula.length; i++)
			{
				if(formula[i] == '(')	leftBracket++;
				if(formula[i] == ')')	rightBracket++;
			}
		
			if(leftBracket == 0 || rightBracket == 0 || leftBracket != rightBracket)
				return 0;
		}
		return checkValidation(formula);
	}
		
	function checkValidation(formula) 
	{
		var constOrAtom = formula.match(/^[A-Z0-1]{1}$/);
		if(constOrAtom != null) answerFirstTask = 1;			
		else 
		{	
			var oldFormula = formula;
			formula = formula.replace(/(\([A-Z0-1]{1}([&\|~]|(->))[A-Z0-1]{1}\))|(\(![A-Z0-1]\))/g, "1");
		
			if(oldFormula != formula)
				checkValidation(formula);
			else answerFirstTask = 0;
		}
		return answerFirstTask;
	}