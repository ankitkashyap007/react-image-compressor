import { useState,useEffect } from 'react'
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home';
import About from "./pages/About";
import Privacy from "./pages/Privacy";
import Header from "./components/Header";
import Footer from "./components/Footer";
import MergePdf from './pages/MergePdf';
import WpDetector from './pages/WpDetector';
import WebAuditorAI from './pages/WebAuditorAI';
import ResumeBuilder from './pages/ResumeBuilder';
import ImageToPdf from './pages/ImageToPdf';
import ImageConvert from './pages/ImageConvert'
import PlagiarismChecker from './pages/PlagiarismChecker';

function App() {

  const [imagePages, setImagePages] = useState([]);
  const [pdfPages, setPdfPages] = useState([]);

  const formats = ["jpeg", "png", "jpg", "webp", "gif", "avif", "jpe", "tile", "dz", "tif", "heic", "heif"];
  useEffect(() => {
    setPdfPages(formats
      .map((sourceFormat) =>
      ({
        title: `${sourceFormat.toUpperCase()} to PDF Converter`,
        url: `${sourceFormat}-to-pdf-converter`,
        sourceFormat
  
      })))
    setImagePages(() => {
      const pages = [];
      formats.map((sourceFormat, i) =>
        formats
          .filter((_, j) => i !== j)
          .map(targetFormat => pages.push({ title: `${sourceFormat.toUpperCase()} to ${targetFormat.toUpperCase()}`, url: `${sourceFormat}-to-${targetFormat}`, target: targetFormat }))
      );
      return pages;
  
    }
    )
  },[])
 

  return (<>
    <Router>

      <Header />
      <main className='h-100 w-full tracking-wide'>
        <Routes>

          { /** 
           * Image Converter
           */}


          {
            imagePages.map(({ title, url, target }, i) => < Route key={i} path={url} element={< ImageConvert mainFormat={target} />} />
            )}

          {
            pdfPages
              .map(({ url, sourceFormat }, i) => <Route key={i} path={url} element={<ImageToPdf mainFormat={sourceFormat} />} />)
          }

          <Route path="/" element={<Home imagePages={imagePages} pdfPages={pdfPages} />} />
          <Route path="/wp-detector" element={<WpDetector />} />
          <Route path="/web-auditor-ai" element={<WebAuditorAI />} />
          <Route path="/resume-builder-ai" element={<ResumeBuilder />} />
          <Route path="/plagiarism-checker" element={<PlagiarismChecker />} />

          <Route path="/merge-pdf" element={<MergePdf />} />
          <Route path="/about" element={<About />} />
          <Route path="/privacy" element={<Privacy />} />
        </Routes>
      </main>
      <Footer />
    </Router>
  </>)
}

export default App
