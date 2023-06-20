import React, { useEffect, useState } from 'react';
import { FaDiscord, FaTwitter, FaInstagram, FaReddit } from "react-icons/fa";
import AOS from "aos";
import "aos/dist/aos.css";
import { Link, useLocation } from 'react-router-dom';

function Footer() {
    const { pathname } = useLocation();
    const [navType, setNavType] = useState("public");

    const Links = [
        { name: 'Leaderboard', url: '/' },
        { name: 'All games', url: '/' },
        { name: 'About us', url: '/' },
        { name: 'Terms and privacy', url: '/' }
    ]

    const socials = [
        { name: 'Discord', icon: <FaDiscord />, url: '/' },
        { name: 'Twitter', icon: <FaTwitter />, url: '/' },
        { name: 'Instagram', icon: <FaInstagram />, url: '/' },
        { name: 'Reddit', icon: <FaReddit />, url: '/' }
    ]

    useEffect(() => {
        AOS.init();
        AOS.refresh();
        if (pathname.includes("admin")) {
            setNavType("admin")
        }
    }, []);

    return (
        <div className={(navType === "admin" ? "" : "")}>
            <footer className={'flex flex-wrap justify-start bg-bg2 px-[5%] pb-10 '}>
                <div className='flex flex-col w-full sm:w-1/2 lg:w-1/3 mt-10'
                    data-aos="zoom-in" data-aos-duration="400" data-aos-once="true"
                >
                    <a href="/">
                        <img className='w-[70px] 3xl:w-[100px] mb-5' src="/logo_green.png" alt='' />
                    </a>
                    <p className='w-3/4 3xl:text-[30px] font-light'>
                        Lorem ipsum dolor sitamet consectur adipiscing Duis
                        esollici tudin augue euismod. Nulla ullam dolor sitamet consectetur
                    </p>
                </div>
                <div className='flex flex-col items-start sm:items-end lg:items-center w-full sm:w-1/2 lg:w-1/3 mt-10'
                    data-aos="zoom-in" data-aos-duration="400" data-aos-once="true">
                    <h1 className='text-primary text-[30px] 3xl:text-[50px] font-bold mb-5'>LINKS</h1>
                    <ul className='flex flex-col items-start sm:items-end lg:items-center gap-2 3xl:gap-4 '>
                        {Links.map((item) => {
                            return <li className='font-light 3xl:text-[30px] hover:text-primary'><a href={item.url}>{item.name}</a></li>
                        })}
                    </ul>
                </div>
                <div className='flex flex-col items-start  md:items-start lg:items-end w-full md:w-full lg:w-1/3 mt-10'
                    data-aos="zoom-in" data-aos-duration="400" data-aos-once="true"
                >
                    <h1 className='text-primary text-[30px] 3xl:text-[50px] font-bold mb-5'>COMMUNITY</h1>
                    <ul className='flex flex-col items-start sm:items-end gap-2 3xl:gap-4 '>
                        {socials.map((item) => {
                            return <li className='font-light 3xl:text-[30px]  hover:text-primary'>
                                <a className='flex items-center gap-2 ' href={item.url}>
                                    <span>{item.name}</span>
                                    {item.icon}
                                </a>
                            </li>
                        })}
                    </ul>
                </div>
            </footer>
            <div className='bg-[#142328] px-[5%] py-4 text-[12px] 3xl:text-[25px] '>
                <p>COPYRIGHT © 2023 - ALL RIGHTS RESERVED BY <span className='text-primary'>DINOMITE</span></p>
            </div>
        </div>
    )
}

export default Footer;
