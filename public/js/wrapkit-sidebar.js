(function($, window, document, undefined){
	'use strict';


	// WRAPKIT SIDEBAR OBJECT DEFINITION
	// =================================
	var Sidebar = {

		init: function( options, elem ){

			var self = this;

			self.elem = elem;
			self.$elem = $( elem );

			// control to invalid align value
			if( options && options.align && options.align !== 'right' ){
				options.align = 'left';
			}

			self.options = $.extend( {}, $.fn.wrapkitSidebar.options, options );

			// init sidebarLastSize ( helper of options.size on window resize )
			$( document ).data( 'sidebarLastSize', self.options.size );
			// init loader state
			$( document ).data( 'sidebarLoaderState', false );

			// manually set max-height
			self._setHeight( self.$elem );

			// take niceScroll plugin
			// Note: niceScroll call on desktop only
			self._getNiceScroll( self.$elem );

			// set variant
			$( 'body' ).addClass( 'wrapkit-sidebar-variant-' + self.options.variant );
			// set skin
			self.$elem.addClass( 'sidebar-' + self.options.skin );
			// set context
			self.$elem.addClass( 'sidebar-context-' + self.options.contextual );
			
			// set align
			if( self.options.align === 'right' ){
				$( 'body' ).addClass('wrapkit-sidebar-right');
			} else{
				$( 'body' ).removeClass('wrapkit-sidebar-right');
			}

			// set collapse version
			var $header = $( '.header' ),
				$body = $( 'body' );
			$header.find( '.navbar .navbar-toggle' ).attr( 'data-target', self.options.collapseTarget );
			if( self.options.collapseToNavbar === true ){

				// add class .navbar-collapse.collapse
				self.$elem.addClass( 'navbar-collapse collapse' );

				$header.find( '.navbar .navbar-toggle' ).removeClass( 'hide' );
				$body.addClass( 'wrapkit-sidebar-coltonav' );
			}
			else{
				// remove class .navbar-collapse.collapse
				self.$elem.removeClass( 'navbar-collapse collapse' );
				
				$header.find( '.navbar .navbar-toggle' ).addClass( 'hide' );
				$body.removeClass( 'wrapkit-sidebar-coltonav' );
			}

			// rtl mode
			if ( self.options.rtlMode ) {
				$body.addClass( 'wrapkit-sidebar-rtl' );

				// floating mirror
				var floatRight = self.$elem.find( '.pull-right' ),
					floatLeft = self.$elem.find( '.pull-left' );

				floatRight.removeClass( 'pull-right' ).addClass( 'pull-left' );
				floatLeft.removeClass( 'pull-left' ).addClass( 'pull-right' );
			} else{
				$body.removeClass( 'wrapkit-sidebar-rtl' );
			}

			// define the sidebar actions features
			// the private
			self._toggleActionsPane( self.$elem );
			self._onSearchType( self.$elem );

			// the public method must call after init (rule)

			// control on resize (responsive feature's)
			$( window ).resize( function() {

				// calculate max height (again)
				self._setHeight( self.$elem );
			});
		},

		_getNiceScroll: function( $elem ){
			// sidebar-nav
			// selector: sidebar elem but not on small and medium size
			var sidebarNav = $( 'body' ).find( $elem ).find( '.sidebar-nav' );
			
			// call on sidebar resize
			$elem.on('wrapkit.sidebar.resize', function(e, size){

				// here to get current data options
				var dataOptions = $( this ).data().wrapkitSidebar.options;
				
				// use niceScroll only on desktop device
				if( dataOptions.useNiceScroll && ! $.isMobile() ){
					// call only if plugin is exists
					if( $.fn.niceScroll ){

						// only on screen >= screenCollapseMax
						if( $.viewportWidth() >= dataOptions.screenCollapseMax ){
							if ( size === 'lg' ) {
								// define niceScrole
								sidebarNav.niceScroll({
									cursorcolor: 'rgba( 255, 255, 255, .1)',
							        cursorwidth: '10px',
							        cursorborder: '2px solid transparent',
							        cursorborderradius: '6px'
								});

							} else{
								sidebarNav.getNiceScroll().remove();
								sidebarNav.css('overflow', 'visible');
							}
						} else{

							if( !dataOptions.collapseToNavbar ){

								if ( size === 'lg' ) {
									// define niceScrole
									sidebarNav.niceScroll({
										cursorcolor: 'rgba( 255, 255, 255, .1)',
								        cursorwidth: '10px',
								        cursorborder: '2px solid transparent',
								        cursorborderradius: '6px'
									});
								} else{
									sidebarNav.getNiceScroll().remove();
									sidebarNav.css( 'overflow', 'visible' );
								}
							} else{
								sidebarNav.getNiceScroll().remove();
								sidebarNav.css( 'overflow', 'visible' );
							}

							$elem.one('wrapkit.sidebar.set.navbar.collapse', function(e, status){

								if( status && $( this ).hasClass( 'in' ) && $.viewportWidth() < dataOptions.screenCollapseMax ){
									$( this ).collapse('hide');
								}
							});
						}

					} else if( !$.fn.niceScroll && dataOptions.alertNiceScroll ){	// give a feedback to the user or not
						var cNiceScroll = confirm( 'wrapkitSidebar Warning:\njquery.niceScroll.js not found, please include this plugin!\nuse the plugin from cdn?' );

						if ( cNiceScroll ) {

							// Load a script from cdn
							$.getScript( dataOptions.cdnNiceScroll)
							.done(function( script, textStatus ) {

								// if successful take the script
								if( textStatus === 'success' ){

									// only on screen >= screenCollapseMax
									if( $.viewportWidth() >= dataOptions.screenCollapseMax ){
										if ( size === 'lg' ) {
											// define niceScrole
											sidebarNav.niceScroll({
												cursorcolor: 'rgba( 255, 255, 255, .1)',
										        cursorwidth: '10px',
										        cursorborder: '2px solid transparent',
										        cursorborderradius: '6px'
											});

										} else{
											sidebarNav.getNiceScroll().remove();
											sidebarNav.css('overflow', 'visible');
										}
									} else{

										if( !dataOptions.collapseToNavbar ){

											if ( size === 'lg' ) {
												// define niceScrole
												sidebarNav.niceScroll({
													cursorcolor: 'rgba( 255, 255, 255, .1)',
											        cursorwidth: '10px',
											        cursorborder: '2px solid transparent',
											        cursorborderradius: '6px'
												});
											} else{
												sidebarNav.getNiceScroll().remove();
												sidebarNav.css( 'overflow', 'visible' );
											}
										} else{
											sidebarNav.getNiceScroll().remove();
											sidebarNav.css( 'overflow', 'visible' );
										}

										$elem.one('wrapkit.sidebar.set.navbar.collapse', function(e, status){

											if( status && $( this ).hasClass( 'in' ) && $.viewportWidth() < dataOptions.screenCollapseMax ){
												$( this ).collapse('hide');
											}
										});
									}
								} else{
									alert( textStatus );
								}
							})
							.fail(function( jqxhr, settings, exception ) {
								alert( exception + ':\njquery.niceScroll not found on cdn, please used a valid cdn to cdnNiceScroll on wrapkitSidebar.options!' );
							});
						}
					}

				}

			});
			
			// controll when collapseToNavbar change
			$elem.on( 'shown.bs.collapse', function(){
				var dataOptions = $( this ).data().wrapkitSidebar.options;

				if( sidebarNav.getNiceScroll().length > 0 && dataOptions.collapseToNavbar ){
					sidebarNav.getNiceScroll().remove();
					sidebarNav.css( 'overflow', 'visible' );
				}
			});
		},

		_toggleActionsPane: function( $elem ){

			$( document ).on( 'click', '[data-toggle="sidebar-actions"]', function(e){
				e.preventDefault();

				var $this = $(this),
					target = $this.attr('href');

				$(' .sidebar-actions-pane ').removeClass('active');
				$(target).addClass('active').find('input:text').first().focus();

				// create callback _toggleActionsPane w/ trigger event 
				$elem.trigger('wrapkit.sidebar.toggle.actions.pane', $(target));
			});
		},

		_onSearchType: function( $elem ){

			$( document ).on('focus', '.sidebar-form-search input:text', function(){
				$('.sidebar-actions').addClass('open');

				// create callback _onSearchType w/ trigger event 
				$elem.trigger('wrapkit.sidebar.toggle.search.focus', $(this));
			})
			.on('blur', '.sidebar-form-search input:text', function(){
				$('.sidebar-actions').removeClass('open');

				$(' .sidebar-actions-pane ').removeClass('active')
				.first().addClass('active');

				// create callback _onSearchType w/ trigger event 
				$elem.trigger('wrapkit.sidebar.toggle.search.blur', $(this));
			});
		},

		/**
		 * Set max height of .sidebar-nav
		 * @param { element } $elem [the sidebar element]
		 */
		_setHeight: function( $elem ){
			var header = 51,				// 51 is header height + 1px border
				footer = 40,				// 40 is footer height
				actions = ( $('.sidebar-actions').length > 0 ) ? 40 : 0 ,
				space = ( $('.sidebar-actions').length > 0 ) ? ( header + footer + actions ) : ( footer + actions ),
				fixed = ( this.options ) ? this.options.fixed : $elem.data().wrapkitSidebar.options.fixed,
				size = ( this.options ) ? this.options.size : $elem.data().wrapkitSidebar.options.size;

			if( fixed ){
				space = space + 10;	// 10 is empty space
				if ( $( 'body' ).hasClass('wrapkit-header-fixed-top') || $( 'body' ).hasClass('wrapkit-header-fixed-bottom') ) {
					space += header;
				}

				$elem.find('.sidebar-nav').css({
					'max-height': ( screen.availHeight - space ) + 'px'
				});
			} else{
				space = space - header;

				if( size === 'hidden' ){
					// make delay to wait position changed from fixed to absolute
					setTimeout(function(){
						$elem.find('.sidebar-nav').css({
							'max-height': ( $elem.innerHeight() - space ) + 'px'
						});
					}, 300);
				} else{
					$elem.find('.sidebar-nav').css({
						'max-height': ( $elem.innerHeight() - space ) + 'px'
					});
				}
			}
		},

		/**
		 * find every caret on nav item child
		 * @param  { element } elem [the sidebar element]
		 * @return { element }      [the carets element]
		 */
		_findCaret: function( $elem ){
			return $elem.find( '[data-toggle="nav-item-child"] .caret' );
		},

		/**
		 * toggle sidebar nav items caret
		 * @param  { element } $elem [the nav items child element data toggle]
		 * @param  { object } caret [icon collapse and icon open]
		 */
		_toggleCaretIcon: function( $elem, caret ){
			$elem.toggleClass( caret.iconCollapse );
			$elem.toggleClass( caret.iconOpen );
		},

		/**
		 * toggle sidebar nav items
		 * @return { event and string } trigger ['wrapkit.sidebar.toggle.item', status]
		 */
		_toggleNavItem: function( $elem, carets, isHover ){
			var self = this,
				options = $elem.data().wrapkitSidebar.options,
				status;

			var navItemToggle = $elem.find('li.nav-item > [data-toggle="nav-item-child"]'),
				navItemToggleChild = $elem.find('li:not(".nav-item") > [data-toggle="nav-item-child"]');

			// kill exists event itemToggle
			navItemToggle.off( 'click' );
			navItemToggle.parent().off( 'mouseenter mouseleave' );
			navItemToggleChild.off( 'click' );

			// On level 1 && only on sidebar lg (normal)
			if( isHover ){

				// it use on sm/md mode
				navItemToggle.parent().on({
					mouseenter: function(){
						var navItem = $(this);

						// toggle class open
						navItem.addClass('open');

						// set the current status
						status = ( navItem.hasClass('open') ) ? 'open' : 'collapse';

						// create callback _toggleNavItem w/ trigger event 
						$elem.trigger('wrapkit.sidebar.toggle.item', status);
					},
					mouseleave: function(){
						var navItem = $(this);

						// toggle class open
						navItem.removeClass('open');

						// set the current status
						status = ( navItem.hasClass('open') ) ? 'open' : 'collapse';

						// create callback _toggleNavItem w/ trigger event 
						$elem.trigger('wrapkit.sidebar.toggle.item', status);
					}
				});
			} else{
				navItemToggle.on( 'click', function(e){
					e.preventDefault();

					var navItem = $(this).parent(),
						$caret = $(this).children('.caret');

					// toggle caret icon
					self._toggleCaretIcon( $caret, carets.caret );
					// toggle slide
					navItem.children( '.nav-item-child' ).slideToggle( options.animateDuration, function(){
						// toggle class open
						navItem.toggleClass('open');

						// set the current status
						status = ( navItem.hasClass('open') ) ? 'open' : 'collapse';

						// create callback _toggleNavItem w/ trigger event 
						$elem.trigger('wrapkit.sidebar.toggle.item', status);
					});
				});
			}
			
			// On level > 1 (child item)
			navItemToggleChild.on( 'click', function(e){
				e.preventDefault();

				var navItem = $(this).parent(),
					$caret = $(this).children('.caret');

				// toggle caret icon
				self._toggleCaretIcon( $caret, carets.caretChild );
				// toggle slide
				navItem.children( '.nav-item-child' ).slideToggle( options.animateDuration, function(){
					// toggle class open
					navItem.toggleClass('open');

					// set the current status
					status = ( navItem.hasClass('open') ) ? 'open' : 'collapse';

					// create callback _toggleNavItem w/ trigger event 
					$elem.trigger('wrapkit.sidebar.toggle.item.child', status);
				});
			});
		},

		_liveResizable: function( $elem, options ){

			var handles = ( options.align === 'right' ) ? 'w' : 'e';
			// init live resizable
			$elem.resizable({
				maxWidth: options.maxLiveResizable,
				minWidth: options.minLiveResizable,
				handles: handles
			})
			.on( 'resizestart', function() {

				$( this ).addClass( 'resizestart' );
			})
			.on( 'resizestop', function() {

				$( this ).removeClass( 'resizestart' );
			})
			.on( 'resize', function( e, ui ) {

				var size = ui.size,
					$dependElems = $( '.content-wrapper, .footer-wrapper' ),
					dataOptions = $elem.data().wrapkitSidebar.options;

				if( dataOptions.align === 'right' ){

					$dependElems.css({
						'padding-right' : size.width + 'px'
					});
				} else{

					$dependElems.css({
						'padding-left' : size.width + 'px'
					});
				}
			});
		},


		// WRAPKIT SIDEBAR (public) METHOD OBJECT DEFINITION
		 
		option: function( optionName, elem ){
			
			var self = this;

			self.elem = elem;
			self.$elem = $( elem );
			self.options = self.$elem.data().wrapkitSidebar.options;

			if( optionName === undefined ){

				return self.options;
			}
			
			return self.options[optionName];
		},

		updateHeight: function( args, elem ){

			var self = this;

			self.elem = elem;
			self.$elem = $( elem );
			self.options = self.$elem.data().wrapkitSidebar.options;

			// calculate max height (again)
			self._setHeight( self.$elem );

			// create callback on setSkin w/ trigger event 
			self.$elem.trigger( 'wrapkit.sidebar.set.height' );
		},

		setSkin: function( skin, elem ){

			var self = this,
				options = { skin: skin };

			self.elem = elem;
			self.$elem = $( elem );

			var dataOptions = self.$elem.data().wrapkitSidebar.options,
				oldSkin = dataOptions.skin,
				oldSkinClass = 'sidebar-' + oldSkin,
				newSkinClass = 'sidebar-' + skin;

			self.$elem.removeClass( oldSkinClass );
			self.$elem.addClass( newSkinClass );

			self.options = $.extend( {}, dataOptions, options );

			// create callback on setSkin w/ trigger event 
			self.$elem.trigger( 'wrapkit.sidebar.set.skin', skin );
		},

		setVariant: function( variant, elem ){

			var self = this,
				options = { variant: variant };

			self.elem = elem;
			self.$elem = $( elem );

			var dataOptions = self.$elem.data().wrapkitSidebar.options,
				oldVariant = dataOptions.variant,
				oldVariantClass = 'wrapkit-sidebar-variant-' + oldVariant,
				newVariantClass = 'wrapkit-sidebar-variant-' + variant;

			$( 'body' ).removeClass( oldVariantClass );
			$( 'body' ).addClass( newVariantClass );

			self.options = $.extend( {}, dataOptions, options );

			// create callback on setVariant w/ trigger event 
			self.$elem.trigger( 'wrapkit.sidebar.set.variant', variant );
		},

		setContext: function(  contextual, elem  ){

			var self = this,
				options = { contextual: contextual };

			self.elem = elem;
			self.$elem = $( elem );

			var dataOptions = self.$elem.data().wrapkitSidebar.options,
				oldContext = dataOptions.contextual,
				oldContextClass = 'sidebar-context-' + oldContext,
				newContextClass = 'sidebar-context-' + contextual;

			self.$elem.removeClass( oldContextClass );
			self.$elem.addClass( newContextClass );

			self.options = $.extend( {}, dataOptions, options );

			// create callback on setContext w/ trigger event 
			self.$elem.trigger( 'wrapkit.sidebar.set.context', contextual );
		},

		fixed: function( fixed, elem ){

			var self = this,
				options = { fixed: fixed };

			self.elem = elem;
			self.$elem = $( elem );
			self.options = $.extend( {}, self.$elem.data().wrapkitSidebar.options, options );


			if( fixed ){

				if( $( window ).scrollTop() > $( '.header' ).innerHeight() ){

					$( 'body' ).addClass( 'wrapkit-sidebar-fixed' );
					self.$elem.addClass( 'sidebar-fixer' );

					if ( $( '.wrapkit-wrapper' ).hasClass( 'container' ) ) {
							
						if( self.options.align === 'left' ){
							self.$elem.css({
								'left' : $( '.wrapkit-wrapper' ).offset().left,
								'right' : 'initial'
							});
						} else{
							self.$elem.css({
								'right' : $( '.wrapkit-wrapper' ).offset().left,
								'left' : 'initial'
							});
						}
					}
				} else{
					
					$( 'body' ).removeClass( 'wrapkit-sidebar-fixed' );
					self.$elem.removeClass( 'sidebar-fixer' );

					if ( $( '.wrapkit-wrapper' ).hasClass( 'container' ) ) {
							
						if( self.options.align === 'left' ){
							self.$elem.css({
								'left' : 0,
								'right' : 'initial'
							});
						} else{
							self.$elem.css({
								'right' : 0,
								'left' : 'initial'
							});
						}
					}
				}

				$( window ).on( 'scroll', function(){

					var $this = $( this ),
						sincValue = $( '.header' ).innerHeight(),
						scrollTop = $this.scrollTop(),
						dataOptions = self.$elem.data().wrapkitSidebar.options;

					if ( scrollTop > sincValue ) {

						$( 'body' ).addClass( 'wrapkit-sidebar-fixed' );
						self.$elem.addClass( 'sidebar-fixer' );

						if ( $( '.wrapkit-wrapper' ).hasClass( 'container' ) ) {
							// set element offset
							if( dataOptions.align === 'left' ){
								self.$elem.css({
									'left' : $( '.wrapkit-wrapper' ).offset().left,
									'right' : 'initial'
								});
							} else{
								self.$elem.css({
									'right' : $( '.wrapkit-wrapper' ).offset().left,
									'left' : 'initial'
								});
							}
						}
					} else{

						$( 'body' ).removeClass( 'wrapkit-sidebar-fixed' );
						self.$elem.removeClass( 'sidebar-fixer' );

						if ( $( '.wrapkit-wrapper' ).hasClass( 'container' ) ) {
							// set element offset
							if( dataOptions.align === 'left' ){
								self.$elem.css({
									'left' : 0,
									'right' : 'initial'
								});
							} else{
								self.$elem.css({
									'right' : 0,
									'left' : 'initial'
								});
							}
						}
					}
				});

			} else{
				
				$( 'body' ).removeClass( 'wrapkit-sidebar-fixed' );
				self.$elem.removeClass( 'sidebar-fixer' );

				if ( $( '.wrapkit-wrapper' ).hasClass( 'container' ) ) {
					
					// set element offset
					if( self.options.align === 'left' ){
						self.$elem.css({
							'left' : 0,
							'right' : 'initial'
						});
					} else{
						self.$elem.css({
							'right' : 0,
							'left' : 'initial'
						});
					}
				}

				// kill scroll fn
				$( window ).off( 'scroll' );
			}

			// calculate max height (again)
			self._setHeight( self.$elem );

			// create callback on toggle fixed w/ trigger event 
			self.$elem.trigger( 'wrapkit.sidebar.fixed', fixed );
		},

		rtlMode: function( args, elem ){

			var self = this,
				options = { rtlMode: args },
				$body = $( 'body' );

			self.elem = elem;
			self.$elem = $( elem );

			self.options = $.extend( {}, self.$elem.data().wrapkitSidebar.options, options );

			if ( args ) {

				$body.addClass( 'wrapkit-sidebar-rtl' );
			} else{

				$body.removeClass( 'wrapkit-sidebar-rtl' );
			}

			// floating mirror
			var floatRight = self.$elem.find( '.pull-right' ),
				floatLeft = self.$elem.find( '.pull-left' );

			floatRight.removeClass( 'pull-right' ).addClass( 'pull-left' );
			floatLeft.removeClass( 'pull-left' ).addClass( 'pull-right' );

			// create callback on rtlMode w/ trigger event 
			self.$elem.trigger( 'wrapkit.sidebar.set.rtl', args );
		},
		
		setAlign: function( align, elem ){
			var self = this;

			self.elem = elem;
			self.$elem = $( elem );

			if ( align !== 'left' && align !== 'right' ) {
				align = 'left';
			}

			var options = { align: align };

			self.options = $.extend( {}, self.$elem.data().wrapkitSidebar.options, options );

			if( align === 'right' ){
				$( 'body' ).addClass('wrapkit-sidebar-right');

				// set element offset
				if ( $( '.wrapkit-wrapper' ).hasClass( 'container' ) && self.$elem.hasClass( 'sidebar-fixer' ) && self.options.fixed ) {

					self.$elem.css({
						'right' : $( '.wrapkit-wrapper' ).offset().left,
						'left' : 'initial'
					});
				} else{

					self.$elem.css({
						'right': 0,
						'left': 'initial'
					});
				}


			} else{
				$( 'body' ).removeClass('wrapkit-sidebar-right');
				// set element offset
				if ( $( '.wrapkit-wrapper' ).hasClass( 'container' ) && self.$elem.hasClass( 'sidebar-fixer' ) && self.options.fixed ) {

					self.$elem.css({
						'right' : 'initial',
						'left' : $( '.wrapkit-wrapper' ).offset().left
					});
				} else{

					self.$elem.css({
						'right': 'initial',
						'left': 0
					});
				}
			}

			// create callback on setAlign w/ trigger event 
			self.$elem.trigger( 'wrapkit.sidebar.set.align', align );
		},

		toggleAlign: function( args, elem ){
			var self = this;

			self.elem = elem;
			self.$elem = $( elem );

			var align = self.$elem.data().wrapkitSidebar.options.align;

			if ( align === 'right' ){
				self.setAlign( 'left', self.elem );
				align = { align: 'left' };
			} else{
				self.setAlign( 'right', self.elem );
				align = { align: 'right' };
			}

			self.options = $.extend( {}, self.$elem.data().wrapkitSidebar.options, align );
		},

		liveResizable: function( args, elem ){

			var self = this;

			self.elem = elem;
			self.$elem = $( elem );

			if ( args ) {

				if ( jQuery.ui ) {
					var dataOptions = self.$elem.data().wrapkitSidebar.options;
					
					if ( dataOptions.size === 'lg' ) {
						self._liveResizable( self.$elem, dataOptions );
					}
					
					self.$elem.on( 'wrapkit.sidebar.resize', function(e, size){

						var dataOptions = $( this ).data().wrapkitSidebar.options,
							helperClass = 'sidebar-helper-lg sidebar-helper-md sidebar-helper-sm sidebar-helper-hidden';

						// normalize class before do something
						self.$elem.removeClass( helperClass );

						if ( size === 'lg' && dataOptions.liveResizable ) {


							if( $.viewportWidth() < dataOptions.screenCollapseMax && dataOptions.collapseToNavbar ){

								if( self.$elem.is('.ui-resizable') ){

									self.$elem.resizable( 'destroy' );
								}
							} else{

								if( !self.$elem.is('.ui-resizable') ){

									self._liveResizable( self.$elem, dataOptions );
								}
							}
					
							// add helper class
							self.$elem.addClass( 'sidebar-helper-lg' );
						} else{
							
							if( self.$elem.is('.ui-resizable') ){

								self.$elem.resizable( 'destroy' );
							}

							// restore default style w/ sidebar helper class
							if( size === 'md' ){

								self.$elem.addClass( 'sidebar-helper-md' );
							} else if( size === 'sm' ){

								self.$elem.addClass( 'sidebar-helper-sm' );
							} else if( size === 'hidden' ){

								self.$elem.addClass( 'sidebar-helper-hidden' );
							}
						}

						// restore wrapper content & footer
						var $dependElems = $( '.content-wrapper, .footer-wrapper' );
						if ( $.viewportWidth() < dataOptions.screenCollapseMax && dataOptions.collapseToNavbar ) {

							$dependElems.css( 'padding', 0 );
						} else{
							
							$dependElems.css( 'padding', 0 );

							if( size !== 'hidden' ){

								if( dataOptions.align === 'right' ){

									$dependElems.css( 'padding-right', self.$elem.width() + 'px' );
								} else{

									$dependElems.css( 'padding-left', self.$elem.width() + 'px' );
								}
							}
						}
					});

					self.$elem.on( 'wrapkit.sidebar.set.navbar.collapse', function(e, status){

						var dataOptions = self.$elem.data().wrapkitSidebar.options,
							$dependElems = $( '.content-wrapper, .footer-wrapper' );

						if( $.viewportWidth() < dataOptions.screenCollapseMax && status ){

							if( self.$elem.is('.ui-resizable') ){

								self.$elem.resizable( 'destroy' );
							}

							// restore wrapper content
							$dependElems.css({
								'padding-left': 0,
								'padding-right': 0
							});
						}
					});

					self.$elem.on( 'wrapkit.sidebar.set.align', function(e, align){

						var dataOptions = self.$elem.data().wrapkitSidebar.options,
							$dependElems = $( '.content-wrapper, .footer-wrapper' );

						$dependElems.css( 'padding', 0 );

						if( dataOptions.size !== 'hidden' ){
							if( align === 'right' ){

								if( self.$elem.is('.ui-resizable') ){

									self.$elem.resizable( 'option', 'handles', 'w' )
									.find( '.ui-resizable-e' )
									.removeClass( 'ui-resizable-e' )
									.addClass( 'ui-resizable-w' );
								}

								// self.$elem.css( 'right', 0 );

								if ( $.viewportWidth() >= dataOptions.screenCollapseMax || ($.viewportWidth() < dataOptions.screenCollapseMax && !dataOptions.collapseToNavbar) ){
									$dependElems.css( 'padding-right', self.$elem.width() + 'px' );
								}
							} else{

								if( self.$elem.is('.ui-resizable') ){

									self.$elem.resizable( 'option', 'handles', 'e' )
									.find( '.ui-resizable-w' )
									.removeClass( 'ui-resizable-w' )
									.addClass( 'ui-resizable-e' );
								}

								// self.$elem.css( 'left', 0 );

								if ( $.viewportWidth() >= dataOptions.screenCollapseMax || ($.viewportWidth() < dataOptions.screenCollapseMax && !dataOptions.collapseToNavbar) ){
									$dependElems.css( 'padding-left', self.$elem.width() + 'px' );
								}
							}
						}
					});

				} else{

					console.log( 'jQuery UI not found! liveResizable feature is now turned off!' );
				}
			} else{

				if( jQuery.ui ){

					if( self.$elem.is('.ui-resizable') ){

						self.$elem.resizable( 'destroy' );
					}
				} else{

					console.log( 'jQuery UI not found! liveResizable feature is now turned off!' );
				}
			}

			self.options = $.extend( {}, self.$elem.data().wrapkitSidebar.options, { liveResizable: args } );

			// create callback on disabledLiveResizable w/ trigger event 
			self.$elem.trigger('wrapkit.sidebar.liveResizable', args);
		},

		resize: function( size, elem ){

			var self = this;

			self.elem = elem;
			self.$elem = $( elem );

			// if not lg
			if ( size !== 'lg' ){
				self.collapseAll( true, self.elem );
			}

			var dataOptions = self.$elem.data().wrapkitSidebar.options;

			// only allow lg and hidden size on screenWidth < screenCollapseMax
			if( dataOptions.collapseToNavbar ){
				size = ( $.viewportWidth() < dataOptions.screenCollapseMax && ( size === 'md' || size === 'sm' ) ) ? 'lg' : size;
			}

			if( $.viewportWidth() >= dataOptions.screenCollapseMax ){
				$( document ).data( 'sidebarLastSize', size );	// save the last size on large screen
			}
			
			var options = { size: size };

			var classPrefix = dataOptions.sizeClassPrefix,
				$body = $( 'body' ),
				posibleClass = classPrefix + '-' + 'hidden' + ' ' + classPrefix + '-' + 'lg' + ' ' + classPrefix + '-' + 'md' + ' ' + classPrefix + '-' + 'sm';

			$body.removeClass( posibleClass );	// normalize the body class
			$body.addClass( classPrefix + '-' + size); // adding request size

			// define _toggleNavItem again to refresh it with new size (about event hover/click)
			var carets = {
					caret: dataOptions.caret,
					caretChild: dataOptions.caretChild
				},
				isHover = ( options.size === 'md' || options.size === 'sm' );
			self._toggleNavItem( self.$elem, carets, isHover );

			// set max height
			// calculate max height (again)
			self._setHeight( self.$elem );

			self.options = $.extend( {}, dataOptions, options );

			// create callback on resize w/ trigger event 
			self.$elem.trigger('wrapkit.sidebar.resize', size);

			return options; // return current size obj
		},

		toggleSize: function( args, elem ){
			var self = this;
			self.elem = elem;
			self.$elem = $( elem );

			var dataOptions = self.$elem.data().wrapkitSidebar.options,
				options;

			if( $.viewportWidth() < dataOptions.screenCollapseMax && dataOptions.collapseToNavbar ){
				if( dataOptions.size === 'lg' ){
					options = self.resize( 'hidden', self.elem );
				} else{
					options = self.resize( 'lg', self.elem );
				}
			} else{
				if( dataOptions.size === 'md' ){
					options = self.resize( 'sm', self.elem );
				} else if( dataOptions.size === 'sm' ){
					options = self.resize( 'hidden', self.elem );
				} else if( dataOptions.size === 'hidden' ){
					options = self.resize( 'lg', self.elem );
				} else{
					options = self.resize( 'md', self.elem );
				}
			}

			self.options = $.extend( {}, dataOptions, options );
		},

		collapseToNavbar: function( args, elem ){
			var self = this,
				options = { collapseToNavbar: args },
				$body = $( 'body' ),
				$header = $( '.header' ),
				size;

			self.elem = elem;
			self.$elem = $( elem );

			var dataOptions = self.$elem.data().wrapkitSidebar.options;

			if ( args ) {
				// add class .navbar-collapse.collapse
				self.$elem.addClass( 'navbar-collapse collapse' );

				// normalize size to lg/lastLarge w/ detect screen size
				if( $.viewportWidth() < dataOptions.screenCollapseMax ){
					size = self.resize( 'lg', self.elem );
				}
				options = $.extend( options, size );	// extend to include for update data

				$header.find( '.navbar .navbar-toggle' ).removeClass( 'hide' );
				$body.addClass( 'wrapkit-sidebar-coltonav' ); // adding wrapkit sidebar collapseToNavbar selector
			} else{
				// remove class .navbar-collapse.collapse
				self.$elem.removeClass( 'navbar-collapse collapse' );

				// normalize size to hidden/lastLarge w/ detect screen size
				if( $.viewportWidth() < dataOptions.screenCollapseMax ){
					size = self.resize( 'hidden', self.elem );
				}
				options = $.extend( options, size );	// extend to include for update data
				
				$header.find( '.navbar .navbar-toggle' ).addClass( 'hide' );
				$body.removeClass( 'wrapkit-sidebar-coltonav' ); // remove wrapkit sidebar collapseToNavbar selector

				// normalize height ( because bootstrap collapse menu make the element height = 1 )
				self.$elem.css( 'height', 'initial' );
			}

			self.options = $.extend( {}, dataOptions, options );

			// create callback on collapseToNavbar w/ trigger event 
			self.$elem.trigger( 'wrapkit.sidebar.set.navbar.collapse', self.options.collapseToNavbar );
		},

		/**
		 * Set caret icon on ech
		 * @param { string or object } caretIcon [define options caret]
		 * @param { element } elem [The $.wrpakitSidebar element]
		 * @return { event and object } trigger ['wrapkit.sidebar.set.caret', caret]
		 */
		setCaretIcon: function( caretIcon, elem ){
			var self = this,
				options,
				$caret = self._findCaret( $( elem ) );

			if( typeof caretIcon === 'string' ){
				options = {
					caret: {
						iconCollapse: caretIcon,
						iconOpen: caretIcon
					}
				};
			} else{

				if( typeof caretIcon.caret === 'undefined' && typeof caretIcon.caretChild === 'undefined' ){
					options = { caret: caretIcon };
				} else{
					options = caretIcon;
				}
			}

			self.elem = elem;
			self.$elem = $( elem );

			self.options = $.extend( {}, self.$elem.data().wrapkitSidebar.options, options );

			$caret.each(function(){
				var navItem = $(this).parent().parent(),
					caret = ( navItem.hasClass( 'nav-item' ) ) ? self.options.caret : self.options.caretChild;

				if( navItem.hasClass( 'open' ) ){
					$( this ).setClass( 'caret ' + caret.iconOpen );
				} else{
					$( this ).setClass( 'caret ' + caret.iconCollapse );
				}
			});

			// define _toggleNavItem again to refresh it with new caret
			var carets = {
					caret: self.options.caret,
					caretChild: self.options.caretChild
				},
				isHover = ( self.options.size === 'md' || self.options.size === 'sm'  );
			self._toggleNavItem( self.$elem, carets, isHover );

			// create callback on set caret icon
			self.$elem.trigger('wrapkit.sidebar.set.caret', options );
		},

		/**
		 * Collapse all nav items
		 * @param  { null } args [just required for plugin rule, set to null]
		 * @param  { element } elem [description]
		 * @return { event and array } trigger ['wrapkit.sidebar.collapse.all', items]
		 */
		collapseAll: function( args, elem ){
			var self = this;

			self.elem = elem;
			self.$elem = $( elem );
			self.options = self.$elem.data().wrapkitSidebar.options;

			var itemsOpen = self.$elem.find( 'li.open' ),
				isItemsOpen = ( itemsOpen.length > 0 ) ? true : false;

			if( isItemsOpen ){

				var caretOpen = itemsOpen.children( 'a').children('.caret' );	// select caret (!only) on open item

				caretOpen.each( function(){
					var navItem = $(this).parent().parent(),
						caret = ( navItem.hasClass( 'nav-item' ) ) ? self.options.caret : self.options.caretChild;

					// toggle caret icon
					// self._toggleCaretIcon( $(this), caret );
					$( this ).removeClass( caret.iconOpen )
						.addClass( caret.iconCollapse );
				});

				// collapse all nav item
				self.$elem.find( '.nav-item-child' ).slideUp( self.options.animateDuration );
				// remove class open
				itemsOpen.removeClass('open');

				// create callback collapseAll w/ trigger event 
				self.$elem.trigger('wrapkit.sidebar.collapse.all', [itemsOpen] );
			}
		},

		setLoader: function( loader, elem ){

			var self = this,
				options = { loader: loader };

			self.elem = elem;
			self.$elem = $( elem );

			self.options = $.extend( {}, self.$elem.data().wrapkitSidebar.options, options );

			self.$elem.trigger( 'wrapkit.sidebar.set.loader', loader );
		},

		loader: function( args, elem ){

			var self = this;

			self.elem = elem;
			self.$elem = $( elem );

			var dataOptions = self.$elem.data().wrapkitSidebar.options,
				target = ( dataOptions.size === 'hidden' ) ? self.$elem.find( '.sidebar-actions' ) : self.$elem.find( 'li.active' ),
				loaderHeight = target.children( 'a' ).innerHeight() + 'px',
				loader = '<div class="nav-item-loader" style="height: '+ loaderHeight +'" ><i class="'+ dataOptions.loader +'"></i></div>';

			if( target.length > 1 && dataOptions.size === 'lg' ){

				if( target.first().hasClass( 'open' ) ){
					target = target.last();
				} else{
					target = target.first();
				}
			} else{
				target = target.first();
			}

			if( args ){

				if( !target.hasClass( 'loader-state' ) ){

					target.addClass( 'loader-state' );

					target.prepend( loader );
				}

				$( document ).data( 'sidebarLoaderState', true );

				// create callback loader w/ trigger event 
				self.$elem.trigger( 'wrapkit.sidebar.show.loader' );
			} else{

				self.$elem.find( '.nav-item-loader' ).fadeOut( 'slow', function(){

					self.$elem.find( '.loader-state' ).removeClass( 'loader-state' );
					$( this ).remove();
				});

				$( document ).data( 'sidebarLoaderState', false );

				// create callback loader w/ trigger event 
				self.$elem.trigger( 'wrapkit.sidebar.hide.loader' );
			}

			self.$elem.on( 'wrapkit.sidebar.resize', function(e, size){

				var itemLoader = self.$elem.find( '.nav-item-loader' ),
					updateHeight = target.children( 'a' ).innerHeight() + 'px';

				target = ( size === 'hidden' ) ? self.$elem.find( '.sidebar-actions' ) : self.$elem.find( 'li.nav-item.active' );

				if( itemLoader.length ){

					itemLoader.prependTo( target );

					if( size === 'hidden' ){

						itemLoader.css( 'height', 'initial' );
					} else{

						itemLoader.css( 'height', updateHeight );
					}
				}
			});

			self.options = self.$elem.data().wrapkitSidebar.options;
		}
	};


	/**
	 * Public Methods interface
	 * Place a method on object below to make it plubic
	 */
	var Methods = {
		option: function() {},
		updateHeight: function() {},
		setSkin: function() {},
		setVariant: function() {},
		setContext: function() {},
		rtlMode: function() {},
		setAlign: function() {},
		toggleAlign: function() {},
		resize: function() {},
		toggleSize: function() {},
		setCaretIcon: function() {},
		collapseAll:  function() {},
		collapseToNavbar:  function() {},
		liveResizable: function() {},
		setLoader: function() {},
		loader: function() {},
		fixed: function() {}
	};



	// WRAPKIT SIDEBAR PLUGIN DEFINITION
	// =================================
	$.fn.wrapkitSidebar = function( options, args ){
		// NOTE: args only use to setter method

		if( options === 'option' ){
			var sidebar = Object.create( Sidebar );

			return sidebar[ options ]( args, this );
		} else{
			return this.each(function(){

				var sidebar = Object.create( Sidebar ),
					methods = Object.create( Methods );

				if ( typeof options === 'string' ) {
					try{
						if( methods[ options ] === undefined ){
							$.error( 'Method ' +  options + ' does not exist on wrapkitSidebar' );
						}else{
							sidebar[ options ]( args, this );
						}
					}
					catch( e ){
						$.error( e );
					}
				} else if ( typeof options === 'object' || ! options ) {
		            // Default to "init"
		            var element = this;
					sidebar.init( options, element);
					
					$.data( element, 'wrapkitSidebar', sidebar );
					
					// set caret icon
					sidebar.setCaretIcon({
						caret: sidebar.options.caret,
						caretChild: sidebar.options.caretChild
					}, element );

					// live resizable feature ( depend w/ jqueryui )
					if ( sidebar.options.liveResizable && jQuery.ui ) {

						sidebar.liveResizable( sidebar.options.liveResizable, element );
					} else if( sidebar.options.liveResizable && ! jQuery.ui ){

						console.log( 'jQuery UI not found! liveResizable feature is now turned off!' );
					}

					// position
					sidebar.fixed( sidebar.options.fixed, element );

					// resize
					sidebar.resize( sidebar.options.size, element );


					// control on resize (responsive feature's)
					$( window ).resize(function() {
						var sidebarLastSize = $( document ).data( 'sidebarLastSize' ),
							dataOptions = $( element ).data().wrapkitSidebar.options;	// get latest data options

						// control the toggle resize
						if( $.viewportWidth() < dataOptions.screenCollapseMax ){
							
							// then do resize
							// only on collapseToNavbar ( control to size mode )
							if( dataOptions.collapseToNavbar && ( sidebarLastSize === 'md' || sidebarLastSize === 'sm' ) ){

								$( element ).wrapkitSidebar( 'resize', 'lg' );
							} else{

								$( element ).wrapkitSidebar( 'resize', dataOptions.size );
							}

							// force to hide collapse
							if( dataOptions.collapseToNavbar && $( element ).hasClass( 'in' ) ){
								if( !$( '.sidebar-form-search input' ).is( ':focus' ) ){
									$( element ).collapse( 'hide' );
								}
							}
						}
						else{
							if( dataOptions.collapseToNavbar ){
								$( element ).wrapkitSidebar( 'resize', sidebarLastSize );
							}
						}
					});
					

					// update content if nav child height > document height
					$( element ).on( 'wrapkit.sidebar.toggle.item wrapkit.sidebar.toggle.item.child', function(){

						var options = $( this ).wrapkitSidebar( 'option' ),
							item = $( this ).find( '.nav-item.open' ),
							itemChild = item.children( '.nav-item-child' );

						if ( options.size === 'md' || options.size === 'sm' ) {
							if ( item.hasClass( 'open' ) ) {
								var offset = itemChild.offset(),
									offsetBottom = offset.top + itemChild.outerHeight(),
									docHeight = $( 'body' ).outerHeight();

								if ( offsetBottom > docHeight  ) {
									$( '.content-wrapper' ).css({
										height: offsetBottom + 'px'
									});
								}
							} else{
								$( '.content-wrapper' ).css({
									height: 'initial'
								});
							}
						}
					});
				} else {

					$.error( 'Method ' +  options + ' does not exist on wrapkitSidebar' );
				}

				$.data( this, 'wrapkitSidebar', sidebar );
			});
		}
	};


	
	// WRAPKIT SIDEBAR DEFAULT OPTIONS DEFINITION
	// ==========================================
	$.fn.wrapkitSidebar.options = {
		skin: 'midwet',								// the sidebar skin color ( 'midwet', 'whity', 'greentur', 'nephem', 'belpet', 'wistam', 'osun', 'pumcar', 'pomeal', 'silc', 'ascon' )
		variant: 'line',							// the sidebar variant style ('line', 'extend', 'block', 'caretal')
		contextual: 'blue',							// the sidebar contextual color ('blue', 'sky', 'green', 'orange', 'red', 'purple')
		fixed: false,								// sidebar fixed (true, false)
		align: 'left',								// sidebar align ('left', 'right')
		rtlMode: false,								// sidebar rtl
		liveResizable: true,						// allow to resize the sidebar w/ cursor ( depend w/ jqueryui resizable )
		maxLiveResizable: 460,						// max width to liveResizable
		minLiveResizable: 160,						// min width to liveResizable
		size: 'lg',									// the size of sidebar ('lg', 'md', 'sm', 'hidden')
		sizeClassPrefix: 'wrapkit-sidebar',			// the class prefix of sidebar size, will append class on body (wrapkit-sidebar-lg, etc..). Be carefull to change it, couse this is connected with the stylesheet
		caret: {									// caret to nav level 1
			iconCollapse: 'fa fa-angle-down',		// icon when nav collapse (support for existing font icon like glyph, font awaesome, etc )
			iconOpen: 'fa fa-angle-up'				// icon when nav open (support for existing font icon like glyph, font awesome, etc )
		},
		caretChild: {								// caret to nav child (level > 1)
			iconCollapse: 'fa fa-angle-right',		// icon when nav child collapse (support for existing font icon like glyph, font awaesome, etc )
			iconOpen: 'fa fa-angle-down'			// icon when nav child open (support for existing font icon like glyph, font awaesome, etc )
		},
		animateDuration: 100,						// animate duration for toggle collapse/open
		useNiceScroll: true,						// boolean to use nice scroll (depend w/ jquery.nicescroll.js) plugin. Used on Desktop device only. (set to false if you want to disable it)
		alertNiceScroll: true,						// confirm to user if jquery.niceScroll not found
		cdnNiceScroll: '//cdnjs.cloudflare.com/ajax/libs/jquery.nicescroll/3.5.1/jquery.nicescroll.min.js',		// use if jquery.niceScroll.js plugin not found
		screenCollapseMax: 768,						// the max screen size to control sidebar on collapse mode ( recommendation to be equated with the bootstrap screen-sm variable 'sass/less' )
		collapseToNavbar: true,						// use of small device version ( screenWidth < screenCollapseMax )
		collapseTarget: '.navbar-collapse',					// data target to be push on .navbar-toggle ( the sidebar selector )
		loader: 'fa fa-spinner fa-spin'				// indicator for server side actions (ajax) like save, edit, load, etc
	};

})( jQuery, window, document );