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
function bodygradient() {
    // Create a GSAP timeline
    const timeline = gsap.timeline({ repeat: -1, yoyo: true });

    // Define the animation
    timeline.to('body', {
        duration: 5, // Animation duration (seconds)
        background: 'linear-gradient(to bottom right, #fcd0a9, #ffcc99, #C70039)', // Start gradient
        ease: 'none', // Linear easing for smooth transitions
        repeat: -1, // Repeat indefinitely
        yoyo: true, // Reverse the animation
        onStart: () => {
            console.log('Animation started');
        },
        onComplete: () => {
            console.log('Animation completed');
        },
    });
}

function bodytile() {
var c = $('.c')[0],
    ctx = c.getContext("2d"),
    cw = 0,
    ch = 0,
    hue = 180,
    img = new Image(),
    img2 = new Image(),
    nCubes = 0,
    cubes = [],
    Cube = function(index, _x, _y, _s){ //console.log(_x,_y)
      this.img = img;
      this.img2 = img2;
      this.scale = _s;
      this.x = _x;
      this.y = _y;
      this.z = this.img2_opacity = 0;
      this.draw = function(){
        ctx.translate(this.x, this.y + this.z);
        ctx.drawImage(this.img, -100 / 2 * this.scale, -200 / 2 * this.scale, 100 * this.scale, 200 * this.scale);
        ctx.globalAlpha = this.img2_opacity;
        ctx.drawImage(this.img2, -100 / 2 * this.scale, -200 / 2 * this.scale, 100 * this.scale, 200 * this.scale);
        ctx.globalAlpha = 1;
        ctx.translate(-this.x, -(this.y + this.z));
      }
      this.draw();
    };

img.src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAADIBAMAAADsElnyAAAAJFBMVEVHcEw+Pj5aWloQEBAZGRleXl6AgIDAwMBwcHCampq7u7tzc3M0sGdFAAAABXRSTlMAp/UwQ5FLsO8AAADxSURBVHgB7c9HcQRhDITRn8NgMABDWAjO6ewMYLgsWef8akelk1Pr/upTj023mkZxiK3dqSsODnpmdXBwUBlEaRCYckdtEKVBYModmKbQKDrGHZpaaPyqZxQaRc8oNPVyTaehUVRGURhFYerlmu2D5k3jqimO1+MCU4h5XFzc9sQjaXTO1vMTobMkXgmdBfFKNnTY8UroLIp3YkfxldBhB4QOAkIHAaHDDggdBIQOX0HoICB0EBA6CAgdlkPoICB0+ApCBwGhw1cQOggIBgHh5pCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQH0XuAS5hV4q0a3iHAAAAAElFTkSuQmCC';

img2.src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAADIBAMAAADsElnyAAAAJFBMVEVHcEylpaXv7+/Gxsa+vr7m5uahoaE/Pz9/f3+Ojo5lZWWCgoKkaSxxAAAABnRSTlMA9TCcskPTdr2ZAAAA40lEQVR4Ae3POW0EQQBE0UZhBEawWBaAzz0QDIVhYgxmZ3X6pFZpIl/18xf8sep8GinFwzMmi8sFk8TlctFkockiGz80WWiyyMYPTRbZKLLxIxtFMIoVwCCSUQSTRDaeZ3POAKPIRpGNIhvPs3m8HOw0Pg+K+8fYo0FsY48GMUkyiEmSQUySDGKSZBCTJIOYZG0QkIVBQDQKydogIBqFRKOQaBSQYBAQDAKCQQSCUUg0CAhmLSAYhUSDgCwMIpFpFJnsW0lJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUnJjyJfg4PNmR1hT+AAAAAASUVORK5CYII=';
img.onload = window.onresize = setGrid;

function setGrid(){ //console.log('set grid')
  
  c.width = window.innerWidth;
  c.height = window.innerHeight;
  cw = Math.ceil(c.width/100+1);
  ch = Math.floor(c.height/25+10);

  cubes = [];
  
  for (var i=_y=0; _y<ch; _y++) {
    for (var _x=0; _x<cw; _x++) { //console.log(_y%2==0)
      if (_y%2==0) cubes.push( new Cube(i, -25+_x*100, -75+_y*25, 0.9) );
      else cubes.push( new Cube(i, 25+_x*100, -75+_y*25, 0.9) );
      i++;
    }
  }

  nCubes = cubes.length; //console.log(nCubes)
}

var staggerAnim;
function anim() {
  staggerAnim = gsap.timeline({ onComplete: anim })
                    .add(staggerFrom(gsap.utils.random(0,nCubes,1)))
};

function staggerFrom(from) {
  return gsap.timeline()
    .to(cubes, {
      duration: 1,
      z: 125,      
      ease: 'back.in(3)',
      stagger: {
        yoyo: true,
        amount: 2.5,
        grid: [ch, cw],
        overwrite: 'auto',
        from: from,        
        onComplete: function() { // Like reverse: 1 but make sure to reach a z of 0
          gsap.to(this.targets(), {
            duration: 1,
            z: 0,
            ease: 'back.out(3)'
          });
        }
      }
    }, 0)
    .to(cubes, {
      duration: 0.6,
      img2_opacity:1,
      stagger: {
        yoyo: true,
        amount: 2.5,
        grid: [ch, cw],
        overwrite: 'auto',
        from: from,        
        onComplete: function() {
          gsap.to(this.targets(), {
            duration: 0.6,
            img2_opacity: 0
          });
        }
      }
    }, 0)
}
gsap.delayedCall(0.2, anim);

$('.c').on('click', function(e) {
  staggerAnim.eventCallback('onComplete', null);

  // An approximation that works okay
  var gridX = Math.floor((e.layerX - (e.layerX / c.width * 2 - 1) * 20 - e.layerX / c.width * 75) / c.width * cw);
  var gridY = Math.floor((e.layerY - (e.layerY / c.height * 2 - 1) * 75 + 40) / c.height * ch);
  var i = cw * gridY + gridX;

  staggerFrom(i); //console.log(gridX, gridY, i);
});



gsap.ticker.add(()=>{ //update on each tick
  
  ctx.clearRect(0,0,c.width,c.height);

  ctx.globalCompositeOperation='source-over';
  for (var i=0; i<nCubes; i++) cubes[i].draw();

  hue-=0.5;
  ctx.globalCompositeOperation='lighter';
  ctx.fillStyle = 'hsla('+hue+', 75%, 75%, 0.5)';
  ctx.fillRect(0, 0, c.width, c.height);

});
}
    

