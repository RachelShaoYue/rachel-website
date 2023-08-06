/// javascript for the fifth exercise - JavaScript Part 2

/* ############################################ */
/// Exercise 5a

function moveText(){
	var dom = document.getElementById('text_to_move');
	console.log(dom.style.left);
	dom.style.left = parseInt(dom.style.left) + 10 + "px";
	console.log(dom.style.left);
}

/* ############################################ */
/// Exercise 5b

function howmany(){
	var dom = document.getElementById('regForm');
	var inputs = dom.getElementsByTagName('input');
	var inputsNum = inputs.length;
	var textInputsNum = 0;
	for(let i = 0; i < inputsNum; i++){
		if(inputs[i].type == "text"){
			textInputsNum++;
		}
	}
	alert(`In this form, there are ${inputsNum} inputs, and ${textInputsNum} of them are text inputs`);
}

/* ############################################ */
/// Exercise 5c

function colorchanger(){
	var options = document.getElementById('colors');
	var div = document.getElementById('colorfulDiv');
	div.style.backgroundColor = options[options.selectedIndex].value;
}

/* ############################################ */
/// Exercise 5d

function changePColor(dom){
	var options = document.getElementById('colors');
	dom.style.color = options[options.selectedIndex].value;
}

/* ############################################ */
/// Exercise 5e

function divide(){
	var firstNum = parseInt(document.getElementById("firstoperand").value);
	var secondNum = parseInt(document.getElementById("secondoperand").value);
	displayResult(firstNum / secondNum);
}

function multiply(){
	var firstNum = parseInt(document.getElementById("firstoperand").value);
	var secondNum = parseInt(document.getElementById("secondoperand").value);
	displayResult(firstNum * secondNum);
}

function displayResult(result){
	var textNode = document.createTextNode(result);
	var dom = document.getElementsByTagName('p')[7]
	if(dom.childNodes[1] == undefined){
		dom.appendChild(textNode);
	}else{
		dom.replaceChild(textNode, dom.childNodes[1]);
	}

}