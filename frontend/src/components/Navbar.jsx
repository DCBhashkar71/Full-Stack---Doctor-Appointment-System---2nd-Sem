import React, { useState, useContext } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { assets } from '../assets/assets';

const Navbar = () => {
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  const { token, user, logout } = useContext(AppContext);

  return (
    <div className='flex items-center justify-between py-4 mb-5 border-b border-b-gray-400'>
      <img onClick={() => navigate('/')} className='w-36 cursor-pointer' src={assets.logo} alt="" />

      <ul className='hidden md:flex items-center gap-5 font-medium text-sm'>
        <NavLink to="/" className={({ isActive }) => isActive ? 'text-primary' : ''}><li className='py-1'>HOME</li></NavLink>
        <NavLink to="/doctors" className={({ isActive }) => isActive ? 'text-primary' : ''}><li className='py-1'>ALL DOCTORS</li></NavLink>
        <NavLink to="/about" className={({ isActive }) => isActive ? 'text-primary' : ''}><li className='py-1'>ABOUT</li></NavLink>
        <NavLink to="/contact" className={({ isActive }) => isActive ? 'text-primary' : ''}><li className='py-1'>CONTACT</li></NavLink>
      </ul>

      <div className='flex items-center gap-4'>
        {token ? (
          <div className='flex items-center gap-2 cursor-pointer group relative'>
            <img className='w-8 rounded-full' src={user?.image || 'https://picsum.photos/32'} alt="" />
            <span className='text-sm'>{user?.name}</span>
            <div className='absolute top-full right-0 bg-white shadow-lg rounded hidden group-hover:block z-50'>
              <p onClick={() => navigate('/my-profile')} className='px-4 py-2 hover:bg-gray-100 cursor-pointer'>My Profile</p>
              <p onClick={() => navigate('/my-appointments')} className='px-4 py-2 hover:bg-gray-100 cursor-pointer'>My Appointments</p>
              <p onClick={logout} className='px-4 py-2 hover:bg-gray-100 text-red-600 cursor-pointer'>Logout</p>
            </div>
          </div>
        ) : (
          <button onClick={() => navigate('/login')} className='bg-primary text-white px-8 py-3 rounded-full font-medium hidden md:block'>Create Account</button>
        )}
        <img onClick={() => setShowMenu(!showMenu)} className='w-6 md:hidden cursor-pointer' src={assets.menu_icon} alt="" />
      </div>

      {/* Mobile Menu */}
      {showMenu && (
        <div className='fixed md:hidden top-0 right-0 bottom-0 w-full bg-white z-50'>
          <div className='flex justify-between px-5 py-6 border-b'>
            <img className='w-36' src={assets.logo} alt="" />
            <img onClick={() => setShowMenu(false)} className='w-6 cursor-pointer' src={assets.cross_icon} alt="" />
          </div>
          <ul className='flex flex-col items-center gap-6 mt-10 text-lg font-medium'>
            <NavLink onClick={() => setShowMenu(false)} to="/">HOME</NavLink>
            <NavLink onClick={() => setShowMenu(false)} to="/doctors">ALL DOCTORS</NavLink>
            <NavLink onClick={() => setShowMenu(false)} to="/about">ABOUT</NavLink>
            <NavLink onClick={() => setShowMenu(false)} to="/contact">CONTACT</NavLink>
            {token && <li onClick={logout} className='text-red-600'>LOGOUT</li>}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Navbar;