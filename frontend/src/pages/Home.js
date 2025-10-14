import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import cataractSurgeryPlaceholder from './cataract-surgery-placeholder.jpg';
import lasikPlaceholder from './lasik.jpg';
import iclPlaceholder from './icl-surgery.jpg';



const Home = () => {
// Background carousel images
const backgroundImages = [
  "/images/front-but-in-daytime.jpg",
  "/images/sideprofile.jpg", 
  "/images/speccc.jpg",
  "/images/the-gang.jpg",
  "/images/surgery-equipment1.jpg",
  "/images/patient0.jpg",
  "/images/operating-room.jpg",
  "/images/operating-room-closeup.jpg",
  "/images/laptop-ahh-machine.jpg",
  "/images/fully-front.jpg",
  "/images/colorful-machine.jpg",
  "/images/big-machine.jpg",
];

const [currentImageIndex, setCurrentImageIndex] = useState(0);
const [isHovering, setIsHovering] = useState(false);

// Auto-scroll through background images
useEffect(() => {
  if (isHovering) return; // Pause auto-scroll when hovering
  
  const interval = setInterval(() => {
    setCurrentImageIndex((prevIndex) => 
      (prevIndex + 1) % backgroundImages.length
    );
  }, 3000); // Change image every 3 seconds

  return () => clearInterval(interval);
}, [backgroundImages.length, isHovering]);

// Function to go to next image
const goToNextImage = () => {
  setCurrentImageIndex((prevIndex) => 
    (prevIndex + 1) % backgroundImages.length
  );
};

// Function to go to previous image
const goToPreviousImage = () => {
  setCurrentImageIndex((prevIndex) => 
    prevIndex === 0 ? backgroundImages.length - 1 : prevIndex - 1
  );
};

// Temporary hardcoded data for testing
const hospitalInfo = {
data: {
name: 'Gopala Nethralaya',
tagline: 'Caring for Your Health',
}
};


return (
<div className="min-h-screen">
{/* Hero Section */}
<section className="h-screen relative overflow-hidden flex items-center justify-center">
  {/* Background Carousel */}
  <div 
    className="absolute inset-0 z-0 cursor-pointer group"
    onMouseEnter={() => setIsHovering(true)}
    onMouseLeave={() => setIsHovering(false)}
    onClick={goToNextImage}
  >
    {backgroundImages.map((image, index) => (
      <div
        key={index}
        className={`absolute inset-0 transition-opacity duration-500 ${
          index === currentImageIndex ? 'opacity-30' : 'opacity-0'
        }`}
      >
        <img
          src={image}
          alt={`Hospital background ${index + 1}`}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        />
      </div>
    ))}
    {/* Dark overlay for better text readability */}
    <div className="absolute inset-0 bg-gradient-to-br from-blue-900/70 via-gray-900/70 to-black/70"></div>
    
    {/* Navigation Arrows */}
    <button
      onClick={(e) => {
        e.stopPropagation();
        goToPreviousImage();
      }}
      className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 shadow-lg flex items-center justify-center transition-all duration-300 hover:bg-white/20 hover:scale-110 opacity-0 hover:opacity-100 group-hover:opacity-60"
    >
      <ChevronLeft className="w-6 h-6 text-white" />
    </button>

    <button
      onClick={(e) => {
        e.stopPropagation();
        goToNextImage();
      }}
      className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 shadow-lg flex items-center justify-center transition-all duration-300 hover:bg-white/20 hover:scale-110 opacity-0 hover:opacity-100 group-hover:opacity-60"
    >
      <ChevronRight className="w-6 h-6 text-white" />
    </button>

    {/* Hover indicator */}
    {isHovering && (
      <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm rounded-full px-3 py-1 text-white text-sm font-medium">
        Use arrows or click to navigate
      </div>
    )}
  </div>

  <div className="container mx-auto px-4 text-center relative z-10">
    {/* Hospital Logo */}
    <div className="mb-10">
      <img 
        src="/photos/logo-removebg-preview.jpg"
        alt="Gopala Nethralaya Logo"
        className="mx-auto h-48 md:h-64 lg:h-72 w-auto drop-shadow-2xl"
      />
    </div>
    
    <h1 className="text-6xl md:text-7xl font-bold mb-6 leading-tight text-white drop-shadow-2xl">
      Welcome to {hospitalInfo?.data?.name}
    </h1>
    <p className="text-2xl md:text-3xl mb-8 font-semibold text-white drop-shadow-xl">
      {hospitalInfo?.data?.tagline}
    </p>
    <div className="flex flex-col sm:flex-row gap-4 justify-center">
      <Link to="/appointments" className="btn-primary">Book Appointment</Link>
      <Link to="https://maps.app.goo.gl/7G6mQfcwDBhGVvZ17" className="btn-primary">
        Location
      </Link>
    </div>
  </div>
</section>

{/* Services Section */}
<section className="py-20 bg-white">
  <div className="container mx-auto px-4">
    <div className="text-center mb-16">
      <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-800">
        Our Services
      </h2>
      <p className="text-lg text-gray-600 max-w-3xl mx-auto">
  We provide comprehensive eye care services with modern technology and expert precision.
      </p>
  </div>

    <div className="grid md:grid-cols-3 gap-8">
      {/* Cataract Surgery */}
      <Link to="/cataract" className="bg-gray-50 rounded-3xl overflow-hidden transition-all duration-300 hover:shadow-xl hover:scale-105 group">
        <div className="aspect-video overflow-hidden">
        <img
          src={cataractSurgeryPlaceholder}
          alt="Cataract Surgery"
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
          />
        </div>
        <div className="p-8">
          <h3 className="text-2xl font-bold mb-4 text-gray-700 group-hover:text-blue-600 transition-colors duration-300">
            Advanced Cataract Surgery
          </h3>
          <p className="text-gray-600 mb-4">
            State-of-the-art techniques and technology ensure the best outcomes for your vision restoration journey.
          </p>
          <div className="text-blue-600 font-semibold group-hover:text-blue-800 transition-colors duration-300">
            Learn More →
      </div>
    </div>
      </Link>
      
      {/* Refractive Surgery */}
      <Link to="/refractive" className="bg-gray-50 rounded-3xl overflow-hidden transition-all duration-300 hover:shadow-xl hover:scale-105 group">
        <div className="aspect-video overflow-hidden">
        <img
          src={lasikPlaceholder}
          alt="Refractive Surgery"
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
          />
        </div>
        <div className="p-8">
          <h3 className="text-2xl font-bold mb-4 text-gray-700 group-hover:text-blue-600 transition-colors duration-300">
            Expert Refractive Surgery
          </h3>
          <p className="text-gray-600 mb-4">
            LASIK and advanced refractive procedures tailored to your unique vision needs and lifestyle.
          </p>
          <div className="text-blue-600 font-semibold group-hover:text-blue-800 transition-colors duration-300">
            Learn More →
          </div>
        </div>
      </Link>
      
      {/* ICL Surgery */}
      <Link to="/icl" className="bg-gray-50 rounded-3xl overflow-hidden transition-all duration-300 hover:shadow-xl hover:scale-105 group">
        <div className="aspect-video overflow-hidden">
          <img
            src={iclPlaceholder}
            alt="ICL Surgery"
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
        />
      </div>
        <div className="p-8">
          <h3 className="text-2xl font-bold mb-4 text-gray-700 group-hover:text-blue-600 transition-colors duration-300">
            Advanced ICL Surgery
          </h3>
          <p className="text-gray-600 mb-4">
            A safe and effective solution for correcting high refractive errors, offering clear vision without the need for glasses or contact lenses.
          </p>
          <div className="text-blue-600 font-semibold group-hover:text-blue-800 transition-colors duration-300">
            Learn More →
          </div>
        </div>
      </Link>
    </div>
  </div>
</section>

{/* Know About Your Doctor and Founder */}
<section className="py-20 bg-gray-50">
  <div className="container mx-auto px-4">
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-800">
          Know About Your Doctor and Founder
        </h2>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          Meet the experienced professional dedicated to providing exceptional eye care services.
      </p>
    </div>
      
      <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
        <div className="flex flex-col lg:flex-row">
          <div className="lg:w-1/3 p-8 lg:p-12 flex items-center justify-center">
            <div className="w-full max-w-sm">
              <div className="aspect-square rounded-2xl overflow-hidden bg-gradient-to-br from-blue-500 to-teal-500 flex items-center justify-center">
                <img 
                  src="/photos/dr-naveen-gopal.png" 
                  alt="Dr. Naveen Gopal"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'flex';
                  }}
                />
                <div className="hidden w-full h-full bg-gradient-to-br from-blue-500 to-teal-500 rounded-lg flex-col items-center justify-center text-white">
                  <div className="text-6xl font-bold mb-4">DN</div>
                  <div className="text-xl font-medium">Dr. Naveen Gopal</div>
                </div>
              </div>
    </div>
</div>

          <div className="lg:w-2/3 p-8 lg:p-12">
            <h3 className="text-3xl font-bold text-gray-800 mb-6">Dr. Naveen Gopal</h3>
            <div className="space-y-4 text-gray-600 leading-relaxed">
              <p>
                Worked as <strong>Chief Medical Officer & Chief Surgeon</strong> in Vasan Eye Care for a decade.
              </p>
              <p>
                Has <strong>3 years of working experience in United Kingdom</strong>.
              </p>
              <p>
                Has more than <strong>35,000 surgeries</strong> under his belt. Presented his surgical techniques in various conferences, including live surgery in front of 100's of eminent ophthalmologists.
              </p>
              <p>
                Has masters from the best institute in <strong>KMC - Manipal</strong>.
              </p>
              <p>
                Has done extensive training in micro incision injectionless, sutureless, painless cataract surgery and Lasik.
              </p>
              <p>
                Always believes in serving humanity, does free treatment for needy. Believes in bringing the best eyecare to the patient at a very reasonable and ethical price to the patient.
              </p>
            </div>
            
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-blue-50 rounded-xl p-6">
                <h4 className="text-xl font-semibold text-blue-800 mb-3">Experience</h4>
                <ul className="space-y-2 text-blue-700">
                  <li>• 35,000+ Surgeries</li>
                  <li>• 3 Years in UK</li>
                  <li>• Decade at Vasan Eye Care as chief medical officer and chief surgeon</li>
                </ul>
              </div>
              <div className="bg-teal-50 rounded-xl p-6">
                <h4 className="text-xl font-semibold text-teal-800 mb-3">Expertise</h4>
                <ul className="space-y-2 text-teal-700">
                  <li>• Cataract Surgery</li>
                  <li>• LASIK Surgery</li>
                  <li>• ICL Surgery</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

{/* Why Choose Us */}
<section className="py-20 bg-gradient-to-br from-slate-900 via-gray-900 to-black relative overflow-hidden">
  
  <div className="container mx-auto px-4 relative z-10">
    <div className="text-center mb-16">
      <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-white via-blue-400 to-cyan-400 bg-clip-text text-transparent">
        Precision in Action
      </h2>
      <p className="text-lg text-gray-300 max-w-3xl mx-auto leading-relaxed">
        Witness the artistry of advanced ophthalmic surgery. Every procedure represents years of training, cutting-edge technology, and unwavering commitment to restoring sight.
      </p>
    </div>
    
    {/* Main Surgery Video */}
    <div className="max-w-4xl mx-auto mb-16">
      <div className="bg-black/50 rounded-3xl overflow-hidden">
        
        {/* Video Container */}
        <div className="relative aspect-video overflow-hidden">
          <video 
            className="w-full h-full object-cover"
            controls
            preload="metadata"
            poster="/images/surgery-thumbnail.jpg"
          >
            <source src="/vedios/live-surgery.mp4" type="video/mp4" />
            <source src="/vedios/live-surgery.webm" type="video/webm" />
            
            {/* Fallback for when video doesn't load */}
            <div className="w-full h-full bg-gradient-to-br from-blue-900 via-gray-900 to-black flex items-center justify-center">
              <div className="text-center text-white">
                <div className="text-6xl font-light opacity-50 mb-4">⚕</div>
                <p className="text-xl">Surgery Video Loading...</p>
              </div>
            </div>
          </video>
        </div>
        
        {/* Content Section */}
        <div className="p-8 md:p-12">
          <h3 className="text-2xl md:text-3xl font-bold mb-4 text-white">
            Live Surgical Excellence
          </h3>
          <p className="text-gray-300 leading-relaxed mb-6">
            Experience the precision of modern ophthalmic surgery. This live procedure demonstrates the meticulous techniques and advanced technology that define our surgical approach.
          </p>
          
          {/* Steps for patients */}
          <div className="mb-6">
            <h4 className="text-xl font-semibold text-white mb-4">Patient Journey Steps:</h4>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-cyan-400 text-black rounded-full flex items-center justify-center text-sm font-bold mt-0.5">1</div>
                <div>
                  <p className="text-gray-300">Pre-operative consultation and eye examination</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-cyan-400 text-black rounded-full flex items-center justify-center text-sm font-bold mt-0.5">2</div>
                <div>
                  <p className="text-gray-300">Detailed surgical planning and patient preparation</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-cyan-400 text-black rounded-full flex items-center justify-center text-sm font-bold mt-0.5">3</div>
                <div>
                  <p className="text-gray-300">Minimally invasive surgical procedure</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-cyan-400 text-black rounded-full flex items-center justify-center text-sm font-bold mt-0.5">4</div>
                <div>
                  <p className="text-gray-300">Post-operative care and recovery monitoring</p>
                </div>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </div>

    {/* YouTube Video Section */}
    <div className="max-w-4xl mx-auto">
      <div className="bg-black/50 rounded-3xl overflow-hidden">
        
        {/* YouTube Video Container */}
        <div className="relative aspect-video overflow-hidden">
          <iframe 
            className="w-full h-full"
            src="https://www.youtube.com/embed/CCiADOJ01DI"
            title="Surgery done live for TV channel"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          ></iframe>
        </div>
        
        {/* Content Section */}
        <div className="p-8 md:p-12">
          <h3 className="text-2xl md:text-3xl font-bold mb-4 text-white">
            Live Surgery Broadcast
          </h3>
          <p className="text-gray-300 leading-relaxed">
            Watch our expert surgeon performing live surgery on television, demonstrating the transparency and confidence in our surgical procedures. This broadcast showcases our commitment to medical education and patient awareness.
          </p>
        </div>
      </div>
      
      {/* Disclaimer */}
      <div className="text-center mt-6">
        <p className="text-sm text-gray-500">
          * Surgical footage for educational purposes. All procedures performed by licensed professionals.
        </p>
      </div>
      <section className="bg-white py-16">
  <div className="max-w-4xl mx-auto px-4 text-center">
    <h2 className="text-3xl font-bold mb-6">Download Our Brochure</h2>

    {/* brochure image */}
    <img
      src="\photos\hospital-info.png"   // put your image in public/brochure-cover.jpg
      alt="Brochure preview"
      className="mx-auto mb-6 rounded-xl shadow-lg max-w-md"
    />

    {/* download button */}
    <a
      href="https://drive.google.com/file/d/1TfzTDwz7xI2ixm-IH7V3IaT4XGN8WOz3/view?usp=drive_link" // your Google Drive link
      target="_blank"
      rel="noopener noreferrer"
      className="inline-block bg-indigo-600 text-white px-6 py-3 rounded-md hover:bg-indigo-700 transition"
    >
      Download Brochure
    </a>
  </div>
</section>

    </div>
    
  </div>
</section>




</div>
);
};

export default Home;