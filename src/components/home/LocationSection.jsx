import React from 'react';
import { FaMapMarkerAlt, FaDirections } from 'react-icons/fa';

function LocationSection() {
  const address = {
    street: '123 Sportive Lane',
    city: 'Dhaka',
    postcode: '1200',
    country: 'Bangladesh',
  };
  const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(`${address.street}, ${address.city}, ${address.postcode}, ${address.country}`)}`;

  return (
    <section className="py-20 bg-gradient-to-br from-blue-50 via-white to-blue-100">
      <div className="container mx-auto px-4 max-w-5xl">
        <h2 className="text-5xl font-extrabold text-center text-blue-800 mb-12 tracking-tight drop-shadow-lg">
          <FaMapMarkerAlt className="inline-block mr-3 text-blue-500" /> Find Us
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div className="text-xl text-gray-800 space-y-4">
            <h3 className="text-2xl font-bold text-blue-700 mb-2 flex items-center">
              <FaMapMarkerAlt className="mr-2 text-blue-500" /> Our Address
            </h3>
            <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-blue-400">
              <p className="mb-1 font-semibold">{address.street}</p>
              <p className="mb-1">{address.city}, {address.postcode}</p>
              <p className="mb-3">{address.country}</p>
              <p className="text-gray-600 text-base">Feel free to visit us during our operating hours or contact us for any inquiries. We look forward to welcoming you to <span className="font-semibold text-blue-600">My Club</span>!</p>
              <a
                href={googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex items-center bg-gradient-to-r from-blue-600 to-blue-400 text-white px-6 py-3 rounded-full shadow-lg hover:scale-105 transition-transform duration-300 font-bold text-lg"
              >
                <FaDirections className="mr-2 text-white text-xl" /> Navigate with Google Maps
              </a>
            </div>
          </div>
          <div className="flex justify-center">
            <iframe
              src="https://www.google.com/maps?q=23.8103,90.4125&z=15&output=embed"
              width="100%"
              height="400"
              style={{ border: 0, borderRadius: '1rem', boxShadow: '0 4px 24px rgba(0,0,0,0.08)' }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Club Location Map"
              className="w-full h-[400px] rounded-2xl shadow-2xl border-4 border-blue-200 max-w-md"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default LocationSection;