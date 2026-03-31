import React, { useState, useContext, useEffect } from 'react';
import { AppContext } from '../context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const backendUrl = 'http://localhost:4000/api';

const MyProfile = () => {
  const { token, user } = useContext(AppContext);
  const [isEdit, setIsEdit] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: { line1: '', line2: '' },
    gender: '',
    dob: ''
  });

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        email: user.email || '',
        phone: user.phone || '',
        address: user.address || { line1: '', line2: '' },
        gender: user.gender || '',
        dob: user.dob ? user.dob.split('T')[0] : ''
      });
    }
  }, [user]);

  const handleUpdate = async () => {
    try {
      await axios.put(`${backendUrl}/user/profile`, formData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      toast.success('Profile updated successfully!');
      setIsEdit(false);
    } catch (err) {
      toast.error('Failed to update profile');
    }
  };

  return (
    <div className='max-w-2xl mx-auto mt-10 p-8 bg-white rounded-2xl shadow'>
      <div className='flex justify-between items-center mb-8'>
        <h1 className='text-3xl font-semibold'>My Profile</h1>
        <button
          onClick={() => setIsEdit(!isEdit)}
          className='px-6 py-2 border rounded-full text-primary hover:bg-primary hover:text-white transition'
        >
          {isEdit ? 'Cancel' : 'Edit Profile'}
        </button>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
        <div>
          <label className='block text-sm text-gray-600 mb-1'>Name</label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            disabled={!isEdit}
            className='w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-primary'
          />
        </div>

        <div>
          <label className='block text-sm text-gray-600 mb-1'>Email</label>
          <input
            type="email"
            value={formData.email}
            disabled
            className='w-full border border-gray-300 rounded-lg px-4 py-3 bg-gray-100'
          />
        </div>

        <div>
          <label className='block text-sm text-gray-600 mb-1'>Phone</label>
          <input
            type="text"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            disabled={!isEdit}
            className='w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-primary'
          />
        </div>

        <div>
          <label className='block text-sm text-gray-600 mb-1'>Date of Birth</label>
          <input
            type="date"
            value={formData.dob}
            onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
            disabled={!isEdit}
            className='w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-primary'
          />
        </div>

        <div className='md:col-span-2'>
          <label className='block text-sm text-gray-600 mb-1'>Address Line 1</label>
          <input
            type="text"
            value={formData.address.line1}
            onChange={(e) => setFormData({ ...formData, address: { ...formData.address, line1: e.target.value } })}
            disabled={!isEdit}
            className='w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-primary'
          />
        </div>

        <div className='md:col-span-2'>
          <label className='block text-sm text-gray-600 mb-1'>Address Line 2</label>
          <input
            type="text"
            value={formData.address.line2}
            onChange={(e) => setFormData({ ...formData, address: { ...formData.address, line2: e.target.value } })}
            disabled={!isEdit}
            className='w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-primary'
          />
        </div>

        <div>
          <label className='block text-sm text-gray-600 mb-1'>Gender</label>
          <select
            value={formData.gender}
            onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
            disabled={!isEdit}
            className='w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-primary'
          >
            <option value="">Select</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>
      </div>

      {isEdit && (
        <button
          onClick={handleUpdate}
          className='mt-10 w-full bg-primary text-white py-4 rounded-full font-medium text-lg'
        >
          Save Information
        </button>
      )}
    </div>
  );
};

export default MyProfile;