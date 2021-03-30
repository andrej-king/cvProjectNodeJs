// page is ready
$(function () {
	const homePage = window.location.origin;
	const hideImportantClass = 'd-none-important';
	const saveBtn = $('#save_btn');
	const editBtn = $('#edit_btn');


	$.ajax({
		url: homePage + '/api',
		success: function (result) {
			const cvObject = JSON.parse(result);
			const cv = cvObject.cv;
			const cvId = cvObject._id;

			if (typeof cvId !== 'undefined' && cvId !== '') {
				$('#cvId').val(cvId);
			}

			let editBtnHref = editBtn.attr('href');
			if (editBtnHref === '/edit' && (typeof cvId !== 'undefined' && cvId !== '')) {
				editBtn.attr('href', editBtnHref + '/' + cvObject._id);
			}

			// main info
			if (typeof cv.photoUrl !== 'undefined') {
				$('#profile-photo').attr('src', cv.photoUrl).attr('alt', cv.name + ' ' + cv.surname);
			} else {
				$('#profile-image-container').addClass(hideImportantClass);
			}

			if (typeof cv.name !== 'undefined' && typeof cv.surname !== 'undefined') {
				$('#profile-name').html(cv.name);
				$('#profile-surname').html(cv.surname);
			} else {
				$('#profile-name-wrap').addClass(hideImportantClass);
			}

			if (typeof cv.careerObjective !== 'undefined') {
				$('.profile-position').html(cv.careerObjective);
			} else {
				$('#profile-position-wrap').addClass(hideImportantClass);
			}



			// contacts
			showInfoOrHideParentBlock(cv.contacts.city, '#address', '#section-contacts_address', hideImportantClass);
			showInfoOrHideParentBlock(cv.contacts.phone, '#phone', '#section-contacts_phone', hideImportantClass);
			showInfoOrHideParentBlock(cv.contacts.email, '#email', '#section-contacts_email', hideImportantClass);


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
				$('#section-education').addClass(hideImportantClass);
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
				$('#section-technical-courses').addClass(hideImportantClass);
			}


			// soft skills
			if (cv.softSkillSet.length > 0) {
				let softSkillList = '<p class="soft-skill-list">';
				$(cv.softSkillSet).each(function (key, skill) {
					if (key === 0) {
						softSkillList += skill.substring(0, 1).toUpperCase() + skill.substring(1) + ', ';
					} else if (key !== cv.softSkillSet.length - 1) {
						softSkillList += skill + ', ';
					} else {
						softSkillList += skill + '.';
					}
				});
				softSkillList += '</p>';
				$('#soft-skills-inner').html(softSkillList);
			} else {
				$('#section-soft-skills').addClass(hideImportantClass);
			}

			// languages
			if (cv.language.length > 0) {
				let languageList = '<ul class="lang-list">';
				$(cv.language).each(function (key, lang) {
					languageList += '<li class="d-flex lang-item">';
						languageList += '<span class="col-6">' + lang.name +'</span>';

					if (typeof lang.level !== 'undefined') {
						languageList += '<span class="col-6">' + lang.level +'</span>';
					}

					languageList += '</li>';
				});
				languageList += '</ul>';
				$('#languages-inner').html(languageList);
			} else {
				$('#section-languages').addClass(hideImportantClass);
			}

			// about
			if (cv.summary.length > 0) {
				let aboutList = '<ul class="about-list">';
				$(cv.summary).each(function (key, value) {
					aboutList += '<li class="about-item">';
						aboutList += value;
					aboutList += '</li>';
				});
				aboutList += '</ul>';
				$('#about-inner').html(aboutList);
			} else {
				$('#section-about').addClass(hideImportantClass);
			}

			//  Tehnical skills
			if (cv.tehnicalSkillSet.length > 0) {
				let skillSet = '';
				$(cv.tehnicalSkillSet).each(function (key, value) {
					skillSet += '<div class="tehnical-skill-list">';
						if (typeof value.categoryName !== 'undefined') {
							skillSet += '<span class="tehnical-skills_subtitle">';
								skillSet += value.categoryName + ': '
							skillSet += '</span>';
						}

						if (value.skills.length > 0) {
							$(value.skills).each(function (key1, skill) {
								if (key1 !== value.skills.length - 1) {
									skillSet += skill + ', ';
								} else {
									skillSet += skill + '.';
								}
							});
						}
					skillSet += '</div>';
				});
				$('#tehnical-skills-inner').html(skillSet);
			} else {
				$('#section-tehnical-skills').addClass(hideImportantClass);
			}


			// Experiance
			if (cv.workExperiance.length > 0) {
				let workExp = '<div class="experiance-item">'
				$(cv.workExperiance).each(function (key, value) {
					workExp += '<div class="experiance-item">';
						workExp += '<div class="section-experiance_institution_title">';
							workExp += value.companyName;
						workExp += '</div>';

						workExp += '<div class="section-experiance_profession">';
							workExp += value.position;
						workExp += '</div>';

						workExp += '<div class="section-experiance_dates">';
							workExp += value.dateStart + ' - ' + value.dateEnd;
						workExp += '</div>';

						if (value.responsibilities.length > 0) {
							workExp += '<div class="section-experiance_responsibilities">';
								workExp += '<ul class="responsibility-list">';
								$(value.responsibilities).each(function (key1, responsibility) {
									workExp += '<li class="responsibility-item">';
										workExp += responsibility + '.';
									workExp += '</li>';
								});
								workExp += '</ul>';
							workExp += '</div>';
						}
					workExp += '</div>';
				});
				workExp += '</div>';
				$('#experiance-inner').html(workExp);
			} else {
				$('#section-experiance').addClass(hideImportantClass);
			}
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

