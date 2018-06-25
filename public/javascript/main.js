$(document).ready(() => {
	$('#shorten-btn').on('click', () => {
		// Checks for url, if none display error message
		if($('#url-input').val()){
			let input = $('#url-input').val()
			console.log(input);
		} else {
			//no input do something
		}
		
		
		//If url, captures input and AJAX to server, changes display to spinner

		//Once response recieved, changes display to show new url
	});
});