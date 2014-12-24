String.prototype.bool = function() {
	'use strict';

    return (/^true$/i).test(this);
};


$(function () {
	'use strict';

	if( typeof Object.create !== 'function' ){

		// this part a very !important
		Object.create = function( obj ){
			function F() {}
			F.prototype = obj;
			return new F();
		};
	}
});


(function($, window, document, undefined){
	'use strict';

	$.fn.setClass = function( options ){

		return this.each(function(){
			options = ( typeof options === 'string' ) ? {class: options} : options;

			this.options = $.extend( {}, $.fn.setClass.options, options );

			$(this).attr('class', options.class);
		});
	};

	$.fn.setClass.options = {
		class: ''
	};

	// create script
	$.fn.createScript = function( src ){

        return this.each( function(){
			var script = document.createElement( 'script' );

	        script.className = 're-execute';
	        script.type = 'text/javascript';
	        script.src = src;

	        // remove the same existing script
	        $('script[src="' + src + '"]').remove();
	        // reload re-execute scripts (this may register script to re-axecute scripts)
	        $( this ).append(script);
        });
    };

	// Random number
	$.randomNumber = function( min, max ){
		return Math.floor( Math.random() * ( max - min + 1 ) + min );
	};

	// detect real viewport
	// real width
	$.viewportWidth = function(){
		return Math.max( document.documentElement.clientWidth, window.innerWidth || 0 );
	};
	// real height
	$.viewportHeight = function(){
		return Math.max( document.documentElement.clientHeight, window.innerHeight || 0 );
	};


	// Detect Device ( Mobile or Desktop )
	$.isMobile = function(){
		return ( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) ? true : false;
	};

	// Detect Browser name and version
	$.browserProp = function(){
		var ua= navigator.userAgent, tem, 
			M= ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
		if(/trident/i.test(M[1])){
			tem=  /\brv[ :]+(\d+)/g.exec(ua) || [];
			return 'IE '+(tem[1] || '');
		}
		if(M[1]=== 'Chrome'){
			tem= ua.match(/\bOPR\/(\d+)/)
			if(tem!= null) return 'Opera '+tem[1];
		}
		M= M[2]? [M[1], M[2]]: [navigator.appName, navigator.appVersion, '-?'];
		if((tem= ua.match(/version\/(\d+)/i))!= null) M.splice(1, 1, tem[1]);
		return M;
	};

	// Fancy check if Element Exists w/ callback
	$.fn.ifExists = function( callback ) {
		var args = [].slice.call(arguments, 1);

		if (this.length) {
			if ( $.isFunction( callback ) ) {
				callback.call(this, args);
			} else{
				return true;
			}
		} else{
			return false;
		}

		return this;
	};

	$.rickshawResize = function( graph, $container ){
		var resize = function(){
			$( window ).on( 'resize', function(){
				graph.configure({
					width: $container.width(),
					height: $container.height()
				});
				graph.render();
			});
		};

		resize();

		return this;
	};

	// make contains not case-sensitive
	$.extend($.expr[':'], {
		'containsNC': function(elem, i, match, array) {
			return (elem.textContent || elem.innerText || '').toLowerCase().indexOf((match[3] || '').toLowerCase()) >= 0;
		}
	});

	// find string and highlight it
	jQuery.extend({
		highlight: function (node, re, nodeName, className) {
			if (node.nodeType === 3) {
				var match = node.data.match(re);
				if (match) {
					var highlight = document.createElement(nodeName || 'span');
					highlight.className = className || 'highlight';
					var wordNode = node.splitText(match.index);
					wordNode.splitText(match[0].length);
					var wordClone = wordNode.cloneNode(true);
					highlight.appendChild(wordClone);
					wordNode.parentNode.replaceChild(highlight, wordNode);
					return 1; //skip added node in parent
				}
			} else if ((node.nodeType === 1 && node.childNodes) && // only element nodes that have children
				!/(script|style)/i.test(node.tagName) && // ignore script and style nodes
				!(node.tagName === nodeName.toUpperCase() && node.className === className)) { // skip if already highlighted
				for (var i = 0; i < node.childNodes.length; i++) {
					i += jQuery.highlight(node.childNodes[i], re, nodeName, className);
				}
			}
			return 0;
		}
	});
	$.fn.highlight = function( words, options ) {
		var settings = { className: 'highlight', element: 'span', caseSensitive: false, wordsOnly: false };
		jQuery.extend(settings, options);

		if (words.constructor === String) {
			words = [words];
		}
		words = jQuery.grep(words, function(word, i){
			return word !== '';
		});
		words = jQuery.map(words, function(word, i) {
			return word.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
		});
		if (words.length === 0) { return this; }

		var flag = settings.caseSensitive ? '' : 'i';
		var pattern = '(' + words.join('|') + ')';
		if (settings.wordsOnly) {
			pattern = '\\b' + pattern + '\\b';
		}
		var re = new RegExp(pattern, flag);

		return this.each(function () {
			jQuery.highlight(this, re, settings.element, settings.className);
		});
	};

	// remove string highlight
	$.fn.unhighlight = function(options) {
		var settings = { className: 'highlight', element: 'span' };
		jQuery.extend(settings, options);

		return this.find(settings.element + '.' + settings.className).each(function () {
			var parent = this.parentNode;
			parent.replaceChild(this.firstChild, this);
			parent.normalize();
		}).end();
	};

})(jQuery, window, document);


$( function(){
	// fixed bug render on safari <= 5
	var browserProp = $.browserProp();
	if( browserProp[0] === 'Safari' && parseInt(browserProp[1]) <= 5 ){
		
		$( document ).on( 'wrapkit.sidebar.resize', '.sidebar', function(){
			setTimeout( function(){
				$( '.header [class*="container"], .content-header, .content-actions, .content, .footer' ).addClass( 'safari-helper-render' );
			}, 0);

			setTimeout( function(){
				$( '.header [class*="container"], .content-header, .content-actions, .content, .footer' ).removeClass( 'safari-helper-render' );
			}, 10);
		});
	}
});