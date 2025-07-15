import React, { useState, useEffect } from 'react';

const images = [
  {
    url: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
    caption: 'Welcome to My Club',
    subcaption: 'A vibrant community for sports and wellness.'
  },
  {
    url: 'https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&w=800&q=80',
    caption: 'State-of-the-Art Courts',
    subcaption: 'Play on the best courts in town.'
  },
  {
    url: 'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=800&q=80',
    caption: 'Exciting Activities',
    subcaption: 'Events, tournaments, and more!'
  }
];

function HeroBanner() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 4000); // Change image every 4 seconds
    return () => clearInterval(interval);
  }, []);

  const { url, caption, subcaption } = images[currentImageIndex];

  return (
    <section
      className="relative h-[400px] md:h-[500px] lg:h-[600px] overflow-hidden"
    >
      <img
        src={url}
        alt={caption}
        className="absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out"
        style={{ zIndex: 1 }}
      />
      <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/40 to-blue-900/60 flex items-center justify-center z-10">
        <div className="text-center text-white p-6 animate-fade-in">
          <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight drop-shadow-lg mb-4 animate-slide-up">
            {caption}
          </h1>
          <p className="text-2xl md:text-3xl font-light max-w-2xl mx-auto drop-shadow-md mb-8 animate-slide-up delay-200">
            {subcaption}
          </p>
          <button className="mt-4 px-10 py-3 bg-gradient-to-r from-blue-600 to-blue-400 text-white text-xl font-bold rounded-full shadow-xl hover:scale-105 transition-transform duration-300">
            Explore Courts
          </button>
        </div>
      </div>
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-3 z-20">
        {images.map((_, idx) => (
          <span
            key={idx}
            className={`block w-4 h-4 rounded-full border-2 border-white transition-all duration-300 ${idx === currentImageIndex ? 'bg-white' : 'bg-white/40'}`}
          />
        ))}
      </div>
    </section>
  );
}

export default HeroBanner;