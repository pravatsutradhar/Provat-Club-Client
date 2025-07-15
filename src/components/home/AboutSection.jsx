import React from 'react';
import { FaHistory, FaBullseye } from 'react-icons/fa';

function AboutSection() {
  return (
    <section className="py-20 bg-gradient-to-br from-white via-blue-50 to-blue-100">
      <div className="container mx-auto px-4 max-w-5xl">
        <h2 className="text-5xl font-extrabold text-center text-blue-800 mb-12 tracking-tight drop-shadow-lg">
          About <span className="text-blue-500">Our Club</span>
        </h2>
        <div className="space-y-20">
          {/* Row 1: Text left, Image right */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div className="text-gray-800 text-lg space-y-6 order-1 md:order-1">
              <div className="flex items-start space-x-4">
                <FaHistory className="text-4xl text-blue-500 mt-1" />
                <div>
                  <h3 className="text-2xl font-bold text-blue-700 mb-2 flex items-center">Our History</h3>
                  <p>
                    Founded in 2005, <span className="font-semibold text-blue-600">My Club</span> started as a humble community initiative to promote sports and wellness. Over the years, we've grown into a state-of-the-art facility, renowned for our diverse range of courts and vibrant community events. Our journey has been fueled by a passion for healthy living and a commitment to providing an inclusive environment for all ages and skill levels.
                  </p>
                </div>
              </div>
            </div>
            <div className="flex justify-center ">
              <img
                src="https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=600&q=80"
                alt="Club Interior"
                className="rounded-2xl shadow-2xl border-4 border-blue-200 w-full max-w-md"
              />
            </div>
          </div>
          {/* Row 2: Image left, Text right */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div className="flex justify-center order-1 md:order-2">
              <img
                src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80"
                alt="Club Mission"
                className="rounded-2xl shadow-2xl border-4 border-blue-200 w-full max-w-md"
              />
            </div>
            <div className="text-gray-800 text-lg space-y-6 order-2 md:order-1">
              <div className="flex items-start space-x-4">
                <FaBullseye className="text-4xl text-blue-500 mt-1" />
                <div>
                  <h3 className="text-2xl font-bold text-blue-700 mb-2 flex items-center">Our Mission</h3>
                  <p>
                    Our mission is to foster a dynamic and supportive community where members can pursue their athletic passions, enhance their well-being, and forge lasting friendships. We strive to offer top-tier facilities, expert coaching, and a calendar full of engaging activities that cater to everyone, from competitive athletes to casual enthusiasts. <span className="font-semibold text-blue-600">We believe in the power of sport to bring people together and enrich lives.</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutSection;