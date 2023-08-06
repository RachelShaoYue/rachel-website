/* javascript file for the fourth exercise file */

/* ############################################ */
// for EX04a.html

	function jsStyle() {
		// function to change style
		// Change the color and the size of the font
		// in the paragraph with id='text'
		var property = document.getElementById("text").style;
		property.color = "red";
		property.fontSize = "large";
	}

/* ############################################ */
// for EX04b.html

	function getFormValues() {
		// function to send first and last names
		// to an 'alert' message.
		var firstName = document.getElementById("fname").value;
		var lastName = document.getElementById("lname").value;
		alert(`Welcome ${firstName} ${lastName}!`);
	}

/* ############################################ */
// for EX04c.html

	function getOptions() {
		// function to display the number of options in an alert()
		var numOfOptions = 0;
		var list = document.getElementById("mySelect");
		for(let i = 1; i <= list.length; i++){
			numOfOptions++;
		}

		var selected = list.options[list.selectedIndex].value;
		alert(`The number of options is ${numOfOptions}\nYou selected ${list.selectedIndex}. ${selected}`);
	}

/* ############################################ */
// for EX04d.html

	//put a mouseover and a mouseout event on the p tag below

	//create a function that is called on the mouseover that turns the text red
	function turnRed(){
		document.getElementById("rb").style.color = "red";
	}
	//create a function that is called on the mouseout that turns the text black
	function turnBlack(){
		document.getElementById("rb").style.color = "black";
	}

/* ############################################ */
// for EX04e.html

// code two functions multiply and divide functions here
	//hints:
		//when you get a value out of an input, you are getting a string.  To get a number, use parseInt()
		//When you want to output something into the HTML you can use .innerHTML - like document.getElementById("result").innerHTML= "fred";

		function divide(){
			var firstNum = parseInt(document.getElementById("firstoperand").value);
			var secondNum = parseInt(document.getElementById("secondoperand").value);
			document.getElementById("result").innerHTML = firstNum / secondNum;
		}

		function multiply(){
			var firstNum = parseInt(document.getElementById("firstoperand").value);
			var secondNum = parseInt(document.getElementById("secondoperand").value);
			document.getElementById("result").innerHTML =  firstNum * secondNum;
		}
		
/* ############################################ */
