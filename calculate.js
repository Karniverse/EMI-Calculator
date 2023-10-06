function getValues()
{
	//button click gets values from inputs
	var balance = parseFloat(document.getElementById("principal").value);
	var interestRate = parseFloat(document.getElementById("interest").value/100.0);
	var terms = parseInt(document.getElementById("terms").value);
	
	//set the div string
	var div = document.getElementById("Result");
	//var div = document.getElementById("iciciocemi");
	
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
    //processingfee variales declarations
	var icicinocostemi = ((199*.18)+199).toFixed(2);
	var icicioncallemi = parseFloat((balance*.02*.18).toFixed(2))+parseFloat(balance*.02);
	var yesbankemiconv = parseFloat((balance*.01*.18).toFixed(2))+parseFloat(balance*.01);
	
	//Calculate the per month interest rate
	var monthlyRate = interestRate/12;
	
	//Calculate the payment
    var payment = balance * (monthlyRate/(1-Math.pow(1+monthlyRate, -terms)));
	var paymenticicioncallemi = balance * (0.015/(1-Math.pow(1+0.015, -terms)));
	var paymentamazonpaylateremi = balance * (0.02/(1-Math.pow(1+0.02, -terms)));
	var iciciinstaemimonthlypayment = Number(payment+(icicinocostemi/terms)).toFixed(0)
	var icicinocostemitotalamount = ((Number((payment * terms).toFixed(2))+Number(icicinocostemi)).toFixed(2))-((payment * terms).toFixed(2)-balance.toFixed(2));
	var icicioncallemitotalamount = (Number((paymenticicioncallemi * terms).toFixed(0))+Number(icicioncallemi)).toFixed(0);
	var yesbankemiconvtotalamount = (Number((payment * terms).toFixed(2))+Number(yesbankemiconv)).toFixed(2);
	var amazonpaylatertotalamount = Number((paymentamazonpaylateremi * terms).toFixed(0));
	var icicinocostemitotalinterest = (icicinocostemitotalamount-balance).toFixed(2);
	var icicioncallemitotalinterest = (icicioncallemitotalamount-balance).toFixed(2);
	var yesbankemiconvtotalinterest = (yesbankemiconvtotalamount-balance).toFixed(2);
	var amazonpaylatertotalinterest = (amazonpaylatertotalamount-balance).toFixed(2);
	
	var lowestamongall = Math.min(icicinocostemitotalamount, icicioncallemitotalamount, yesbankemiconvtotalamount, amazonpaylatertotalamount);    
	//begin building the return string for the display of the amort table
    var result = "<div class=\" align-items-center border rounded-3 border-3 border-danger p-2\"><div class=\"text-responsive font-weight-bold\">The Lowest offer among all :  "+lowestamongall +"</div></div>"+
		"<div class=\"container-fluid\"><div class=\"row\"><div class=\"col-md-4\"><h3>ICICI Credit Card Insta No cost EMI</h3>"+
		"Loan amount: Rs." + balance.toFixed(2) +  "<br />" + 
        "Interest rate: " + (interestRate*100).toFixed(2) +  "%<br />" +
		"Processing fee: Rs." + icicinocostemi +  "<br />" +
	    "Number of months: " + terms + "<br />" +
        "Monthly payment: Rs." + iciciinstaemimonthlypayment + "<br />" +
		"Total Interest Paid Incl. GST: Rs." + icicinocostemitotalinterest + "<br />" +
        "Total paid: Rs." + icicinocostemitotalamount + "<br /><br /></div>" + 
		"<div class=\"col-md-4\"><h3>ICICI Credit Card On call EMI</h3>" + 		
		"Loan amount: Rs." + balance.toFixed(2) +  "<br />" + 
        "Interest rate: " + (0.18*100).toFixed(2) +  "%<br />" +
		"Processing fee: Rs." + icicioncallemi.toFixed(0) +  "<br />" +
        "Number of months: " + terms + "<br />" +
        "Monthly payment: Rs." + paymenticicioncallemi.toFixed(2) + "<br />" +
		"Total Interest Paid Incl. GST: Rs." + icicioncallemitotalinterest + "<br />" +
        "Total paid: Rs." + icicioncallemitotalamount + "<br /><br /></div>"+
		"<div class=\"col-md-4\"><h3>Other Banks Credit Card EMI with 1% Processing Fee</h3>"+
		"Loan amount: Rs." + balance.toFixed(2) +  "<br />" + 
        "Interest rate: " + (interestRate*100).toFixed(2) +  "%<br />" +
		"Processing fee: Rs." + yesbankemiconv.toFixed(0) +  "<br />" +		
        "Number of months: " + terms + "<br />" +
        "Monthly payment: Rs." + payment.toFixed(2) + "<br />" +
		"Total Interest Paid Incl. GST: Rs." + yesbankemiconvtotalinterest + "<br />" +
        "Total paid: Rs." + yesbankemiconvtotalamount + "<br /><br /></div>"+
		"<div class=\"col-md-4\"><h3>Amazon Pay later EMI</h3>"+
		"Loan amount: Rs." + balance.toFixed(2) +  "<br />" + 
        "Interest rate: " + (.24*100).toFixed(2) +  "%<br />" +
		"Processing fee: Rs." + 0 +  "<br />" +		
        "Number of months: " + terms + "<br />" +
        "Monthly payment: Rs." + paymentamazonpaylateremi.toFixed(0) + "<br />" +
		"Total Interest Paid Incl. GST: Rs." + amazonpaylatertotalinterest + "<br />" +
        "Total paid: Rs." + amazonpaylatertotalamount.toFixed(0) + "<br /><br /></div></div></div>";
        
    //add header row for table to return string
	//result += "<table border='1'><tr><th>Month #</th><th>Balance</th>" + "<th>Interest</th><th>Principal</th>";
	//iciciocemi += "<table border='1'><tr><th>Month #</th><th>Balance</th>" + "<th>Interest</th><th>Principal</th>";
    
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
		/*result += "<tr align=center>";
		
		//display the month number in col 1 using the loop count variable
		result += "<td>" + (count + 1) + "</td>";
		
		
		//code for displaying in loop balance
		result += "<td> Rs." + balance.toFixed(2) + "</td>";
		
		//calc the in-loop interest amount and display
		interest = balance * monthlyRate + (balance * monthlyRate * .18) ;
		result += "<td> Rs." + interest.toFixed(2) + "</td>";
		
		//calc the in-loop monthly principal and display
		monthlyPrincipal = payment - interest;
		result += "<td> Rs." + monthlyPrincipal.toFixed(2) + "</td>";
		
		//end the table row on each iteration of the loop	
		result += "</tr>";
		
		//update the balance for each loop iteration
		balance = balance - monthlyPrincipal;*/		
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

