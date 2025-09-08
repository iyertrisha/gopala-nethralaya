import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const Services = () => {
  const navigate = useNavigate();

  const services = [
    {
      id: "cornea",
      title: "Cornea",
      description:
        "Expert care for corneal diseases, injuries, and conditions affecting the front surface of the eye with cutting-edge treatments.",
      path: "/cornea",
      image: "photos/cornea.jpg", // Replace with your real image
    },
    {
      id: "retinal",
      title: "Retina",
      description:
        "Advanced treatment for retinal disorders, macular degeneration, and diabetic retinopathy using state-of-the-art technology.",
      path: "/retinal",
      image: "photos/retina.jpg",
    },
    {
      id: "cataract",
      title: "Cataract",
      description:
        "Advanced cataract surgery and treatment using the latest minimally invasive surgical techniques and premium lens technology.",
      path: "/cataract",
      image: "photos/cataract.jpg",
    },
    {
      id: "refractive",
      title: "Refractive Surgery",
      description:
        "Modern laser and surgical solutions to correct vision problems such as myopia, hyperopia, and astigmatism with precision and safety.",
      path: "/refractive-surgery",
      image: "photos/refractive-surgery.jpg",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-6 py-16">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 tracking-tight">
              Our Services
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Comprehensive eye care delivered using the most advanced medical technology.
            </p>
          </div>

          {/* Services Grid */}
          <div className="grid md:grid-cols-2 gap-10">
            {services.map((service, i) => (
              <motion.div
                key={service.id}
                onClick={() => navigate(service.path)}
                className="group relative rounded-2xl border border-gray-200 bg-white shadow-sm hover:shadow-lg transition-all duration-500 cursor-pointer overflow-hidden"
                whileHover={{ y: -6 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                {/* Image */}
                <div className="h-48 w-full overflow-hidden">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>

                {/* Content */}
                <div className="p-8 md:p-10">
                  <h3 className="text-2xl font-semibold text-gray-900 mb-4 group-hover:text-gray-700 transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed mb-8">
                    {service.description}
                  </p>

                  {/* CTA */}
                  <button className="inline-flex items-center px-5 py-2.5 text-sm font-medium rounded-lg bg-gray-900 text-white hover:bg-gray-800 hover:scale-105 transition-transform">
                    Learn More →
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services;
