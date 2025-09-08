import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { motion } from 'framer-motion';

// Layout Components
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';

// Pages
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Contact from './pages/Contact';
import Appointments from './pages/AppointmentsSimple';
import Gallery from './pages/Gallery';
import Cataract from './pages/Cataract';
import Cornea from './pages/Cornea';
import Refractive from './pages/Refractive';
import Retinal from './pages/Retinal';

// Loading Component
import LoadingSpinner from './components/common/LoadingSpinner';

function App() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/appointments" element={<Appointments />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/cataract" element={<Cataract />} />
          <Route path="/cornea" element={<Cornea />} />
          <Route path="/refractive-surgery" element={<Refractive />} />
          <Route path="/retinal" element={<Retinal />} />

        </Routes>
      </main>
      
      <Footer />
    </div>
  );
}

export default App;
