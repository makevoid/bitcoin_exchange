$(function(){
	'use strict';

	// Turn on automatic storage of JSON objects passed as the cookie value
	$.cookie.json = true;
	// Define lifetime of the cookie
	$.cookie.defaults.expires = 1; // 1 days

	// DEFINE DEFAULT WRAPKIT PLUGIN OPTIONS
	var wrapkitLayoutOptions = ( $.cookie( 'template_setups_layout' ) ) ? $.cookie( 'template_setups_layout' ) : $.fn.wrapkitLayout.options,
		wrapkitHeaderOptions =  ( $.cookie( 'template_setups_header' ) ) ? $.cookie( 'template_setups_header' ) : $.fn.wrapkitHeader.options,
		wrapkitContentOptions =  ( $.cookie( 'template_setups_content' ) ) ? $.cookie( 'template_setups_content' ) : $.fn.wrapkitContent.options,
		wrapkitSidebarOptions =  ( $.cookie( 'template_setups_sidebar' ) ) ? $.cookie( 'template_setups_sidebar' ) : $.fn.wrapkitSidebar.options,
		wrapkitFooterOptions =  ( $.cookie( 'template_setups_footer' ) ) ? $.cookie( 'template_setups_footer' ) : $.fn.wrapkitFooter.options;

	// set background
	if( $.cookie( 'template_bg' ) ){
		var bgStyle = $.cookie( 'template_bg' );
		$( 'body' ).css( bgStyle );
	}

	

	// INITIALIZE WRAPKIT LAYOUT SETUP
	// =====================================
	var $layout = $( '.wrapkit-wrapper' );
	$layout.wrapkitLayout( wrapkitLayoutOptions );
	// end of wrapkit layout setup


	
	// INITIALIZE WRAPKIT HEADER SETUP
	// =====================================
	var $header = $( '.header' );
	$header.wrapkitHeader( wrapkitHeaderOptions );
	// end of wrapkit header setup
	


	// INITIALIZE WRAPKIT CONTENT SETUP
	// =====================================
	var $content = $( '.content-wrapper' );
	$content.wrapkitContent( wrapkitContentOptions );
	// end of wrapkit content setup
	


	// INITIALIZE WRAPKIT SIDEBAR SETUP
	// =====================================
	var $sidebar = $( '[data-control="wrapkit-sidebar"]' );
	$sidebar.wrapkitSidebar( wrapkitSidebarOptions );

	$('[data-toggle="sidebar-size"]').on( 'click', function(){

		$sidebar.wrapkitSidebar( 'toggleSize' );

		// trigger resize to update responsive components
		setTimeout(function(){
			$( window ).trigger('resize');
		}, 100);
	});
	// end of wrapkit sidebar setup
	


	// INITIALIZE WRAPKIT FOOTER SETUP
	// =====================================
	var $footer = $( '.footer-wrapper' );
	$footer.wrapkitFooter( wrapkitFooterOptions );
	// end of wrapkit footer setup



	// INITIALIZE WRAPKIT PANEL SETUP
	// =====================================
	$( '.panel' ).each(function(){
		var $panel = $( this ),
			data = $panel.data(),
			options = {};

		options.collapse = ( data.collapse ) ? true : false;
		options.expand = ( data.expand ) ? true : false;
		options.color = ( data.color ) ? data.color : 'none';
		// init
		$panel.wrapkitPanel( options );
	});

	// Panel actions
	// remove panel
	$( document ).on( 'click', '[data-toggle="panel-remove"]:not([data-target])', function(e){
		e.preventDefault();

		var $panel = $(this).closest('.panel');
		$panel.wrapkitPanel( 'remove' );

		// refresh sidebar height
		$( '.sidebar' ).wrapkitSidebar( 'updateHeight' );
	})
	// close panel
	.on( 'click', '[data-toggle="panel-close"]:not([data-target])', function(e){
		e.preventDefault();

		var $panel = $(this).closest('.panel');
		$panel.wrapkitPanel( 'close' );

		// refresh sidebar height
		$( '.sidebar' ).wrapkitSidebar( 'updateHeight' );
	})
	// collapse panel
	.on( 'click', '[data-toggle="panel-collapse"]:not([data-target])', function(e){
		e.preventDefault();

		var $panel = $(this).closest('.panel'),
			collapse = (! $panel.data().wrapkitPanel.options.collapse );

		$panel.wrapkitPanel( 'collapse', collapse );

		// refresh sidebar height
		$( '.sidebar' ).wrapkitSidebar( 'updateHeight' );
	})
	// refresh panel
	.on( 'click', '[data-toggle="panel-refresh"]:not([data-target])', function(e){
		e.preventDefault();

		var $panel = $(this).closest('.panel');
		$panel.wrapkitPanel( 'refresh', true );

		// refresh sidebar height
		$( '.sidebar' ).wrapkitSidebar( 'updateHeight' );
	})
	// expand panel
	.on( 'click', '[data-toggle="panel-expand"]:not([data-target])', function(e){
		e.preventDefault();

		var $panel = $(this).closest('.panel'),
			expand = (! $panel.data().wrapkitPanel.options.expand );
		$panel.wrapkitPanel( 'expand', expand );

		// refresh sidebar height
		$( '.sidebar' ).wrapkitSidebar( 'updateHeight' );
	})
	// change color panel
	.on( 'click', '[data-toggle="panel-color"]:not([data-target])', function(e){
		e.preventDefault();

		var $panel = $(this).closest('.panel'),
			color = $( this ).data().color;
		$panel.wrapkitPanel( 'setColor', color );
	});
	// Panel actions controll w/ data target (So you can control a panel from anywhere)
	$( document ).on( 'click', '[data-toggle="panel-remove"][data-target]', function(e){
		e.preventDefault();

		var target = $( this ).data().target;
		$( target ).wrapkitPanel( 'remove' );

		// refresh sidebar height
		$( '.sidebar' ).wrapkitSidebar( 'updateHeight' );
	})
	.on( 'click', '[data-toggle="panel-close"][data-target]', function(e){
		e.preventDefault();

		var target = $( this ).data().target;
		$( target ).wrapkitPanel( 'close' );

		// refresh sidebar height
		$( '.sidebar' ).wrapkitSidebar( 'updateHeight' );
	})
	.on( 'click', '[data-toggle="panel-collapse"][data-target]', function(e){
		e.preventDefault();

		var target = $( this ).data().target,
			collapse = (! $( target ).data().wrapkitPanel.options.collapse );

		$( target ).wrapkitPanel( 'collapse', collapse );

		// refresh sidebar height
		$( '.sidebar' ).wrapkitSidebar( 'updateHeight' );
	})
	.on( 'click', '[data-toggle="panel-refresh"][data-target]', function(e){
		e.preventDefault();

		var target = $( this ).data().target;
		$( target ).wrapkitPanel( 'refresh', true );

		// refresh sidebar height
		$( '.sidebar' ).wrapkitSidebar( 'updateHeight' );
	})
	.on( 'click', '[data-toggle="panel-expand"][data-target]', function(e){
		e.preventDefault();

		var target = $( this ).data().target,
			expand = (! $( target ).data().wrapkitPanel.options.expand );
		$( target ).wrapkitPanel( 'expand', expand );

		// refresh sidebar height
		$( '.sidebar' ).wrapkitSidebar( 'updateHeight' );
	})
	.on( 'click', '[data-toggle="panel-color"][data-target]', function(e){
		e.preventDefault();

		var data = $( this ).data(),
			target = data.target,
			color = data.color;
		$( target ).wrapkitPanel( 'setColor', color );
	});


});

