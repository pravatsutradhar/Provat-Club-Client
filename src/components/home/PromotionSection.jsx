import React from 'react';
import { FaGift, FaPercent } from 'react-icons/fa';

const promotions = [
  { code: 'ABC', discount: '5%', description: 'Get 5% off on all bookings this month!' },
  { code: 'SPRING25', discount: '25%', description: 'Off all tennis court bookings in April!' },
  { code: 'SUMMERFUN', discount: '15%', description: 'Discount on badminton sessions for new members.' },
  { code: 'FIRSTGAME', discount: '50%', description: 'Your first squash session is half price!' },
];

function PromotionSection() {
  return (
    <section className="py-20 bg-gradient-to-br from-yellow-200 via-pink-100 to-blue-200">
      <div className="container mx-auto px-4 max-w-6xl text-center">
        <h2 className="text-5xl font-extrabold mb-10 text-pink-700 tracking-tight drop-shadow-lg flex items-center justify-center">
          <FaGift className="mr-3 text-yellow-500 text-4xl" /> Exclusive Promotions & Discounts!
        </h2>
        <p className="text-2xl mb-14 opacity-90 font-medium text-gray-700">
          Unlock amazing deals and make the most of your time at <span className="text-blue-600 font-bold">My Club</span>. Use these codes during booking!
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
          {promotions.map((promo, index) => (
            <div
              key={index}
              className="relative bg-white p-8 rounded-2xl shadow-2xl border-b-8 border-blue-400 transform hover:scale-105 transition duration-300 ease-in-out flex flex-col items-center"
            >
              <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-pink-500 to-yellow-400 text-white px-6 py-2 rounded-full shadow-lg font-bold text-lg flex items-center">
                <FaPercent className="mr-2 text-xl" /> {promo.discount} OFF
              </div>
              <div className="bg-yellow-100 text-yellow-800 font-bold px-6 py-3 rounded-full inline-block text-2xl tracking-wider mb-6 border-2 border-yellow-400 mt-8">
                {promo.code}
              </div>
              <p className="text-lg leading-relaxed text-gray-700 font-medium mb-2">{promo.description}</p>
            </div>
          ))}
        </div>
        <p className="mt-16 text-lg opacity-80 text-gray-600">
          *Terms and conditions apply. Offers are subject to change.
        </p>
      </div>
    </section>
  );
}

export default PromotionSection;