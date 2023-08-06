function displayExer(){
	var dom = document.getElementsByClassName("assignments")[0];
	if(dom.style.display == ""){
		dom.style.display = "flex";
	}else{
		dom.style.display = "";
	}
}

function displayProj(){
	var dom = document.getElementById("projectsLinks");
	if(dom.style.display == ""){
		dom.style.display = "grid";
	}else{
		dom.style.display = "";
	}
}

function displayProj1(){
	var dom = document.getElementsByClassName("assignments")[1];
	if(dom.style.display == ""){
		dom.style.display = "flex";
	}else{
		dom.style.display = "";
	}
}

function displayProj2(){
	var dom = document.getElementsByClassName("assignments")[2];
	if(dom.style.display == ""){
		dom.style.display = "flex";
	}else{
		dom.style.display = "";
	}
}