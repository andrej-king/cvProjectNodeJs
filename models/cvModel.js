const mongoose  = require('mongoose');
const Schema    = mongoose.Schema;

const cvSchema = new Schema({
	userId: {
		type: Schema.Types.ObjectId,
		ref: 'User',
		required: true
	},
	cv: {
		type: Object,
		required: true
	}
});

module.exports = mongoose.model('CV', cvSchema); // mongoose will autoconvert CV model to collection 'cvs'