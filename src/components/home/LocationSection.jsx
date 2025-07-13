import React from 'react';

function LocationSection() {
  const address = {
    street: '123 Sportive Lane',
    city: 'Dhaka',
    postcode: '1200',
    country: 'Bangladesh',
  };

  // Google Maps URL for directions. Use a proper embed or link.
  // The 'https://www.google.com/maps/search/?api=1&query=$' part was a typo, corrected to a valid base.
  // Using query parameters for address.
  const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(`${address.street}, ${address.city}, ${address.postcode}, ${address.country}`)}`;

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4 max-w-4xl">
        <h2 className="text-4xl font-bold text-center text-gray-800 mb-10">Find Us</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="text-lg text-gray-700">
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">Our Address</h3>
            <p className="mb-2">
              {address.street}
            </p>
            <p className="mb-2">
              {address.city}, {address.postcode}
            </p>
            <p className="mb-6">
              {address.country}
            </p>
            <p>
              Feel free to visit us during our operating hours or contact us for any inquiries. We look forward to welcoming you to My Club!
            </p>
            <a
              href={googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-block bg-blue-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-700 transition duration-300"
            >
              Get Directions (Google Maps)
            </a>
          </div>
          <div>
            {/* Static Map Image Placeholder - Recommend replacing with actual embed */}
            {/* Example of a real map embed using Google Maps Embed API (replace API_KEY)
            <iframe
              src={`https://www.google.com/maps/embed/v1/place?key=YOUR_Maps_API_KEY&q=${encodeURIComponent(`${address.street}, ${address.city}, ${address.country}`)}`}
              width="100%"
              height="400"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="rounded-lg shadow-xl"
              title="Club Location Map" // Added for accessibility
            ></iframe>
            */}
            <img
              src="https://via.placeholder.com/600x400/FF5733/FFFFFF?text=Map+of+Our+Location" // Updated placeholder
              alt="Club Location Map"
              className="w-full h-auto rounded-lg shadow-xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default LocationSection;