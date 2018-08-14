//Imports
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const indexRoutes = require('./routes/index');
const devRoutes = require('./routes/developer');

//App Setup
const app = express();
mongoose.Promise = global.Promise;

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: false }));

if(process.env.NODE_ENV == 'production'){
	mongoose.connect(process.env.MONGO_URI);
} else {
	mongoose.connect('mongodb://localhost:27017/url_shortner')
}

app.use(indexRoutes);
app.use(devRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
	console.log(`Now listening on port ${PORT}`);
});