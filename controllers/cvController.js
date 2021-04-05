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
		'education',
		'all'
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

				if (!nestedObjects.includes(name)) {
					updatedCv.cv[name] = content;
				} else if (name === 'all') {
					updatedCv.cv = content;
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