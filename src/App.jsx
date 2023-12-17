import { useState } from 'react'
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

function App() {
  const formats = ["heic", "heif", "avif", "jpeg", "jpg", "jpe", "tile", "dz", "png", "raw", "tiff", "tif", "webp", "gif", "jp2", "jpx", "j2k", "j2c", "jxl"];

  return (<>
    <Router>

      <Header />
      <main className='h-100 w-full'>
        <Routes>
          <Route path="/" element={<Home />} />
          {/**
           *  heic, heif, avif, jpeg, jpg, jpe, tile, dz, png, raw, tiff, tif, webp, gif, jp2, jpx, j2k, j2c, jxl
           */}
          { /** 
           * JPG Converter
           */}

            const formats = ["heic", "heif", "avif", "jpeg", "jpg", "jpe", "tile", "dz", "png", "tif", "webp", "gif"];
            {
              formats.flatMap((sourceFormat, i) =>
              formats
                .filter((_, j) => i !== j)
                .map(targetFormat => <Route key={i} path={`${sourceFormat}-to-${targetFormat}`} mainFormat={targetFormat} element={<Home />} />)
            )}

          <Route path="/pdf-converter" element={<ImageToPdf />} />
          <Route path="/wp-detector" element={<WpDetector />} />
          <Route path="/web-auditor-ai" element={<WebAuditorAI/>} />
          <Route path="/resume-builder-ai" element={<ResumeBuilder />} />

          <Route path="/merge-pdf" element={<MergePdf/>} />
          <Route path="/about" element={<About />} />
          <Route path="/privacy" element={<Privacy />} />
        </Routes>
      </main>
      <Footer />
    </Router>
  </>)
}

export default App
