const mongoose  = require('mongoose');
const Schema    = mongoose.Schema;

const cvSchema = new Schema({
	userId: {
		type: Schema.Types.ObjectId,
		ref: 'User',
		required: true
	},
	cv: {
		name: {type: String, required: true},
		surname: {type: String, required: true},
		age: {type: Number},
		birthday: {type: String},
		photoUrl: {type: String},
		careerObjective: {type: String, required: true},
		contacts: {
			city: { type: String },
			email: [{ type: String }],
			phone: [{ type: String }]
		},
		summary: [{type: String, required: true}],
		tehnicalSkillSet: [{
			categoryName: {type: String},
			skills: [{type: String, required: true}]
		}],
		softSkillSet: [{type: String, required: true}],
		workExperiance: [{
			dateStart: {type: String, required: true},
			dateEnd: {type: String, required: true},
			companyName: {type: String, required: true},
			position: {type: String, required: true},
			responsibilities: [{type: String}]
		}],
		education: [{
			dateStart: {type: String, required: true},
			dateEnd: {type: String, required: true},
			institutionName: {type: String, required: true},
			courseName: {type: String, required: true}
		}],
		technicalCourses: [{
			dateStart: {type: String},
			dateEnd: {type: String},
			courseName: {type: String}
		}],
		language: [{
			name: {type: String, required: true},
			level: {type: String}
		}],
		Other: {
			type: String
		}
	}
});

module.exports = mongoose.model('CV', cvSchema); // mongoose will autoconvert CV model to collection 'cvs'