import { useState } from 'react'
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home';
import About from "./pages/About";
import Privacy from "./pages/Privacy";
import Header from "./components/Header";
import Footer from "./components/Footer";
import MergePdf from './pages/MergePdf';

function App() {
  return (<>
    <Router>

      <Header />
      <main className='h-100'>
        <Routes>
          <Route path="/" element={<Home />} />
          {/**
           *  heic, heif, avif, jpeg, jpg, jpe, tile, dz, png, raw, tiff, tif, webp, gif, jp2, jpx, j2k, j2c, jxl
           */}
          { /** 
           * JPG Converter
           */}
          <Route path="/jpg-to-png" element={<Home />} />
          <Route path="/jpg-to-webp" element={<Home />} />
          <Route path="/jpg-to-gif" element={<Home />} />
          <Route path="/jpg-to-jp2" element={<Home />} />
          <Route path="/jpg-to-tiff" element={<Home />} />
          <Route path="/jpg-to-webp" element={<Home />} />
          <Route path="/jpg-to-jxl" element={<Home />} />
          <Route path="/jpg-to-jpeg" element={<Home />} />
          <Route path="/jpg-to-heif" element={<Home />} />

          { /** 
           * PNG Converter
           */}
          <Route path="/png-to-webp" element={<Home />} />
          <Route path="/png-to-gif" element={<Home />} />
          <Route path="/png-to-jp2" element={<Home />} />
          <Route path="/png-to-tiff" element={<Home />} />
          <Route path="/png-to-webp" element={<Home />} />
          <Route path="/png-to-jxl" element={<Home />} />
          <Route path="/png-to-jpeg" element={<Home />} />
          <Route path="/png-to-heif" element={<Home />} />

          { /** 
           * JPG Converter
           */}
          <Route path="/jpg-to-png" element={<Home />} />
          <Route path="/jpg-to-webp" element={<Home />} />
          <Route path="/jpg-to-gif" element={<Home />} />
          <Route path="/jpg-to-jp2" element={<Home />} />
          <Route path="/jpg-to-tiff" element={<Home />} />
          <Route path="/jpg-to-webp" element={<Home />} />
          <Route path="/jpg-to-jxl" element={<Home />} />
          <Route path="/jpg-to-jpeg" element={<Home />} />
          <Route path="/jpg-to-heif" element={<Home />} />

          { /** 
           * JPG Converter
           */}
          <Route path="/jpg-to-png" element={<Home />} />
          <Route path="/jpg-to-webp" element={<Home />} />
          <Route path="/jpg-to-gif" element={<Home />} />
          <Route path="/jpg-to-jp2" element={<Home />} />
          <Route path="/jpg-to-tiff" element={<Home />} />
          <Route path="/jpg-to-webp" element={<Home />} />
          <Route path="/jpg-to-jxl" element={<Home />} />
          <Route path="/jpg-to-jpeg" element={<Home />} />
          <Route path="/jpg-to-heif" element={<Home />} />

          { /** 
           * JPG Converter
           */}
          <Route path="/jpg-to-png" element={<Home />} />
          <Route path="/jpg-to-webp" element={<Home />} />
          <Route path="/jpg-to-gif" element={<Home />} />
          <Route path="/jpg-to-jp2" element={<Home />} />
          <Route path="/jpg-to-tiff" element={<Home />} />
          <Route path="/jpg-to-webp" element={<Home />} />
          <Route path="/jpg-to-jxl" element={<Home />} />
          <Route path="/jpg-to-jpeg" element={<Home />} />
          <Route path="/jpg-to-heif" element={<Home />} />

          { /** 
           * JPG Converter
           */}
          <Route path="/jpg-to-png" element={<Home />} />
          <Route path="/jpg-to-webp" element={<Home />} />
          <Route path="/jpg-to-gif" element={<Home />} />
          <Route path="/jpg-to-jp2" element={<Home />} />
          <Route path="/jpg-to-tiff" element={<Home />} />
          <Route path="/jpg-to-webp" element={<Home />} />
          <Route path="/jpg-to-jxl" element={<Home />} />
          <Route path="/jpg-to-jpeg" element={<Home />} />
          <Route path="/jpg-to-heif" element={<Home />} />

          { /** 
           * JPG Converter
           */}
          <Route path="/jpg-to-png" element={<Home />} />
          <Route path="/jpg-to-webp" element={<Home />} />
          <Route path="/jpg-to-gif" element={<Home />} />
          <Route path="/jpg-to-jp2" element={<Home />} />
          <Route path="/jpg-to-tiff" element={<Home />} />
          <Route path="/jpg-to-webp" element={<Home />} />
          <Route path="/jpg-to-jxl" element={<Home />} />
          <Route path="/jpg-to-jpeg" element={<Home />} />
          <Route path="/jpg-to-heif" element={<Home />} />

          { /** 
           * JPG Converter
           */}
          <Route path="/jpg-to-png" element={<Home />} />
          <Route path="/jpg-to-webp" element={<Home />} />
          <Route path="/jpg-to-gif" element={<Home />} />
          <Route path="/jpg-to-jp2" element={<Home />} />
          <Route path="/jpg-to-tiff" element={<Home />} />
          <Route path="/jpg-to-webp" element={<Home />} />
          <Route path="/jpg-to-jxl" element={<Home />} />
          <Route path="/jpg-to-jpeg" element={<Home />} />
          <Route path="/jpg-to-heif" element={<Home />} />

          { /** 
           * JPG Converter
           */}
          <Route path="/jpg-to-png" element={<Home />} />
          <Route path="/jpg-to-webp" element={<Home />} />
          <Route path="/jpg-to-gif" element={<Home />} />
          <Route path="/jpg-to-jp2" element={<Home />} />
          <Route path="/jpg-to-tiff" element={<Home />} />
          <Route path="/jpg-to-webp" element={<Home />} />
          <Route path="/jpg-to-jxl" element={<Home />} />
          <Route path="/jpg-to-jpeg" element={<Home />} />
          <Route path="/jpg-to-heif" element={<Home />} />

          { /** 
           * JPG Converter
           */}
          <Route path="/jpg-to-png" element={<Home />} />
          <Route path="/jpg-to-webp" element={<Home />} />
          <Route path="/jpg-to-gif" element={<Home />} />
          <Route path="/jpg-to-jp2" element={<Home />} />
          <Route path="/jpg-to-tiff" element={<Home />} />
          <Route path="/jpg-to-webp" element={<Home />} />
          <Route path="/jpg-to-jxl" element={<Home />} />
          <Route path="/jpg-to-jpeg" element={<Home />} />
          <Route path="/jpg-to-heif" element={<Home />} />
          
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
