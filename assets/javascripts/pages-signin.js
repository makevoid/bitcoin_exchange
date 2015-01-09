$( function(){
	'use strict';
	// backgrounds slideshow
	$.vegas.defaults.background.fade = 3000;
	$.vegas('slideshow', {
		delay: 15000,
		loading: false,
		backgrounds: [
			{
				src: 'assets/trianglify1.svg'
			}, {
				src: 'assets/trianglify2.svg'
			}, {
				src: 'assets/trianglify3.svg'
			}, {
				src: 'assets/trianglify4.svg'
			}, {
				src: 'assets/trianglify5.svg'
			}, {
				src: 'assets/trianglify6.svg'
			},

		],
	})('overlay', {
		src:'assets/overlays.png',
		opacity: 0.001
	});
});
