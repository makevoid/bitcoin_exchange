(function($, window, document, undefined){
	'use strict';


	// WRAPKIT HEADER OBJECT DEFINITION
	// =================================
	var Header = {

		init: function( options, elem ){

			var self = this;

			self.elem = elem;
			self.$elem = $( elem );
			self.options = $.extend( {}, $.fn.wrapkitHeader.options, options );

			// set default skin
			self.$elem.children( '.navbar' ).addClass( 'navbar-' + self.options.skin );

			// set fixed
			if( self.options.fixed ){
				$( 'body' ).addClass( 'wrapkit-header-fixed-' + self.options.fixedPosition );
				self.$elem.children( '.navbar' ).addClass( 'navbar-fixed-' + self.options.fixedPosition );
			} else{
				$( 'body' ).removeClass( 'wrapkit-header-fixed-' + self.options.fixedPosition );
				self.$elem.children( '.navbar' ).removeClass( 'navbar-fixed-' + self.options.fixedPosition );
			}

			// set rtl
			if ( self.options.rtlMode ) {
				$( 'body' ).addClass( 'wrapkit-header-rtl' );

				// floating mirror
				var floatRight = self.$elem.find( '.pull-right' ),
					floatLeft = self.$elem.find( '.pull-left' );

				floatRight.removeClass( 'pull-right' ).addClass( 'pull-left' );
				floatLeft.removeClass( 'pull-left' ).addClass( 'pull-right' );
			} else{

				$( 'body' ).removeClass( 'wrapkit-header-rtl' );
			}
		},

		// WRAPKIT HEADER (public) METHOD OBJECT DEFINITION
		 
		option: function( optionName, elem ){
			
			var self = this;

			self.elem = elem;
			self.$elem = $( elem );
			self.options = self.$elem.data().wrapkitHeader.options;

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

			var dataOptions = self.$elem.data().wrapkitHeader.options,
				$navbar = self.$elem.children( '.navbar' ),
				oldSkin = dataOptions.skin,
				oldSkinClass = 'navbar-' + oldSkin,
				newSkinClass = 'navbar-' + skin;

			$navbar.removeClass( oldSkinClass );
			$navbar.addClass( newSkinClass );

			self.options = $.extend( {}, dataOptions, options );

			// create callback on setSkin w/ trigger event 
			self.$elem.trigger( 'wrapkit.header.set.skin', skin );
		},

		fixed: function( fixed, elem ){

			var self = this,
				options = { fixed: fixed };

			self.elem = elem;
			self.$elem = $( elem );
			self.options = $.extend( {}, self.$elem.data().wrapkitHeader.options, options );

			var fixedPosition = self.options.fixedPosition;

			if( fixed ){
				$( 'body' ).addClass( 'wrapkit-header-fixed-' + fixedPosition );
				self.$elem.children( '.navbar' ).addClass( 'navbar-fixed-' + fixedPosition );
			} else{
				$( 'body' ).removeClass( 'wrapkit-header-fixed-' + fixedPosition );
				self.$elem.children( '.navbar' ).removeClass( 'navbar-fixed-' + fixedPosition );
			}

			// create callback on fixed w/ trigger event 
			self.$elem.trigger( 'wrapkit.header.fixed', fixedPosition );
		},

		fixedTop: function( args, elem ){
			var self = this,
				options = {
					fixed: true,
					fixedPosition: 'top'
				};

			self.elem = elem;
			self.$elem = $( elem );
			self.options = $.extend( {}, self.$elem.data().wrapkitHeader.options, options );

			// remove class fixed bottom
			$( 'body' ).removeClass( 'wrapkit-header-fixed-bottom' );
			$( 'body' ).addClass( 'wrapkit-header-fixed-top' );
			// adding fixed top
			self.$elem.children( '.navbar' ).removeClass( 'navbar-fixed-bottom' );
			self.$elem.children( '.navbar' ).addClass( 'navbar-fixed-top' );

			// create callback on fixedTop w/ trigger event 
			self.$elem.trigger( 'wrapkit.header.fixed.top' );
		},

		fixedBottom: function( args, elem ){
			var self = this,
				options = {
					fixed: true,
					fixedPosition: 'bottom'
				};

			self.elem = elem;
			self.$elem = $( elem );
			self.options = $.extend( {}, self.$elem.data().wrapkitHeader.options, options );

			// remove class fixed top
			$( 'body' ).removeClass( 'wrapkit-header-fixed-top' );
			self.$elem.children( '.navbar' ).removeClass( 'navbar-fixed-top' );
			// adding fixed bottom
			$( 'body' ).addClass( 'wrapkit-header-fixed-bottom' );
			self.$elem.children( '.navbar' ).addClass( 'navbar-fixed-bottom' );
			
			// create callback on fixedBottom w/ trigger event 
			self.$elem.trigger( 'wrapkit.header.fixed.bottom' );
		},

		rtlMode: function( args, elem ){

			var self = this,
				options = { rtlMode: args },
				$body = $( 'body' );

			self.elem = elem;
			self.$elem = $( elem );

			self.options = $.extend( {}, self.$elem.data().wrapkitHeader.options, options );

			if ( args ) {

				$body.addClass( 'wrapkit-header-rtl' );
			} else{

				$body.removeClass( 'wrapkit-header-rtl' );
			}

			// floating mirror
			var floatRight = self.$elem.find( '.pull-right' ),
				floatLeft = self.$elem.find( '.pull-left' );

			floatRight.removeClass( 'pull-right' ).addClass( 'pull-left' );
			floatLeft.removeClass( 'pull-left' ).addClass( 'pull-right' );

			// create callback on rtlMode w/ trigger event 
			self.$elem.trigger( 'wrapkit.header.set.rtl', args );
		}
	};



	/**
	 * Public Methods interface
	 * Place a method on object below to make it plubic
	 */
	var Methods = {
		option: function() {},
		setSkin: function() {},
		fixed: function() {},
		fixedTop: function() {},
		fixedBottom: function() {},
		rtlMode: function() {}
	};



	// WRAPKIT HEADER PLUGIN DEFINITION
	// =================================
	$.fn.wrapkitHeader = function( options, args ){
		// NOTE: args only use to setter method

		if( options === 'option' ){
			var header = Object.create( Header );

			return header[ options ]( args, this );
		} else{
			return this.each(function(){

				var header = Object.create( Header ),
					methods = Object.create( Methods );

				if ( typeof options === 'string' ) {
					try{
						if( methods[ options ] === undefined ){
							$.error( 'Method ' +  options + ' does not exist on wrapkitHeader' );
						}else{
							header[ options ]( args, this );
						}
					}
					catch( e ){
						$.error( e );
					}
				} else if ( typeof options === 'object' || ! options ) {
		            // Default to "init"
		            header.init( options, this);
				} else {

					$.error( 'Method ' +  options + ' does not exist on wrapkitHeader' );
				}

				$.data( this, 'wrapkitHeader', header );
			});
		}
	};


	// WRAPKIT HEADER DEFAULT OPTIONS DEFINITION
	// ==========================================
	$.fn.wrapkitHeader.options = {
		skin: 'whity',				// the header skin color ( 'default' !bootstrap, 'inverse' !bootstrap, 'midwet' alias of inverse, 'whity' alias of default, 'greentur', 'nephem', 'belpet', 'wistam', 'osun', 'pumcar', 'pomeal', 'silc', 'ascon' )
		fixed: false,					// header fixed ( true, false )
		fixedPosition: 'top',			// header position when fixed ( 'top', 'bottom' )
		rtlMode: false					// header rtl mode
	};

})( jQuery, window, document );