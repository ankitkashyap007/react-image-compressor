import React from 'react'
import TemplateCard from './TemplateCard';
import fonts from "../../pages/font";
import pdfMake from "pdfmake/build/pdfmake";
import template from "../../template/resume";

pdfMake.vfs = fonts;

export default function TemplateList({ formData }) {
    const templateList = [{
        name: "Standard",
        image: "./standard_resume_tech2radar.webp",
        path: "standardResume"
    }, {
        name: "Simple",
        image: "./simple_resume.webp",
        path: "simpleResume"
    }, {
        name: "Line Simple",
        image: "./simple_resume.webp",
        path: "lineResume"
    },{
        name: "Dark Blue",
        image: "./darkblue.webp",
        path: "darkBlue"
    }];
    function handler(path) {
        pdfMake.createPdf(template.pdfMake[path](formData)).open()
    }
    return (
        <div><h3 className='text-xl font-bold'>Resume Templates</h3>
        <div className='grid grid-cols-none gap-4 md:grid-cols-3'>
            {templateList.map((template, index) => (
                <TemplateCard key={index} template={template} handler={() => handler(template.path)} />
            ))}
            </div>
        </div>
    )
}
