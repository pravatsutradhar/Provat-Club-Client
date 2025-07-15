import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';

function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-10">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8 items-center text-center md:text-left">
        {/* Contact Info */}
        <div className="mb-6 md:mb-0">
          <h3 className="text-xl font-bold text-white mb-4">Contact Us</h3>
          <p className="text-lg">123 Sportive Lane</p>
          <p className="text-lg">Dhaka, 1200, Bangladesh</p>
          <p className="mt-2 text-lg">Email: info@myclub.com</p>
          <p className="text-lg">Phone: +880 123 456 789</p>
        </div>

        {/* Site Navigation */}
        <div className="mb-6 md:mb-0">
          <h3 className="text-xl font-bold text-white mb-4">Quick Links</h3>
          <ul className="space-y-2">
            <li><link to='/'  className="hover:text-white transition-colors duration-200 text-lg">Home</link></li>
            <li><link to='/courts' className="hover:text-white transition-colors duration-200 text-lg">Courts</link></li>
            <li><link to='/login' className="hover:text-white transition-colors duration-200 text-lg">Login</link></li>
            {/* Add more links as pages are built */}
          </ul>
        </div>

        {/* Social Links */}
        <div className="text-center md:text-right">
          <h3 className="text-xl font-bold text-white mb-4">Follow Us</h3>
          <div className="flex justify-center md:justify-end space-x-6">
            <a href="https://facebook.com/myclub" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="text-gray-400 hover:text-white text-3xl transition-colors duration-200">
              <FaFacebookF />
            </a>
            <a href="https://twitter.com/myclub" target="_blank" rel="noopener noreferrer" aria-label="Twitter" className="text-gray-400 hover:text-white text-3xl transition-colors duration-200">
              <FaTwitter />
            </a>
            <a href="https://instagram.com/myclub" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-gray-400 hover:text-white text-3xl transition-colors duration-200">
              <FaInstagram />
            </a>
            <a href="https://linkedin.com/company/myclub" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="text-gray-400 hover:text-white text-3xl transition-colors duration-200">
              <FaLinkedinIn />
            </a>
          </div>
        </div>
      </div>
      <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-500 text-sm">
        © {new Date().getFullYear()} My Club. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;