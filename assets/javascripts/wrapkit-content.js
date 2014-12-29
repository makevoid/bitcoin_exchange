(function($, window, document, undefined){
	'use strict';


	// WRAPKIT CONTENT OBJECT DEFINITION
	// =================================
	var Content = {

		init: function( options, elem ){

			var self = this;

			self.elem = elem;
			self.$elem = $( elem );
			self.options = $.extend( {}, $.fn.wrapkitContent.options, options );

			// set default skin
			self.$elem.addClass( 'content-' + self.options.skin );

			// set rtl
			if( self.options.rtlMode ){
				$( 'body' ).addClass( 'wrapkit-content-rtl' );

				// floating mirror
				var floatRight = self.$elem.find( '.pull-right' ),
					floatLeft = self.$elem.find( '.pull-left' );

				floatRight.removeClass( 'pull-right' ).addClass( 'pull-left' );
				floatLeft.removeClass( 'pull-left' ).addClass( 'pull-right' );
			} else{
				// $( 'body' ).removeClass( 'wrapkit-content-rtl' );
			}
		},

		// WRAPKIT CONTENT (public) METHOD OBJECT DEFINITION
		 
		option: function( optionName, elem ){
			
			var self = this;

			self.elem = elem;
			self.$elem = $( elem );
			self.options = self.$elem.data().wrapkitContent.options;

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

			var dataOptions = self.$elem.data().wrapkitContent.options,
				oldSkin = dataOptions.skin,
				oldSkinClass = 'content-' + oldSkin,
				newSkinClass = 'content-' + skin;

			self.$elem.removeClass( oldSkinClass );
			self.$elem.addClass( newSkinClass );

			self.options = $.extend( {}, dataOptions, options );

			// create callback on setSkin w/ trigger event 
			self.$elem.trigger( 'wrapkit.content.set.skin', skin );
		},

		rtlMode: function( args, elem ){

			var self = this,
				options = { rtlMode: args },
				$body = $( 'body' );

			self.elem = elem;
			self.$elem = $( elem );

			self.options = $.extend( {}, self.$elem.data().wrapkitContent.options, options );

			if ( args ) {

				$body.addClass( 'wrapkit-content-rtl' );
			} else{

				$body.removeClass( 'wrapkit-content-rtl' );
			}

			// floating mirror
			var floatRight = self.$elem.find( '.pull-right' ),
				floatLeft = self.$elem.find( '.pull-left' );

			floatRight.removeClass( 'pull-right' ).addClass( 'pull-left' );
			floatLeft.removeClass( 'pull-left' ).addClass( 'pull-right' );

			// create callback on rtlMode w/ trigger event 
			self.$elem.trigger( 'wrapkit.content.set.rtl', args );
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



	// WRAPKIT CONTENT PLUGIN DEFINITION
	// =================================
	$.fn.wrapkitContent = function( options, args ){
		// NOTE: args only use to setter method

		if( options === 'option' ){
			var content = Object.create( Content );

			return content[ options ]( args, this );
		} else{
			return this.each(function(){

				var content = Object.create( Content ),
					methods = Object.create( Methods );

				if ( typeof options === 'string' ) {
					try{
						if( methods[ options ] === undefined ){
							$.error( 'Method ' +  options + ' does not exist on wrapkitContent' );
						}else{
							content[ options ]( args, this );
						}
					}
					catch( e ){
						$.error( e );
					}
				} else if ( typeof options === 'object' || ! options ) {
		            // Default to "init"
		            content.init( options, this);
				} else {

					$.error( 'Method ' +  options + ' does not exist on wrapkitContent' );
				}

				$.data( this, 'wrapkitContent', content );
			});
		}
	};


	// WRAPKIT CONTENT DEFAULT OPTIONS DEFINITION
	// ==========================================
	$.fn.wrapkitContent.options = {
		skin: 'midwet',				// the header skin color ( 'midwet', 'whity', 'greentur', 'nephem', 'belpet', 'wistam', 'osun', 'pumcar', 'pomeal', 'silc', 'ascon' )
		rtlMode: false				// content rtl mode
	};

})( jQuery, window, document );