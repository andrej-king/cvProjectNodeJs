// page is ready
$(function () {
	const homePage = window.location.origin;
	const hideImportantClass = 'd-none-important';

	$.ajax({
		url: homePage + '/api',
		success: function (result) {
			const cvObject = JSON.parse(result);
			const cv = cvObject.cv;

			// main info
			$('#profile-photo').attr('src', cv.photoUrl).attr('alt', cv.name + ' ' + cv.surname);
			$('#profile-name').html(cv.name);
			$('#profile-surname').html(cv.surname);
			$('.profile-position').html(cv.careerObjective);


			// contacts
			showInfoOrHideParentBlock(cv.contacts.city, '#address', '.section-contacts_address', hideImportantClass);
			showInfoOrHideParentBlock(cv.contacts.phone, '#phone', '.section-contacts_phone', hideImportantClass);
			showInfoOrHideParentBlock(cv.contacts.email, '#email', '.section-contacts_email', hideImportantClass);


			// education
			if (cv.education.length > 0) {
				let education = '';
				$(cv.education).each(function (key, ed) {
					education += '<div class="education-item">';
					education += '<div class="section-education_institution-title">';
					education += ed.institutionName;
					education += '</div>';

					education += '<div class="section-education-profession">';
					education += ed.courseName;
					education += '</div>';

					education += '<div class="section-education-dates">';
					education += ed.dateStart + ' - ' + ed.dateEnd;
					education += '</div>';
					education += '</div>';
				});
				$('#education-inner').html(education);
			} else {
				$('.section-education').addClass(hideImportantClass);
			}


			// technical courses
			if (cv.technicalCourses.length > 0) {
				let courses = '';
				$(cv.technicalCourses).each(function (key, course) {
					courses += '<div class="technical-courses-item">';
					courses += '<div class="section-technical-courses-title">';
					courses += course.courseName;
					courses += '</div>';

					courses += '<div class="section-technical-courses-dates">';
					courses += course.dateStart + ' - ' + course.dateEnd;
					courses += '</div>';
					courses += '</div>';
				});
				$('#technical-courses-inner').html(courses);
			} else {
				$('.section-technical-courses').addClass(hideImportantClass);
			}


			// soft skills
			if (cv.softSkillSet.length > 0) {
				let softSkillList = '<p class="soft-skill-list">';
				$(cv.softSkillSet).each(function (key, skill) {
					if (key === 0) {
						softSkillList += skill.substring(0, 1).toUpperCase() + skill.substring(1) + ', ';
					} else if (skill !== cv.softSkillSet[cv.softSkillSet.length - 1]) {
						softSkillList += skill + ', ';
					} else {
						softSkillList += skill;
					}
				});
				softSkillList += '</p>';
				$('#soft-skills-inner').html(softSkillList);
			} else {
				$('.section-soft-skills').addClass(hideImportantClass);
			}

			// languages
			let languageList = '<ul class="lang-list">';
			$(cv.language).each(function (key, lang) {
				console.log(lang);
				languageList += '<li class="d-flex lang-item">';
					languageList += '<span class="col-6">' + lang.name +'</span>';

				if (typeof lang.level !== 'undefined') {
					languageList += '<span class="col-6">' + lang.level +'</span>';
				}

				languageList += '</li>';
			});
			languageList += '</ul>';
			$('#languages-inner').html(languageList);
		}
	});
});

function showInfoOrHideParentBlock(checkField, fieldForInsert, parentBlock, hideClass) {
	if (typeof checkField === 'undefined') {
		$(parentBlock).addClass(hideClass);
	} else {
		$(fieldForInsert).html(checkField);
	}
}

function showEducationArray(checkArray) {

}