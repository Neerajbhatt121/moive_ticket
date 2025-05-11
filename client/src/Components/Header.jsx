import React from 'react';
import profileImg from '../assets/profile.png';

const Header = () => {
  return (
    <div className='w-full h-[4rem] bg-gray-100 flex justify-between p-2 overflow-x-hidden items-center '>
      <div className='w-2.5'>TEXMIX</div>
      
      <div className='w-1/6 flex justify-between bg-gray-200 p-1 px-4 rounded-3xl shadow-xl'>
            <div>Login</div>
            <div>Register</div>
            <div><img className='w-6 h-6' src={profileImg} alt="#" /></div>
      </div>
    </div>
  )
}

export default Header
