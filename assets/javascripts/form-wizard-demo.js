$(function(){
	'use strict';

	// form elements
	var countries = [];
    $.each({'BD': 'Bangladesh', 'BE': 'Belgium', 'BF': 'Burkina Faso', 'BG': 'Bulgaria', 'BA': 'Bosnia and Herzegovina', 'BB': 'Barbados', 'WF': 'Wallis and Futuna', 'BL': 'Saint Bartelemey', 'BM': 'Bermuda', 'BN': 'Brunei Darussalam', 'BO': 'Bolivia', 'BH': 'Bahrain', 'BI': 'Burundi', 'BJ': 'Benin', 'BT': 'Bhutan', 'JM': 'Jamaica', 'BV': 'Bouvet Island', 'BW': 'Botswana', 'WS': 'Samoa', 'BR': 'Brazil', 'BS': 'Bahamas', 'JE': 'Jersey', 'BY': 'Belarus', 'O1': 'Other Country', 'LV': 'Latvia', 'RW': 'Rwanda', 'RS': 'Serbia', 'TL': 'Timor-Leste', 'RE': 'Reunion', 'LU': 'Luxembourg', 'TJ': 'Tajikistan', 'RO': 'Romania', 'PG': 'Papua New Guinea', 'GW': 'Guinea-Bissau', 'GU': 'Guam', 'GT': 'Guatemala', 'GS': 'South Georgia and the South Sandwich Islands', 'GR': 'Greece', 'GQ': 'Equatorial Guinea', 'GP': 'Guadeloupe', 'JP': 'Japan', 'GY': 'Guyana', 'GG': 'Guernsey', 'GF': 'French Guiana', 'GE': 'Georgia', 'GD': 'Grenada', 'GB': 'United Kingdom', 'GA': 'Gabon', 'SV': 'El Salvador', 'GN': 'Guinea', 'GM': 'Gambia', 'GL': 'Greenland', 'GI': 'Gibraltar', 'GH': 'Ghana', 'OM': 'Oman', 'TN': 'Tunisia', 'JO': 'Jordan', 'HR': 'Croatia', 'HT': 'Haiti', 'HU': 'Hungary', 'HK': 'Hong Kong', 'HN': 'Honduras', 'HM': 'Heard Island and McDonald Islands', 'VE': 'Venezuela', 'PR': 'Puerto Rico', 'PS': 'Palestinian Territory', 'PW': 'Palau', 'PT': 'Portugal', 'SJ': 'Svalbard and Jan Mayen', 'PY': 'Paraguay', 'IQ': 'Iraq', 'PA': 'Panama', 'PF': 'French Polynesia', 'BZ': 'Belize', 'PE': 'Peru', 'PK': 'Pakistan', 'PH': 'Philippines', 'PN': 'Pitcairn', 'TM': 'Turkmenistan', 'PL': 'Poland', 'PM': 'Saint Pierre and Miquelon', 'ZM': 'Zambia', 'EH': 'Western Sahara', 'RU': 'Russian Federation', 'EE': 'Estonia', 'EG': 'Egypt', 'TK': 'Tokelau', 'ZA': 'South Africa', 'EC': 'Ecuador', 'IT': 'Italy', 'VN': 'Vietnam', 'SB': 'Solomon Islands', 'EU': 'Europe', 'ET': 'Ethiopia', 'SO': 'Somalia', 'ZW': 'Zimbabwe', 'SA': 'Saudi Arabia', 'ES': 'Spain', 'ER': 'Eritrea', 'ME': 'Montenegro', 'MD': 'Moldova, Republic of', 'MG': 'Madagascar', 'MF': 'Saint Martin', 'MA': 'Morocco', 'MC': 'Monaco', 'UZ': 'Uzbekistan', 'MM': 'Myanmar', 'ML': 'Mali', 'MO': 'Macao', 'MN': 'Mongolia', 'MH': 'Marshall Islands', 'MK': 'Macedonia', 'MU': 'Mauritius', 'MT': 'Malta', 'MW': 'Malawi', 'MV': 'Maldives', 'MQ': 'Martinique', 'MP': 'Northern Mariana Islands', 'MS': 'Montserrat', 'MR': 'Mauritania', 'IM': 'Isle of Man', 'UG': 'Uganda', 'TZ': 'Tanzania, United Republic of', 'MY': 'Malaysia', 'MX': 'Mexico', 'IL': 'Israel', 'FR': 'France', 'IO': 'British Indian Ocean Territory', 'FX': 'France, Metropolitan', 'SH': 'Saint Helena', 'FI': 'Finland', 'FJ': 'Fiji', 'FK': 'Falkland Islands (Malvinas)', 'FM': 'Micronesia, Federated States of', 'FO': 'Faroe Islands', 'NI': 'Nicaragua', 'NL': 'Netherlands', 'NO': 'Norway', 'NA': 'Namibia', 'VU': 'Vanuatu', 'NC': 'New Caledonia', 'NE': 'Niger', 'NF': 'Norfolk Island', 'NG': 'Nigeria', 'NZ': 'New Zealand', 'NP': 'Nepal', 'NR': 'Nauru', 'NU': 'Niue', 'CK': 'Cook Islands', 'CI': 'Cote dIvoire', 'CH': 'Switzerland', 'CO': 'Colombia', 'CN': 'China', 'CM': 'Cameroon', 'CL': 'Chile', 'CC': 'Cocos (Keeling) Islands', 'CA': 'Canada', 'CG': 'Congo', 'CF': 'Central African Republic', 'CD': 'Congo, The Democratic Republic of the', 'CZ': 'Czech Republic', 'CY': 'Cyprus', 'CX': 'Christmas Island', 'CR': 'Costa Rica', 'CV': 'Cape Verde', 'CU': 'Cuba', 'SZ': 'Swaziland', 'SY': 'Syrian Arab Republic', 'KG': 'Kyrgyzstan', 'KE': 'Kenya', 'SR': 'Suriname', 'KI': 'Kiribati', 'KH': 'Cambodia', 'KN': 'Saint Kitts and Nevis', 'KM': 'Comoros', 'ST': 'Sao Tome and Principe', 'SK': 'Slovakia', 'KR': 'Korea, Republic of', 'SI': 'Slovenia', 'KP': 'Korea, Democratic Peoples Republic of', 'KW': 'Kuwait', 'SN': 'Senegal', 'SM': 'San Marino', 'SL': 'Sierra Leone', 'SC': 'Seychelles', 'KZ': 'Kazakhstan', 'KY': 'Cayman Islands', 'SG': 'Singapore', 'SE': 'Sweden', 'SD': 'Sudan', 'DO': 'Dominican Republic', 'DM': 'Dominica', 'DJ': 'Djibouti', 'DK': 'Denmark', 'VG': 'Virgin Islands, British', 'DE': 'Germany', 'YE': 'Yemen', 'DZ': 'Algeria', 'US': 'United States', 'UY': 'Uruguay', 'YT': 'Mayotte', 'UM': 'United States Minor Outlying Islands', 'LB': 'Lebanon', 'LC': 'Saint Lucia', 'LA': 'Lao Peoples Democratic Republic', 'TV': 'Tuvalu', 'TW': 'Taiwan', 'TT': 'Trinidad and Tobago', 'TR': 'Turkey', 'LK': 'Sri Lanka', 'LI': 'Liechtenstein', 'A1': 'Anonymous Proxy', 'TO': 'Tonga', 'LT': 'Lithuania', 'A2': 'Satellite Provider', 'LR': 'Liberia', 'LS': 'Lesotho', 'TH': 'Thailand', 'TF': 'French Southern Territories', 'TG': 'Togo', 'TD': 'Chad', 'TC': 'Turks and Caicos Islands', 'LY': 'Libyan Arab Jamahiriya', 'VA': 'Holy See (Vatican City State)', 'VC': 'Saint Vincent and the Grenadines', 'AE': 'United Arab Emirates', 'AD': 'Andorra', 'AG': 'Antigua and Barbuda', 'AF': 'Afghanistan', 'AI': 'Anguilla', 'VI': 'Virgin Islands, U.S.', 'IS': 'Iceland', 'IR': 'Iran, Islamic Republic of', 'AM': 'Armenia', 'AL': 'Albania', 'AO': 'Angola', 'AN': 'Netherlands Antilles', 'AQ': 'Antarctica', 'AP': 'Asia/Pacific Region', 'AS': 'American Samoa', 'AR': 'Argentina', 'AU': 'Australia', 'AT': 'Austria', 'AW': 'Aruba', 'IN': 'India', 'AX': 'Aland Islands', 'AZ': 'Azerbaijan', 'IE': 'Ireland', 'ID': 'Indonesia', 'UA': 'Ukraine', 'QA': 'Qatar', 'MZ': 'Mozambique'}, function(k, v) {
        countries.push({id: k, text: v});
    });
	$( '#country' ).select2({
		data: countries,
		placeholder: 'Select your country'
	});

	// form wizard
	$( '#rootwizard' ).bootstrapWizard({
		'tabClass': 'nav nav-pills nav-wizard nav-justified',
		'nextSelector': '.wizard-next',
		'previousSelector': '.wizard-prev',
		onTabShow: function(tab, navigation, index) {
			var $total = navigation.find('li').length,
				$current = index + 1,
				$percent = ( $current/$total ) * 100;

			$('#rootwizard').find('.progress-bar').css({ width: $percent+'%' });

			// If it's the last tab then hide the last button and show the finish instead
			if($current === 1) {
				$('#rootwizard').find('.wizard-actions .wizard-prev').hide();
				$('#rootwizard').find('.wizard-actions .finish').hide();
			} else if($current >= $total) {
				$('#rootwizard').find('.wizard-actions .finish').show();
				$('#rootwizard').find('.wizard-actions .wizard-next').hide();
			} else {
				$('#rootwizard').find('.wizard-actions .wizard-next').show();
				$('#rootwizard').find('.wizard-actions .wizard-prev').show();
				$('#rootwizard').find('.wizard-actions .finish').hide();
			}
		},
		onTabClick: function() {
			return false;
		}
	});


	// panel wizard
	$( 'input[name="tabsStyle"]' ).on( 'change', function(){
		$( '#panelWizard' ).find( '.nav' ).toggleClass( 'nav-tabs-alt' );
	});
	// on change color
	$( '#panel-context-wizard' ).on( 'wrapkit.panel.set.color', function(e, color){
		var $panel = $(this);

		color = (color === 'none') ? 'default' : color;

		$panel.find( '.panel-actions .btn' ).first().setClass( 'btn btn-sm dropdown-toggle ' + 'btn-' + color );
		$panel.find( '.wizard-next' ).setClass( 'btn btn-sm wizard-next ' + 'btn-' + color );
		$panel.find( '.wizard-prev' ).setClass( 'btn btn-sm wizard-prev ' + 'btn-' + color );
		$panel.find( '.submit' ).setClass( 'btn btn-sm submit ' + 'btn-' + color );

		if( color === 'greentur' || color === 'nephem' ){
			$panel.find('.progress-bar').setClass( 'progress-bar progress-bar-success' );
		} else if( color === 'osun' || color === 'pumcar' ){
			$panel.find('.progress-bar').setClass( 'progress-bar progress-bar-warning' );
		} else if( color === 'pomeal' ){
			$panel.find('.progress-bar').setClass( 'progress-bar progress-bar-danger' );
		} else{
			$panel.find('.progress-bar').setClass( 'progress-bar' );
		}
	});
	$( '#panelWizard' ).bootstrapWizard({
		'tabClass': 'nav nav-tabs',
		'nextSelector': '.wizard-next',
		'previousSelector': '.wizard-prev',
		onTabShow: function(tab, navigation, index) {
			var $total = navigation.find('li').length,
				$current = index + 1,
				$percent = ( $current/$total ) * 100;

			$('#panelWizard').find('.progress-bar').css({ width: $percent+'%' });
			
			// If it's the last tab then hide the last button and show the submit instead
			if( $current === 1 ) {
				$('#panelWizard').find('.panel-actions-input .wizard-prev').hide();
				$('#panelWizard').find('.panel-actions-input .submit').hide();
			} else if( $current >= $total ) {
				$('#panelWizard').find('.panel-actions-input .submit').show();
				$('#panelWizard').find('.panel-actions-input .wizard-next').hide();
			} else {
				$('#panelWizard').find('.panel-actions-input .wizard-next').show();
				$('#panelWizard').find('.panel-actions-input .wizard-prev').show();
				$('#panelWizard').find('.panel-actions-input .submit').hide();
			}
		},
		onTabClick: function() {
			return false;
		}
	});
	$( '#panelWizard2' ).bootstrapWizard({
		'tabClass': 'nav nav-pills',
		'nextSelector': '.wizard-next',
		'previousSelector': '.wizard-prev',
		onTabShow: function(tab, navigation, index) {
			var $total = navigation.find('li').length,
				$current = index + 1,
				$percent = ( $current/$total ) * 100;

			$('#panelWizard2').find('.progress-bar').css({ width: $percent+'%' });
			
			// If it's the last tab then hide the last button and show the submit instead
			if( $current === 1 ) {
				$('#panelWizard2').find('.panel-footer .wizard-prev').hide();
				$('#panelWizard2').find('.panel-footer .submit').hide();
			} else if( $current >= $total ) {
				$('#panelWizard2').find('.panel-footer .submit').show();
				$('#panelWizard2').find('.panel-footer .wizard-next').hide();
			} else {
				$('#panelWizard2').find('.panel-footer .wizard-next').show();
				$('#panelWizard2').find('.panel-footer .wizard-prev').show();
				$('#panelWizard2').find('.panel-footer .submit').hide();
			}
		},
		onTabClick: function() {
			return false;
		}
	});

	// control submit
	$('#panelWizard').find('.submit').on( 'click', function(e){
		e.preventDefault();
		$( '#alert-submit' ).remove();
		$('#panelWizard .panel-body').prepend( '<div id="alert-submit" class="alert alert-success no-padding"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button> <strong>Wahoo!</strong> You are submited!</div>' );
	});
	$('#panelWizard2').find('.submit').on( 'click', function(e){
		e.preventDefault();
		$( '#alert-submit2' ).remove();
		$('#panelWizard2 .panel-body').prepend( '<div id="alert-submit2" class="alert alert-success no-padding"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button> <strong>Wahoo!</strong> You are submited!</div>' );
	});
});