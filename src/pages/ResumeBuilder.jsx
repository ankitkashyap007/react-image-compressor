import React, { useState } from 'react'
import "./resume.css"
import template from "../template/resume";
import pdfMake from "pdfmake/build/pdfmake";
import * as pdfFonts from "pdfmake/build/vfs_fonts";
import UserForm from "../components/ResumeBuilder/UserForm"

pdfMake.vfs = pdfFonts.pdfMake.vfs;

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

        pdfMake.createPdf(template.pdfMake.resume(formData)).download(`"${formData.personalDetails.name || Date.now()}_Tech2radar.pdf`)

    };

    return (
        <div className='px-2 bg-gray-200'>
            <h2 className='text-2xl px-2'>Resume Builder</h2>
            <UserForm formData={formData} submitForm={submitForm} setFormData={setFormData} />

        </div>
    )
}
