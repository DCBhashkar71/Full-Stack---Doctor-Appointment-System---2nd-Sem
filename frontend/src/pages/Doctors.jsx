import React, { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import axios from 'axios';

const Doctors = () => {

  useEffect(() => {
  axios.get("http://localhost:4000/api/doctor/list")
    .then(res => setDoctors(res.data));
}, []);

  const { speciality } = useParams();
  const { doctors } = useContext(AppContext);
  const [apiDoctors, setDoctors] = useState([]);  
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (speciality) {
      setFilteredDoctors(doctors.filter(d => d.speciality === speciality));
    } else {
      setFilteredDoctors(doctors);
    }
  }, [doctors, speciality]);

  return (
    <div className='mt-10 px-4'>
      <p className='text-gray-600'>Browse through the doctors specialist.</p>
      <div className='flex flex-col lg:flex-row gap-6 mt-5'>
        <div className='lg:w-1/4'>
          <div className='space-y-2'>
            {['General Physician', 'Gynecologist', 'Dermatologist', 'Pediatrician', 'Neurologist', 'Gastroenterologist'].map(spec => (
              <button
                key={spec}
                onClick={() => navigate(speciality === spec ? '/doctors' : `/doctors/${spec}`)}
                className={`w-full text-left px-4 py-2 border rounded-lg ${speciality === spec ? 'bg-primary text-white' : 'bg-gray-100'}`}
              >
                {spec}
              </button>
            ))}
          </div>
        </div>
        <div className='lg:w-3/4 grid grid-cols-2 md:grid-cols-3 gap-6'>
          {filteredDoctors.map(doctor => (
            <div
              key={doctor._id}
              onClick={() => navigate(`/appointment/${doctor._id}`)}
              className='border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:shadow-md transition-all'
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
    </div>
  );
};

export default Doctors;