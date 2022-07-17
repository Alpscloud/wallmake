$(document).ready(function() {
	//  ========= Variables =========
	var body = $('body'),
			html = body.width(),
			timer; // for disable scroll
	// ========= =========== =========== ===========

	// Popup
	$('.js-open-popup-form-btn').on('click',function(e) {
		e.preventDefault();
		$('.js-popup-form').fadeIn(300);
		$('html').addClass('is-fixed');
	});


	$('.js-open-vacancy-form-btn').on('click',function(e) {
		e.preventDefault();
		$('.js-popup-vacancy-form').fadeIn(300);
		$('html').addClass('is-fixed');
	});
	


	$('.js-close-popup-btn').on('click',function(e) {
		e.preventDefault();
		$(this).parents('.js-popup').fadeOut(300);
		$('html').removeClass('is-fixed');
	});

	$('.popup__overflow').on('click', function(e) {
		e.stopPropagation();

		var content = $(this).find('.popup__body');

		if(!content.is(e.target) && content.has(e.target).length === 0) {
			$('html').removeClass('is-fixed');
			$('.js-popup').fadeOut(300);
		}

	});
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
			autoplay: true,
			autoplaySpeed: 3000,
			accessibility: false,
			responsive: [
				{
					breakpoint: 1100,
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

	$('[data-fancybox]').fancybox({
		loop: true
	});


	$('.js-toggle-chapter-card-content-btn').on('click', function(e) {
		e.preventDefault();

		$(this).toggleClass('is-active');
		$(this).parents('.chapter-card__wrapper').find('.chapter-card__content-blocks').stop().slideToggle(150);
		$(this).parents('.chapter-card__wrapper').find('.chapter-card__content').toggleClass('is-active');
	});

	var fileInputs = $('input[type=file]');


	if (fileInputs.length > 0) {

		fileInputs.each(function() {

			$(this).on('change', function(e) {
				var self = $(this);
				var fileName = '';

				var filesLength = self[0].files.length;
				var files = self[0].files;

				if (files && filesLength > 1) {
					fileName = ( self.attr( 'data-multiple-caption' ) || '' ).replace( '{count}', filesLength );
				} else {
					fileName = e.target.value.split( '\\' ).pop();
				}

				if( fileName ) {	
					self.parents('.form-file__wrapper').find('.form-file__result').html(fileName);
				} 

				


			});
		});
	
	}

	$('.js-toggle-hidden-input').on('change', function(e) {
		$(this).parents('form').find('.form-group-toggle').stop().slideToggle(150);
	});


	$("input[type=tel]").inputmask({"mask": "+7 (999) 999-9999","clearIncomplete": false});


	if ($('.js-input-date').length > 0) {
		$('.js-input-date').datepicker({
			monthNames : ['Январь','Февраль','Март','Апрель','Май','Июнь','Июль','Август','Сентябрь','Октябрь','Ноябрь','Декабрь'],
			dayNamesMin : ['Вс','Пн','Вт','Ср','Чт','Пт','Сб'],
			minDate: 0,
			format: 'dd.mm.yyyy',
			setDate: new Date()
		});
	}

	


	// Quiz
	if ($('.js-quiz-step').length > 0) {
		var quizSteps = $('.js-quiz-step').length;

		function generateQuizProgressDots() {
			var dotTmpl = '';

			for (var i = 0; i <= quizSteps - 1; i++) {
				dotTmpl += '<span class="quiz-progress-dot"></span>';
			}

			$('.quiz-progress-dots').html(dotTmpl);
			$('.quiz-progress-counter-total').text('/'+quizSteps);
		}

		generateQuizProgressDots();

		$('.quiz-progress-dot:first-child').addClass('is-active');


		var quizStep = $('.js-quiz-step'),
				quizControls = quizStep.find('.js-quiz-step-controls');

		quizStep.not(":nth-child(1)").hide();
		quizStep.first().addClass('is-active');

		$('.quiz select, .quiz [type=radio]').on('change', function() {
			var currentQuizStep = $(this).parents('.js-quiz-step');
			var nextQuizStep = currentQuizStep.next();
			var nextStepInd = nextQuizStep.index();

			if (nextQuizStep.length > 0) {
				quizProgressForward(nextStepInd);
				currentQuizStep.removeClass('is-active').css("display", "flex").hide();
				nextQuizStep.addClass('is-active').css("display", "flex").hide().fadeIn();
			}
		});


		function quizProgressForward(nextQuizStepInd) {
			$('.quiz-progress-dot').removeClass('is-active');
			$('.quiz-progress-dot').eq(nextQuizStepInd).addClass('is-active');
			$('.quiz-progress-counter-current').text(nextQuizStepInd + 1);
		}

		function quizProgressBack(prevQuizStepInd) {
			$('.quiz-progress-dot').removeClass('is-active');
			$('.quiz-progress-dot').eq(prevQuizStepInd).addClass('is-active');
			$('.quiz-progress-counter-current').text(prevQuizStepInd + 1);
		}

		quizControls.each(function() {
			var self = $(this);

			self.on('click', function(e) {
				e.preventDefault();
				//e.stopPropagation();

				var top = $('.js-quiz').offset().top;

				var quizBtn = $(e.target),
						quizDirection = quizBtn.attr('data-quiz-direction');

				if(quizBtn.prop('tagName') !== 'BUTTON') {return};

				// Quiz steps
				var currentQuizStep = self.parents('.js-quiz-step'),
						nextQuizStep = currentQuizStep.next('.js-quiz-step'),
						prevQuizStep = currentQuizStep.prev('.js-quiz-step');

				var nextQuizStepInd = nextQuizStep.index();
				var prevQuizStepInd = prevQuizStep.index();
	

				// Validation
				var radios = currentQuizStep.find('input[type=radio]:checked').length;
				var checkboxes = currentQuizStep.find('input[type=checkbox]:checked').length;
				var inputs = currentQuizStep.find('input[type=text]');
				// var flag;

				if(quizDirection === 'next') {
					
					if (nextQuizStep.length) {


						// Progress
						quizProgressForward(nextQuizStepInd);

						// Steps
						currentQuizStep.removeClass('is-active').css("display", "flex").hide();
						nextQuizStep.addClass('is-active').css("display", "flex").hide().fadeIn();

					} else {
						return;
					}


				} else if(quizDirection === 'prev') {

					if (prevQuizStep.length) {

						// flag = true;

						currentQuizStep.removeClass('is-error');

						// Progress
						quizProgressBack(prevQuizStepInd);

						// Steps
						currentQuizStep.removeClass('is-active').css("display", "flex").hide();
						prevQuizStep.addClass('is-active').css("display", "flex").hide().fadeIn();
					} else {
						return;
					}

				}

				if (quizBtn.attr('type') == 'submit') {
					quizFormSubmit(e, $('.js-quiz-form'));
				}

				if(html < 767) {
			 		$('html, body').animate({scrollTop: top}, 170);
			 	}

			});
		});


		quizStep.find('input[type=radio]').on('change', function() {
			if ($(this).parents('.js-quiz-step').hasClass('is-error')) {
				$(this).parents('.js-quiz-step').removeClass('is-error')
			}
		});

	}


	$('.js-prev-page-link').on('click', function(e) {
		e.preventDefault();

		window.history.go(-1);
	});

	$('.js-required-quiz-field').on('focus',function() {
		if($(this).parents('.js-quiz-step').hasClass('is-error')) {
			$(this).parents('.js-quiz-step').removeClass('is-error');
		}
	});


	function quizFormSubmit(e, form) {
		e.preventDefault();

		var that = form;
			inputs = that.find('.js-required-quiz-field'),
			flag = true;

		// Validate
		$(inputs).each(function() {
			if(!$(this).val() || $(this).val() == "") {
				$(this).parents('.js-quiz-step').addClass('is-error');
				flag = false;
			}
		});

		if(!flag) {return false;}

		$.ajax({
			type: "POST",
			url: "mail.php", //Change
			data: that.serialize()
		}).done(function() {
			$('html').addClass('is-fixed');
			$('.js-popup-thanks').fadeIn(300);
			setTimeout(function() {
				$('html').removeClass('is-fixed');
				$('.js-popup-thanks').fadeOut(300);

				$('.js-quiz-step').removeClass('is-active').css("display", "flex").hide();
				$('.js-quiz-step:first-child').addClass('is-active').css("display", "flex").hide().fadeIn();
				$('.quiz-progress-dot').removeClass('is-active');
				$('.quiz-progress-dot:first-child').addClass('is-active');
				$('.quiz-progress-counter-current').text('1');

				that.trigger("reset");
			}, 2000);
		});

	}

	// ========= Ajax form ===========
	$('.js-required-input').on('focus',function() {
		if($(this).hasClass('is-error')) {
			$(this).removeClass('is-error');
		}
	});

	$('.form').submit(function(e) {
		e.preventDefault();

		var that = $(this);
			inputs = that.find('.js-required-input'),
			flag = true;

		// Validate
		$(inputs).each(function() {
			if(!$(this).val() || $(this).val() == "") {
				$(this).addClass('is-error');
				flag = false;
			}
		});

		if(!flag) {return false;}

		$.ajax({
			type: "POST",
			url: "mail.php", //Change
			data: that.serialize()
		}).done(function() {
			// add active clases
			setTimeout(function() {
				// remove active classes
				that.trigger("reset");
			}, 2000);
		});

	});
	// ========= =========== =========== ===========

	


	setTimeout(function(){
		$('body').addClass('is-loaded');
	}, 1500);


});
