import { ConnectWallet } from "@thirdweb-dev/react";
import React, { useEffect, useState } from 'react';
import logo from '../assets/logo/dino.png';
import Button from './Button';
import '../styles/Nav.css';
import { Link } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";

function Nav() {
  const [open, setOpen] = useState(false);
  let Links = [
    { name: 'HOME', Link: '/' },
    { name: 'GAMES', Link: '/games' },
    { name: 'ABOUT', Link: '/' },
    { name: 'HOW TO', Link: '/how-to' },
  ];

  useEffect(() => {
    AOS.init();
    AOS.refresh();
  }, []);

  return (
    <nav data-aos='fade-down' data-aos-once="true" className='shadow-md w-full top-0 left-0 sticky z-50'>
      <div className='md:flex items-center justify-around bg-[#60B49C] py-4 md:px-3'>
        <div>
          <img className='w-20 cursor-pointer' alt="" src={logo} />
        </div>
        <div onClick={() => { setOpen(!open) }} className='text-3xl absolute right-8 top-6 cursor-pointer md:hidden'>
          <ion-icon name={open ? 'close' : 'menu'}></ion-icon>
        </div>
        <ul className={`md:flex md:items-center md:pb-0 pb-12
             md:static absolute  bg-[#60B49C] md:z-auto z-[-1]
              left-0 w-full md:w-auto md:pl-0 pl-9 transition-all 
              duration-500 ease-in ${open ? 'top-20' : 'top-[-490px]'} md:opacity-100`}>
          {
            Links.map((link) => (
              <li key={link.name} className='md:ml-8 text-xl md:my-0 my-7'>
                <Link to={link.Link} className='hover:text-[#FFB951] duration-500 text-white'>{link.name}</Link>
              </li>
            ))
          }
        </ul>

        <div className="flex">
          <Button>
            <Link to="/nftpass">
              Buy a Pass
            </Link>
          </Button>
          <div className="connectWalletBtn md:ml-5">
            <ConnectWallet />
          </div>
        </div>

        {/* <div className='flex'>
          <img src={require('../assets/users-avatar/user.png')} alt="" className='w-9' />
          <div className='text-white'>
            <ion-icon name="log-in-outline"></ion-icon>
          </div>
        </div> */}
      </div>
    </nav>
  )
}

export default Nav;
