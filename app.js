// region declaring variables
require('dotenv').config();
const express       = require('express');
const ejs           = require('ejs');
const bodyParser    = require('body-parser');
const mongoose      = require('mongoose');
const mongoConnect  = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_SERVER}/${process.env.DB_NAME}?retryWrites=true&w=majority`;
const User          = require('./models/user');

const apiRouter     = require('./routes/apiRouter');
const cvRouter      = require('./routes/cvRouter');
const errorRouter   = require('./routes/errorRouter');
const PORT          = process.env.PORT || 3000;
const app           = express();
// endregion

app.use((req, res, next) => {
	User.findById(`${process.env.USER_ID}`)
		.then(user => {
			req.user = user;
			next();
		})
		.catch(error => {
			console.log(error);
		})
});

app.set('view engine', ejs);
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

// region routes
app.use('/api', apiRouter); // api is a filter
app.use(cvRouter);
app.use(errorRouter);
// endregion

mongoose.connect(mongoConnect, {useUnifiedTopology: true, useNewUrlParser: true})
	.then(result => {
		User.findOne().then(user => {
			if (!user) {
				const user = new User({
					name:   process.env.NEW_USERNAME,
					email:  process.env.NEW_USER_EMAIL,
				});
				user.save();
			}
		});

		app.listen(PORT, () => {
			console.log(`${PORT} is running`);
		});
	})
	.catch(error => {
		console.log(error);
	});