console.log("🦊 Hello! Edit me in src/js/app.js");

import jQuery from 'jquery';
const $ = jQuery;

import inView from 'in-view';

import AOS from 'aos';

import 'slick-carousel';

import rb_image from "./responsive_background_images"


var Snap = require("imports-loader?this=>window,fix=>module.exports=0!snapsvg/dist/snap.svg.js");


$(document).ready(function() {

	//start the animation on scroll
	AOS.init({
		offset: 20,
	});

	// //animate the grid when in view
	// inView('#slide_2')
	// 	.on('enter', function() {
	// 		console.log('enter');
	// 		moveGridUp();
	// 	}).on('exit', function() {
	// 		console.log('exit');
	// 		moveGridDown();
	// 	});


		//start the video on init, must stay before slick init
		$('.portfolio-carousel').on('init', function(ev, el) {
			$('video').each(function() {
				console.log("video");
				this.play();
			});
		});

	//init the portfolio carousel in home;
	$('.portfolio-carousel').slick({
		'dots': true,
		'autoplay':true
	});

	//start loading the responsive_background_images
	let elements = document.querySelectorAll('.responsive-background-image');
	for (let i = 0; i < elements.length; i++) {
		new rb_image(elements[i]);
	}


	//enable info
	$('#hero .wtf').click(function(){
		$('#hero .wtf').toggleClass('expanded');
	})



});

//require 'snapsvg/dist/snap.svg';
//
// var s = Snap("#dots-bg");
// var grid = [];
// var gridStep = 36;
//
// //here I calculate some numbers for creating the grid
// var gridContainerW = $("#dots-bg").width();
// var gridContainerH = $("#dots-bg").height();
//
//
// if (gridContainerW > 600) {
// 	gridStep = 36;
// } else if (gridContainerW < 500) {
// 	gridStep = 30;
// }
//
// var rowCount = Math.floor(gridContainerW / gridStep);
// var colCount = Math.floor(gridContainerH / gridStep);
//
// //make the container that need to snap to the grid same width as the gridStep
// $('.grid-snap').width(gridStep * rowCount);
//
// for (var i = 0; i <= colCount; i++) {
// 	for (var j = 0; j <= rowCount; j++) {
// 		var dot = s.circle(gridStep * j, gridStep * i + 200, 2);
// 		grid.push(dot);
// 		dot.attr({
// 			fill: '#2828E9'
// 		})
// 	}
// }
//
// function moveGridUp() {
// 	for (var i = 0; i < grid.length; i++) {
// 		setTimeout(moveDotUp, i , i);
// 	}
// }
//
// function moveGridDown() {
// 	for (var i = 0; i < grid.length; i++) {
// 		setTimeout(moveDotDown, i , i);
// 	}
// }
//
// function moveDotUp(i) {
// 	var dot = grid[i];
// 	dot.animate({
// 		cy: parseInt(dot.attr('cy')) - 200
// 	}, 500);
//
// }
//
// function moveDotDown(i) {
// 	var dot = grid[i];
// 	dot.animate({
// 		cy: parseInt(dot.attr('cy')) + 200
// 	}, 500);
// }
//



// ******************************
//  il carosello fatto a manina
// ******************************


// var carousellOffset=0;
//
// function initCustomCarousel(){
// 	var items=$('.portfolio-carousel').children().length;
//
// 	var singleItemWidth=$('.container').width();
// 	$('.portfolio-carousel .slide').width(singleItemWidth);
//
// 	var marginRight=($(document).width()-singleItemWidth);
// 	$('.portfolio-carousel .slide').css('margin-right',marginRight);
// 	$('.portfolio-carousel').width((singleItemWidth+marginRight)*items+marginRight);
//
// 	carousellOffset=(((singleItemWidth+marginRight)*items)+marginRight)/items;
//
// 	createNavigationDots(items);
// }
//
// function createNavigationDots(items){
// 	for (var i=0; i<items; i++){
// 		$('.dots').append("<li class='nav' id="+i+"></li>");
// 	}
// 	$('.dots .nav').click(function(){
// 		slideCarousel($(this).attr('id'));
// 	});
// }
//
// function slideCarousel(target){
// 	console.log(target)
// 	$('.portfolio-carousel .slide').first().css('margin-left',-carousellOffset*target	 )
// }



/**
 * HELPERS
 ----------------------------------------------------------------------- */
function _hasClass(el, className) {
  return el.classList ? el.classList.contains(className) : new RegExp('\\b'+ className+'\\b').test(el.className);
}

function _addClass(el, className) {
  if (el.classList) el.classList.add(className);
  else if (!_hasClass(el, className)) el.className += ' ' + className;
}

function _removeClass(el, className) {
  if (el.classList) el.classList.remove(className);
  else el.className = el.className.replace(new RegExp('\\b'+ className+'\\b', 'g'), '');
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

  if ( ! isIE9) return;

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
      return function(e) { ie9TriggerInput(theEl); }
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
      return function() { onFocus(theLabel); };
    })(label));

    input.addEventListener('blur', (function(theLabel) {
      return function() { onBlur(theLabel); };
    })(label));

    input.addEventListener('input', (function(theLabel) {
      return function() { onInput(theLabel, this.value); };
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


/*
 * FORM EXPAND
 ----------------------------------------------------------------------- */
// Which transition event?
// by David Walsh: http://davidwalsh.name/css-animation-callback
var transitionEnd = (function() {
  var el = document.createElement('fakeelement');
  var transitions = {
    'transition'      : 'transitionend',
    'OTransition'     : 'oTransitionEnd',
    'MozTransition'   : 'transitionend',
    'WebkitTransition': 'webkitTransitionEnd'
  }

  for (var t in transitions) {
    if (el.style[t] !== undefined) {
      return transitions[t];
    }
  }

  return 'transitionend';
})();



/*
 * STORE FORM VALUES IN LOCAL STORAGE
 * Mark fields to be stored by adding the 'data-store' attribute
 ----------------------------------------------------------------------- */
function storeFields(form) {

  var storedFields = [].slice.call(form.querySelectorAll('[data-store]'));

  storedFields.forEach(function(field) {

		var value;

		if (field.type === 'radio' || field.type === 'checkbox') {
			value = field.checked ? '1' : '0';
		} else {
			value = field.value;
		}

		window.localStorage.setItem(field.id, value);

	});

}

function setStoredFields() {

  var storedFields = [].slice.call(document.querySelectorAll('[data-store]'));

  storedFields.forEach(function(field) {

    var stored = window.localStorage.getItem(field.id);

		if (stored) {
			if (field.type === 'radio' || field.type === 'checkbox') {
				field.checked = !!stored;
			} else {
				field.value = stored;

        // special case for selectize
        if (field.selectize) {
          field.selectize.addItem(stored);
        }
			}
			var event = document.createEvent('HTMLEvents');
			event.initEvent('input', true, false);
			field.dispatchEvent(event);
		}

  });

}

// fill form on page load
setStoredFields();

// [EXAMPLE] Save values on form submit
var form = document.querySelector('.fp-form');
form.addEventListener('submit', function(event) {
  event.preventDefault();
  storeFields(form);
});


//auto height textarea
var textarea = document.querySelector('textarea');

textarea.addEventListener('keydown', autosize);

function autosize(){
	console.log("resizing");
  var el = this;
  setTimeout(function(){
    el.style.cssText = 'height:auto; padding:0';
    // for box-sizing other than "content-box" use:
    // el.style.cssText = '-moz-box-sizing:content-box';
    el.style.cssText = 'height:' + el.scrollHeight + 'px';
  },0);
}
