import  { useState } from 'react';
import { Link } from 'react-router-dom';
import Avatar from '../assets/ahmaidi.png';
import { ArrowIcon, AuthenIcon, LogOutIcon, LogoIcon, NavProfileIcon } from './Icons';
import NavBar from './NavBar';
import Notification from './Notification';
const LogoBar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen((prevState) => !prevState);
  };

  return (
    <div className="flex justify-between items-center w-[95%] m-auto mt-2">
      <Link to="/">
        <LogoIcon className='mx-2 iphone:w-[25px] iphone:h-[25px] tablet:w-[40px] tablet:h-[40px] laptop:w-[50px] laptop:h-[50px]'/>
      </Link>
      <NavBar />
      <div className='flex items-center iphone:[30%] iphone:gap-2 tablet:gap-4'>
      <Notification />
      <div className="relative">
          <div className="flex items-center text-white gap-1" onClick={toggleDropdown}>
            <img src={Avatar} alt="avatar" className="rounded-full iphone:w-5 iphone:h-5 tablet:w-7 tablet:h-7 laptop:w-9 laptop:h-9" />
            <span className="flex items-center gap-1 iphone:text-[10px] tablet:text-[12px] laptop:text-[16px]">
              ahmaidi <ArrowIcon className={`iphone:w-2 iphone:h-2 tablet:w-3 tablet:h-3 cursor-pointer ${isDropdownOpen ? 'transform rotate-180' : ''}`} />
            </span>
          </div>
          {isDropdownOpen && (
            <div className="absolute text-white right-0 rounded bg-background border-[1px] mt-1 text-[4px] tablet:text-[12px]">
              <div className="flex flex-col items-start cursor-pointer">
                <button onClick={() => console.log('Profile clicked!')} className="flex gap-1 items-center p-1">
                  <NavProfileIcon className="w-2 h-2 tablet:w-5 tablet:h-5" />
                  Profile
                </button>
                <button
                  className="border-t-[0.5px] border-b-[0.5px] border-white w-full flex gap-1 items-center p-1 "
                  onClick={() => console.log('2FA clicked!')}
                >
                  <AuthenIcon className="w-2 h-2 tablet:w-5 tablet:h-5" />
                  Authentication
                </button>
                <button onClick={() => console.log('Logout clicked!')} className="flex gap-1 items-center p-1">
                  <LogOutIcon className="w-2 h-2 tablet:w-5 tablet:h-5" />
                  Logout
                </button>
              </div>
            </div>
          )}
        </div>
        </div>
    </div>
  );
};

export default LogoBar;
