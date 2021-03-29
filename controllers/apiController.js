const CV = require('../models/cvModel');

exports.getFullCv = (req, res) => {
	CV.findOne()
		.then(cv => {
			if (cv === null) {
				const cv = new CV({
					userId: req.user._id,
					cv: {
						name: 'John',
						surname: 'Doe',
						age: 28,
						photoUrl: 'https://images.generated.photos/TAUF3MbbLbvt8O5EGOHYzcZIZxRZjC6ABF8xUgnXvF8/rs:fit:512:512/wm:0.95:sowe:18:18:0.33/Z3M6Ly9nZW5lcmF0/ZWQtcGhvdG9zL3Yy/XzA5Nzg5MjEuanBn.jpg',
						careerObjective: 'Game Developer',
						contacts: {
							city: 'Oklahoma City',
							email: 'johndoe@example.com',
							phone: '+1 (970) 111-1111'
						},
						summary: [
							'2 years of professional experience developing videogames, with one released title.',
							'Developed two PC games in C# and one in Flash 6.0 as side projects.',
							'Programmed gameplay content such as in-game objects behavior and mission progress tracking and implemented gameplay support systems that meet project requirements.',
							'Designed and developed Graphical User Interfaces for a number of game systems. Extensive hands-on experience with database programming.',
							'Extensive knowledge and job experience with creating technical specifications for gameplay systems that meet the requirements of the design and art teams.'
						],
						tehnicalSkillSet: [
							{
								categoryName: 'Languages',
								skills: [
									'ActionScript',
									'ASP',
									'Assembly',
									'BASIC',
									'C',
									'C++',
									'C#',
									'COBOL',
									'ColdFusion',
									'CSS',
									'HTML',
									'Interactive C',
									'Java',
									'JavaScript',
									'Lua',
									'Pascal',
									'Perl',
									'PHP',
									'PL/SQL',
									'SQL',
									'UNIX Shell Scripting',
									'VBScript',
									'Visual Basic.NET',
								]
							},
							{
								categoryName: 'Databases',
								skills: [
									'Microsoft Access',
									'MySQL',
									'Oracle 8i',
									'PostgreSQL 7.3/7.4',
									'SQL Server 2000'
								]
							},
							{
								categoryName: 'Platforms/Networking',
								skills: [
									'Windows 95/98/NT/2000/XP',
									'Linux (Red Hat, Yellow Dog)',
									'TCP/IP',
									'SSH'
								]
							},
							{
								categoryName: 'Tools',
								skills: [
									'Microsoft Visual Studio 6.0/2003/2005/2008',
									'Decoda',
									'DirectX',
									'Ogre',
									'RakNet',
									'CEGUI Layout Editor',
									'CVS',
									'Subversion',
									'Adobe Flash and Fireworks',
									'Adobe Photoshop',
									'Case Studio 2.0',
									'CrystalReports.NET',
									'pgAdmin III',
									'MySQL Query Browser',
									'CygWin',
									'UnitTest++'
								]
							},
						],
						softSkillSet: [
							'adaptability',
							'communication',
							'creative thinking',
							'dependability',
							'work ethic ',
							'teamwork',
							'positivity ',
							'time management',
							'motivation ',
							'problem-solving',
							'critical thinking',
							'conflict resolution'
						],
						workExperiance: [
							{
								dateStart: '09/2012',
								dateEnd: '05/2015',
								companyName: 'Center for Independent and Distance Learning, Norman, OK',
								position: 'Information Technology Analyst',
								responsibilities: [
									'Design and development of a large scale Windows GUI application in Visual Basic.NET/2005 connecting to Oracle 8i and PostgreSQL 7.3/7.4 databases.',
									'Created design documents for 3-tiered system architecture consisting of Presentation, Business Logic, and Data Access layers. Implemented above system in Visual Basic.NET.',
									'Development of ASP Web application connecting to MS Access database.',
									'Made extensive use of Object Oriented Programming principles in all software systems developed.',
									'Gathered project requirements and developed software process flowcharts and Graphical User Interface (GUI) design documents.'
								]
							},
							{
								dateStart: '06/2015',
								dateEnd: 'present',
								companyName: 'K20 Center, Norman, OK',
								position: 'Game Programmer',
								responsibilities: [
									'Developed videogames in C++ and Lua for PC and the Samsung Ultra Mobile Personal Computer platform. Used Ogre for 3D graphics, Flash CS3 and CEGUI for user interfaces, RakNet for networking, and the C++ Standard Template Library (STL).',
									'Created design documents (program flowcharts, UML designs, and ERD database designs) for portions of the game according to user specifications.',
									'Added and modified tables and stored procedures in MySQL 5.0 database and developed C++ code to interact with it.',
									'Worked on Lua scripts to define the behavior of in-game objects and to provide capabilities for interacting with them. Collaborated with designer to translate game content from storyboards into missions and gameplay scenarios',
									'Used Subversion for keeping track of source code changes. Performed game testing and used Acunote and Trac for keeping track of bugs found.'
								]
							}
						],
						education: [
							{
								dateStart: '09/2003',
								dateEnd: '06/2007',
								institutionName: 'Bachelor of Science in Computer Science',
								courseName: 'It'
							},
							{
								dateStart: '09/2007',
								dateEnd: '06/2012',
								institutionName: 'University of Oklahoma - Norman, OK',
								courseName: 'It'
							}
						],
						language: [
							{name: 'Portuguese', level: 'Full professional'},
							{name: 'English', level: 'Native'},
							{name: 'French', level: 'Professional working'}
						]
					}
				});
				cv.save();
				res.send(JSON.stringify(cv));
			} else {
				res.send(JSON.stringify(cv));
			}

		})
		.catch(error => {
			console.log(error);
			return false;
		});
}