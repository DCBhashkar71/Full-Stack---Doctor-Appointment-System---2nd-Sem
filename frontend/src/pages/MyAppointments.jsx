import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const backendUrl = 'http://localhost:4000/api';

const MyAppointments = () => {
  const { token } = useContext(AppContext);
  const [appointments, setAppointments] = useState([]);

  const fetchAppointments = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/user/my-appointments`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setAppointments(data);
    } catch (err) {
      toast.error('Failed to load appointments');
    }
  };

  useEffect(() => {
    if (token) fetchAppointments();
  }, [token]);

  const handleCancel = async (id) => {
    try {
      await axios.post(`${backendUrl}/user/cancel-appointment/${id}`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      toast.success('Appointment cancelled');
      fetchAppointments();
    } catch (err) {
      toast.error('Failed to cancel');
    }
  };

  return (
    <div className='max-w-4xl mx-auto mt-10 px-4'>
      <h1 className='text-3xl font-semibold mb-8'>My Appointments</h1>

      <div className='space-y-6'>
        {appointments.length === 0 ? (
          <p className='text-gray-500 text-center py-12'>No appointments yet</p>
        ) : (
          appointments.map((app) => (
            <div key={app._id} className='border border-gray-200 rounded-2xl p-6 flex flex-col md:flex-row gap-6 items-center'>
              <img className='w-24 h-24 object-cover rounded-xl' src={app.doctorId?.image || '/placeholder.jpg'} alt="" />
              <div className='flex-1'>
                <h3 className='font-semibold text-xl'>{app.doctorId?.name}</h3>
                <p className='text-gray-600'>{app.slotDate} • {app.slotTime}</p>
                <p className='text-sm mt-2'>
                  Status: <span className={`font-medium ${app.isCancelled ? 'text-red-600' : app.isPaid ? 'text-green-600' : 'text-orange-600'}`}>
                    {app.isCancelled ? 'Cancelled' : app.isPaid ? 'Paid' : 'Pending'}
                  </span>
                </p>
              </div>
              <div className='flex flex-col gap-3'>
                {!app.isCancelled && !app.isPaid && (
                  <button className='px-8 py-3 bg-blue-600 text-white rounded-full text-sm font-medium'>Pay Now</button>
                )}
                {!app.isCancelled && (
                  <button
                    onClick={() => handleCancel(app._id)}
                    className='px-8 py-3 border border-red-500 text-red-500 rounded-full text-sm font-medium hover:bg-red-50'
                  >
                    Cancel
                  </button>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default MyAppointments;