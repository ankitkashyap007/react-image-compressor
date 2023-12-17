import React, { useState } from 'react'
import "./resume.css"
import template from "../template/resume";
import fonts from "./font";
import pdfMake from "pdfmake/build/pdfmake";
import UserForm from "../components/ResumeBuilder/UserForm"
import TemplateList from '../components/ResumeBuilder/TemplateList';

pdfMake.vfs = fonts;

export default function ResumeBuilder() {
    const [formData, setFormData] = useState({
        personalDetails: {
            name: "John Doe",
            address: "123 Main Street, Cityville",
            email: "john.doe@example.com",
            phone: "+1 (123) 456-7890",
            dateOfBirth: "1990-01-15",
            website: "www.johndoe.com",
            linkedin: "linkedin.com/in/johndoe",
            photo: "profile-picture.jpg"
        },
        educations: [
            {
                course: "Bachelor of Science in Computer Science",
                university: "City University",
                grade: "A",
                year: "2016"
            }
        ],
        experiences: [
            {
                companyName: "Tech Solutions Inc.",
                jobTitle: "Software Engineer",
                startDate: "2017-05-10",
                endDate: "2020-08-15",
                details: "Developed and maintained software applications."
            }
        ],
        skills: [
            "Java",
            "Python",
            "Web Development",
            "Database Management"
        ],
        objective: "Dedicated and results-driven software engineer with a strong background in Java and Python programming. Seeking challenging opportunities to apply my skills in a dynamic team environment.",
        projects: [
            {
                name: "Online Shopping App",
                description: "Developed a fully functional e-commerce website with user authentication, product catalog, and shopping cart functionality."
            },
            {
                name: "Task Management System",
                description: "Designed and implemented a task management system to streamline project workflows and enhance collaboration among team members."
            }
        ],
        languages: [
            "English",
            "Spanish"
        ],
        interests: [
            "Traveling",
            "Reading",
            "Photography"
        ],
        achievements: ["Received the 'Outstanding Employee of the Year' award at Tech Solutions Inc. for exceptional contributions to project success."],
        sign: "John Doe"
    }
    );

    const submitForm = () => {
        console.log("template")
        // pdfMake.createPdf(template.pdfMake.standardResume(formData)).download(`"${formData.personalDetails.name || Date.now()}_Tech2radar.pdf`)

    };

    return (
        <div className='px-2 bg-gray-200'>
            <h2 className='text-2xl px-2'>Resume Builder</h2>
            <UserForm formData={formData} submitForm={submitForm} setFormData={setFormData} />
            <TemplateList formData={formData} />
        </div>
    )
}
