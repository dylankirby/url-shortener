const localUrl = window.location.href; 
const container = $("#new-url-box");
const longUrl = $("#long");
const shortUrl = $("#short");
const counter = $("#count");

$(document).ready(() => {
	$('form').on('submit', (e) => {
		e.preventDefault();
		let inputUrl = $('#url-input').val();
		
		$.post(`${localUrl}api/shorten`, { url: inputUrl }, (data) => {
			let { url, count } = data;
			url = localUrl + url
			longUrl.text(inputUrl);
			counter.text(`Uses: ${count}`);
			shortUrl.text(url);
			container.fadeTo(1500,1);
		});
	});
});
