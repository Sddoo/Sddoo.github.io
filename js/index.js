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
function show_add_image(imageName, left) {
	let slider = $(".slider");

	$(".popup_add_image")[0].src = 'images/' + imageName.slice(0, 1) + ".2.jpg";
	slider.css({'left': left + '%',
				'top': parseInt($('.image_popup_wrap').css('height')) + 40 + 'px',
				'width': parseInt($(".popup_main_image").css('width')),
				'display': 'block'});
	sliderCircle.css({'left': parseInt($(".image_popup_wrap").css('width')) / 2});
	$('.abs').css({'width': parseInt(sliderCircle.css('left')) + 25 + 'px'});
}

$(".popup").on('click', function() {
	let imagePath;
	let imageName;
	let left;

	contacts.animate({left: leftValue}, 500);
	info.animate({left: leftValue}, 500);
	gridContainer.animate({left: "0%"}, 500);
	imagePath = $(this).parent().children(".grid_image")[0].src;
	imageName = imagePath.slice(imagePath.lastIndexOf('/') + 1, imagePath.length);
	$(".popup_bg").css({'display': 'block'});
	imageWrap.css({'display': 'block'});
	$(".popup_main_image")[0].src = 'images/' + imageName;
	left = (window.innerWidth - parseInt(imageWrap.css("width"))) / 2;
	left = left / window.innerWidth * 100;
	imageWrap.css({'left': left + '%'});
	if (imageName.includes("with") === true) {
		show_add_image(imageName, left);
	}
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
function close_popup () {
	imageWrap.css({'display': 'none'});
	$(".popup_bg").css({'display': 'none'});
	$(".popup_add_image")[0].src = "";
	$(".slider").css({'display': 'none'});
}

$(".close_button").on('click', close_popup);
$(".popup_bg").on('click', close_popup);
$(window).on("keydown", function (e) {
	if (e.key === "Escape")
		close_popup();
});


// buttons
document.querySelector(".open_info").addEventListener('click', function() {
	if (info.css("left") !== '0px') {
		info.css({"display": "block"});
		info.animate({left: "0%",}, 500);
		gridContainer.animate({left: parseInt($(".info").css("width")) + 'px'}, 500);
		contacts.animate({left: leftValue}, 500);
		sleep(500);
		contacts.css({"display": "none"});
	} else {
		info.animate({left: leftValue}, 500);
		gridContainer.animate({left: "0%"}, 500);
	}
});

document.querySelector(".open_contacts").addEventListener('click', function() {
	if (contacts.css("left") !== '0px') {
		contacts.css({"display": "block"});
		contacts.animate({left: "0%",}, 500);
		gridContainer.animate({left: parseInt($(".info").css("width")) + 'px',}, 500);
		info.animate({left: leftValue,}, 500);
		sleep(500);
		info.css({"display": "none"});
	} else {
		contacts.animate({left: leftValue,}, 500);
		gridContainer.animate({left: "0%",}, 500);
	}
});

document.querySelector(".open_work").addEventListener('click', function() {
	contacts.animate({left: leftValue,}, 500);
	info.animate({left: leftValue}, 500);
	gridContainer.animate({left: "0%",}, 500);
	sleep(500);
	contacts.css({"display": "none"});
	info.css({"display": "none"});
});
