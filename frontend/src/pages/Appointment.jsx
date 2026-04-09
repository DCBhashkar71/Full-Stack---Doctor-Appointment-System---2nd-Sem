import React, { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import RelatedDoctors from '../components/RelatedDoctors';
import { toast } from 'react-toastify';
import axios from 'axios';

const backendUrl = 'http://localhost:4000/api';

const Appointment = () => {
  const { docId } = useParams();
  const { doctors, token } = useContext(AppContext);
  const [doctor, setDoctor] = useState(null);
  const [slots, setSlots] = useState([]);
  const [selectedDateIndex, setSelectedDateIndex] = useState(0);
  const [selectedTime, setSelectedTime] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const found = doctors.find(d => d._id === docId);
    setDoctor(found);
  }, [doctors, docId]);

  const generateSlots = () => {
    if (!doctor) return;
    const newSlots = [];
    const today = new Date();
    for (let i = 0; i < 7; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      const daySlots = [];
      for (let hour = 10; hour <= 20; hour++) {
        for (let min = 0; min < 60; min += 30) {
          daySlots.push({
            time: `${hour.toString().padStart(2, '0')}:${min.toString().padStart(2, '0')}`,
            date: date.toISOString().split('T')[0]
          });
        }
      }
      newSlots.push(daySlots);
    }
    setSlots(newSlots);
  };

  useEffect(() => { generateSlots(); }, [doctor]);

  const bookAppointment = async () => {
    if (!selectedTime) return toast.error('Please select a time slot');
    try {
      await axios.post(`${backendUrl}/user/book-appointment`, {
        docId,
        slotDate: slots[selectedDateIndex][0].date,
        slotTime: selectedTime,
        amount: doctor.fees
      }, { headers: { Authorization: `Bearer ${token}` } });
      toast.success('Appointment booked successfully!');
      navigate('/my-appointments');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Booking failed');
    }
  };

  if (!doctor) return <div className='text-center py-20'>Loading doctor...</div>;

  return (
    <div className='max-w-6xl mx-auto px-4 py-8'>
      {/* Doctor Info */}
      <div className='grid md:grid-cols-2 gap-8'>
        <img className='w-full rounded-xl' src={doctor.image} alt="" />
        <div>
          <h1 className='text-3xl font-semibold'>{doctor.name}</h1>
          <p className='text-gray-600'>{doctor.degree} • {doctor.speciality}</p>
          <p className='mt-4'>{doctor.about}</p>
          <p className='mt-6 font-medium'>Appointment fee: <span className='text-primary'>${doctor.fees}</span></p>
        </div>
      </div>

      {/* Booking Slots */}
      <div className='mt-12'>
        <h2 className='text-2xl font-medium mb-4'>Booking slots</h2>
        <div className='flex gap-3 overflow-x-auto pb-4'>
          {slots.map((day, index) => (
            <button
              key={index}
              onClick={() => setSelectedDateIndex(index)}
              className={`px-6 py-4 rounded-full whitespace-nowrap ${selectedDateIndex === index ? 'bg-primary text-white' : 'bg-gray-100'}`}
            >
              {new Date(day[0].date).toLocaleDateString('en-US', { weekday: 'short', day: 'numeric' })}
            </button>
          ))}
        </div>

        <div className='flex flex-wrap gap-3 mt-6'>
          {slots[selectedDateIndex]?.map((slot, i) => (
            <button
              key={i}
              onClick={() => setSelectedTime(slot.time)}
              className={`px-5 py-3 rounded-full border ${selectedTime === slot.time ? 'bg-primary text-white' : 'bg-white'}`}
            >
              {slot.time}
            </button>
          ))}
        </div>

        <button
          onClick={bookAppointment}
          className='mt-10 bg-primary text-white px-12 py-4 rounded-full font-medium'
        >
          Book Appointment
        </button>
      </div>

      <RelatedDoctors speciality={doctor.speciality} docId={docId} />
    </div>
  );
};

export default Appointment;