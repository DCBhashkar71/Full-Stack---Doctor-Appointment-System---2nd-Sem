import React from 'react';
import { assets } from '../assets/assets';
import { useNavigate } from 'react-router-dom';

const Banner = () => {
  const navigate = useNavigate();
  return (
    <div className='bg-primary rounded-3xl px-8 py-12 flex flex-col md:flex-row items-center justify-between my-16'>
      <div className='md:w-1/2'>
        <h2 className='text-4xl font-semibold text-white'>Book Appointment With 100+ Trusted Doctors</h2>
        <button onClick={() => navigate('/login')} className='mt-6 bg-white text-primary px-8 py-3 rounded-full'>Create Account</button>
      </div>
      <div className='md:w-1/2'>
        <img className='w-full' src={assets.appointment_img} alt="" />
      </div>
    </div>
  );
};

export default Banner;