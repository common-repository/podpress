/**
* actions on the General Settings page of podPress
* since 8.8.10.18
*/
//~ podPress_jQuery(document).ready( function() {

//~ });


function podpress_change_module_status(podpress_module) {
	if ( typeof podpress_module == 'undefined' ) { alert('podPress Error: unable to (de-)activate this module'); }
	var status = jQuery('#'+podpress_module+'_module_status').val();
	if ( typeof podpress_module == 'undefined' || '' == status || 'inactive' != status ) {
		var action = 'deactivate_module';
	} else {
		var action = 'activate_module';
	}
	jQuery.ajax({
		async: true,
		url: podPressBackendURL + '/podpress_backend.php', 
		type: 'POST',
		dataType: 'text',
		data: '&action='+action+'&podpress_module=' + encodeURIComponent(podpress_module) + '&_ajax_nonce=' + encodeURIComponent(jQuery.trim(jQuery('#podpress_ajax_nonce_key').val())),
		success: function(data, textStatus, XMLHttpRequest) { 
			var podpress_result_obj = jQuery.parseJSON(XMLHttpRequest.responseText); 
			if ( typeof podpress_result_obj.code != 'undefined' && '' != podpress_result_obj.code ) {
				//~ alert(podpress_result_obj.code);
				if ( action == 'deactivate_module' ) {
					jQuery('#'+podpress_module+'_button').val(jQuery('#podpress_word_activate').val());
					jQuery('#'+podpress_module+'_module_status').val('inactive');
				} else {
					jQuery('#'+podpress_module+'_button').val(jQuery('#podpress_word_deactivate').val());
					jQuery('#'+podpress_module+'_module_status').val('active');
				}
			}
			//~ alert(XMLHttpRequest.responseText);
		},
		complete: function (jqXHR, textStatus) {
			//~ alert('stats start stop complete' + '\n' + result);
		}
	});
}
