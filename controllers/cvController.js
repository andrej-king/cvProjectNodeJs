exports.getCV = (req, res) => {
	res.render('cv.ejs', {
		pageTitle: 'Show CV',
		isEdit: false
	});
}

exports.editCV = (req, res) => {
	const cvId = req.params.cvId;
	console.log(cvId);
	res.render('cv.ejs', {
		pageTitle: 'Edit CV',
		isEdit: true
	});
}