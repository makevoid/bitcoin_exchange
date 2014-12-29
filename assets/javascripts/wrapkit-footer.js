(function($, window, document, undefined){
	'use strict';


	// WRAPKIT FOOTER OBJECT DEFINITION
	// =================================
	var Footer = {

		init: function( options, elem ){

			var self = this;

			self.elem = elem;
			self.$elem = $( elem );
			self.options = $.extend( {}, $.fn.wrapkitFooter.options, options );

			// set default skin
			self.$elem.addClass( 'footer-' + self.options.skin );

			// set rtl
			if ( self.options.rtlMode ) {
				$( 'body' ).addClass( 'wrapkit-footer-rtl' );

				// floating mirror
				var floatRight = self.$elem.find( '.pull-right' ),
					floatLeft = self.$elem.find( '.pull-left' );

				floatRight.removeClass( 'pull-right' ).addClass( 'pull-left' );
				floatLeft.removeClass( 'pull-left' ).addClass( 'pull-right' );
			} else{

				$( 'body' ).removeClass( 'wrapkit-footer-rtl' );
			}
		},

		// WRAPKIT FOOTER (public) METHOD OBJECT DEFINITION
		 
		option: function( optionName, elem ){
			
			var self = this;

			self.elem = elem;
			self.$elem = $( elem );
			self.options = self.$elem.data().wrapkitFooter.options;

			if( optionName === undefined ){

				return self.options;
			}
			
			return self.options[optionName];
		},

		setSkin: function( skin, elem ){

			var self = this,
				options = { skin: skin };

			self.elem = elem;
			self.$elem = $( elem );

			var dataOptions = self.$elem.data().wrapkitFooter.options,
				oldSkin = dataOptions.skin,
				oldSkinClass = 'footer-' + oldSkin,
				newSkinClass = 'footer-' + skin;

			self.$elem.removeClass( oldSkinClass );
			self.$elem.addClass( newSkinClass );

			self.options = $.extend( {}, dataOptions, options );

			// create callback on setSkin w/ trigger event 
			self.$elem.trigger( 'wrapkit.footer.set.skin', skin );
		},

		rtlMode: function( args, elem ){

			var self = this,
				options = { rtlMode: args },
				$body = $( 'body' );

			self.elem = elem;
			self.$elem = $( elem );

			self.options = $.extend( {}, self.$elem.data().wrapkitFooter.options, options );

			if ( args ) {

				$body.addClass( 'wrapkit-footer-rtl' );
			} else{

				$body.removeClass( 'wrapkit-footer-rtl' );
			}

			// floating mirror
			var floatRight = self.$elem.find( '.pull-right' ),
				floatLeft = self.$elem.find( '.pull-left' );

			floatRight.removeClass( 'pull-right' ).addClass( 'pull-left' );
			floatLeft.removeClass( 'pull-left' ).addClass( 'pull-right' );

			// create callback on rtlMode w/ trigger event 
			self.$elem.trigger( 'wrapkit.footer.set.rtl', args );
		}
	};



	/**
	 * Public Methods interface
	 * Place a method on object below to make it plubic
	 */
	var Methods = {
		option: function() {},
		setSkin: function() {},
		rtlMode: function() {}
	};



	// WRAPKIT FOOTER PLUGIN DEFINITION
	// =================================
	$.fn.wrapkitFooter = function( options, args ){
		// NOTE: args only use to setter method

		if( options === 'option' ){
			var footer = Object.create( Footer );

			return footer[ options ]( args, this );
		} else{
			return this.each(function(){

				var footer = Object.create( Footer ),
					methods = Object.create( Methods );

				if ( typeof options === 'string' ) {
					try{
						if( methods[ options ] === undefined ){
							$.error( 'Method ' +  options + ' does not exist on wrapkitFooter' );
						}else{
							footer[ options ]( args, this );
						}
					}
					catch( e ){
						$.error( e );
					}
				} else if ( typeof options === 'object' || ! options ) {
		            // Default to "init"
		            footer.init( options, this);
				} else {

					$.error( 'Method ' +  options + ' does not exist on wrapkitFooter' );
				}

				$.data( this, 'wrapkitFooter', footer );
			});
		}
	};


	// WRAPKIT FOOTER DEFAULT OPTIONS DEFINITION
	// ==========================================
	$.fn.wrapkitFooter.options = {
		skin: 'whity',				// the header skin color ( 'midwet' alias of inverse, 'whity' alias of default, 'greentur', 'nephem', 'belpet', 'wistam', 'osun', 'pumcar', 'pomeal', 'silc', 'ascon' )
		rtlMode: false				// footer rlt mode
	};

})( jQuery, window, document );