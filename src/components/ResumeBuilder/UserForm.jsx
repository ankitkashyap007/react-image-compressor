import React from 'react'

export default function Form({formData,submitForm,setFormData}) {
    const inputStyle = "px-2 py-1 border-2 rounded-md mb-2";

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
            projects: [...formData.projects, { name: '', description: '' }],
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
            achievements: [],
            sign: '',
        });
    }

    const removeThisElement = (e, key, index) => {
        setFormData(preValue => {
            const object = preValue[key];
            object.splice(index, 1)
            return {
                ...preValue,
                ...object
            }
        })
        console.log("Removed")
    }

  return (
    <form method="POST" id="resumeForm">
    <div className='rounded-md p-2 bg-white my-2'>
        <h2 className="font-bold text-xl">Personal Details</h2>
        <label htmlFor="name">Name:</label>
        <input value={formData.personalDetails.name} className={inputStyle} type="text" id="name" name="name" onChange={(e) => handleChange(e, null, "personalDetails")} />

        <label htmlFor="address">Address:</label>
        <input value={formData.personalDetails.address} className={inputStyle} type="text" id="address" name="address" onChange={(e) => handleChange(e, null, "personalDetails")} />

        <label htmlFor="email">Email:</label>
        <input value={formData.personalDetails.email} className={inputStyle} type="email" id="email" name="email" onChange={(e) => handleChange(e, null, "personalDetails")} />

        <label htmlFor="phone">Phone:</label>
        <input value={formData.personalDetails.phone} className={inputStyle} type="tel" id="phone" name="phone" onChange={(e) => handleChange(e, null, "personalDetails")} />

        <label htmlFor="dob">Date of Birth:</label>
        <input value={formData.personalDetails.dateOfBirth} className={inputStyle} type="date" id="dob" name="dateOfBirth" onChange={(e) => handleChange(e, null, "personalDetails")} />

        <label htmlFor="website">Website:</label>
        <input value={formData.personalDetails.website} className={inputStyle} type="url" id="website" name="website" onChange={(e) => handleChange(e, null, "personalDetails")} />

        <label htmlFor="linkedin">LinkedIn:</label>
        <input value={formData.personalDetails.linkedin} className={inputStyle} type="text" id="linkedin" name="linkedin" onChange={(e) => handleChange(e, null, "personalDetails")} />

        <label htmlFor="photo">Photo URL:</label>
        <input value={formData.personalDetails.photo} className={inputStyle} type="url" id="photo" name="photo" onChange={(e) => handleChange(e, null, "personalDetails")} />

    </div>
    <h2 className="font-bold text-xl">Education</h2>
    <div id="educationContainer">
        {formData.educations.map((education, index) => (
            <div className="rounded-md p-2 bg-white my-2" key={index}>
                <label>Course:</label>
                <input value={education.course} className={inputStyle}
                    type="text"
                    name={`course`}
                    onChange={(e) => handleChange(e, index, "educations")}
                />
                <label>University:</label>
                <input value={education.university} className={inputStyle} type="text" name={`university`} onChange={(e) => handleChange(e, index, "educations")} />

                <label>Grade:</label>
                <input value={education.grade} className={inputStyle} type="text" name={`grade`} onChange={(e) => handleChange(e, index, "educations")} />

                <label>Year:</label>
                <input value={education.year} className={inputStyle} type="text" name={`year`} onChange={(e) => handleChange(e, index, "educations")} />

            </div>
        ))}
    </div>
    <button className="text-white bg-indigo-500 font-bold px-5 py-2 border-2 rounded-md mb-2" type="button" onClick={addEducation}>Add Education</button>

    <h2 className="font-bold text-xl">Experience</h2>
    <div id="experienceContainer">
        {formData.experiences.map((experience, index) => (
            <div className="rounded-md p-2 bg-white my-2" key={index}>
                <label>Company Name:</label>
                <input value={experience.companyName} className={inputStyle}
                    type="text"
                    name={`companyName`}
                    onChange={(e) => handleChange(e, index, "experiences")}
                />

                <label>Job Title:</label>
                <input value={experience.jobTitle} className={inputStyle} type="text" name={`jobTitle`} onChange={(e) => handleChange(e, index, "experiences")} />

                <label>Start Date:</label>
                <input value={experience.startDate} className={inputStyle} type="date" name={`startDate`} onChange={(e) => handleChange(e, index, "experiences")} />

                <label>End Date:</label>
                <input value={experience.endDate} className={inputStyle} type="date" name={`endDate`} onChange={(e) => handleChange(e, index, "experiences")} />

                <label>Details:</label>
                <textarea value={experience.details} className={inputStyle} name={`details`} rows="4" onChange={(e) => handleChange(e, index, "experiences")} ></textarea>

            </div>
        ))}
    </div>
    <button className="text-white bg-indigo-500 font-bold px-5 py-2 border-2 rounded-md mb-2" type="button" onClick={addExperience}>Add Experience</button>

    <h2 className="font-bold text-xl">Skills</h2>
    <label htmlFor="skills">Skills (comma-separated):</label>
    {
        formData.skills.map((skill, index) => (
            <input value={skill} key={index} className={inputStyle} type="text" name="skills" placeholder="e.g., JavaScript, HTML, CSS" onChange={(e) => handleChange(e, index)} />
        ))
    }
    <button className="text-white bg-indigo-500 font-bold px-5 py-2 border-2 rounded-md mb-2" type="button" onClick={addSkill}>Add Skill</button>

    <h2 className="font-bold text-xl">Objective</h2>
    <label htmlFor="objective">Objective:</label>
    <textarea value={formData.objective} className={inputStyle} id="objective" name="objective" rows="4" onChange={handleChange} ></textarea>

    <h2 className="font-bold text-xl">Projects</h2>
    <div id="projectContainer">
        {formData.projects.map((project, index) => (
            <div className="rounded-md p-2 bg-white my-2" key={index}>
                <label>Name:</label>
                <input value={project.name} className={inputStyle}
                    type="text"
                    name={`name`}
                    onChange={(e) => handleChange(e, index, "projects")}
                />
                <label>Description:</label>
                <textarea value={project.description} className={inputStyle} name={`description`} rows="4" onChange={(e) => handleChange(e, index, "projects")}></textarea>
            </div>
        ))}
    </div>
    <button className="text-white bg-indigo-500 font-bold px-5 py-2 border-2 rounded-md mb-2" type="button" onClick={addProject}>Add Project</button>

    <h2 className="font-bold text-xl">Languages</h2>
    <label htmlFor="languages">Languages (comma-separated):</label>
    {
        formData.languages.map((language, index) => (
            <input value={language} key={index} className={inputStyle} type="text" id="languages" name="languages" placeholder="e.g., English, Spanish" onChange={(e) => handleChange(e, index)} />
        ))
    }
    <button className="text-white bg-indigo-500 font-bold px-5 py-2 border-2 rounded-md mb-2" type="button" onClick={addLanguage}>Add Language</button>

    <h2 className="font-bold text-xl">Interests</h2>
    <label htmlFor="interests">Interests (comma-separated):</label>
    {
        formData.interests.map((interest, index) => (
            <input value={interest} key={index} className={inputStyle} type="text" id="interests" name="interests" placeholder="e.g., Reading, Traveling" onChange={(e) => handleChange(e, index)} />
        ))
    }
    <button className="text-white bg-indigo-500 font-bold px-5 py-2 border-2 rounded-md mb-2" type="button" onClick={addInterest}>Add Interest</button>

    {/** Achievements */}
    <h2 className="font-bold text-xl">Achievements</h2>
    <label htmlFor="achievements">Achievements (comma-separated):</label>
    {
        formData.achievements.map((achievement, index) => (
            <div key={index} className="p-2 border-2 rounded-md mb-2 bg-white">
                <textarea value={achievement} className={inputStyle} rows="4" name="achievements" placeholder="e.g., Employee of the Month" onChange={(e) => handleChange(e, index)} />
                <div name="achievements" className='p-2 bg-red-200 text-red-800 rounded-md font-bold w-fit hover:bg-red-800 cursor-pointer hover:text-white' onClick={(e) => removeThisElement(e, "achievements", index)}>Remove</div>
            </div>
        ))
    }
    <button className="text-white bg-indigo-500 font-bold px-5 py-2 border-2 rounded-md mb-2" type="button" onClick={addAchievement}>Add Achievement</button>

    <h2 className="font-bold text-xl">Signature</h2>
    <label htmlFor="sign">Signature:</label>
    <input value={formData.sign} className={inputStyle} type="text" id="sign" name="sign" onChange={handleChange} />

    <button title="Create PDF" className="text-white bg-indigo-500 font-bold px-5 py-2 border-2 rounded-md mb-2" type="button" onClick={submitForm}>Submit</button> <button title="all details will reset" className="text-white bg-red-500 font-bold px-5 py-2 border-2 rounded-md mb-2" type="button" onClick={resetForm}>Clear Form</button>

</form>
  )
}
