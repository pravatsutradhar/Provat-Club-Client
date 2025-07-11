import React from 'react';

function LocationSection() {
  const address = {
    street: '123 Sportive Lane',
    city: 'Dhaka',
    postcode: '1200',
    country: 'Bangladesh',
  };

  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${address.street}, ${address.city}, ${address.country}`)}`;

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
            {/* Static Map Image Placeholder */}
            <img
              src="https://via.placeholder.com/600x400?text=Map+of+Our+Location" // Replace with a real map embed or image later
              alt="Club Location Map"
              className="w-full h-auto rounded-lg shadow-xl"
            />
            {/* Example for a real map embed (uncomment and replace src if needed): */}
            {/* <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3652.285810237735!2d90.39088617502476!3d23.737190378652417!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755b8e96f1b1b1b%3A0x3b1b1b1b1b1b1b1b!2sDhaka!5e0!3m2!1sen!2sbd!4v1700000000000!5m2!1sen!2sbd"
              width="100%"
              height="400"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="rounded-lg shadow-xl"
            ></iframe> */}
          </div>
        </div>
      </div>
    </section>
  );
}

export default LocationSection;