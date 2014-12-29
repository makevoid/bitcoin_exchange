$(function(){
	'use strict';

    $( '#template-version' ).html( 'Currently v1.0' );

    // ANIMATE SCROLL, define class .scroll to tag <a> will be activate this
    $( document ).on( 'click', 'a.scroll', function( e ){
        e.preventDefault();
        $('html,body').animate({scrollTop: $(this.hash).offset().top }, 1000);
    });
    // END ANIMATE SCROLL
    
    
    

    // STOP PROPAGATIONS
    $( document ).on( 'click', '.stop-propagation', function(e){
        e.stopPropagation();
    });
    // END STOP PROPAGATIONS
    
    
    

    // BOOTSTRAP TOOLTIPS
    $('[rel*="tooltip"], [data-toggle*="tooltip"]').each( function(){
        var $tip = $(this),
            data = $tip.data(),
            context = ( data.context ) ? 'tooltip-' + data.context : '',
            container = ( $tip.hasClass('btn') || $tip.hasClass('btn-group') || $tip.hasClass('input-group') || $tip.hasClass('input-group-addon') || $tip.hasClass('form-control-feedback') ) ? 'body' : false;
            
        data.template = '<div class="tooltip '+ context +'"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>';
        data.placement = ( data.placement ) ? data.placement : 'top';
        data.container = ( data.container ) ? data.container : container;

        if ( $tip.attr('rel') === 'tooltip-right' || data.toggle === 'tooltip-right' ) {
            data.placement = 'right';
        } else if ( $tip.attr('rel') === 'tooltip-bottom' || data.toggle === 'tooltip-bottom' ) {
            data.placement = 'bottom';
        } else if ( $tip.attr('rel') === 'tooltip-left' || data.toggle === 'tooltip-left' ) {
            data.placement = 'left';
        }

        $tip.tooltip( data );
    });

    // Trigger on other element
    $( '[data-toggle*="tooltip"][data-trigger-input], [rel*="tooltip"][data-trigger-input]' ).each( function(){
        var $tip = $( this ),
            data = $tip.data(),
            target = data.triggerInput;

        $( document ).on( 'focus', target, function(){
            $tip.tooltip('show');
        })
        .on( 'focusout', target, function(){
            $tip.tooltip('hide');
        });
    });
    
    // destroy a tooltip (helper)
    $('.disable-tooltip').tooltip('destroy');
    // END BOOTSTRAP TOOLTIPS
    




    // BOOTSTRAP POPOVER
    $('[rel*="popover"], [data-toggle*="popover"]').each(function(){
        var $pop = $(this),
            data = $pop.data(),
            context = ( data.context ) ? 'popover-' + data.context : '',
            container = ( $pop.hasClass('btn') || $pop.hasClass('btn-group') || $pop.hasClass('input-group') || $pop.hasClass('input-group-addon') || $pop.hasClass('form-control-feedback') ) ? 'body' : false;
            
        data.template = '<div class="popover ' + context + '"><div class="arrow"></div><div class="popover-inner"><h3 class="popover-title"></h3><div class="popover-content"><p></p></div></div></div>';
        data.placement = ( data.placement ) ? data.placement : 'top';
        data.container = ( data.container ) ? data.container : container ;

        if ( $pop.attr('rel') === 'popover-right' || data.toggle === 'popover-right' ) {
            data.placement = 'right';
        } else if ( $pop.attr('rel') === 'popover-bottom' || data.toggle === 'popover-bottom' ) {
            data.placement = 'bottom';
        } else if ( $pop.attr('rel') === 'popover-left' || data.toggle === 'popover-left' ) {
            data.placement = 'left';
        }

        $pop.popover( data );
    });

    // Trigger on other element
    $( '[data-toggle*="popover"][data-trigger-input], [rel*="popover"][data-trigger-input]' ).each( function(){
        var $pop = $( this ),
            data = $pop.data(),
            target = data.triggerInput;

        $( document ).on( 'focus', target, function(){
            $pop.popover('show');
        })
        .on( 'focusout', target, function(){
            $pop.popover('hide');
        });
    });

    // destroy a popover (helper)
    $('.disable-popover').popover('destroy');
    // END BOOTSTRAP POPOVER




    // BOOTSTRAP MODAL
    $( document ).on( 'loaded.bs.modal', '.modal', function( e ){
        var targetID = e.target.id,
            handler = $('[data-target="#' + targetID + '"]'),
            dataScripts = handler.data( 'scripts' ),
            scripts = ( dataScripts ) ? dataScripts.replace(/\s+/g, '') : false;

        if( scripts ){
            scripts = scripts.split( ',' );
            $.each( scripts, function( i, val ){
                $( 'body' ).createScript( val );
            });
        }
    }).on( 'hide.bs.modal', '.modal', function () {
        // hidden open popover
        $( document ).find( '[data-toggle=popover], [rel*=popover]' ).popover('hide');
    })
    // to support modal stackable
    .on( 'shown.bs.modal', function(e){
        var $modalBackdrop = $( 'body > .modal-backdrop' ),
            isStackable = ($modalBackdrop.length > 1) ? true : false;

        if ( isStackable ) {
            var zIndex = parseInt( $modalBackdrop.first().css( 'z-index' ) );

            $modalBackdrop.each( function(){
                var $backdrop = $( this );

                if(! $backdrop.is(':first') ){
                    zIndex = parseInt( $backdrop.css( 'z-index' ) );
                }
                if(! $backdrop.is(':last') ){
                    $backdrop.next().css( 'z-index', zIndex + 10 );
                }
            });

            var lastZindex = parseInt( $modalBackdrop.last().css('z-index') );
            $( e.target ).css( 'z-index', lastZindex + 10 );
        }
    });
    // END BOOTSTRAP MODAL
    





    // BOOTSTRAP TABS & COLLAPSE
    $( document ).on( 'shown.bs.tab', 'a[data-toggle="tab"]', function () {
        // When a tab is activated, it is possible to change the page height
        // So we need to update the sidebar height
        if( $.fn.wrapkitSidebar ){
            $( '.sidebar' ).wrapkitSidebar( 'updateHeight' );
        }
    })
    .on( 'shown.bs.collapse', '.collapse', function () {
        if( $.fn.wrapkitSidebar ){
            $( '.sidebar' ).wrapkitSidebar( 'updateHeight' );
        }
    }).on( 'shown.bs.tab', '.header a[data-toggle="tab"]', function () {
        $( this ).closest( '.dropdown' ).removeClass( 'active' );
    });
    // END BOOTSTRAP TABS & COLLAPSE
    
    



    // BOOTSTRAP INPUT GROUP IN
    $( document ).on( 'focus', '.input-group-in .form-control', function(){
        var group = $(this).parent();

        if ( group.hasClass( 'twitter-typeahead' ) ) {
            group.parent().addClass( 'focus' );
        }
        else if( group.hasClass( 'input-group-in' ) ){
            group.addClass( 'focus' );
        }
    })
    .on( 'blur', '.input-group-in .form-control', function(){
        var group = $(this).parent();
        
        if ( group.hasClass( 'twitter-typeahead' ) ) {
            group.parent().removeClass( 'focus' );
        }
        else if( group.hasClass( 'input-group-in' ) ){
            group.removeClass( 'focus' );
        }
    });
    // END BOOTSTRAP INPUT GROUP IN
    
    // HELPER FOR CUSTOM SELECT
    $( document ).on( 'focus', 'label.select > select', function(){
        $(this).parent().addClass( 'focus' );
    }).on( 'focusout', 'label.select > select', function(){
        $(this).parent().removeClass( 'focus' );
    });
    // $( 'label.select > select' ).each(function(){
    //     if ( $( this ).is(':disabled') ) {
    //         $( this ).parent().addClass( 'disabled' );
    //     }
    // });
    // END HELPER FOR CUSTOM SELECT





	// Activate NICE SCROLL SETUP only on desktop device
    if ( $.fn.niceScroll ) {
        if ( ! $.isMobile() ){
            $('.nice-scroll, .pre-scrollable').each(function(){
                var $this = $( this ),
                    data = $this.data(),
                    wrapper = data.scrollWrapper;

                // default data options
                data.zindex = ( data.zindex ) ? data.zindex : 'auto';
                data.cursorcolor = ( data.cursorcolor ) ? data.cursorcolor : '#dce4ec';
                data.background = ( data.background ) ? data.background : 'rgba(220, 228, 236, .4)'; // rails color
                data.cursorwidth = ( data.cursorwidth ) ? data.cursorwidth : '5px';
                data.cursorborder = ( data.cursorborder ) ? data.cursorborder : 'none';
                data.cursorborderradius = ( data.cursorborderradius ) ? data.cursorborderradius : '0px';
                data.scrollspeed = ( data.scrollspeed ) ? parseInt(data.scrollspeed) : 100;
                data.bouncescroll = ( data.bouncescroll ) ? true : false;

                // initialize niceScroll
                var scrollWrapper;
                if ( wrapper === undefined ) {
                    $this.niceScroll( data );
                } else{
                    scrollWrapper = $this.children( wrapper );
                    $this.niceScroll( scrollWrapper, data );
                }
            });
        } else{
            $('.nice-scroll, .pre-scrollable').css( 'overflow', 'auto' );
        }
    }
    // end nicescroll
    




    // Form basic
    $('.autogrow').autoGrow();

    var switchers = Array.prototype.slice.call(document.querySelectorAll('.js-switch'));

    switchers.forEach( function( elem ){
        var data = $( elem ).data(),
            options = {
                color          : ( data.color ) ? data.color : '#20638f',
                secondaryColor : ( data.secondaryColor ) ? data.secondaryColor : '#e7edf2',
                className       : ( data.className ) ? data.className : 'switchery',
                disabled       : ( data.disabled ) ? data.disabled : false,
                disabledOpacity: ( data.disabledOpacity ) ? data.disabledOpacity : 0.5,
                speed          : ( data.speed ) ? data.speed : '0.3s'
            };
        
        new Switchery( elem, options );
    });
});