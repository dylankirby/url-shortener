const localUrl = window.location.href; 
const container = $("#url-list");

let urlList = new Vue({
  el: '#url-list',
  data: {
  	urls: []
  },
  methods: {
  	add(long, short, count){
  		this.urls.unshift({
  			long,
  			short,
  			count
  		});
  	}
  }
});

//Then need to make it so that the list transitions in when a new li is added

$(document).ready(() => {
	
	$('form').on('submit', (e) => {
		$("#url-list").fadeTo(1000, 1);
		e.preventDefault();
		let inputUrl = $('#url-input').val();
	
		try{
			if(!($.grep(urlList._data.urls, (obj) => { return obj.long == inputUrl })).length){ //current url entry has already been shortend
				$.post(`${localUrl}api/shorten`, { url: inputUrl }, (data) => {
					//pull and assign api response data
					let { url, count } = data;

					//concatenate local url with returned shortened url hash
					url = localUrl + url

					//add new url to vue list data
					urlList.add(inputUrl, url, count);

				});			
			}
		} catch(e) {
			if(e instanceof ReferenceError){
				null
			}
		}
	});
});
