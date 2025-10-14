import React from 'react';

const Contact = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Contact Us</h1>
        
        {/* Contact Info & Hours */}
        <div className="grid md:grid-cols-2 gap-8 mb-10">
          {/* Contact Info */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Get in Touch</h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-gray-700">Address</h3>
                <p className="text-gray-600">
                  Gopala Nethralaya, 227, 1st Main Rd, near 88 bus stop, Sharada Colony, KHB Colony, Basaveshwar Nagar, Bengaluru, Karnataka 560079
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-700">Phone</h3>
                <p className="text-gray-600">+91 80 2348 8880</p>
              </div>
              <div>
                
              </div>
            </div>
          </div>
          
          {/* Office Hours */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Office Hours</h2>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">Monday - Saturday</span>
                <span className="font-semibold">10:00 AM - 8:00 PM</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Sunday</span>
                <span className="font-semibold">Closed</span>
              </div>
            </div>
          </div>
        </div>

        {/* Map Embed */}
        <div className="rounded-lg overflow-hidden shadow-lg h-[450px]">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3887.74192389101!2d77.5317460750768!3d12.988351487328575!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae3dbf3f4108ab%3A0xf4b028c80bf716bd!2sGopala%20Nethralaya!5e0!3m2!1sen!2sin!4v1757100313777!5m2!1sen!2sin"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Google Maps Location"
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default Contact;
