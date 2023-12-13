import React, { useState } from 'react'
import "./resume.css"

export default function ResumeBuilder() {
    const [formData, setFormData] = useState({
        "personalDetails": {
            "name": "John Doe",
            "address": "123 Main Street, Cityville",
            "email": "john.doe@example.com",
            "phone": "+1 (123) 456-7890",
            "dateOfBirth": "1990-01-15",
            "website": "www.johndoe.com",
            "linkedin": "linkedin.com/in/johndoe",
            "photo": "profile-picture.jpg"
        },
        "educations": [
            {
                "course": "Bachelor of Science in Computer Science",
                "university": "City University",
                "grade": "A",
                "year": "2016"
            }
        ],
        "experiences": [
            {
                "companyName": "Tech Solutions Inc.",
                "jobTitle": "Software Engineer",
                "startDate": "2017-05-10",
                "endDate": "2020-08-15",
                "details": "Developed and maintained software applications."
            }
        ],
        "skills": [
            "Java",
            "Python",
            "Web Development",
            "Database Management"
        ],
        "objective": "Dedicated and results-driven software engineer with a strong background in Java and Python programming. Seeking challenging opportunities to apply my skills in a dynamic team environment.",
        "projects": [
            {
                "name": "Online Shopping App",
                "description": "Developed a fully functional e-commerce website with user authentication, product catalog, and shopping cart functionality."
            },
            {
                "name": "Task Management System",
                "description": "Designed and implemented a task management system to streamline project workflows and enhance collaboration among team members."
            }
        ],
        "languages": [
            "English",
            "Spanish"
        ],
        "interests": [
            "Traveling",
            "Reading",
            "Photography"
        ],
        "achievements": ["Received the 'Outstanding Employee of the Year' award at Tech Solutions Inc. for exceptional contributions to project success."],
        "sign": "John Doe"
    }
    );

    const addEducation = () => {
        setFormData({
            ...formData,
            educations: [
                ...formData.educations,
                { course: '', university: '', grade: '', year: '' },
            ],
        });
    };

    const addExperience = () => {
        setFormData({
            ...formData,
            experiences: [
                ...formData.experiences,
                { companyName: '', jobTitle: '', startDate: '', endDate: '', details: '' },
            ],
        });
    };

    const addProject = () => {
        setFormData({
            ...formData,
            projects: [...formData.projects, { title: '', details: '' }],
        });
    };
    const addSkill = () => {
        setFormData({
            ...formData,
            skills: [...formData.skills, ''],
        });
    };
    const addLanguage = () => {
        setFormData({
            ...formData,
            languages: [...formData.languages, ''],
        });
    };
    const addInterest = () => {
        setFormData({
            ...formData,
            interests: [...formData.interests, ''],
        });
    };
    const addAchievement = () => {
        setFormData({
            ...formData,
            achievements: [...formData.achievements, ''],
        });
    };
    const handleChange = (e, index, key) => {
        const { name, value } = e.target;

        // console.log(`this ${Array.isArray(formData[name])}`)

        if (Array.isArray(formData[name])) {

            return setFormData(preValue => {
                const values = preValue[name];
                values[index] = value
                return {
                    ...preValue,
                    [name]: values
                }
            });

        }
        console.log(name, value)
        if (key) {
            const updatedFormData = index !== null ? [...formData[key]] : { ...formData[key] };

            if (index === null) updatedFormData[name] = value;

            else updatedFormData[index][name] = value;

            setFormData({
                ...formData,
                [key]: updatedFormData
            });
            return
        }

        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const generateLaTex = (data) => {
        let latexCode = `
      \\documentclass[letterpaper,10pt]{article}
      \\usepackage[left=1in, right=1in, top=1in, bottom=1in]{geometry}
      \\usepackage{enumitem}
      \\usepackage{hyperref}
      \\usepackage{graphicx}
      \\pagestyle{empty}
      
      % Adjust section spacing
      \\usepackage{titlesec}
      \\titlespacing*{\\section}{0pt}{8pt}{4pt}
      \\titlespacing*{\\subsection}{0pt}{6pt}{2pt}
      
      \\begin{document}
      
      % Personal Details
      \\begin{center}
        \\textbf{\\Huge ${data.personalDetails.name}} \\\\
        ${data.personalDetails.address} \\\\
        Email: ${data.personalDetails.email} | Phone: ${data.personalDetails.phone} \\\\
        Date of Birth: ${data.personalDetails.dateOfBirth} \\\\
        Website: \\url{${data.personalDetails.website}} \\\\
        LinkedIn: \\url{${data.personalDetails.linkedin}} \\\\
        \\includegraphics[width=2cm]{${data.personalDetails.photo}}
      \\end{center}
      
      % Objective
      \\section*{Objective}
      ${data.objective}
      
      % Education
      \\section*{Education}
      \\begin{itemize}[left=0pt]
        ${data.educations.map(edu => `
        \\item \\textbf{${edu.course}} at ${edu.university} (${edu.year}) - Grade: ${edu.grade}
        `).join('')}
      \\end{itemize}
      
      % Work Experience
      \\section*{Work Experience}
      \\begin{itemize}[left=0pt]
        ${data.experiences.map(exp => `
        \\item \\textbf{${exp.jobTitle}} at ${exp.companyName} (${exp.startDate} to ${exp.endDate}) \\\\
        ${exp.details}
        `).join('')}
      \\end{itemize}
      
      % Skills
      \\section*{Skills}
      ${data.skills.join(', ')}
      
      % Projects
      \\section*{Projects}
      \\begin{itemize}[left=0pt]
        ${data.projects.map(project => `
        \\item \\textbf{${project.name}} - ${project.description}
        `).join('')}
      \\end{itemize}
      
      % Languages
      \\section*{Languages}
      ${data.languages.join(', ')}
      
      % Interests
      \\section*{Interests}
      ${data.interests.join(', ')}
      
      % Achievements
      \\section*{Achievements}
      \\begin{itemize}[left=0pt]
        ${data.achievements.map(achievement => `
        \\item ${achievement}
        `).join('')}
      \\end{itemize}
      
      % Signature
      \\section*{Signature}
      ${data.sign}
      
      \\end{document}
      `;

        return latexCode;
    }
    const generateResume = (data) => {
        let latexCode = `
        \\documentclass[a4paper,10pt]{article}
        \\usepackage[left=1in,right=1in,top=1in,bottom=1in]{geometry}
        \\usepackage{enumitem}

        \\begin{document}

        \\section*{Personal Details}
        \\begin{itemize}
            \\item \\textbf{Name:} ${data.personalDetails.name}
            \\item \\textbf{Address:} ${data.personalDetails.address}
            \\item \\textbf{Email:} ${data.personalDetails.email}
            \\item \\textbf{Phone:} ${data.personalDetails.phone}
            \\item \\textbf{Date of Birth:} ${data.personalDetails.dateOfBirth}
            \\item \\textbf{Website:} ${data.personalDetails.website}
            \\item \\textbf{LinkedIn:} ${data.personalDetails.linkedin}
        \\end{itemize}

        \\section*{Objective}
        ${data.objective}

        \\section*{Education}
    `;

        data.educations.forEach((education) => {
            latexCode += `
            \\subsection*{${education.course}}
            \\textbf{University:} ${education.university} \\
            \\textbf{Grade:} ${education.grade} \\
            \\textbf{Year:} ${education.year} \\\\
        `;
        });

        // Repeat similar sections for experiences, skills, projects, languages, interests, achievements

        latexCode += `
        \\section*{Sign}
        ${data.sign}

        \\end{document}
    `;

        return latexCode;
    };

    const generateLatex = (data) => {
        // Start LaTeX document
        let latexString = `\\documentclass{moderncv}` +
            `\\usepackage{graphicx}` +
            `\\begin{document}` +
            `\\makecvtitle` +
            `% Personal details section %`;

        // Add personal details
        latexString += `\\name{${data.personalDetails.name}}` +
            `\\address{${data.personalDetails.address}}` +
            `\\email{${data.personalDetails.email}}` +
            `\\phone{${data.personalDetails.phone}}` +
            `% Include photo if provided
    ${data.personalDetails.photo ? `\\photo[height=3cm]{${data.personalDetails.photo}}` : ""}`;

        // Add sections dynamically
        const sections = ["educations", "experiences", "skills", "objective", "projects", "languages", "interests", "achievements"];
        for (const section of sections) {
            const sectionData = data[section];
            if (sectionData) {
                if (Array.isArray(sectionData)) { // Handle array of objects
                    latexString += `\\section{${section.toUpperCase()}}\n`;
                    for (const item of sectionData) {
                        latexString += `  ${formatSectionItem(section, item)}\n`;
                    }
                } else { // Handle single string
                    latexString += `\\section{${section.toUpperCase()}}\n`;
                    latexString += `  ${sectionData}\n`;
                }
            }
        }

        // Add signature
        latexString += `\\signature{${data.sign}}`;

        // End LaTeX document
        latexString += `\\end{document}`;

        return latexString;
    };

    const formatSectionItem = (section, item) => {
        switch (section) {
            case "educations":
                return `${item.course} \\emph{(${item.university})} \\hfill ${item.year} (${item.grade})`;
            case "experiences":
                return `${item.companyName} \\emph{(${item.jobTitle})} \\hfill ${formatDate(item.startDate)} - ${formatDate(item.endDate)}` +
                    `\n  ${item.details}`;
            case "skills":
                return item;
            case "projects":
                return `\\textbf{${item.name}} \\hfill ${formatDate(item.date)}` +
                    `\n  ${item.description}`;
            case "languages":
                return item;
            case "interests":
                return item;
            case "achievements":
                return item;
            default:
                return "";
        }
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return `${date.getUTCMonth() + 1}/${date.getUTCFullYear()}`;
    };


    // OverLeaf Resume
    const generateResumeContent = (data) => {
        let content = `
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
%     LAST UPDATED DATE
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
\\lastupdated

%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
%     TITLE NAME
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
\\namesection{${data.personalDetails.name}}{${data.personalDetails.name}}{DOB- ${data.personalDetails.dateOfBirth} \\\\
\\href{mailto:${data.personalDetails.email}}{${data.personalDetails.email}} | ${data.personalDetails.phone} | \\href{${data.personalDetails.linkedin}}{LinkedIn - ${data.personalDetails.linkedin}}
}

%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
%     COLUMN ONE
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

\\begin{minipage}[t]{0.33\\textwidth} 
`;

        // Add education section
        content += `
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
%     EDUCATION
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
\\section{Education} 
`;

        data.educations.forEach((education) => {
            content += `
\\subsection{${education.university}}
\\descript{${education.course}}
\\location{${education.year} | Grade - ${education.grade}}
\\sectionsep
`;
        });

        // Add links section
        content += `
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
%     LINKS
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
\\section{Links} 
Github:// \\href{${data.links.github}}{\\bf ${data.links.github}} \\\\
LinkedIn://  \\href{${data.links.linkedin}}{${data.links.linkedin}} \\\\
\\sectionsep
`;

        // Add coursework section
        content += `
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
%     COURSEWORK
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
\\section{Coursework}
`;

        data.coursework.forEach((course) => {
            content += `\\subsection{${course.title}}\n`;

            if (course.link) {
                content += `\\subsection{${course.link}}\n`;
            }

            content += `${course.details}\n\\sectionsep\n`;
        });

        // Add skills section
        content += `
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
%     SKILLS
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
\\section{Skills}
`;

        data.skills.forEach((skill) => {
            content += `\\subsection{${skill.category}}\n`;

            skill.items.forEach((item) => {
                content += `\\location{${item.title}}\n`;

                if (item.details) {
                    content += `${item.details}\n`;
                }

                content += `\\sectionsep\n`;
            });
        });

        // Close column one
        content += `
\\end{minipage} 
\\hfill
\\begin{minipage}[t]{0.66\\textwidth} 

%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
%     COLUMN TWO
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
`;

        // Add experience section
        content += `
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
%     EXPERIENCE
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
\\section{Experience}
`;

        data.experience.forEach((exp) => {
            content += `\\runsubsection{${exp.companyName}}\n`;
            content += `\\descript{|${exp.jobTitle}}\n`;
            content += `\\location{${exp.startDate} - ${exp.endDate} | ${exp.location}}\n`;
            content += `${exp.details}\n\\sectionsep\n`;
        });

        // Add projects section
        content += `
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
%     PROJECTS
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
\\section{Projects}
`;

        data.projects.forEach((project) => {
            content += `\\runsubsection{${project.name}}\n`;
            content += `\\descript{|${project.technologies}}\n`;
            content += `${project.description}\n\\sectionsep\n`;
        });

        // Add languages section
        content += `
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
%     LANGUAGES
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
\\section{Languages}
`;

        data.languages.forEach((language) => {
            content += `\\location{${language}}\n`;
            content += `\\sectionsep\n`;
        });

        // Add interests section
        content += `
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
%     INTERESTS
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
\\section{Interests}
`;

        data.interests.forEach((interest) => {
            content += `\\location{${interest}}\n`;
            content += `\\sectionsep\n`;
        });

        // Add achievements section
        content += `
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
%     ACHIEVEMENTS
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
\\section{Achievements}
`;

        data.achievements.forEach((achievement) => {
            content += `${achievement}\n`;
            content += `\\sectionsep\n`;
        });

        // Add sign section
        content += `
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
%     SIGNATURE
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
\\section{Sign}
${data.sign}
`;

        // Close column two and the document
        content += `
\\end{minipage} 
\\end{document}
`;

        return content;
    };

    // PDFmake
    var dd = {
        pageSize: 'A4',
        "content": [
            {
                "text": "John Doe",
                "style": "header"
            },

            {
                "text": "Date of Birth: 1990-01-15"
            },
            {
                "text": "Website: www.johndoe.com"
            },
            {
                "text": ""
            },
            {
                columns: [
                    {
                        // auto-sized columns have their widths based on their content
                        width: '*',
                        text: 'Phone: +1 (123) 456-7890'
                    },
                    {
                        // star-sized columns fill the remaining space
                        // if there's more than one star-column, available width is divided equally
                        width: '*',
                        text: 'john.doe@example.com'
                    },
                    {
                        // fixed width
                        width: '*',
                        text: 'linkedin.com/in/johndoe'
                    }
                ],
                // optional space between columns
                columnGap: 10
            },
            {
                "text": "Work Experience",
                "style": "header"
            },
            {
                "canvas": [{
                    "lineColor": "gray",
                    "type": "line",
                    "x1": 0,
                    "y1": 0,
                    "x2": 515,
                    "y2": 0,
                    "lineWidth": 1
                }]
            },
            [
                {
                    "text": "Software Engineer",
                    "bold": true
                },
                {
                    "text": "Tech Solutions Inc., 2017-05-10 - 2020-08-15"
                },
                {
                    "text": "Details: Developed and maintained software applications."
                },

            ],
            {
                "text": "Education",
                "style": "header"
            }, {
                "canvas": [{
                    "lineColor": "gray",
                    "type": "line",
                    "x1": 0,
                    "y1": 0,
                    "x2": 515,
                    "y2": 0,
                    "lineWidth": 1
                }]
            },
            [
                {
                    "text": "Bachelor of Science in Computer Science",
                    "bold": true
                },
                {
                    "text": "City University, 2016",
                    "italics": true
                },
                {
                    "text": "Grade: A"
                },
            ],

            {
                "text": "Skills",
                "style": "header"
            },
            {
                "canvas": [{
                    "lineColor": "gray",
                    "type": "line",
                    "x1": 0,
                    "y1": 0,
                    "x2": 515,
                    "y2": 0,
                    "lineWidth": 1
                }]
            },
            {
                "ul": [
                    "Java",
                    "Python",
                    "Web Development",
                    "Database Management"
                ]
            },
            {
                "text": "Objective",
                "style": "header"
            },
            {
                "canvas": [{
                    "lineColor": "gray",
                    "type": "line",
                    "x1": 0,
                    "y1": 0,
                    "x2": 515,
                    "y2": 0,
                    "lineWidth": 1
                }]
            },
            "Dedicated and results-driven software engineer with a strong background in Java and Python programming. Seeking challenging opportunities to apply my skills in a dynamic team environment.",
            {
                "text": "Projects",
                "style": "header"
            },
            {
                "canvas": [{
                    "lineColor": "gray",
                    "type": "line",
                    "x1": 0,
                    "y1": 0,
                    "x2": 515,
                    "y2": 0,
                    "lineWidth": 1
                }]
            },
            [
                {
                    "text": "Online Shopping App",
                    "bold": true,

                },
                {
                    "text": "Developed a fully functional e-commerce website with user authentication, product catalog, and shopping cart functionality."
                },
                ""
            ],
            [
                {
                    "text": "Task Management System",
                    "bold": true
                },
                {
                    "text": "Designed and implemented a task management system to streamline project workflows and enhance collaboration among team members."
                },
                ""
            ],
            {
                "text": "Languages",
                "style": "header"
            }, {
                "canvas": [{
                    "lineColor": "gray",
                    "type": "line",
                    "x1": 0,
                    "y1": 0,
                    "x2": 515,
                    "y2": 0,
                    "lineWidth": 1
                }]
            },
            {
                "ul": [
                    "English",
                    "Spanish"
                ]
            },
            {
                "text": "Interests",
                "style": "header"
            }, {
                "canvas": [{
                    "lineColor": "gray",
                    "type": "line",
                    "x1": 0,
                    "y1": 0,
                    "x2": 515,
                    "y2": 0,
                    "lineWidth": 1
                }]
            },
            {
                "ul": [
                    "Traveling",
                    "Reading",
                    "Photography"
                ]
            },
            {
                "text": "Achievements",
                "style": "header"
            }, {
                "canvas": [{
                    "lineColor": "gray",
                    "type": "line",
                    "x1": 0,
                    "y1": 0,
                    "x2": 515,
                    "y2": 0,
                    "lineWidth": 1
                }]
            },
            {
                "ul": [
                    "Received the 'Outstanding Employee of the Year' award at Tech Solutions Inc. for exceptional contributions to project success."
                ]
            },
            {
                "text": "John Doe",
                "alignment": "right"
            }
        ],
        "styles": {
            "header": {
                "margin": [0, 8, 0, 0],
                "fontSize": 12,
                "bold": true
            }
        },
        defaultStyle: {
            fontSize: 10,
        }

    }

    const submitForm = () => {
        //      var data = formData;

        // // Define pdfmake content
        // var content = [
        //     // Personal Details
        //     { text: 'Personal Details', style: 'header' },
        //     { text: `Name: ${data.personalDetails.name}` },
        //     { text: `Address: ${data.personalDetails.address}` },
        //     { text: `Email: ${data.personalDetails.email}` },
        //     { text: `Phone: ${data.personalDetails.phone}` },
        //     { text: `Date of Birth: ${data.personalDetails.dateOfBirth}` },
        //     { text: `Website: ${data.personalDetails.website}` },
        //     { text: `LinkedIn: ${data.personalDetails.linkedin}` },
        //     { image: data.personalDetails.photo, width: 100, height: 100 },

        //     // Education
        //     { text: '\nEducation', style: 'header' },
        //     ...data.educations.map(edu => [
        //         { text: edu.course, bold: true },
        //         { text: `${edu.university}, ${edu.year}`, italics: true },
        //         { text: `Grade: ${edu.grade}` },
        //         '\n'
        //     ]),

        //     // Work Experience
        //     { text: '\nWork Experience', style: 'header' },
        //     ...data.experiences.map(exp => [
        //         { text: exp.jobTitle, bold: true },
        //         { text: `${exp.companyName}, ${exp.startDate} - ${exp.endDate}` },
        //         { text: `Details: ${exp.details}` },
        //         '\n'
        //     ]),

        //     // Skills
        //     { text: '\nSkills', style: 'header' },
        //     { ul: data.skills },

        //     // Objective
        //     { text: '\nObjective', style: 'header' },
        //     data.objective,

        //     // Projects
        //     { text: '\nProjects', style: 'header' },
        //     ...data.projects.map(project => [
        //         { text: project.name, bold: true },
        //         { text: project.description },
        //         '\n'
        //     ]),

        //     // Languages
        //     { text: '\nLanguages', style: 'header' },
        //     { ul: data.languages },

        //     // Interests
        //     { text: '\nInterests', style: 'header' },
        //     { ul: data.interests },

        //     // Achievements
        //     { text: '\nAchievements', style: 'header' },
        //     { ul: data.achievements },

        //     // Sign
        //     { text: `\n\n\n\n${data.sign}`, alignment: 'right' }
        // ];

        // // Styles definition
        // var styles = {
        //     header: {
        //         fontSize: 18,
        //         bold: true
        //     }
        // };

        // // Create PDF document definition
        // var docDefinition = {
        //     content: content,
        //     styles: styles
        // };
        console.log(formData)

    };
    const resetForm = () => {
        setFormData({
            personalDetails: {
                name: '',
                address: '',
                email: '',
                phone: '',
                dateOfBirth: '',
                website: '',
                linkedin: '',
                photo: '',
            },
            educations: [],
            experiences: [],
            skills: [],
            objective: '',
            projects: [],
            languages: [],
            interests: [],
            achievements: '',
            sign: '',
        });
    }




    return (
        <div className='px-2 bg-gray-200'>
            <h2 className='text-2xl px-2'>Resume Builder</h2>

            <p>Please this form.</p>
            <form id="resumeForm">
                <div className='rounded-md p-2 bg-white my-2'>
                    <h2 className="font-bold text-xl">Personal Details</h2>
                    <label htmlFor="name">Name:</label>
                    <input className="px-2 py-1 border-2 rounded-md mb-2" type="text" id="name" name="name" onChange={(e) => handleChange(e, null, "personalDetails")} />

                    <label htmlFor="address">Address:</label>
                    <input className="px-2 py-1 border-2 rounded-md mb-2" type="text" id="address" name="address" onChange={(e) => handleChange(e, null, "personalDetails")} />

                    <label htmlFor="email">Email:</label>
                    <input className="px-2 py-1 border-2 rounded-md mb-2" type="email" id="email" name="email" onChange={(e) => handleChange(e, null, "personalDetails")} />

                    <label htmlFor="phone">Phone:</label>
                    <input className="px-2 py-1 border-2 rounded-md mb-2" type="tel" id="phone" name="phone" onChange={(e) => handleChange(e, null, "personalDetails")} />

                    <label htmlFor="dob">Date of Birth:</label>
                    <input className="px-2 py-1 border-2 rounded-md mb-2" type="date" id="dob" name="dateOfBirth" onChange={(e) => handleChange(e, null, "personalDetails")} />

                    <label htmlFor="website">Website:</label>
                    <input className="px-2 py-1 border-2 rounded-md mb-2" type="url" id="website" name="website" onChange={(e) => handleChange(e, null, "personalDetails")} />

                    <label htmlFor="linkedin">LinkedIn:</label>
                    <input className="px-2 py-1 border-2 rounded-md mb-2" type="text" id="linkedin" name="linkedin" onChange={(e) => handleChange(e, null, "personalDetails")} />

                    <label htmlFor="photo">Photo URL:</label>
                    <input className="px-2 py-1 border-2 rounded-md mb-2" type="url" id="photo" name="photo" onChange={(e) => handleChange(e, null, "personalDetails")} />

                </div>
                <h2 className="font-bold text-xl">Education</h2>
                <div id="educationContainer">
                    {formData.educations.map((education, index) => (
                        <div className="rounded-md p-2 bg-white my-2" key={index}>
                            <label>Course:</label>
                            <input className="px-2 py-1 border-2 rounded-md mb-2"
                                type="text"
                                name={`course`}
                                onChange={(e) => handleChange(e, index, "educations")}
                            />
                            <label>University:</label>
                            <input className="px-2 py-1 border-2 rounded-md mb-2" type="text" name={`university`} onChange={(e) => handleChange(e, index, "educations")} />

                            <label>Grade:</label>
                            <input className="px-2 py-1 border-2 rounded-md mb-2" type="text" name={`grade`} onChange={(e) => handleChange(e, index, "educations")} />

                            <label>Year:</label>
                            <input className="px-2 py-1 border-2 rounded-md mb-2" type="text" name={`year`} onChange={(e) => handleChange(e, index, "educations")} />

                        </div>
                    ))}
                </div>
                <button className="text-white bg-indigo-500 font-bold px-5 py-2 border-2 rounded-md mb-2" type="button" onClick={addEducation}>Add Education</button>

                <h2 className="font-bold text-xl">Experience</h2>
                <div id="experienceContainer">
                    {formData.experiences.map((experience, index) => (
                        <div className="rounded-md p-2 bg-white my-2" key={index}>
                            <label>Company Name:</label>
                            <input className="px-2 py-1 border-2 rounded-md mb-2"
                                type="text"
                                name={`companyName`}
                                onChange={(e) => handleChange(e, index, "experiences")}
                            />

                            <label>Job Title:</label>
                            <input className="px-2 py-1 border-2 rounded-md mb-2" type="text" name={`jobTitle`} onChange={(e) => handleChange(e, index, "experiences")} />

                            <label>Start Date:</label>
                            <input className="px-2 py-1 border-2 rounded-md mb-2" type="date" name={`startDate`} onChange={(e) => handleChange(e, index, "experiences")} />

                            <label>End Date:</label>
                            <input className="px-2 py-1 border-2 rounded-md mb-2" type="date" name={`endDate`} onChange={(e) => handleChange(e, index, "experiences")} />

                            <label>Details:</label>
                            <textarea className="px-2 py-1 border-2 rounded-md mb-2" name={`details`} rows="4" onChange={(e) => handleChange(e, index, "experiences")} ></textarea>

                        </div>
                    ))}
                </div>
                <button className="text-white bg-indigo-500 font-bold px-5 py-2 border-2 rounded-md mb-2" type="button" onClick={addExperience}>Add Experience</button>

                <h2 className="font-bold text-xl">Skills</h2>
                <label htmlFor="skills">Skills (comma-separated):</label>
                {
                    formData.skills.map((skill, index) => (
                        <input key={index} className="px-2 py-1 border-2 rounded-md mb-2" type="text" name="skills" placeholder="e.g., JavaScript, HTML, CSS" onChange={(e) => handleChange(e, index)} />
                    ))
                }
                <button className="text-white bg-indigo-500 font-bold px-5 py-2 border-2 rounded-md mb-2" type="button" onClick={addSkill}>Add Skill</button>

                <h2 className="font-bold text-xl">Objective</h2>
                <label htmlFor="objective">Objective:</label>
                <textarea className="px-2 py-1 border-2 rounded-md mb-2" id="objective" name="objective" rows="4" onChange={handleChange} ></textarea>

                <h2 className="font-bold text-xl">Projects</h2>
                <div id="projectContainer">
                    {formData.projects.map((project, index) => (
                        <div className="rounded-md p-2 bg-white my-2" key={index}>
                            <label>Title:</label>
                            <input className="px-2 py-1 border-2 rounded-md mb-2"
                                type="text"
                                name={`title`}
                                onChange={(e) => handleChange(e, index, "projects")}
                            />
                            <label>Details:</label>
                            <textarea className="px-2 py-1 border-2 rounded-md mb-2" name={`details`} rows="4" onChange={(e) => handleChange(e, index, "projects")}></textarea>
                        </div>
                    ))}
                </div>
                <button className="text-white bg-indigo-500 font-bold px-5 py-2 border-2 rounded-md mb-2" type="button" onClick={addProject}>Add Project</button>

                <h2 className="font-bold text-xl">Languages</h2>
                <label htmlFor="languages">Languages (comma-separated):</label>
                {
                    formData.languages.map((language, index) => (
                        <input key={index} className="px-2 py-1 border-2 rounded-md mb-2" type="text" id="languages" name="languages" placeholder="e.g., English, Spanish" onChange={(e) => handleChange(e, index)} />
                    ))
                }
                <button className="text-white bg-indigo-500 font-bold px-5 py-2 border-2 rounded-md mb-2" type="button" onClick={addLanguage}>Add Language</button>

                <h2 className="font-bold text-xl">Interests</h2>
                <label htmlFor="interests">Interests (comma-separated):</label>
                {
                    formData.interests.map((language, index) => (
                        <input key={index} className="px-2 py-1 border-2 rounded-md mb-2" type="text" id="interests" name="interests" placeholder="e.g., Reading, Traveling" onChange={(e) => handleChange(e, index)} />
                    ))
                }
                <button className="text-white bg-indigo-500 font-bold px-5 py-2 border-2 rounded-md mb-2" type="button" onClick={addInterest}>Add Interest</button>

                <h2 className="font-bold text-xl">Achievements</h2>
                <label htmlFor="achievements">Achievements (comma-separated):</label>
                {
                    formData.achievements.map((language, index) => (
                        <textarea className="px-2 py-1 border-2 rounded-md mb-2" rows="4" name="achievements" placeholder="e.g., Employee of the Month" onChange={(e) => handleChange(e, index)} />
                    ))
                }
                <button className="text-white bg-indigo-500 font-bold px-5 py-2 border-2 rounded-md mb-2" type="button" onClick={addAchievement}>Add Achievement</button>

                <h2 className="font-bold text-xl">Signature</h2>
                <label htmlFor="sign">Signature:</label>
                <input className="px-2 py-1 border-2 rounded-md mb-2" type="text" id="sign" name="sign" onChange={handleChange} />

                <button className="text-white bg-indigo-500 font-bold px-5 py-2 border-2 rounded-md mb-2" type="button" onClick={submitForm}>Submit</button>

            </form>

        </div>
    )
}
