(function($, window, document, undefined){
	'use strict';


	// WRAPKIT PANEL OBJECT DEFINITION
	// =================================
	var Panel = {

		init: function( options, elem ){

			var self = this;

			self.elem = elem;
			self.$elem = $( elem );

			self.options = $.extend( {}, $.fn.wrapkitPanel.options, options );

			// if collapse
			if( self.options.collapse ){
				self.collapse( true, elem  );
			}
			// expand
			if ( self.options.expand ) {
				self.$elem.addClass( 'panel-expand' );
				$( 'body' ).addClass( 'wrapkit-panel-expand' );
			} else{
				self.$elem.removeClass( 'panel-expand' );
				$( 'body' ).removeClass( 'wrapkit-panel-expand' );
			}

			// color
			if( self.options.color !== 'none' ){
				self.$elem.addClass( 'panel-color-' + self.options.color );
			}
		},

		// WRAPKIT PANEL (public) METHOD OBJECT DEFINITION
		 
		option: function( optionName, elem ){
			
			var self = this;

			self.elem = elem;
			self.$elem = $( elem );
			self.options = self.$elem.data().wrapkitPanel.options;

			if( optionName === undefined ){

				return self.options;
			}
			
			return self.options[optionName];
		},

		remove: function( args, elem ){
			var self = this;

			self.elem = elem;
			self.$elem = $( elem );
			self.options = self.$elem.data().wrapkitPanel.options;

			// create callback on remove w/ trigger event 
			self.$elem.trigger( 'wrapkit.panel.remove' );

			self.$elem.remove();

			if ( self.options.expand ) {
				$( 'body' ).removeClass( 'wrapkit-panel-expand' );
			}

			if ( $.fn.wrapkitSidebar ) {
				$( '.sidebar' ).wrapkitSidebar( 'updateHeight' );
			}
		},

		close: function( args, elem ){

			var self = this;

			self.elem = elem;
			self.$elem = $( elem );

			
			self.options = self.$elem.data().wrapkitPanel.options;

			if( self.options.expand ){
				$( 'body' ).removeClass( 'wrapkit-panel-expand' );
			}

			self.$elem.fadeOut( 300, function(){
				if ( $.fn.wrapkitSidebar ) {
					$( '.sidebar' ).wrapkitSidebar( 'updateHeight' );
				}
				// create callback on close w/ trigger event 
				self.$elem.trigger( 'wrapkit.panel.close' );
			});

		},

		show: function( target, elem ){
			var self = this;

			self.elem = elem;
			self.$elem = $( elem );

			
			self.options = self.$elem.data().wrapkitPanel.options;

			if( self.options.expand ){
				$( 'body' ).addClass( 'wrapkit-panel-expand' );
			}

			self.$elem.fadeIn( 300, function(){
				if ( $.fn.wrapkitSidebar ) {
					$( '.sidebar' ).wrapkitSidebar( 'updateHeight' );
				}
				// create callback on show w/ trigger event 
				self.$elem.trigger( 'wrapkit.panel.show', target );
			});
		},

		collapse: function( args, elem ){

			var self = this;

			self.elem = elem;
			self.$elem = $( elem );

			var panelBody = self.$elem.children( '.panel-body' ),
				panelTable = self.$elem.children( '.table' ),
				panelTableResponsive = self.$elem.children( '.table-responsive' ),
				panelListGroup = self.$elem.children( '.list-group' ),
				panelCollapseElem = self.$elem.children( '.panel-collapse-elem' );

			if ( args ) {
				panelBody.slideUp( 200, function(){
					if ( $.fn.wrapkitSidebar ) {
						$( '.sidebar' ).wrapkitSidebar( 'updateHeight' );
					}
				});
				panelTable.slideUp( 200, function(){
					if ( $.fn.wrapkitSidebar ) {
						$( '.sidebar' ).wrapkitSidebar( 'updateHeight' );
					}
				});
				panelTableResponsive.slideUp( 200, function(){
					if ( $.fn.wrapkitSidebar ) {
						$( '.sidebar' ).wrapkitSidebar( 'updateHeight' );
					}
				});
				panelListGroup.slideUp( 200, function(){
					if ( $.fn.wrapkitSidebar ) {
						$( '.sidebar' ).wrapkitSidebar( 'updateHeight' );
					}
				});
				panelCollapseElem.slideUp( 200, function(){
					if ( $.fn.wrapkitSidebar ) {
						$( '.sidebar' ).wrapkitSidebar( 'updateHeight' );
					}
				});
			} else{
				panelBody.slideDown( 200, function(){
					if ( $.fn.wrapkitSidebar ) {
						$( '.sidebar' ).wrapkitSidebar( 'updateHeight' );
					}
				});
				panelTable.slideDown( 200, function(){
					if ( $.fn.wrapkitSidebar ) {
						$( '.sidebar' ).wrapkitSidebar( 'updateHeight' );
					}
				});
				panelTableResponsive.slideDown( 200, function(){
					if ( $.fn.wrapkitSidebar ) {
						$( '.sidebar' ).wrapkitSidebar( 'updateHeight' );
					}
				});
				panelListGroup.slideDown( 200, function(){
					if ( $.fn.wrapkitSidebar ) {
						$( '.sidebar' ).wrapkitSidebar( 'updateHeight' );
					}
				});
				panelCollapseElem.slideDown( 200, function(){
					if ( $.fn.wrapkitSidebar ) {
						$( '.sidebar' ).wrapkitSidebar( 'updateHeight' );
					}
				});
			}

			var dataOptions = ( self.$elem.data().wrapkitPanel ) ? self.$elem.data().wrapkitPanel.options: $.fn.wrapkitPanel.options;
			self.options = $.extend( {}, dataOptions, { collapse: args } );

			// create callback on collapse w/ trigger event
			setTimeout(function() {
				self.$elem.trigger( 'wrapkit.panel.collapse', self.options.collapse );
			}, 300);
		},

		refresh: function( args, elem ){

			var self = this;

			self.elem = elem;
			self.$elem = $( elem );
			self.options = self.$elem.data().wrapkitPanel.options;

			var template = '<div class="panel-refresh">'+ self.options.loaderTemplate +'</div>',
				panelHeading = self.$elem.children( '.panel-heading' ),
				panelTitle = panelHeading.children( '.panel-title' );

			if ( args ) {
				self.$elem.append( '<div class="panel-refresh-wrapper"></div>' );
				panelHeading.append( template );
				panelTitle.hide();
				// create callback on refresh w/ trigger event 
				self.$elem.trigger( 'wrapkit.panel.refresh', args );
			} else{
				self.$elem.children( '.panel-refresh-wrapper' ).remove();
				panelHeading.children( '.panel-refresh' ).remove();
				panelTitle.fadeIn( 300, function(){
					if ( $.fn.wrapkitSidebar ) {
						$( '.sidebar' ).wrapkitSidebar( 'updateHeight' );
					}
					// create callback on refresh w/ trigger event 
					self.$elem.trigger( 'wrapkit.panel.refresh', args );
				});
			}
		},

		expand: function( args, elem ){
			var self = this;

			self.elem = elem;
			self.$elem = $( elem );
			self.options = self.options = $.extend( {}, self.$elem.data().wrapkitPanel.options, { expand: args } );

			if ( args ) {
				self.$elem.addClass( 'panel-expand' );
				$( 'body' ).addClass( 'wrapkit-panel-expand' );
			} else{
				self.$elem.removeClass( 'panel-expand' );
				$( 'body' ).removeClass( 'wrapkit-panel-expand' );
			}

			// create callback on expand w/ trigger event 
			self.$elem.trigger( 'wrapkit.panel.expand', args );
		},

		setColor: function( color, elem ){
			var self = this;

			self.elem = elem;
			self.$elem = $( elem );

			var dataOptions = self.$elem.data().wrapkitPanel.options,
				oldColor = dataOptions.color,
				oldColorClass = 'panel-color-' + oldColor,
				newColorClass = 'panel-color-' + color;

			if( color === 'none' ){
				self.$elem.removeClass( oldColorClass );
			} else{
				self.$elem.removeClass( oldColorClass );
				self.$elem.addClass( newColorClass );
			}

			self.options = self.options = $.extend( {}, dataOptions, { color: color } );

			// create callback on expand w/ trigger event 
			self.$elem.trigger( 'wrapkit.panel.set.color', color );
		}
	};



	/**
	 * Public Methods interface
	 * Place a method on object below to make it plubic
	 */
	var Methods = {
		option: function() {},
		remove: function() {},
		close: function() {},
		show: function() {},
		collapse: function() {},
		refresh: function() {},
		expand: function() {},
		setColor: function() {}
	};



	// WRAPKIT PANEL PLUGIN DEFINITION
	// =================================
	$.fn.wrapkitPanel = function( options, args ){
		// NOTE: args only use to setter method

		if( options === 'option' ){
			var panel = Object.create( Panel );

			return panel[ options ]( args, this );
		} else{
			return this.each(function(){

				var panel = Object.create( Panel ),
					methods = Object.create( Methods );

				if ( typeof options === 'string' ) {
					try{
						if( methods[ options ] === undefined ){
							$.error( 'Method ' +  options + ' does not exist on wrapkitPanel' );
						}else{
							panel[ options ]( args, this );
						}
					}
					catch( e ){
						$.error( e );
					}
				} else if ( typeof options === 'object' || ! options ) {
		            // Default to "init"
		            var elem = this;
		            panel.init( options, elem);
				} else {

					$.error( 'Method ' +  options + ' does not exist on wrapkitPanel' );
				}

				$.data( this, 'wrapkitPanel', panel );
			});
		}
	};


	// WRAPKIT PANEL DEFAULT OPTIONS DEFINITION
	// ==========================================
	$.fn.wrapkitPanel.options = {
		collapse: false,
		expand: false,
		loaderTemplate: '<i class="fa fa-spin fa-spinner"></i>',
		color: 'none'
	};

})( jQuery, window, document );