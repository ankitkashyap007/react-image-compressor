import React from 'react'
import { Link } from 'react-router-dom';

export default function Footer() {

  const pdfPages = [{
    title: "PDF Converter",
    url: "/pdf-converter"
  }, {
    title: "Resume Builder AI",
    url: "/resume-builder-ai"
  }, {
    title: "Merge PDF",
    url: "/merge-pdf"
  }];
  const webPages = [{
    title: "WordPress Detector",
    url: "/wp-detector"
  }, {
    title: "Web Auditor AI",
    url: "/web-auditor-ai"
  }];

  return (
    <footer className='mt-10'>
      <div className='bg-indigo-50 grid  grid-cols-1 md:grid-cols-3 p-5 tracking-wide gap-2'>
        <div>
          <h4 className='font-bold text-xl'>PDF Tools</h4>
          <ul className=''>{pdfPages.map(({ title, url },i) => <li key={i} className='pt-1'><Link to={url}>{title}</Link></li>)
          }</ul></div><div> <h4 className='font-bold text-xl'>Image Converter</h4>
                    <ul><li className='pt-1'><Link to="jpg-to-png">JPG to PNG</Link></li></ul></div><div> <h4 className='font-bold text-xl'>Web Tools</h4>
          <ul>{webPages.map(({ title, url },i) => <li key={i} className='pt-1'><Link to={url}>{title}</Link></li>)
          }</ul></div>
      </div>
      <div className='bg-blue-100 text-center py-4 font-bold text-slate-500 tracking-wide'>&copy; Tech2radar</div></footer>
  )
}
