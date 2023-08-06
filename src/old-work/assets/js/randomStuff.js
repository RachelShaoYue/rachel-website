// a script used for randomStuff.html

// gets the current hour
function checkHours(hours){
	if(hours > 12){
		hours -= 12;
	}else if(hours == 0){
		return 12;
	}
	return hours;
}

// checks if the zero is needed to be added to the time
function checkMinutes(minutes){
	if(minutes < 10){
		return "0" + minutes;
	}else{
		return minutes;
	}
}

// determines whether the time is at night or in morning
function checkTime(time){
	if(time >= 0 && time < 12){
		return "am";
	}else{
		return "pm";
	}
}

// updates the time
function updateTime(){
	var time = new Date();
	document.getElementById("time").innerHTML = "Current time is: "
		+ checkHours(time.getHours()) + ":" + checkMinutes(time.getMinutes()) + checkTime(time.getHours());
}

// gets the date
var date = new Date();

// gets the month number
var monthNumber = date.getMonth() + 1;

document.getElementById("date").innerHTML = "Today is: " + 
	monthNumber + "/" + date.getDate() + "/" + date.getFullYear();

updateTime();

// gets the given names and then greets to the user
function getNames(){
	var firstName = document.forms[0].elements[0].value;
	var lastName = document.forms[0].elements[1].value;

	document.getElementById("greeting").innerHTML = "Hello, " + firstName
		+ " " + lastName + "! How are you doing?";
}
