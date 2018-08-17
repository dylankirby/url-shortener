//Imports
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const rateLimit = require('express-rate-limit')

const indexRoutes = require('./routes/index');

//App Setup
const app = express();
mongoose.Promise = global.Promise;

const limiter = new rateLimit({
	windowMs: 15*60*1000,
	max: 50,
	delayMs:0
});

app.enable('trust proxy');
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/api', limiter)

if(process.env.NODE_ENV == 'production'){
	mongoose.connect(process.env.MONGO_URI);
} else {
	mongoose.connect('mongodb://localhost:27017/url_shortner')
}

app.use(indexRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
	console.log(`Now listening on port ${PORT}`);
});