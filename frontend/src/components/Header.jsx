import React from 'react';
import { assets } from '../assets/assets';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();
  return (
    <div className='flex flex-col md:flex-row bg-primary rounded-3xl px-6 md:px-10 lg:px-20'>
      <div className='md:w-1/2 flex flex-col items-start justify-center gap-4 py-10 md:py-16'>
        <p className='text-3xl md:text-4xl lg:text-5xl font-semibold text-white leading-tight'>
          Book Appointment With Trusted Doctors
        </p>
        <div className='flex flex-col md:flex-row items-center gap-3 text-white text-sm'>
          <img className='w-28' src={assets.group_profiles} alt="" />
          <p>Simply browse through our extensive list of trusted doctors</p>
        </div>
        <button onClick={() => navigate('/doctors')} className='bg-white text-primary px-8 py-3 rounded-full mt-6'>Book appointment</button>
      </div>
      <div className='md:w-1/2 relative'>
        <img className='w-full md:absolute bottom-0 rounded-lg' src={assets.header_img} alt="" />
      </div>
    </div>
  );
};

export default Header;