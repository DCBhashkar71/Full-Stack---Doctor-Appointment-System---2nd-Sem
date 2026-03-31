import React from 'react';
import { assets } from '../assets/assets';

const About = () => {
  return (
    <div className='max-w-6xl mx-auto px-4 py-12'>
      <div className='text-center mb-12'>
        <h1 className='text-4xl font-semibold'>About Us</h1>
      </div>

      <div className='grid md:grid-cols-2 gap-12 items-center'>
        <img className='rounded-3xl' src={assets.about_img} alt="" />

        <div className='space-y-6 text-gray-700'>
          <p>Welcome to Prescripto, your trusted partner in managing your healthcare needs. We understand the challenges individuals face when it comes to scheduling medical appointments and are here to make the process seamless.</p>
          
          <p>Our vision at Prescripto is to create a seamless healthcare experience for every user. We aim to bridge the gap between patients and healthcare providers, ensuring that everyone has access to quality care when they need it most.</p>

          <div className='bg-blue-50 p-6 rounded-2xl'>
            <h3 className='font-semibold mb-3'>Our Mission</h3>
            <p>To provide a hassle-free platform that connects patients with the best doctors in their area.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;