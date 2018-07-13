const local_url = window.location.href;  

$(document).ready(() => {
	$('#shorten-btn').on('click', () => {
		// Checks for url, if none display error message
		let input = $('#url-input').val()
		if(input){
			$.post(`${local_url}api/shorten`, { url: input }, (data) => {
				let { url } = data;
				url = local_url + url
				$("#short").text(url);
			})
		} else {
			//no input, shake the 
		}
		
		
		//If url, captures input and AJAX to server, changes display to spinner

		//Once response recieved, changes display to show new url
	});
});