import React, { useState } from 'react';

const ResumeForm = () => {
  const [formData, setFormData] = useState({
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
    skills: '',
    objective: '',
    projects: [],
    languages: '',
    interests: '',
    achievements: '',
    sign: '',
  });

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const submitForm = () => {
    console.log(formData);
    // You can send formData to your backend for further processing
  };

  return (
    <div>
      <h1>Resume Form</h1>
      <form id="resumeForm">

        {/* ... (existing form content) */}

        {/* Education Details */}
        <h2>Education</h2>
        <div>
          {formData.educations.map((education, index) => (
            <div key={index}>
              <label>Course:</label>
              <input
                type="text"
                name={`educations[${index}].course`}
                value={education.course}
                onChange={handleChange}
              />

              {/* ... (similar modifications for other education fields) */}

            </div>
          ))}
        </div>
        <button type="button" onClick={addEducation}>
          Add Education
        </button>

        {/* Experience Details */}
        <h2>Experience</h2>
        <div>
          {formData.experiences.map((experience, index) => (
            <div key={index}>
              <label>Company Name:</label>
              <input
                type="text"
                name={`experiences[${index}].companyName`}
                value={experience.companyName}
                onChange={handleChange}
              />

              {/* ... (similar modifications for other experience fields) */}

            </div>
          ))}
        </div>
        <button type="button" onClick={addExperience}>
          Add Experience
        </button>

        {/* Projects */}
        <h2>Projects</h2>
        <div>
          {formData.projects.map((project, index) => (
            <div key={index}>
              <label>Title:</label>
              <input
                type="text"
                name={`projects[${index}].title`}
                value={project.title}
                onChange={handleChange}
              />

              {/* ... (similar modifications for other project fields) */}

            </div>
          ))}
        </div>
        <button type="button" onClick={addProject}>
          Add Project
        </button>

        {/* ... (remaining form content) */}

        {/* Submit Button */}
        <button type="button" onClick={submitForm}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default ResumeForm;