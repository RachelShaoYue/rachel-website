/* a script used for games.html */

var randomNumber = Math.floor((Math.random() * 100) + 1);


/* checks if the user given number is matched with the random number */
function checkNumber(){

	var number = document.getElementsByName("guessedNumber")[0].value;

	if(number.trim() == ''){
		document.getElementById("answer").innerHTML = "Please enter a number";
	}else if(number == randomNumber){
		document.getElementById("answer").innerHTML = "Correct guess!<br>A new number has been generated!";
		randomNumber = Math.floor((Math.random() * 100) + 1);
	}else if(number < randomNumber){
		document.getElementById("answer").innerHTML = "Too low!";
	}else if(number > randomNumber){
		document.getElementById("answer").innerHTML = "Too high!";
	}else{
		document.getElementById("answer").innerHTML = "Invalid input";
	}
	
}

