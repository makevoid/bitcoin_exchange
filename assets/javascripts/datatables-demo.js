$( function(){
	'use strict';
	// Table Tools
	$( '#datatables2' ).dataTable({
		'sDom': '<"TTT_btn-group-wrapper tt-actions-demo"T><"row"<"col-sm-12"<"pull-right"f><"pull-left"l>r<"clearfix">>>t<"row"<"col-sm-12"<"pull-left"i><"pull-right"p><"clearfix">>>',
        'sPaginationType': 'bs_normal',
		'oLanguage': {
			'sInfoFiltered': '<span class="label label-info"><i class="fa fa-filter"></i> filtering from _MAX_ records</span>',
		},
        'sAjaxSource': '/data-source.json',
		'fnInitComplete': function(oSettings, json) {
			var $wrapperTable = $(oSettings.nTable).closest( '.dataTables_wrapper' );
			$wrapperTable.find( '.dataTables_paginate' ).children( '.pagination' )
				.addClass( 'pagination-split' );

			// replace select
			$wrapperTable.find('.dataTables_length select').wrap( '<label class="select select-inline select-sm"></label>' );



			// update sidebar height
			$( '.sidebar' ).wrapkitSidebar( 'updateHeight' );
		}
	});

	$( '#panel-datatableTools' ).on( 'wrapkit.panel.refresh', function(e, args){

		var $this = $( this );
		if ( args ) {
			// just for demo (usually use on ajax done/success)
			setTimeout( function(){
				$this.wrapkitPanel( 'refresh', false );
			}, 3000 );
		}
	});





    // adding custom styles to all .datatables
	$('.datatables').each(function(){
		var datatables = $( this );
		// SEARCH - Add the placeholder for Search and Turn this into in-line form control
		var searchInput = datatables.closest('.dataTables_wrapper').find('div[id$=_filter] input');
		searchInput.attr('placeholder', 'Search');
		searchInput.addClass('form-control input-sm');
		// LENGTH - Inline-Form control
		var lengthSel = datatables.closest('.dataTables_wrapper').find('div[id$=_length] select');
		lengthSel.addClass('form-control input-sm');
		// lengthSel.wrap( '<label class="select select-sm"></label>' );
		// Paginations
        var paginations = datatables.closest( '.dataTables_wrapper' ).find( '.dataTables_paginate' ).children( '.pagination' );

		paginations.addClass( 'pagination-sm' );
	}).on( 'draw.dt', function () {
	    // update sidebar height
		$( '.sidebar' ).wrapkitSidebar( 'updateHeight' );
	});

});
