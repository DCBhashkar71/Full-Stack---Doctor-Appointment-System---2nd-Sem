import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';

const RelatedDoctors = ({ speciality, docId }) => {
  const { doctors } = useContext(AppContext);
  const [related, setRelated] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (doctors.length > 0) {
      const filtered = doctors.filter(doc => doc.speciality === speciality && doc._id !== docId).slice(0, 5);
      setRelated(filtered);
    }
  }, [doctors, speciality, docId]);

  return (
    <div className='mt-16'>
      <h2 className='text-2xl font-medium mb-6'>Related Doctors</h2>
      <div className='grid grid-cols-2 md:grid-cols-5 gap-6'>
        {related.map(doctor => (
          <div
            key={doctor._id}
            onClick={() => navigate(`/appointment/${doctor._id}`)}
            className='border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all'
          >
            <img className='w-full bg-blue-50' src={doctor.image} alt="" />
            <div className='p-4'>
              <p className='font-medium'>{doctor.name}</p>
              <p className='text-sm text-gray-600'>{doctor.speciality}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RelatedDoctors;