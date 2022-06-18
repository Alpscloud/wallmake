$(document).ready(function() {
	//  ========= Variables =========
	var body = $('body'),
			html = body.width(),
			timer; // for disable scroll
	// ========= =========== =========== ===========

	var headerHeight = $('.header').innerHeight();

	$('.js-smooth-scroll-link').on('click', function (e) {
		e.preventDefault();
		var id = $(this).attr('href'),
			top = $(id).offset().top - headerHeight;

		$('html, body').animate({scrollTop: top}, 400);
	});	

	// Disable hover effect when client scrolles the page
	$(window).on('scroll',function() {
		clearTimeout(timer);
		if(!body.hasClass('disable-hover')) {
			body.addClass('disable-hover');
		}

		timer = setTimeout(function() {
			body.removeClass('disable-hover');
		}, 200);


		if ($(this).scrollTop() > 0) {
			$('.header').addClass('is-fixed');
		} else {
			$('.header').removeClass('is-fixed');
		}
	});



	// Sliders
	if ($('.js-promo-slider').length > 0) {
		$('.js-promo-slider').slick({
			infinite: true,
			fade: true,
			cssEase: 'linear',
			speed: 1000,
			autoplay: true,
			autoplaySpeed: 5000,
			prevArrow: $('.js-promo-slider-btn-prev'),
			nextArrow: $('.js-promo-slider-btn-next')

		});
	}


	if ($('.js-simple-slider').length > 0) {

		$('.js-simple-slider').each(function() {
			var self = $(this);
			var pagination = self.parents('.simple-slider__wrapper').find('.js-simple-slider-pagination');

			self.slick({
				infinite: true,
				speed: 600,
				arrows: false,
				dots: true,
				appendDots: pagination
			});
			
		});
	}

	if ($('.js-portfolio-slider').length > 0) {
		$('.js-portfolio-slider').slick({
			infinite: true,
			slidesToShow: 4,
			slidesToScroll: 2,
			speed: 600,
			arrows: false,
			dots: true,
			appendDots: $('.js-portfolio-slider-pagination')

		});
	}





	if ($('.js-calculator-range').length > 0) {

		var price = parseInt($('.calculator-radio input[type=radio]:checked').val());

		$('.calculator-radio input[type=radio]').on('change', function() {
			price = parseInt($(this).val());

			calculate();
			return price;

			

			
		});


		var range = $('.js-calculator-range');
		var max = parseInt(range.attr('data-max'));
		var rangeVal = 1;

		range.slider({
			animate: "slow",
			range: "min",
			min: 0,
			max: max,
			steps: 20,
			value: 1,
			slide: function(event, ui) {
				rangeVal = ui.value;

				$('.js-calculator-range-value').text(rangeVal);
				$('.js-calculator-total').html('от ' + (ui.value * price).toLocaleString() + ' руб.');

				return rangeVal;
			
			}
		});

		

		function calculate() {
			$('.js-calculator-total').html('от ' + (rangeVal * price).toLocaleString() + ' руб.');
		}

	}


	setTimeout(function(){
		$('body').addClass('is-loaded');
	}, 1500);


});
