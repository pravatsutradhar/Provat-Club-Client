import React from 'react';

const promotions = [
  { code: 'SPRING25', discount: '25%', description: 'Off all tennis court bookings in April!' },
  { code: 'SUMMERFUN', discount: '15%', description: 'Discount on badminton sessions for new members.' },
  { code: 'FIRSTGAME', discount: '50%', description: 'Your first squash session is half price!' },
];

function PromotionSection() {
  return (
    <section className="py-16 bg-blue-700 text-white">
      <div className="container mx-auto px-4 max-w-4xl text-center">
        <h2 className="text-4xl font-bold mb-10">Exclusive Promotions & Discounts!</h2>
        <p className="text-xl mb-12 opacity-90">
          Unlock amazing deals and make the most of your time at My Club. Use these codes during booking!
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {promotions.map((promo, index) => (
            <div
              key={index}
              className="bg-white text-gray-800 p-8 rounded-lg shadow-xl transform hover:scale-105 transition duration-300 ease-in-out border-b-4 border-blue-500"
            >
              <h3 className="text-3xl font-extrabold mb-4 text-blue-600">{promo.discount} OFF!</h3>
              <div className="bg-yellow-200 text-yellow-800 font-bold px-5 py-2 rounded-full inline-block text-xl tracking-wider mb-4 border border-yellow-500">
                {promo.code}
              </div>
              <p className="text-lg leading-relaxed">{promo.description}</p>
            </div>
          ))}
        </div>
        <p className="mt-12 text-lg opacity-80">
          *Terms and conditions apply. Offers are subject to change.
        </p>
      </div>
    </section>
  );
}

export default PromotionSection;