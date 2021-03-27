exports.getCV = (req, res) => {
	res.render('cv.ejs', {
		pageTitle: 'CV'
	});
}