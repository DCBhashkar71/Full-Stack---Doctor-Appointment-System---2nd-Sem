import React from 'react';
import { assets } from '../assets/assets';

const Contact = () => {
  return (
    <div className='max-w-6xl mx-auto px-4 py-12'>
      <div className='text-center mb-12'>
        <h1 className='text-4xl font-semibold'>Contact Us</h1>
      </div>

      <div className='grid md:grid-cols-2 gap-12'>
        <img className='rounded-3xl' src={assets.contact_img} alt="" />

        <div className='space-y-8'>
          <div>
            <h3 className='font-semibold text-lg mb-2'>OUR OFFICE</h3>
            <p className='text-gray-600'>123, Health Street, Coimbatore, Tamil Nadu, India</p>
          </div>

          <div>
            <h3 className='font-semibold text-lg mb-2'>GET IN TOUCH</h3>
            <p className='text-gray-600'>+91 98765 43210</p>
            <p className='text-gray-600'>prescripto.bhashkar@gmail.com</p>
          </div>

          <button className='border-2 border-black px-10 py-4 rounded-full hover:bg-black hover:text-white transition'>
            Learn More
          </button>
        </div>
      </div>
    </div>
  );
};

export default Contact;