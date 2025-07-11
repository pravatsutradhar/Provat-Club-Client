import React, { useState, useEffect } from 'react';

const images = [
  'https://images.unsplash.com/photo-1596541223130-5d31a735b12a?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', // Example club image
  'https://images.unsplash.com/photo-1541334200-a178e0785750?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', // Example courts image
  'https://images.unsplash.com/photo-1517436073-2e06a72e817a?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', // Example activities image
];

function HeroBanner() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000); // Change image every 5 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <section
      className="relative h-96 sm:h-[400px] md:h-[500px] lg:h-[600px] bg-cover bg-center transition-opacity duration-1000 ease-in-out"
      style={{ backgroundImage: `url(${images[currentImageIndex]})` }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
        <div className="text-center text-white p-4">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight drop-shadow-lg">
            Welcome to Our Club
          </h1>
          <p className="mt-4 text-lg sm:text-xl md:text-2xl font-light max-w-2xl mx-auto drop-shadow-md">
            Your premier destination for sports, fitness, and community.
          </p>
          <button className="mt-8 px-8 py-3 bg-blue-600 text-white text-lg font-semibold rounded-lg shadow-lg hover:bg-blue-700 transition duration-300 transform hover:scale-105">
            Explore Courts
          </button>
        </div>
      </div>
    </section>
  );
}

export default HeroBanner;