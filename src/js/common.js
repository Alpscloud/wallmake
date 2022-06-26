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


	$('.menu-item-has-children').each(function() {
		var btn = '<button class="btn-toggle js-toggle-submenu-btn" type="button"></button>';
		var link = $(this).find('> a');
		$(btn).insertAfter(link);

	});

	$('.js-toggle-submenu-btn').on('click', function(e) {
		e.preventDefault();
		$(this).toggleClass('is-active');
		$(this).parents('.menu-item-has-children').find('.sub-menu').stop().slideToggle(170);
	});

	$('.js-open-mobile-menu-btn').on('click', function(e) {
		e.preventDefault();
		$(this).toggleClass('is-active');
		$('html').toggleClass('is-fixed');
		$('.js-menu').toggleClass('is-opened');
		$('.header').toggleClass('is-menu-opened');

		if ($('.js-search').hasClass('is-opened')) {
			$('.js-search').removeClass('is-opened');
		}
	});

	$('.js-open-search-form-btn').on('click', function(e) {
		e.preventDefault();

		$(this).toggleClass('is-active');

		$('.js-search').stop().slideToggle(200);
	});

	$('.js-open-mobile-search-form-btn').on('click', function(e) {
		e.preventDefault();

		$('.js-search').addClass('is-opened');
	});

	$('.js-close-mobile-search-form-btn').on('click', function(e) {
		e.preventDefault();

		$('.js-search').removeClass('is-opened');

		$('.search-input').val('');
		$('.btn-clear').removeClass('is-visible');

		if (html > 992) {
			$('.js-search').stop().slideUp(200);
			$('.js-open-search-form-btn').removeClass('is-active');
		}
	});

	

	

	$('.search-input').on('keyup', function() {
		if ($(this).val().length >= 1) {
			$('.btn-clear').addClass('is-visible');
		} else {
			$('.btn-clear').removeClass('is-visible');
		}
	});

	$('.btn-clear').on('click', function() {
		if ($(this).hasClass('is-visible')) {
			$(this).removeClass('is-visible');
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
			nextArrow: $('.js-promo-slider-btn-next'),
			dots: true,
			appendDots: $('.js-promo-slider-pagination')

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
			appendDots: $('.js-portfolio-slider-pagination'),
			responsive: [
				{
					breakpoint: 767,
					settings: {
						slidesToShow: 1,
						variableWidth: true,
						slidesToScroll: 1
					}
				}
			]

		});
	}

	if ($('.js-advantages-slider').length > 0) {
		$('.js-advantages-slider').slick({
			infinite: true,
			centerMode: true,
			slidesToShow: 3,
			speed: 600,
			arrows: false,
			dots: true,
			appendDots: $('.js-advantages-slider-pagination'),
			accessibility: false,
			responsive: [
				{
					breakpoint: 1050,
					settings: {
						dots: true,
						slidesToShow: 1,
						variableWidth: true,
						slidesToScroll: 1,
						centerMode: false
					}
				}
			]

		});
	}

	if ($('.js-presentation-slider').length > 0) {
		$('.js-presentation-slider').slick({
			infinite: true,
			slidesToShow: 1,
			slidesToScroll: 1,
			speed: 600,
			arrows: false,
			dots: true,
			appendDots: $('.js-presentation-slider-pagination')

		});
	}

	$('.js-open-presentation-slider-btn').on('click', function(e) {
		e.preventDefault();
		$(this).addClass('is-hidden');
	});





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


	$("input[type=tel]").inputmask({"mask": "+7 (999) 999-9999","clearIncomplete": false});


	setTimeout(function(){
		$('body').addClass('is-loaded');
	}, 1500);


});
