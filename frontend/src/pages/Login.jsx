import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const backendUrl = 'http://localhost:4000/api';

const Login = () => {
  const [isSignup, setIsSignup] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const { setToken } = useContext(AppContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = isSignup ? '/user/register' : '/user/login';
      const { data } = await axios.post(backendUrl + url, formData);
      localStorage.setItem('token', data.token);
      setToken(data.token);
      toast.success(isSignup ? 'Account created!' : 'Login successful!');
      navigate('/');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Something went wrong');
    }
  };

  return (
    <div className='flex items-center justify-center min-h-[80vh]'>
      <form onSubmit={handleSubmit} className='bg-white shadow-lg rounded-2xl p-10 w-full max-w-md'>
        <h2 className='text-3xl font-semibold text-center mb-8'>{isSignup ? 'Create Account' : 'Login'}</h2>

        {isSignup && (
          <div className='mb-6'>
            <p className='text-sm text-gray-600 mb-1'>Full Name</p>
            <input type="text" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} className='w-full border border-gray-300 rounded-lg px-4 py-3' required />
          </div>
        )}

        <div className='mb-6'>
          <p className='text-sm text-gray-600 mb-1'>Email</p>
          <input type="email" value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} className='w-full border border-gray-300 rounded-lg px-4 py-3' required />
        </div>

        <div className='mb-8'>
          <p className='text-sm text-gray-600 mb-1'>Password</p>
          <input type="password" value={formData.password} onChange={e => setFormData({ ...formData, password: e.target.value })} className='w-full border border-gray-300 rounded-lg px-4 py-3' required />
        </div>

        <button type='submit' className='w-full bg-primary text-white py-3.5 rounded-full font-medium text-lg'>
          {isSignup ? 'Create Account' : 'Login'}
        </button>

        <p className='text-center mt-6 text-sm'>
          {isSignup ? 'Already have an account?' : "Don't have an account?"} 
          <span onClick={() => setIsSignup(!isSignup)} className='text-primary underline cursor-pointer ml-1'>
            {isSignup ? 'Login here' : 'Sign up here'}
          </span>
        </p>
      </form>
    </div>
  );
};

export default Login;