const localUrl = window.location.href; 
const container = $("#url-list");

const auth = "5b73403f2a1dc2638133baea"

//Vue component
let urlList = new Vue({
  el: '#url-list',
  data: {
  	urls: []
  },
  methods: {
  	add(long, short, count){ // adds a new url to data.urls
  		this.urls.unshift({
  			long,
  			short,
  			count
  		});

  		if(this.urls.length > 4){
  			this.urls.pop();
  		}
			
			localStorage.setItem("urls", JSON.stringify(this.urls));
  	}
  },
  created: function() {
		this.urls = JSON.parse(localStorage.urls);
  }
});

// JQuery
$(document).ready(() => {
	$("#url-list").fadeTo(1000, 1); // Fades the url diplay box in
	//Form handling after a proper url is inputted
	$('form').on('submit', (e) => {

		e.preventDefault(); // stop default form submission
		let inputUrl = $('#url-input').val(); //get the input url
	
		if(!($.grep(urlList._data.urls, (obj) => { return obj.long == inputUrl })).length){ // check if current url entry has already been shortend and exists on vue
			$.post(`${localUrl}api/shorten`, { url: inputUrl, API_KEY: auth }, (data) => { // make api call
				//pull and assign api response data
				let { url, count } = data;
				//concatenate local url with returned shortened url hash
				url = localUrl + url
				//add new url to vue list data
				urlList.add(inputUrl, url, count);
				$("#url-input").val("")
			});			
		}
	});
});
