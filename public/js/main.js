// page is ready
$(function () {
	const homePage = window.location.origin;
	const editPageUrl = homePage + '/edit/';
	const hideImportantClass = 'd-none-important';
	const editBtn = $('#edit_btn');
	var isEditPage = false;

	if (window.location.href === homePage + '/') {
		isEditPage = false;
	} else {
		let editPageUrlLength = editPageUrl.length;
		if (window.location.href.substr(0, editPageUrlLength) === editPageUrl) {
			isEditPage = true;
		}
	}

	if (window.location.href === homePage + '/') {
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

			//region main info
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
			//endregion

			//region contacts
			showInfoOrHideParentBlock(cv.contacts.city, '#address', '#section-contacts_address', hideImportantClass);
			showInfoOrHideParentBlock(cv.contacts.phone, '#phone', '#section-contacts_phone', hideImportantClass);
			showInfoOrHideParentBlock(cv.contacts.email, '#email', '#section-contacts_email', hideImportantClass);
			//endregion

			//region education
			if (typeof cv.education !== 'undefined' && cv.education.length > 0) {
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
			//endregion

			//region technical courses
			if (typeof cv.technicalCourses !== 'undefined' && cv.technicalCourses.length > 0) {
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
			//endregion


			//region soft skills
			if (typeof cv.softSkillSet !== 'undefined' && cv.softSkillSet.length > 0) {
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
			//endregion

			//region languages
			if (typeof cv.language !== 'undefined' && cv.language.length > 0) {
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
			//endregion

			//region about
			if (typeof cv.summary !== 'undefined' && cv.summary.length > 0) {
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
			//endregion

			//region  Tehnical skills
			if (typeof cv.tehnicalSkillSet !== 'undefined' && cv.tehnicalSkillSet.length > 0) {
				let skillSet = '';
				$(cv.tehnicalSkillSet).each(function (key, value) {
					skillSet += '<div class="tehnical-skill-list">';
						if (typeof value.categoryName !== 'undefined') {
							skillSet += '<span class="tehnical-skills_subtitle">';
								skillSet += value.categoryName + ': '
							skillSet += '</span>';
						}

						if (typeof value.skills !== 'undefined' && value.skills.length > 0) {
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
			//endregion

			//region Experiance
			if (typeof cv.workExperiance !== 'undefined' && cv.workExperiance.length > 0) {

				let workExp = '<div class="experiance-item">'
				$(cv.workExperiance.reverse()).each(function (key, value) {
					if (value.companyName !== '' && value.position !== '' && value.dateStart !== '' && value.dateEnd !== '' && value.responsibilities.length > 0 && value.responsibilities[0] !== '') {
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

							if (typeof value.responsibilities !== 'undefined' && value.responsibilities.length > 0) {
								workExp += '<div class="section-experiance_responsibilities">';
									workExp += '<ul class="responsibility-list">';
									$(value.responsibilities).each(function (key1, responsibility) {
										if (responsibility !== '') {
											workExp += '<li class="responsibility-item">';
												workExp += responsibility + '.';
											workExp += '</li>';
										}
									});
									workExp += '</ul>';
								workExp += '</div>';
							}
						workExp += '</div>';
					}
				});
				workExp += '</div>';
				$('#experiance-inner').html(workExp);
			} else {
				$('#section-experiance').addClass(hideImportantClass);
			}
			//endregion
		}
	});
	} else {

		//region about section
		$('#plusAboutItem').on('click', function (e) {
			e.stopPropagation();
			e.preventDefault();

			let aboutItem = '<li class="about-item d-flex align-items-center">' +
				'<textarea rows="3" class="w-100 p-1 js-mainInfo" type="text" name="textSummary[]"></textarea>' +
				'<a href="#" class="btn text-danger ms-2 removeAboutItem"><i class="bi bi-trash-fill"></i></a>' +
				'</li>'
			$('.about-list').append(aboutItem);
		});

		$(document).on('click','.removeAboutItem',function(e) {
			e.stopPropagation();
			e.preventDefault();
			$(this).prev().val('');
			$(this).parents('.about-item').remove();
		});
		//endregion

		//region section soft skills
		$('#plusSoftSkillItem').on('click', function (e) {
			e.stopPropagation();
			e.preventDefault();

			let softSkillList = '<li class="soft-skill-item mb-1">' +
				'<input class="p-1 col-9 js-mainInfo" type="text" name="softSkillList[]">' +
				'<a href="#" class="btn text-danger ms-2 col-2 removeSoftSkillItem"><i class="bi bi-trash-fill"></i></a>' +
				'</li>';

			let parentSoftSkillItems = $(this).parents('.section-soft-skills').children('.soft-skills-inner');
			if (parentSoftSkillItems.children('.soft-skills-list').length) {
				$('.soft-skills-list').append(softSkillList);
			} else {
				parentSoftSkillItems.append('<ul class="soft-skills-list list-unstyled">'+ softSkillList +'</ul>');
			}
		});

		$(document).on('click', '.removeSoftSkillItem', function (e) {
			e.stopPropagation();
			e.preventDefault();
			$(this).prev().val('');
			$(this).parents('.soft-skill-item').remove();
		})
		//endregion

		//region section languages
		$('#plusLangItem').on('click', function (e) {
			e.stopPropagation();
			e.preventDefault();

			let lastDataId = '';
			$('input[name="langName[]"]').each(function () {
				lastDataId = $(this).data('id');
			});
			let newDataId = parseInt(lastDataId + 1);

			let languageList = '<li class="lang-item d-flex justify-content-around">' +
				'<input class="col-4 p-1 js-mainInfo" type="text" name="langName[]" data-id="' + newDataId + '">' +
				'<input class="col-5 p-1 js-mainInfo" type="text" name="langLevel[]" data-id="' + newDataId + '">' +
				'<a href="#" class="btn text-danger ms-2 col-2 removeLangItem" data-id="' + newDataId + '"><i class="bi bi-trash-fill"></i></a>' +
				'</li>';

			let parentLangItems = $(this).parents('.section-languages').children('.languages-inner');
			if (parentLangItems.children('.lang-list').length) {
				$('.lang-list').append(languageList);
			} else {
				parentLangItems.append('<ul class="lang-list list-unstyled">'+ languageList +'</ul>');
			}
		});

		$(document).on('click', '.removeLangItem', function (e) {
			e.stopPropagation();
			e.preventDefault();

			$(this).prev().val('');
			$(this).prev().prev().val('');
			$(this).parents('.lang-item').remove();
		})
		//endregion

		//region section tehnical skills set
		$('#plusTehnicalSkillsItem').on('click', function (e) {
			e.stopPropagation();
			e.preventDefault();

			let aboutItem = '<ul class="tehnical-skill-list list-unstyled">' +
				'<li class="technical-category-name mb-2 d-flex align-items-center">' +
					'<input class="p-1 mr-1 tehnicalSkillCategoryName js-mainInfo" type="text" name="tehnicalSkillCategoryName[]"/>' +
					'<a href="#" class="ms-2 text-primary plusTehnicalSkill"><i class="bi bi-plus-circle"></i></a>' +
				'</li>' +
				'</ul>' +
				'<hr>';
			$('#tehnical-skills-inner').append(aboutItem);
		});

		$(document).on('click','.plusTehnicalSkill',function(e) {
			e.stopPropagation();
			e.preventDefault();


			let inputName = $(this).prev().val() + '_technicalskillSet[]';
			let appendSkill = '<li class="technical-skill-item mb-2 d-flex align-items-center">' +
				'<input class="p-1 w-50 js-mainInfo" type="text" name="' + inputName + '">' +
				'<a href="#" class="btn text-danger ms-2 removeTechnicalskill"><i class="bi bi-trash-fill"></i></a>' +
				'</li>'
			$(this).parents('.tehnical-skill-list').append(appendSkill);
		});

		$(document).on('click','.removeTechnicalskill',function(e) {
			e.stopPropagation();
			e.preventDefault();
			$(this).prev().val('');
			$(this).parents('.technical-skill-item').remove();
		});
		//endregion

		//region section experiance
		$('#plusExperianceItem').on('click', function (e) {
			e.stopPropagation();
			e.preventDefault();
			let lastDataId = '';
			$('input[name="experianceTitle[]"]').each(function () {
				lastDataId = $(this).data('id');
			});
			let newDataId = parseInt(lastDataId + 1);

			let expItem = '<div class="experiance-item">' +
				'<div class="d-flex mb-3 align-items-center">' +
					'<div class="me-2 fw-bolder col-2">' +
						'<label class="" for="nameInput">Company name:</label>' +
					'</div>' +
					'<div class="col-10">' +
						'<input type="text" class="w-100 p-1 js-mainInfo" data-id="' + newDataId + '" name="experianceTitle[]">' +
					'</div>' +
				'</div>' +
				'<div class="d-flex mb-3 align-items-center">' +
					'<div class="me-2 fw-bolder col-2">' +
						'<label class="" for="nameInput">Position title:</label>' +
					'</div>' +
					'<div class="col-10">' +
						'<input type="text" class="w-100 p-1 js-mainInfo" data-id="' + newDataId + '" name="experiancePosition[]">' +
					'</div>' +
				'</div>' +
				'<div class="d-flex mb-3 align-items-center">' +
					'<div class="me-2 fw-bolder col-2">' +
						'<label class="" for="nameInput">Experiance dates:</label>' +
					'</div>' +
					'<div class="col-10">' +
						'<input type="text" class="w-40 p-1 js-mainInfo" data-id="' + newDataId + '" name="experianceDateStart[]">' +
						'<input type="text" class="w-40 p-1 js-mainInfo" data-id="' + newDataId + '" name="experianceDateEnd[]">' +
					'</div>' +
				'</div>' +
				'<div class="responsibilities-wrap">' +
					'<div class="me-2 d-flex align-items-center mb-2 fw-bolder">' +
						'<label class="" for="nameInput">Responsibilities:</label>' +
						'<a href="#" class="ms-2 text-primary plusResponsibilityItem" data-id="' + newDataId + '"><i class="bi bi-plus-circle"></i></a>' +
					'</div>' +
					'<div class="responsibilities">' +
						'<ul class="list-unstyled responsibility-list" data-id="<%= dataId %>">' +
							'<li class="d-flex align-items-center responsibility-item">' +
								'<textarea class="w-100 mb-2 p-1 js-mainInfo" rows="3" data-id="' + newDataId + '" name="responsibility[]"></textarea>' +
								'<a href="#" class="btn text-danger ms-2 removeResponsibilityItem"><i class="bi bi-trash-fill"></i></a>' +
							'</li>'
						'</ul>' +
					'</div>' +
				'</div>' +
			'</div>';

			$('.experiance-inner').append(expItem);
		});

		$('.plusResponsibilityItem').on('click', function (e) {
			e.stopPropagation();
			e.preventDefault();
			let responsibilityItem = '<li class="d-flex align-items-center responsibility-item">' +
				'<textarea class="w-100 mb-2 p-1 js-mainInfo" data-id="' + $(this).data('id') + '" rows="3" name="responsibility[]"></textarea>' +
				'<a href="#" class="btn text-danger ms-2 removeResponsibilityItem"><i class="bi bi-trash-fill"></i></a>' +
				'</li>';
			let parent = $(this).parents('.responsibilities-wrap').children('.responsibilities');
			console.log(parent.children('.responsibility-list').length);
			if(parent.children('.responsibility-list').length) {
				parent.children('.responsibility-list').append(responsibilityItem);
			} else {
				parent.append('<ul class="responsibility-list">' + responsibilityItem + '</ul>')
			}
		});

		$(document).on('click', '.removeResponsibilityItem', function (e) {
			e.stopPropagation();
			e.preventDefault();
			$(this).prev().val('');
			$(this).parents('.responsibility-item').remove();
		});
		//endregion

		//region tehnical Skill Set
		ignoreWiteSpaceKey('.tehnicalSkillCategoryName');

		//endregion

		//region Trigger the event when the field loses focus
		$(document).on('blur', '.js-mainInfo', function (e) {

			//region tehnical skill set
			const tehnicalSkillSet = [];
			let skills = [];
			$('input[name="tehnicalSkillCategoryName[]"]').each(function() {

				let inputName = 'input[name="' + $(this).val() +'_technicalskillSet[]"]';
				$(inputName).each(function() {
					if ($(this).val() !== '') {
						skills.push($(this).val());
					}
				});

				if (skills.length > 0) {
					tehnicalSkillSet.push({
						categoryName: $(this).val(),
						skills: skills
					});
				}
				skills = [];
			});
			//endregion

			//region experiace items
			const experiaceItems = [];
			let expPosition = '';
			let expDateStart = '';
			let expDateEnd = '';
			let expResponsibility = [];
			let errors = [];
			$('input[name="experianceTitle[]"]').each(function () {
				let dataId = $(this).data("id");
				if ($(this).val() === '') {
					errors.push('experianceTitle empty')
				}

				$('input[name="experiancePosition[]"]').each(function () {
					if ($(this).data("id") === dataId) {
						if ($(this).val() !== '') {
							expPosition = $(this).val();
						} else {
							errors.push('experiancePosition empty')
						}

					}
				});

				$('input[name="experianceDateStart[]"]').each(function () {
					if ($(this).data("id") === dataId) {
						if ($(this).val() !== '') {
							expDateStart = $(this).val();
						} else {
							errors.push('experianceDateStart empty')
						}
					}
				});

				$('input[name="experianceDateEnd[]"]').each(function () {
					if ($(this).data("id") === dataId) {
						if ($(this).val() !== '') {
							expDateEnd = $(this).val();
						} else {
							errors.push('experianceDateEnd empty')
						}

					}
				});

				$('textarea[name="responsibility[]"]').each(function () {
					if ($(this).data("id") === dataId) {
						if ($(this).val() !== '') {
							expResponsibility.push($(this).val());
						}
					}
				});

				if (errors.length <= 0) {
					experiaceItems.push({
						companyName: $(this).val(),
						position: expPosition,
						dateStart: expDateStart,
						dateEnd: expDateEnd,
						responsibilities: expResponsibility
					});
				}
				expPosition = '';
				expDateStart = '';
				expDateEnd = '';
				expResponsibility = [];
				errors = [];
			});
			//endregion

			//region summary
			const summary = [];
			$('textarea[name="textSummary[]"]').each(function() {
				summary.push($(this).val());
			});
			//endregion


			let name = e.target.name;
			let content = e.target.value.trim();
			if (name === 'photoUrl') {
				$('#profile-photo').attr('src', content);
			}

			//region language list
			const langList = [];
			let langDataId, langVal, langLevel;
			$('input[name="langName[]"]').each(function () {
				langDataId = $(this).data('id');
				langVal = $(this).val().trim();
				langLevel = $('input[name="langLevel[]"][data-id="'+ langDataId +'"]').val().trim();

				if (langVal !== '' && langLevel !== '') {
					langList.push({
						name: langVal,
						level: langLevel
					})
				}
			});
			//endregion

			//region soft skill list
			const softSkillList = [];
			let softSkillVal;
			$('input[name="softSkillList[]"]').each(function () {
				softSkillVal = $(this).val().trim()
				if (softSkillVal !== '') {
					softSkillList.push(softSkillVal);
				}
			});
			//endregion

			if (name === 'tehnicalSkillCategoryName[]' || name.indexOf("technicalskillSet[]") >= 0) {
				name = 'tehnicalSkillSet';
				content = tehnicalSkillSet;
			} else if (name === 'textSummary[]') {
				name = 'summary';
				content = summary;
			} else if (name === 'experianceTitle[]' || name === 'experiancePosition[]' ||
				name === 'experianceDateStart[]' || name === 'experianceDateEnd[]' || name === 'responsibility[]')
			{
				name = 'workExperiance';
				content = experiaceItems;
			} else if (name === 'langName[]' || name === 'langLevel[]') {
				name = 'language';
				content = langList;
			} else if (name === 'softSkillList[]') {
				name = 'softSkillSet';
				content = softSkillList;
			}


			if (name !== '' && content !== '') {
				$.ajax({
					url: editPageUrl,
					method: "POST",
					dataType: "json",
					data: {cvId: $('#cvId').val(), name: name, content: content},
					success: function (result) {
						var now = new Date(Date.now());
						var formatted = now.getHours() + ":" + now.getMinutes() + ":" + now.getSeconds();
						$('.currentTime').html(formatted);
						let resultColor = '';
						if (result.result === 'success') {
							resultColor = 'text-success';
						} else {
							resultColor = 'text-danger';
						}

						$('.toast-body').html(`<p class="${resultColor}">${result.msg}</p>`);
						$('.toast').toast('show');
					}
				});
			}
		});
		//endregion
	}
});

function showInfoOrHideParentBlock(checkField, fieldForInsert, parentBlock, hideClass) {
	if (typeof checkField === 'undefined') {
		$(parentBlock).addClass(hideClass);
	} else {
		$(fieldForInsert).html(checkField);
	}
}

function ignoreWiteSpaceKey(input) {
	$(document).on('keypress', input, function (evt) {
		var keycode = evt.charCode || evt.keyCode;
		if (keycode  === 32) {
			return false;
		}
	});
}