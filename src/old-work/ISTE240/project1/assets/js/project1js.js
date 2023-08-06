// uploads the image as the background of the current header
function uploadHeaderImg(){
	var imgPath = "assets/media/";

	var Imgdict = {
		"Introduction to Rachel's Birth Place": imgPath + "nanyangCity.jpg",
		"History of Nanyang | Rachel's Birth Place": imgPath + "history.jpg",
		"Documentation | Rachel's Birth Place": imgPath + "documentation.jpg",
		"National Parks in Nanyang | Rachel's Birth Place": imgPath + "nanyang_land.jpg",
		"Amusement Parks in Nanyang | Rachel's Birth Place": imgPath + "amusement_park_header.jpg",
		"Museums in Nanyang | Rachel's Birth Place": imgPath + "Neixiang_County_Yamen_header.jpg",
		"Historical Sites in Nanyang | Rachel's Birth Place": imgPath + "district_mag_office_header.jpg",
		"Art in Nanyang | Rachel's Birth Place": imgPath + "chen_art_header.jpg",
		"Chinese Holidays | Rachel's Birth Place": imgPath + "chinese_holiday_header.jpg",
		"Resources | Rachel's Birth Place": imgPath + "resources.png",
		"Chinese Traditions | Rachel's Birth Place": imgPath + "face.jpg",
		"Chinese Customs | Rachel's Birth Place": imgPath + "dumplings.jpg"
	};

	var imgUrl = Imgdict[document.getElementsByTagName("title")[0].innerHTML];

	var element = document.getElementsByTagName('header')[0];
	element.style.backgroundImage = `linear-gradient(to bottom, rgba(255, 255, 255, 0), rgba(196, 40, 71, 0.70)), url('${imgUrl}')`;
}