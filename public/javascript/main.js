const local_url = window.location.href; 
const target = $("#short");
const container = $("#new-url");

$(document).ready(() => {
	$('#shorten-btn').on('click', () => {
		// Checks for url, if none display error message
		let input = $('#url-input').val()
		if(input){
			$("#main-container").fadeOut(500, () =>{
				$.post(`${local_url}api/shorten`, { url: input }, (data) => {
					let { url } = data;
					url = local_url + url
					target.text(url);
					container.fadeTo(500,1);
				})				
			})

		} else {
			//no input, shake the 
		}
		
		
		//If url, captures input and AJAX to server, changes display to spinner

		//Once response recieved, changes display to show new url
	});
});