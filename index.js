//Imports
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const keys = require('./keys');
const indexRoutes = require('./routes/index');

//App Setup
const app = express();
mongoose.Promise = global.Promise;

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: false }));

if(process.env.NODE_ENV === 'production'){
	mongoose.connect(keys.MONGO_URI);
} else {
	mongoose.connect(keys.LOCAL_MONGO_URI)
}

app.use(indexRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
	console.log(`Now listening on port ${PORT}`);
});


/* 
Have front end
Will AJAX to server when given url, handled in jquery,
with return, will alter dom to display the shortened URL

Steps

Build basic FE
Write tests for algo
Build algo to shorten
Write API Tests
Attach algo to api route
Write DB Tests
Build in db logic to store
Write Redirect Tests
Build JQ logic to handle incoming url, send it to api, and diplay the shortened url
build route to redirect when url is pasted (will have to include this.url)
*/