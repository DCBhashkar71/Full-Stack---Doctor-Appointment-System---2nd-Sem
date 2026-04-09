import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';

const TopDoctors = () => {
  const { doctors } = useContext(AppContext);
  const navigate = useNavigate();

  return (
    <div className='my-16'>
      <div className='text-center mb-10'>
        <h1 className='text-3xl font-medium'>Top Doctors to Book</h1>
      </div>
      <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6'>
        {doctors.slice(0, 10).map((doctor) => (
          <div
            key={doctor._id}
            onClick={() => navigate(`/appointment/${doctor._id}`)}
            className='border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all'
          >
            <img className='w-full bg-blue-50' src={doctor.image} alt="" />
            <div className='p-4'>
              <div className='flex items-center gap-2 text-green-500 text-sm'>
                <span className='w-2 h-2 bg-green-500 rounded-full'></span> Available
              </div>
              <p className='font-medium'>{doctor.name}</p>
              <p className='text-sm text-gray-600'>{doctor.speciality}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopDoctors;