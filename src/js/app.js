console.log("🤖 👋 👨‍👩");


import './jquery-global.js';

import inView from 'in-view';

import AOS from 'aos';

import 'slick-carousel';

import rb_image from "./responsive_background_images"

import paper from 'paper'
paper.install(window);

import gridAnimation from './grid'

import './jquery.splitlines.js'


var paperjsAniamtion = new gridAnimation();


$(document).ready(function() {

	$( '.splitText' ).each( function( index, element ){
		var w= $(element).parents( ".portfolio-grid-item" ).width();
		var p= $(element).parents( ".portfolio-box-caption-content" ).css('padding');
		p=parseInt(p);
		w-=2*p;
	    $( this ).splitLines({
					tag: '<div class="multiline">',
		    width: w,
		    keepHtml: true
		})
	});

	//start the animation on scroll
	AOS.init({
		offset: 20,
	});

	//start the video on init, must stay before slick init
	$('.portfolio-carousel').on('init', function(ev, el) {
		$('video').each(function() {
			this.play();
		});
	});


	//adjust size of the videos in the portfolio grid1
	if ($('.responsive-background-video').width() > $('.responsive-background-video .background-video').width()){
		$('.responsive-background-video .background-video').css({
				'width':'auto',
				'height':'100%',
				maxWidth:'none',
				maxHeight:'none'
		});
	}else if($('.responsive-background-video').height() > $('.responsive-background-video .background-video').height()){
		$('.responsive-background-video .background-video').css({
					'height':'auto',
					'width':'100%',
					maxWidth:'none',
					maxHeight:'none'
			});
	}



	//init the portfolio carousel in home;
	$('.portfolio-carousel').slick({
		'dots': true,
		'autoplay': true,
		'nextArrow': $('#next-arrow'),
		'autoplaySpeed': 4000
	});


	//start loading the responsive_background_images
	let elements = document.querySelectorAll('.responsive-background-image');
	for (let i = 0; i < elements.length; i++) {
		new rb_image(elements[i]);
	}

	//enable info
	$('#hero .wtf').click(function() {
		$('#hero .wtf').toggleClass('expanded');
	})

	// //this is for the changing textAnimation;
	// setInterval(shiftTextAnimation, 2000);
	//
	// var antefact = new Audio('/assets/antefact.mp3');
	//
	// $('.playSound').click(function() {
	// 	event.preventDefault();
	// 	antefact.play();
	// })

	$("#gotoabout").click(function(){
		scrollToAnchor('#slide_2');
	})

	paperjsAniamtion.init();


});



/**
 * HELPERS
 ----------------------------------------------------------------------- */
function _hasClass(el, className) {
	return el.classList ? el.classList.contains(className) : new RegExp('\\b' + className + '\\b').test(el.className);
}

function _addClass(el, className) {
	if (el.classList) el.classList.add(className);
	else if (!_hasClass(el, className)) el.className += ' ' + className;
}

function _removeClass(el, className) {
	if (el.classList) el.classList.remove(className);
	else el.className = el.className.replace(new RegExp('\\b' + className + '\\b', 'g'), '');
}


/*
 * FLOATING LABELS
 ----------------------------------------------------------------------- */
function ie9InputFix() {

	var ua = navigator.userAgent.toLowerCase();
	var isIE9 =
		document.addEventListener &&
		/msie/.test(ua) &&
		parseFloat((ua.match(/.*(?:rv|ie)[\/: ](.+?)([ \);]|$)/) || [])[1]) < 10;

	if (!isIE9) return;

	var inputs = document.querySelectorAll('input, textarea');

	function ie9TriggerInput(el) {
		if (el.value !== el.getAttribute('data-oldValue')) {
			var event = document.createEvent('HTMLEvents');
			event.initEvent('input', true, false);
			el.dispatchEvent(event);
		}
	}

	for (var i = inputs.length - 1; i >= 0; i--) {
		var el = inputs[i];
		var selectionListener = (function(theEl) {
			return function(e) {
				ie9TriggerInput(theEl);
			}
		})(el);
		el.addEventListener('focus', function() {
			document.addEventListener('selectionchange', selectionListener, false);
		});
		el.addEventListener('blur', function() {
			document.removeEventListener('selectionchange', selectionListener, false);
		});
		el.addEventListener('input', (function(theEl) {
			return function() {
				el.setAttribute('data-oldValue', el.value);
			}
		})(el));
	}
}


function scrollToAnchor(aid) {
	var aTag = $(aid);
	console.log(aTag);
	$('html,body').animate({
		scrollTop: aTag.offset().top
	}, 'slow');
}



function floatingLabels() {

	var labels = document.getElementsByClassName('fp-floating-label');

	function toggleClass(el, className, value) {
		if (value) {
			_addClass(el, className);
		} else {
			_removeClass(el, className);
		}
	}

	function onFocus(label) {
		toggleClass(label, 'fp-floating-label--focused', true);
	}

	function onBlur(label) {
		toggleClass(label, 'fp-floating-label--focused', false);
	}

	function onInput(label, value) {
		value = value.trim();
		toggleClass(label, 'fp-floating-label--valued', value);
	}

	for (var i = labels.length - 1; i >= 0; i--) {
		var label = labels[i];
		var input = label.nextElementSibling;

		input.addEventListener('focus', (function(theLabel) {
			return function() {
				onFocus(theLabel);
			};
		})(label));

		input.addEventListener('blur', (function(theLabel) {
			return function() {
				onBlur(theLabel);
			};
		})(label));

		input.addEventListener('input', (function(theLabel) {
			return function() {
				onInput(theLabel, this.value);
			};
		})(label));

		onInput(label, input.value);
	}
}

ie9InputFix()
floatingLabels();


/*
 * TYPEAHEAD SELECTS ( THE ONLY PART THAT NEEDS JQUERY -.-' )
 ----------------------------------------------------------------------- */
var advSelects = document.getElementsByClassName('fp-advanced-select');
for (var i = advSelects.length - 1; i >= 0; i--) {
	var $select = $(advSelects[i]);
	(function($el) {
		var $label = $el.prev();
		$el.selectize({
			// implement label magic for selectize
			onFocus: function() {
				$label.addClass('fp-floating-label--focused');
			},
			onBlur: function() {
				$label.removeClass('fp-floating-label--focused');
			},
			onChange: function(value) {
				value = value.trim();
				if (value) {
					$label.addClass('fp-floating-label--valued');
				} else {
					$label.removeClass('fp-floating-label--valued');
				}
			}
		});
	})($select);
}

//
// /*
//  * FORM EXPAND
//  ----------------------------------------------------------------------- */
// // Which transition event?
// // by David Walsh: http://davidwalsh.name/css-animation-callback
// var transitionEnd = (function() {
// 	var el = document.createElement('fakeelement');
// 	var transitions = {
// 		'transition': 'transitionend',
// 		'OTransition': 'oTransitionEnd',
// 		'MozTransition': 'transitionend',
// 		'WebkitTransition': 'webkitTransitionEnd'
// 	}
//
// 	for (var t in transitions) {
// 		if (el.style[t] !== undefined) {
// 			return transitions[t];
// 		}
// 	}
//
// 	return 'transitionend';
// })();
//
//
//
// /*
//  * STORE FORM VALUES IN LOCAL STORAGE
//  * Mark fields to be stored by adding the 'data-store' attribute
//  ----------------------------------------------------------------------- */
// function storeFields(form) {
//
// 	var storedFields = [].slice.call(form.querySelectorAll('[data-store]'));
//
// 	storedFields.forEach(function(field) {
//
// 		var value;
//
// 		if (field.type === 'radio' || field.type === 'checkbox') {
// 			value = field.checked ? '1' : '0';
// 		} else {
// 			value = field.value;
// 		}
//
// 		window.localStorage.setItem(field.id, value);
//
// 	});
//
// }
//
// function setStoredFields() {
//
// 	var storedFields = [].slice.call(document.querySelectorAll('[data-store]'));
//
// 	storedFields.forEach(function(field) {
//
// 		var stored = window.localStorage.getItem(field.id);
//
// 		if (stored) {
// 			if (field.type === 'radio' || field.type === 'checkbox') {
// 				field.checked = !!stored;
// 			} else {
// 				field.value = stored;
//
// 				// special case for selectize
// 				if (field.selectize) {
// 					field.selectize.addItem(stored);
// 				}
// 			}
// 			var event = document.createEvent('HTMLEvents');
// 			event.initEvent('input', true, false);
// 			field.dispatchEvent(event);
// 		}
//
// 	});
//
// }
//
// // fill form on page load
// setStoredFields();
//
// // [EXAMPLE] Save values on form submit
// var form = document.querySelector('.fp-form');
// form.addEventListener('submit', function(event) {
// 	event.preventDefault();
// 	storeFields(form);
// });
//

//auto height textarea
// var textarea = document.querySelector('textarea');
//
// textarea.addEventListener('keydown', autosize);

function autosize() {
	console.log("resizing");
	var el = this;
	setTimeout(function() {
		el.style.cssText = 'height:auto; padding:0';
		// for box-sizing other than "content-box" use:
		// el.style.cssText = '-moz-box-sizing:content-box';
		el.style.cssText = 'height:' + el.scrollHeight + 'px';
	}, 0);
}

var lineSystem = {};

function splitText() {
	var splitted = $('.padded-multiline-container').wraplines();
	var opts = $('.padded-multiline-container').data();

	$('.padded-multiline-container  span').addClass('extra');
	$('.padded-multiline-container').removeClass('init');
}


function shiftTextAnimation() {

	var listLength = $('.changing-text ul li').length;
	var offset = parseInt($('.changing-text ul').css('margin-top'));
	if (offset < (listLength - 1) * -60) {
		offset = 0
	}

	$('.changing-text ul').css('margin-top', offset - 60 + 'px');

	$('#loop').toggleClass('rotate', true);
	setTimeout(function() {
		$('#loop').toggleClass('rotate', false);
	}, 500);
}


// netlify form handling
$("#contact-form").submit(function(e) {
	e.preventDefault();

	var $form = $(this);
	$.post($form.attr("action"), $form.serialize()).then(function() {
		alert("Thank you!");
	});
});


/*
 * jQuery wraplines plugin
 *
 * Copyright (c) 2010 Paul Bennett (http://pmbennett.net)
 * Licensed under the MIT License:
 *   https://www.opensource.org/licenses/mit-license.php
 *
 */

jQuery.fn.wraplines = function(options) {
	var options = jQuery.extend({
		lineWrap: 'span', //name of html element used to wrap lines
		lineClassPrefix: 'wrap_line_', // prefix for class name to be added to line wrapper element
		wordClassPrefix: 'w_line_',
		index: 0,
		offsetTop: 0,
		offsetLeft: 0
	}, options);
	return this.each(function() {
		options.index = 0;
		options.offset = 0;
		var parentElm = $(this);
		var elmText = $(parentElm).text();
		$(parentElm).html(function(ind, htm) {
			var $repText = '<' + options.lineWrap + '>' + elmText.replace(/\s/g, '</' + options.lineWrap + '> <' + options.lineWrap + '>');
			$repText = $repText + '</' + options.lineWrap + '>';
			return $repText;
		});
		$(options.lineWrap, parentElm).each(function() {
			var spanOffset = $(this).offset();
			if (spanOffset.top > options.offsetTop) {
				options.offsetTop = spanOffset.top;
				options.index++;
			}
			$(this).addClass(options.wordClassPrefix + options.index);
		});
		for (var x = 1; x <= options.index; x++) {
			$('.' + options.wordClassPrefix + x, parentElm)
				.wrapAll('<' + options.lineWrap + ' class="line ' + options.lineClassPrefix + x + '" />')
				.append(" ");
			var innerText = $('.' + options.lineClassPrefix + x, parentElm).text();
			$('.' + options.lineClassPrefix + x, parentElm).html(function() {
				return innerText;
			});
			lineSystem.index = options.index

		}
	});
};
