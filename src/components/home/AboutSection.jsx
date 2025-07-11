import React from 'react';

function AboutSection() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 max-w-4xl">
        <h2 className="text-4xl font-bold text-center text-gray-800 mb-10">About Our Club</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="md:order-2">
            <img
              src="https://cdn.pixabay.com/photo/2022/04/10/16/41/lawyer-7123798_1280.jpg"
              alt="Club Interior"
              className="rounded-lg shadow-xl"
            />
          </div>
          <div className="md:order-1 text-gray-700 leading-relaxed text-lg">
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">Our History</h3>
            <p className="mb-6">
              Founded in 2005, My Club started as a humble community initiative to promote sports and wellness. Over the years, we've grown into a state-of-the-art facility, renowned for our diverse range of courts and vibrant community events. Our journey has been fueled by a passion for healthy living and a commitment to providing an inclusive environment for all ages and skill levels.
            </p>
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">Our Mission</h3>
            <p>
              Our mission is to foster a dynamic and supportive community where members can pursue their athletic passions, enhance their well-being, and forge lasting friendships. We strive to offer top-tier facilities, expert coaching, and a calendar full of engaging activities that cater to everyone, from competitive athletes to casual enthusiasts. We believe in the power of sport to bring people together and enrich lives.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutSection;