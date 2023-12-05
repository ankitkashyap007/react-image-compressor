import { useState } from 'react'
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home';
import About from "./pages/About";
import Privacy from "./pages/Privacy";
import Header from "./components/Header";
import Footer from "./components/Footer";
import MergePdf from './pages/MergePdf';
// import "dotenv/config"

function App() {
  return (<>
    <Router>

      <Header />
      <main className='h-100'>
        <Routes>
          <Route path="/" element={<Home />} />
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
