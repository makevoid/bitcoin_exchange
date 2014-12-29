(function($, window, document, undefined){
	'use strict';


	// WRAPKIT LAYOUT OBJECT DEFINITION
	// =================================
	var Layout = {

		init: function( options, elem ){

			var self = this;

			self.elem = elem;
			self.$elem = $( elem );
			
			self.options = $.extend( {}, $.fn.wrapkitLayout.options, options );

			// set layout type
			if( self.options.box ){
				self.$elem.addClass( 'container' );
			} else{
				self.$elem.removeClass( 'container' );
			}

			// set fullscreen (that's not possible when document loaded)
			// Keep in mind that the browser will only enter fullscreen when initiated by user events like click, touch, key
			if ( self.options.fullscreen ) {
				self.options.fullscreen = false;
			}
		},

		// WRAPKIT LAYOUT (public) METHOD OBJECT DEFINITION
		 
		option: function( optionName, elem ){
			
			var self = this;

			self.elem = elem;
			self.$elem = $( elem );
			self.options = self.$elem.data().wrapkitLayout.options;

			if( optionName === undefined ){

				return self.options;
			}
			
			return self.options[optionName];
		},

		setFluid: function( args, elem ){
			var self = this;

			self.elem = elem;
			self.$elem = $( elem );

			self.$elem.removeClass( 'container' );

			if( $.fn.wrapkitSidebar ){
				var option = $( '.sidebar' ).wrapkitSidebar( 'option' ),
					fixer = $( '.sidebar' ).hasClass( 'sidebar-fixer' );

				if ( option.fixed && fixer ) {
					if ( option.align === 'right' ) {
						$( '.sidebar' ).css({
							'right' : 0,
							'left' : 'initial'
						});
					} else{
						$( '.sidebar' ).css({
							'left' : 0,
							'right' : 'initial'
						});
					}

				}
			}

			self.options = $.extend( {}, self.$elem.data().wrapkitLayout.options, { box: false } );

			// create callback on setFluid w/ trigger event 
			self.$elem.trigger( 'wrapkit.layout.set.fluid', self.options.box );
		},

		setBox: function( args, elem ){
			var self = this;

			self.elem = elem;
			self.$elem = $( elem );

			self.$elem.addClass( 'container' );

			if( $.fn.wrapkitSidebar ){
				var option = $( '.sidebar' ).wrapkitSidebar( 'option' ),
					fixer = $( '.sidebar' ).hasClass( 'sidebar-fixer' );

				if ( option.fixed && fixer ) {
					if ( option.align === 'right' ) {
						$( '.sidebar' ).css({
							'right' : $( '.wrapkit-wrapper' ).offset().left,
							'left' : 'initial'
						});
					} else{
						$( '.sidebar' ).css({
							'left' : $( '.wrapkit-wrapper' ).offset().left,
							'right' : 'initial'
						});
					}
				} else{
					if ( option.align === 'right' ) {
						$( '.sidebar' ).css({
							'right' : 0,
							'left' : 'initial'
						});
					} else{
						$( '.sidebar' ).css({
							'left' : 0,
							'right' : 'initial'
						});
					}
				}
			}

			self.options = $.extend( {}, self.$elem.data().wrapkitLayout.options, { box: true } );

			// create callback on setBox w/ trigger event 
			self.$elem.trigger( 'wrapkit.layout.set.box', self.options.box );
		},

		toggleLayout: function( args, elem ){

			var self = this;

			self.elem = elem;
			self.$elem = $( elem );

			var options = self.$elem.data().wrapkitLayout.options;

			if ( !options.box ) {
				self.setBox( args, elem );
			} else{
				self.setFluid( args, elem );
			}

			self.options = $.extend( {}, options, { box: !options.box } );

			// create callback on toggleLayout w/ trigger event 
			self.$elem.trigger( 'wrapkit.layout.toggle.layout', self.options.box );
		},

		// depend w/ screenfull.js (https://github.com/sindresorhus/screenfull.js/)
		fullscreen: function( args, elem ){
			var self = this;

			self.elem = elem;
			self.$elem = $( elem );

			if (!screenfull.enabled){
		        alert( 'Your Browser does not support Fullscreen!' );
				self.options = $.extend( {}, self.$elem.data().wrapkitLayout.options, { fullscreen: false } );
		        return false;
		    }

			if ( args ) {
		        screenfull.request();
			} else{
				screenfull.exit();
			}

			self.options = $.extend( {}, self.$elem.data().wrapkitLayout.options, { fullscreen: args } );
		}
	};



	/**
	 * Public Methods interface
	 * Place a method on object below to make it plubic
	 */
	var Methods = {
		option: function() {},
		setFluid: function() {},
		setBox: function() {},
		toggleLayout: function() {},
		fullscreen: function() {}
	};



	// WRAPKIT LAYOUT PLUGIN DEFINITION
	// =================================
	$.fn.wrapkitLayout = function( options, args ){
		// NOTE: args only use to setter method

		if( options === 'option' ){
			var layout = Object.create( Layout );

			return layout[ options ]( args, this );
		} else{
			return this.each(function(){

				var layout = Object.create( Layout ),
					methods = Object.create( Methods );

				if ( typeof options === 'string' ) {
					try{
						if( methods[ options ] === undefined ){
							$.error( 'Method ' +  options + ' does not exist on wrapkitLayout' );
						}else{
							layout[ options ]( args, this );
						}
					}
					catch( e ){
						$.error( e );
					}
				} else if ( typeof options === 'object' || ! options ) {
		            // Default to "init"
					var elem = this;
					layout.init( options, elem);

		            if (screenfull.enabled) {
						$(document).on(screenfull.raw.fullscreenchange, function () {
							$( elem ).data().wrapkitLayout.options.fullscreen = screenfull.isFullscreen;
						});
					}
				} else {

					$.error( 'Method ' +  options + ' does not exist on wrapkitLayout' );
				}

				$.data( this, 'wrapkitLayout', layout );
			});
		}
	};


	// WRAPKIT LAYOUT DEFAULT OPTIONS DEFINITION
	// ==========================================
	$.fn.wrapkitLayout.options = {
		box: false,				// boolean true/false (true mean box and false mean fluid)
		fullscreen: false		// boolean true/false to make layout fullscreen
								// Keep in mind that the browser will only enter fullscreen when initiated by user events like click, touch, key
	};

})( jQuery, window, document );