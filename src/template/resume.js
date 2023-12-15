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

const template = {
    generateLaTex: (data) => {
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
    },
    generateResume: (data) => {
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
    },
    overLeaf: (data) => {

        // OverLeaf Resume
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
    },
    generateLatex: (data) => {
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
    },
    pdfMake: {
        simpleResume: (data) => {

            // Define pdfmake content
            var content = [
                // Personal Details
                { text: data.personalDetails.name, style: 'header' },
                { text: `Address: ${data.personalDetails.address}` },
                { text: `Email: ${data.personalDetails.email}` },
                { text: `Phone: ${data.personalDetails.phone}` },
                { text: `Date of Birth: ${data.personalDetails.dateOfBirth}` },
                { text: `Website: ${data.personalDetails.website}` },
                { text: `LinkedIn: ${data.personalDetails.linkedin}` },

                // Education
                { text: 'Education', style: 'header' },
                ...data.educations.map(edu => [
                    { text: edu.course, bold: true },
                    { text: `${edu.university}, ${edu.year}`, italics: true },
                    { text: `Grade: ${edu.grade}` },
                ]),

                // Work Experience
                { text: 'Work Experience', style: 'header' },
                ...data.experiences.map(exp => [
                    { text: exp.jobTitle, bold: true },
                    { text: `${exp.companyName}, ${exp.startDate} - ${exp.endDate}` },
                    { text: `Details: ${exp.details}` },
                ]),

                // Skills
                { text: 'Skills', style: 'header' },
                { ul: data.skills },

                // Objective
                { text: 'Objective', style: 'header' },
                data.objective,

                // Projects
                { text: 'Projects', style: 'header' },
                ...data.projects.map(project => [
                    { text: project.name, bold: true, margin: [0, 2, 0, 0] },
                    { text: project.description },
                ]),

                // Languages
                { text: 'Languages', style: 'header' },
                { ul: data.languages },

                // Interests
                { text: 'Interests', style: 'header' },
                { ul: data.interests },

                // Achievements
                { text: 'Achievements', style: 'header' },
                { ul: data.achievements },

                // Sign
                { text: `${data.sign}`, alignment: 'right' }
            ];

            // Styles definition
            var styles = {
                header: {
                    margin: [0, 8, 0, 2],
                    fontSize: 12,
                    bold: true
                }
            };

            // Create PDF document definition
            var docDefinition = {
                pageSize: 'A4',
                content: content,
                styles: styles,
                defaultStyle: {
                    fontSize: 10,
                }
            };
            return docDefinition
        },
        standardResume: (data) => {
            // playground requires you to assign document definition to a variable called dd

            let resume = {
                pageSize: 'A4',
                "content": [
                    {
                        "text": "Resume",
                        "alignment": "center",
                        fontSize: 20,
                        bold: true,
                    },
                    {
                        "text": "Ankit",
                        style: "userName"
                    },
                    {
                        "text": "Date of Birth: 1990-01-15"
                    }, {
                        text: 'john.doe@example.com'
                    },
                    {
                        text: 'linkedin.com/in/johndoe'
                    }, {
                        layout: 'noBorders', // optional

                        table: {
                            headerRows: 1,

                            widths: ['*'],
                            "body": [[
                                {
                                    "text": "",
                                    "style": "mainHeadMarginTop"
                                }
                            ],
                            [
                                { text: 'Work Experience', style: "mainHeadTable" }], [{ text: '', style: 'mainHeadMarginBottom' }]
                            ]
                        }
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
                        layout: 'noBorders', // optional

                        table: {
                            headerRows: 1,

                            widths: ['*'],
                            "body": [[
                                {
                                    "text": "",
                                    "style": "mainHeadMarginTop"
                                }
                            ],
                            [
                                { text: 'Education', style: "mainHeadTable" }], [{ text: '', style: 'mainHeadMarginBottom' }]
                            ]
                        }
                    },
                    {

                        table: {
                            headerRows: 1,

                            widths: ['*', 'auto', 100, '*'],

                            body: [
                                [{ text: 'Exam name', style: "tableHeader" }, { text: 'Institute/University', style: "tableHeader" }, { text: 'Passing Year', style: "tableHeader" }, { text: 'Marks', style: "tableHeader" }],
                                ...data.educations.map((education) => [
                                    education.course || "",
                                    education.university || "",
                                    education.grade || "",
                                    education.year || ""
                                ])

                            ]
                        }
                    },
                    {
                        layout: 'noBorders', // optional

                        table: {
                            headerRows: 1,

                            widths: ['*'],
                            "body": [[
                                {
                                    "text": "",
                                    "style": "mainHeadMarginTop"
                                }
                            ],
                            [
                                { text: 'Skills', style: "mainHeadTable" }], [{ text: '', style: 'mainHeadMarginBottom' }]
                            ]
                        }
                    },
                    {
                        "ul": data.skills
                    }, {
                        layout: 'noBorders', // optional

                        table: {
                            headerRows: 1,

                            widths: ['*'],
                            "body": [[
                                {
                                    "text": "",
                                    "style": "mainHeadMarginTop"
                                }
                            ],
                            [
                                { text: 'Objective', style: "mainHeadTable" }], [{ text: '', style: 'mainHeadMarginBottom' }]
                            ]
                        }
                    },

                    data.objective,
                    {
                        layout: 'noBorders', // optional

                        table: {
                            headerRows: 1,

                            widths: ['*'],
                            "body": [[
                                {
                                    "text": "",
                                    "style": "mainHeadMarginTop"
                                }
                            ],
                            [
                                { text: 'Projects', style: "mainHeadTable" }], [{ text: '', style: 'mainHeadMarginBottom' }]
                            ]
                        }
                    },
                    ...data.projects.map(({ name, description }) => [
                        {
                            "text": name || "",
                            "bold": true,
                            "margin": [0, 5, 0, 0]

                        },
                        {
                            "text": description || ""
                        },
                        ""
                    ],), {
                        layout: 'noBorders', // optional

                        table: {
                            headerRows: 1,

                            widths: ['*'],
                            "body": [[
                                {
                                    "text": "",
                                    "style": "mainHeadMarginTop"
                                }
                            ],
                            [
                                { text: 'Languages', style: "mainHeadTable" }], [{ text: '', style: 'mainHeadMarginBottom' }]
                            ]
                        }
                    },
                    {
                        "ul": data.languages
                    }, {
                        layout: 'noBorders', // optional

                        table: {
                            headerRows: 1,

                            widths: ['*'],
                            "body": [[
                                {
                                    "text": "",
                                    "style": "mainHeadMarginTop"
                                }
                            ],
                            [
                                { text: 'Interests', style: "mainHeadTable" }], [{ text: '', style: 'mainHeadMarginBottom' }]
                            ]
                        }
                    },

                    {
                        "ul": data.interests
                    }, {
                        layout: 'noBorders', // optional

                        table: {
                            headerRows: 1,

                            widths: ['*'],
                            "body": [[
                                {
                                    "text": "",
                                    "style": "mainHeadMarginTop"
                                }
                            ],
                            [
                                { text: 'Achievements', style: "mainHeadTable" }],
                            [{ text: '' }]
                            ]
                        }
                    },

                    {
                        "ul": data.achievements
                    },
                    {
                        "text": data.sign,
                        "alignment": "right"
                    }
                ],
                "styles": {
                    "header": {
                        "margin": [0, 8, 0, 2],
                        "fontSize": 12,
                        "bold": true
                    },
                    mainHeadTable: {
                        fillColor: 'royalblue',
                        color: "white",
                        "margin": [5, 0, 0, 0],
                        "fontSize": 12,
                        "bold": true
                    },
                    mainHeadMarginTop: {
                        "margin": [0, 2, 0, 0],
                    }, mainHeadMarginBottom: {
                        "margin": [0, 1, 0, 0],
                    },
                    tableHeader: {
                        bold: true
                    },
                    userName: {
                        fontSize: 15
                    }
                },
                defaultStyle: {
                    fontSize: 10,
                }

            }
            return resume;
        },
        darkBlue: (data) => {
            const themeColor = "darkblue";
            const line = {
                "lineColor": themeColor,
                "type": "line",
                "x1": 0,
                "y1": 0,
                "x2": 515,
                "y2": 0,
                "lineWidth": 15
            };
            const unorderListColumn = (data) => {
                const twoColumn = [
                    {
                        ul: []
                    },
                    {
                        ul: []
                    }
                ]
                const ul = data.map((item, index) => {
                    if (index % 2 === 0) return twoColumn[0].ul.push(item);
                    return twoColumn[1].ul.push(item);
                })
                return twoColumn
            }
            const resume = {
                "pageSize": "A4",
                "content": [
                    {
                        "canvas": [line]
                    },
                    {
                        "text": data.personalDetails.name, color: themeColor, fontSize: 25, alignment: "center", margin: [0, 10, 0, 0]
                    },
                    {
                        "text": `DOB: ${data.personalDetails.dateOfBirth} | ${data.personalDetails.address}`, alignment: "center"
                    },
                    {
                        "text": `${data.personalDetails.phone} | ${data.personalDetails.email}`, alignment: "center", margin: [0, 0, 0, 5]
                    },
                    {
                        canvas: [{
                            "lineColor": themeColor,
                            "type": "line",
                            "x1": 0,
                            "y1": 0,
                            "x2": 515,
                            "y2": 0,
                            dash: { length: 2 },
                            "lineWidth": 2,
                            margin: [50, 5, 50, 50]
                        }]
                    },
                    { text: data.objective, margin: [0, 5, 0, 5] },
                    {
                        canvas: [{
                            "lineColor": themeColor,
                            "type": "line",
                            "x1": 0,
                            "y1": 0,
                            "x2": 515,
                            "y2": 0,
                            dash: { length: 2 },
                            "lineWidth": 2
                        }]
                    }, {
                        "text": "Skills",
                        "style": "header"
                    },
                    {
                        margin: [10, 0, 0, 0],
                        columns: unorderListColumn(data.skills)
                    },
                    {
                        "text": "Work Experience",
                        "style": "header"
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
                        }
                    ],
                    {
                        "text": "Projects",
                        "style": "header"
                    },
                    ...data.projects.map(({ name, description }) => [
                        {
                            "text": name || "",
                            "bold": true,
                            "margin": [0, 5, 0, 0]

                        },
                        {
                            "text": description || ""
                        },
                        ""
                    ],),

                    {
                        "text": "Achievements",
                        "style": "header"
                    },
                    {
                        margin: [10, 0, 0, 0],
                        "ul": data.achievements
                    }, {
                        "text": "Education",
                        "style": "header"
                    },

                    "Bachelor of Science in Computer Science",
                    "City University | 2016",
                    {
                        "text": "Languages",
                        "style": "header"
                    },
                    {
                        margin: [10, 0, 0, 0],
                        columns: unorderListColumn(data.languages)
                    },
                    {
                        "text": "Interests",
                        "style": "header"
                    },
                    {
                        margin: [10, 0, 0, 0],
                        columns: unorderListColumn(data.interests)
                    },
                    {
                        "text": data.sign,
                        "alignment": "right"
                    }
                ],
                "styles": {
                    "header": {
                        fontFeatures: ['c2sc', 'smcp'],
                        "fillColor": "royalblue",
                        "margin": [
                            0,
                            5,
                            0,
                            2
                        ],
                        "fontSize": 12,
                        "bold": true
                    },
                    "mainHeadMarginTop": {
                        "margin": [
                            0,
                            2,
                            0,
                            0
                        ]
                    },
                    "mainHeadMarginBottom": {
                        "margin": [
                            0,
                            5,
                            0,
                            0
                        ]
                    },
                    "tableHeader": {
                        "bold": true
                    }
                },
                "defaultStyle": {
                    "fontSize": 10
                }
            }

            return resume;
        }
    }
}
export default template;