import React from 'react';
import profileImg from '../assets/profile.png';

const Header = () => {
  return (
    <div className='w-screen h-[4rem] bg-gray-100 flex justify-between p-3 items-center '>
      <div className='w-2.5'>TEXMIX</div>
      <div className='w-1/6 flex justify-between bg-gray-200 p-1 px-2 rounded-3xl shadow-xl'>
            <div>Login</div>
            <div>Register</div>
            <div><img className='w-6 h-6' src={profileImg} alt="#" /></div>
      </div>
    </div>
  )
}

export default Header
