var body = document.body, timer;
let sliderCircle = $(".slider_circle");
let imageWrap = $(".image_popup_wrap");
let leftValue = '-1000px';
let contacts = $('.contacts');
let info = $('.info');
let gridContainer = $(".grid_container");

//optimization
window.addEventListener('scroll', function() {
	clearTimeout(timer);
	if(!body.classList.contains('disable-hover')) {
		body.classList.add('disable-hover')
	}
	timer = setTimeout(function(){
		body.classList.remove('disable-hover')
	},200);
}, false);


// open image
function showAddImage(imageName, left) {
	let slider = $(".slider");

	$(".popup_add_image")[0].src = 'images/' + imageName.slice(0, 1) + ".2.jpg";
	slider.css({'left': left + '%',
				'top': parseInt($('.image_popup_wrap').css('height')) + 40 + 'px',
				'width': parseInt($(".popup_main_image").css('width')),
				'display': 'block'});
	sliderCircle.css({'left': parseInt($(".image_popup_wrap").css('width')) / 2});
	$('.abs').css({'width': parseInt(sliderCircle.css('left')) + 25 + 'px'});
}

function showMainImage(elem) {
	let imagePath;
	let imageName;
	let left;

	$(".image_popup_text").html(elem.children(".description").html());
	$(".arrow").css({'display': 'block'});
	contacts.animate({left: leftValue}, 500);
	info.animate({left: leftValue}, 500);
	gridContainer.animate({left: "0%"}, 500);
	imagePath = elem.children(".grid_image")[0].src;
	imageName = imagePath.slice(imagePath.lastIndexOf('/') + 1, imagePath.length);
	$(".popup_main_image")[0].src = 'images/' + imageName;
	$(".popup_main_image")[0].alt = elem.attr('class').split(' ')[0];
	left = (window.innerWidth - parseInt(imageWrap.css("width"))) / 2;
	left = left / window.innerWidth * 100;
	$(".popup_bg").css({'display': 'block'});
	imageWrap.css({'display': 'block', 'left': left + '%'});
	$(".image_popup_text_wrap").css({"display": 'block',
									'width': $(".popup_main_image").width()});
	$(".close_button").css({'display': 'block',
							'left': left + $(".popup_main_image").width() / window.innerWidth * 100 + 1 + '%'});
	if (imageName.includes("with") === true) {
		showAddImage(imageName, left);
	}
}

$(".popup").on('click', function() {
	console.log($(this).parent().attr("class"));
	if ($(this).parent().attr("class").includes("grid_item")) {
		showMainImage($(this).parent());
	} else if ($(this).parent().attr("class").includes("paramoni_menu_item")) {
		console.log("gello");
	}
});

$(".arrow").on('click', function() {
	let className = $(".popup_main_image")[0].alt;

	if ($(this).hasClass("larrow") && typeof $("." + className).prev(".grid_item")[0] !== 'undefined') {
		closePopup();
		showMainImage($("." + className).prev(".grid_item"));
	} else if ($(this).hasClass("rarrow") && typeof $("." + className).next(".grid_item")[0] !== 'undefined') {
		closePopup();
		showMainImage($("." + className).next(".grid_item"));
	}
});

$(document).on('click', function(e) {
	console.log(e.target);
});

// slider
sliderCircle.mousedown(function(e) {
	$(document).on('mousemove', function(e) {
		if (e.pageX > parseInt(imageWrap.css("left")) &&
			e.pageX < (parseInt(imageWrap.css("left")) + parseInt(imageWrap.css("width")))) {
			sliderCircle.css({'left': e.pageX - parseInt(imageWrap.css("left")) - 25});
			$('.abs').css({'width': e.pageX - parseInt(imageWrap.css("left"))});
		} else if (e.pageX < parseInt(imageWrap.css("left"))){
			sliderCircle.css({'left': -25});
			$('.abs').css({'width': 0});
		} else {
			sliderCircle.css({'left': parseInt(imageWrap.css("width")) - 25});
			$('.abs').css({'width': parseInt(imageWrap.css("width"))});
		}
	});
});

sliderCircle.on('touchstart', function(e) {
	$(document).on('touchmove', function(e) {
		if (e.touches[0].pageX > parseInt(imageWrap.css("left")) &&
			e.touches[0].pageX < (parseInt(imageWrap.css("left")) + parseInt(imageWrap.css("width")))) {
			sliderCircle.css({'left': e.touches[0].pageX - parseInt(imageWrap.css("left")) - 25});
			$('.abs').css({'width': e.touches[0].pageX - parseInt(imageWrap.css("left"))});
		} else if (e.touches[0].pageX < parseInt(imageWrap.css("left"))){
			sliderCircle.css({'left': -25});
			$('.abs').css({'width': 0});
		} else {
			sliderCircle.css({'left': parseInt(imageWrap.css("width")) - 25});
			$('.abs').css({'width': parseInt(imageWrap.css("width"))});
		}
	});
});

$(document).mouseup(function () {
	$(document).unbind('mousemove');
});


// close popup
function closePopup () {
	imageWrap.css({'display': 'none'});
	$(".popup_bg").css({'display': 'none'});
	$(".popup_add_image")[0].src = "";
	$(".slider").css({'display': 'none'});
	$(".image_popup_text").html("");
	$(".image_popup_text_wrap").css({'display': 'none'});
	$(".arrow").css({'display': 'none'});
	$(".close_button").css({'display': 'none'});
}

$(".close_button").on('click', closePopup);
$(".popup_bg").on('click', closePopup);
$(window).on("keydown", function (e) {
	if (e.key === "Escape")
		closePopup();
});


// buttons
document.querySelector(".open_info").addEventListener('click', function() {
	if (info.css("left") !== '0px') {
		info.css({"display": "block"});
		info.animate({left: "0%",}, 500);
		gridContainer.animate({left: parseInt($(".info").css("width")) + 'px'}, 500);
		contacts.animate({left: leftValue}, 500);
		sleep(500);
		// setTimeout(contacts.css({"display": "none"}), 500);
	} else {
		info.animate({left: leftValue}, 500);
		gridContainer.animate({left: "0%"}, 500);
		sleep(500);
		info.css({"display": "none"});
	}
});

document.querySelector(".open_contacts").addEventListener('click', function() {
	if (contacts.css("left") !== '0px') {
		contacts.css({"display": "block"});
		contacts.animate({left: "0%",}, 500);
		gridContainer.animate({left: parseInt($(".info").css("width")) + 'px',}, 500);
		info.animate({left: leftValue,}, 500);
		// setTimeout(info.css({"display": "none"}), 500);
		sleep(500);
		info.css({"display": "none"});
	} else {
		contacts.animate({left: leftValue,}, 500);
		gridContainer.animate({left: "0%",}, 500);
		// setTimeout(contacts.css({"display": "none"}), 500);
		sleep(500);
		contacts.css({"display": "none"});
	}
});

document.querySelector(".open_work").addEventListener('click', function() {
	contacts.animate({left: leftValue,}, 500);
	info.animate({left: leftValue}, 500);
	gridContainer.animate({left: "0%",}, 500);
	sleep(500);
	// setTimeout(contacts.css({"display": "none"}), 500);
	// setTimeout(info.css({"display": "none"}), 500);
	contacts.css({"display": "none"});
	info.css({"display": "none"});
});


