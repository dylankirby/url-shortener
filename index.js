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
	mongoose.connect(process.env.MONGO_URI);
} else {
	mongoose.connect(keys.LOCAL_MONGO_URI)
}

app.use(indexRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
	console.log(`Now listening on port ${PORT}`);
});