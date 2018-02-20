console.log("🦊 Hello! Edit me in src/js/app.js");

import jQuery from 'jquery';
const $ = jQuery;

import inView from 'in-view';

import AOS from 'aos';

import 'slick-carousel';

var Snap = require("imports-loader?this=>window,fix=>module.exports=0!snapsvg/dist/snap.svg.js");


$(document).ready(function() {
	console.log('ready');
	inView('#slide_2')
	.on('enter', function() {
		console.log('enter');
		moveGridUp();
	}).on('exit', function(){
		console.log('exit');
		moveGridDown();
	});

	//init the portfolio carousel in home;


	$('.portfolio-carousel').slick({
		'dots':true
	});
	//initCustomCarousel();

	AOS.init();

});

//require 'snapsvg/dist/snap.svg';

var s = Snap("#dots-bg");
var grid = [];
var gridStep=36;

//here I calculate some numbers for creating the grid
var gridContainerW= $("#dots-bg").width();
var gridContainerH= $("#dots-bg").height();


if (gridContainerW>600){
	gridStep=36;
}else if(gridContainerW<500){
	gridStep=30;
}

var rowCount=Math.floor(gridContainerW/gridStep);
var colCount=Math.floor(gridContainerH/gridStep);

//make the container that need to snap to the grid same width as the gridStep
$('.grid-snap').width(gridStep*rowCount);

for (var i = 0; i <= colCount; i++) {
	for (var j = 0; j <= rowCount; j++) {
		var dot = s.circle(gridStep * j, gridStep * i + 200, 2);
		grid.push(dot);
		dot.attr({
			fill: '#2828E9'
		})
	}
}

function moveGridUp() {
	for (var i = 0; i < grid.length; i++) {
		setTimeout(moveDotUp, i * 2, i);
	}
}
function moveGridDown() {
	for (var i = 0; i < grid.length; i++) {
		setTimeout(moveDotDown, i * 2, i);
	}
}

function moveDotUp(i) {
	var dot = grid[i];
	dot.animate({cy: parseInt(dot.attr('cy')) - 200}, 500);

}
function moveDotDown(i) {
	var dot = grid[i];
	dot.animate({cy: parseInt(dot.attr('cy')) + 200}, 500);
}




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
