podPress_jQuery(document).ready(function() {
	// Widget Settings Accordion (on page loading)
	podPress_jQuery( '.podpress_widget_accordion' ).accordion({
		header: 'h5',
		autoHeight: false,
		heightStyle: 'content'
	});

	// bind the Accordion effect after saving the widgets settings (WP >= 3.3)
	//~ podPress_jQuery('input.widget-control-save').live('click', function() {
	podPress_jQuery(document).on('click','input.widget-control-save', function() {
		var podpress_a_widget_id = podPress_jQuery(this).closest('div.widget').attr('id');
		if ( podpress_a_widget_id.search(/podpress_feedbuttons/i)  != -1 ) {
			jQuery('#'+podpress_a_widget_id).ajaxComplete( function(event, request, settings) {
				if ( settings.data.search(/action=save-widget/i) != -1 && settings.data.search(/delete_widget=1/i) == -1 ) {
					podPress_jQuery( '.podpress_widget_accordion' ).accordion({
						header: 'h5',
						autoHeight: false,
						heightStyle: 'content'
					});
				}
			});
		}
	});
	
	// bind the Accordion effect after adding the widget to a sidebar in a WP >= 3.3 sidebar
	jQuery('div.widgets-sortables').bind( 'sortstop', function(e, ui) {
		// the sidebar element is a jQuery Sortable list. After you drop a widget on a sidebar (or when you change the order of the list elements) this event happens.
		//var podpress_a_widget_id = ui.item.find('a.widget-action').closest('div.widget').attr('id');
		var podpress_a_widget_id = ui.item.find('div.widget-inside > form > input.widget-id').val();
		var podpress_fbw_status = 'notloaded';
		if ( podpress_a_widget_id.search(/podpress_feedbuttons/i)  != -1 ) {
			jQuery('#'+podpress_a_widget_id).ajaxComplete( function(event, request, settings) {
				if ( podpress_fbw_status == 'notloaded' && settings.data.search(/action=save-widget/i) != -1 && settings.data.search(/delete_widget=1/i) == -1 ) {
					podPress_jQuery( '.podpress_widget_accordion' ).accordion({
						header: 'h5',
						autoHeight: false,
						heightStyle: 'content'
					});
					podpress_fbw_status = 'loaded';
				}
			});
		}
	});	
});