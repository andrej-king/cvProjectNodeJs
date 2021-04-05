const CV = require('../models/cvModel');

exports.getCV = (req, res) => {
	res.render('cv.ejs', {
		pageTitle: 'Show CV',
		isEdit: false
	});
}

exports.editCV = (req, res) => {
	const cvId = req.params.cvId;
	// console.log(req.user);
	// console.log(cvId);
	CV.findById(cvId)
		.then(cv => {
			// console.log(cv);
			res.render('editCv.ejs', {
				pageTitle: 'Edit CV',
				isEdit: true,
				cv: cv
			});
		})
		.catch(error => {
			console.log(error);
			res.redirect('/');
		})
}

exports.postCV = (req, res) => {
	const allowFieldNames = [
		'name',
		'surname',
		'age',
		'photoUrl',
		'birthday',
		'careerObjective',
		'city',
		'email',
		'phone',
		'tehnicalSkillSet',
		'summary',
		'workExperiance',
		'language',
		'softSkillSet',
		'technicalCourses',
		'education'
	];

	const nestedObjects = [
		'city',
		'email',
		'phone'
	];

	const cvId = req.body.cvId;
	const name = req.body.name;
	const content = req.body.content;
	// console.log(req.body);
	if (allowFieldNames.includes(name)) {
		CV.findById(cvId)
			.then(cv => {
				const updatedCv = cv;
/*				switch (name) {
					case "name":
						updatedCv.cv.name = content;
						break;
					case "surname":
						updatedCv.cv.surname = content;
						break;
					case "age":
						updatedCv.cv.age = content;
						break;
					case "photoUrl":
						updatedCv.cv.photoUrl = content;
						break;
					case "birthday":
						updatedCv.cv.birthday = content;
						break;
					case "careerObjective":
						updatedCv.cv.careerObjective = content;
						break;
					case "city":
						updatedCv.cv.contacts.city = content;
						break;
					case "email":
						updatedCv.cv.contacts.email = content;
						break;
					case "phone":
						updatedCv.cv.contacts.phone = content;
						break;
					default:
						res.send({"result": "error", "msg": "Error"});
				}*/

				if (!nestedObjects.includes(name)) {
					updatedCv.cv[name] = content;
				} else {
					updatedCv.cv.contacts[name] = content;
				}

				// console.log(updatedCv);

				CV.updateOne({_id: cv._id}, {$set: updatedCv})
					.then(result => {
						if (result) {
							res.status(200).send({"result": "success", "msg": "Updated successfully"});
							// console.log('success updated');
						} else {
							res.status(500).send({"result": "error", "msg": "Error"});
							// console.log('not updated');
						}
					})
					.catch(error => {
						res.redirect('/');
						console.log(error);
					});
			})
	} else {
		res.res.status(500).send({"result": "error", "msg": "Error"});
	}


}