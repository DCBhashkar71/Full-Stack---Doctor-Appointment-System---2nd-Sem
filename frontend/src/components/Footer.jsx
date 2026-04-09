import React from 'react';
import { assets } from '../assets/assets';

const Footer = () => {
  return (
    <div className='bg-gray-900 text-white py-12'>
      <div className='max-w-6xl mx-auto px-6 grid grid-cols-3 gap-10'>
        <div>
          <img src={assets.logo} className='w-40 mb-4' alt="" />
          <p className='text-sm text-gray-400'>Your trusted partner in healthcare.</p>
        </div>
        <div>
          <p className='font-medium mb-4'>COMPANY</p>
          <ul className='text-sm space-y-2 text-gray-400'>
            <li>Home</li>
            <li>About us</li>
            <li>Contact us</li>
          </ul>
        </div>
        <div>
          <p className='font-medium mb-4'>GET IN TOUCH</p>
          <p className='text-sm text-gray-400'>+91-XXXXXXXXXX</p>
          <p className='text-sm text-gray-400'>prescripto@gmail.com</p>
        </div>
      </div>
      <div className='text-center text-sm text-gray-500 mt-12'>
        Copyright © 2026 Prescripto - All Rights Reserved.
      </div>
    </div>
  );
};

export default Footer;