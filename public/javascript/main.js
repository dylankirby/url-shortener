const local_url = window.location.href.split('?')[0]; 
const target = $("#short");
const oldUrl = $("#old-url");
const container = $("#new-url");

function handleInput(){
	
}

$(document).ready(() => {
	$('form').on('submit', (e) => {
		e.preventDefault();
		let inputUrl = $('#url-input').val();
		
		$("#main-container").fadeOut(500, () =>{
			$.post(`${local_url}api/shorten`, { url: inputUrl }, (data) => {
				let { url } = data;
				url = local_url + url
				target.attr("href", url).text(url);
				container.fadeTo(500,1);
			});				
		});
		
	});
});