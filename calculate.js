function getValues()
{
	//button click gets values from inputs
	var balance = parseFloat(document.getElementById("principal").value);
	var interestRate = 
		parseFloat(document.getElementById("interest").value/100.0);
	var terms = parseInt(document.getElementById("terms").value);
	
	//set the div string
	var div = document.getElementById("Result");
	
	//in case of a re-calc, clear out the div!
	div.innerHTML = "";
	
	//validate inputs - display error if invalid, otherwise, display table
	var balVal = validateInputs(balance);
	var intrVal = validateInputs(interestRate);

	if (balVal && intrVal)
	{
		//Returns div string if inputs are valid
		div.innerHTML += amort(balance, interestRate, terms);
	}
	else
	{
		//returns error if inputs are invalid
		div.innerHTML += "Please Check your inputs and retry - invalid values.";
	}
}

/**
 * Amort function:
 * Calculates the necessary elements of the loan using the supplied user input
 * and then displays each months updated amortization schedule on the page
*/
function amort(balance, interestRate, terms)
{
    //Calculate the per month interest rate
	var monthlyRate = interestRate/12;
	
	//Calculate the payment
    var payment = balance * (monthlyRate/(1-Math.pow(
        1+monthlyRate, -terms)));
	    
	//begin building the return string for the display of the amort table
    var result = "Loan amount: Rs." + balance.toFixed(2) +  "<br />" + 
        "Interest rate: " + (interestRate*100).toFixed(2) +  "%<br />" +
        "Number of months: " + terms + "<br />" +
        "Monthly payment: Rs." + payment.toFixed(2) + "<br />" +
        "Total paid: Rs." + (payment * terms).toFixed(2) + "<br /><br />";
        
    //add header row for table to return string
	result += "<table border='1'><tr><th>Month #</th><th>Balance</th>" + 
        "<th>Interest</th><th>Principal</th>";
    
    /**
     * Loop that calculates the monthly Loan amortization amounts then adds 
     * them to the return string 
     */
	for (var count = 0; count < terms; ++count)
	{ 
		//in-loop interest amount holder
		var interest = 0;
		
		//in-loop monthly principal amount holder
		var monthlyPrincipal = 0;
		
		//start a new table row on each loop iteration
		result += "<tr align=center>";
		
		//display the month number in col 1 using the loop count variable
		result += "<td>" + (count + 1) + "</td>";
		
		
		//code for displaying in loop balance
		result += "<td> Rs." + balance.toFixed(2) + "</td>";
		
		//calc the in-loop interest amount and display
		interest = balance * monthlyRate;
		result += "<td> Rs." + interest.toFixed(2) + "</td>";
		
		//calc the in-loop monthly principal and display
		monthlyPrincipal = payment - interest;
		result += "<td> Rs." + monthlyPrincipal.toFixed(2) + "</td>";
		
		//end the table row on each iteration of the loop	
		result += "</tr>";
		
		//update the balance for each loop iteration
		balance = balance - monthlyPrincipal;		
	}
	
	//Final piece added to return string before returning it - closes the table
    result += "</table>";
	
	//returns the concatenated string to the page
    return result;
}

function validateInputs(value)
{
	//some code here to validate inputs
	if ((value == null) || (value == ""))
	{
		return false;
	}
	else
	{
		return true;
	}
}

