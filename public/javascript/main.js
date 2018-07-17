const local_url = window.location.href; 
const target = $("#short");
const oldUrl = $("#old-url");
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
					oldUrl.text(input);
					target.attr("href", url).text(url);
					container.fadeTo(500,1);
				});				
			});
		} else {
			$(".input").transition("shake").addClass("invalid-input");
		}
	});
});