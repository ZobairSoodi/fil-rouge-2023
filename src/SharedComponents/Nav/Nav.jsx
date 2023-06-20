import { useEffect, useState } from 'react';
import './Nav.css';
import { Link, NavLink, matchPath, useLocation, useParams } from 'react-router-dom';
import AOS from "aos";
import 'aos/dist/aos.css';
import Button from '../Button/Button';
import { ConnectWallet, ChainId, useNetworkMismatch, useNetwork, useAddress, useConnect, useMetamask, Web3Button } from "@thirdweb-dev/react";
import Swal from 'sweetalert2';

import ConnectButton from '../ConnectButton/ConnectButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRightToBracket, faGamepad, faHome, faHomeAlt, faRightToBracket, faUser, faTag, faUsers, faMap, faAnglesLeft, faAnglesRight } from '@fortawesome/free-solid-svg-icons';

function Nav({ expand, setExpand }) {
    const { pathname } = useLocation();
    const [navType, setNavType] = useState("public");


    const address = useAddress();
    const [, switchNetwork] = useNetwork();
    const isWrongNetwork = useNetworkMismatch();
    useEffect(() => {
        if (pathname.includes("admin")) {
            setNavType("admin")
        }
        if (isWrongNetwork && switchNetwork) {
            Swal.fire({
                title: 'Please switch your network to the Mumbai testnet',
                showCancelButton: true,
                confirmButtonText: 'Switch',
                showLoaderOnConfirm: true,
                allowOutsideClick: () => false,
                backdrop: `
                  rgba(0,0,123,0.4)
                  url("https://media.tenor.com/Weyin7lqYhsAAAAi/rainbowcat.gif")
                  left top
                  no-repeat
                `,
                preConfirm: async () => {
                    try {
                        const value = await switchNetwork(ChainId.Mumbai);
                        if (Number(value.data.id) === 80001) {
                            Swal.fire({
                                position: 'top-end',
                                icon: 'success',
                                title: 'You have switched the network to Mumbai',
                                showConfirmButton: false,
                                timer: 1500
                            });
                        }
                    } catch (error) {
                        Swal.close(); // Close the Swal.fire alert if the switchNetwork() function is canceled
                        Swal.fire({
                            position: 'top-end',
                            icon: 'warning',
                            title: 'You did not switch the network to Mumbai',
                            showConfirmButton: false,
                            timer: 1500
                        });
                    }
                },
                allowEscapeKey: false,
                allowEnterKey: false,
                allowClose: false
            });
        }

    }, [address, isWrongNetwork, switchNetwork]);
    const [menuOpen, setMenuOpen] = useState(false);

    const menuLinks = [
        { name: 'HOME', link: '/' },
        { name: 'GAMES', link: '/games' },
        { name: 'ABOUT', link: '/about' },
        { name: 'HOW TO', link: '/how-to' },
        { name: 'BUY A PASS', link: '/nftpass' },
    ];

    const adminLinks = [
        { name: 'Games', icon: faGamepad, link: '/admin/games' },
        { name: 'Labels', icon: faTag, link: '/admin/labels' },
        { name: 'Map', icon: faMap, link: '/admin/map' },
        { name: 'Users', icon: faUser, link: '/admin/users' },
        { name: 'Login', icon: faRightToBracket, link: '/admin/login' },
    ];

    const [navbar, setNavbar] = useState(false)

    const changeBackground = () => {
        if (window.scrollY >= 66) {
            setNavbar(true)
        } else {
            setNavbar(false)
        }
    }

    useEffect(() => {
        changeBackground()
        // adding the event when scroll change background
        window.addEventListener("scroll", changeBackground)
    })

    useEffect(() => {
        AOS.init();
        AOS.refresh();
    }, [])

    const metamask = useMetamask();

    const connect = useConnect();

    if (navType === "admin") {
        return (
            <nav >
                {expand ? <div className='fixed z-40 top-0 left-0 w-full h-full bg-[#00000052] block sm:hidden'
                    onClick={() => setExpand(false)}
                /> : ""}
                <div className={'fixed z-50 top-0 left-0 h-screen flex flex-col items-center gap-10 py-10 bg-[#25333b] '
                    + (expand ? " w-[200px] sm:w-[200px] " : " w-[60px] sm:w-[60px] ")}>
                    <a href="/">
                        <img className={expand ? ' w-20 ' : ' w-10 mb-10 '} src="/logo_green.png" alt="" />
                    </a>
                    <ul className='flex flex-col gap-6'>
                        <li className={'text-[20px] font-medium hover:text-primary '}>
                            <a className='flex items-center gap-3' href={"/"}>
                                <FontAwesomeIcon icon={faHomeAlt} />
                                {expand ?

                                    <span>Home</span>
                                    : ""
                                }
                            </a>
                        </li>
                        {adminLinks.map((item) => {
                            return <li className={'text-[20px] font-medium hover:text-primary '
                                + (pathname === item.link ? " text-primary font-semibold " : "")
                                + (item.name === "Login" ? " mt-16 " : "")}>
                                <Link className='flex items-center gap-3' to={item.link}>
                                    <FontAwesomeIcon icon={item.icon} />
                                    {expand ?

                                        <span>{item.name}</span>
                                        : ""
                                    }
                                </Link>
                            </li>
                        })}
                    </ul>
                    <button className='absolute bottom-4 right-0 sm:w-auto  bg-[#2f404a] px-[22px] py-2'
                        onClick={() => setExpand(!expand)}
                    >
                        {expand ?
                            <FontAwesomeIcon icon={faAnglesLeft} />
                            :
                            <FontAwesomeIcon icon={faAnglesRight} />
                        }
                    </button>
                </div>
            </nav>
        )
    }
    else {
        return (
            <nav className={"fixed top-0 left-0 flex flex-col w-full z-[999] transition-colors " + (navbar ? " bg-bg2 " : " bg-transparent ")}

            >

                {/******* Main Nav *******/}
                <div className="relative flex items-center justify-between px-8 sm:px-10 lg:px-8 xl:px-16 py-4 3xl:py-8 lg:text-[13px] xl:text-[20px] font-[Barlow]">

                    {/******* Logo ******/}
                    <a href="/"><img className="inline-block w-[50px] 2xl:w-[60px] 3xl:w-[150px] " src="/logo_green.png" alt="" /></a>


                    {/******** Desktop Menu ********/}
                    <ul className={"desktop-menu hidden lg:flex lg:items-center lg:justify-center "
                        + " lg:gap-12 xl:gap-16 2xl:gap-20 3xl:gap-24 list-none text-center text-white text-[17px] xl:text-[18px] 2xl:text-[22px] 3xl:text-[50px] font-semibold"}>
                        {menuLinks.map((item, index) => {
                            return <li key={index}><NavLink className={({ isActive }) => {
                                return isActive ? ' text-primary font-semibold active-link' : ''
                            }} to={item.link}>{item.name}</NavLink></li>
                        })}
                    </ul>

                    {/****** "Buy a Pass" button ******/}
                    <div className="hidden lg:flex items-center gap-3 2xl:gap-8 font-medium">
                        <ConnectButton text={<ConnectWallet className='connect-wallet text-[17px] xl:text-[18px] 3xl:text-[50px] '></ConnectWallet>} error={isWrongNetwork} ></ConnectButton>
                        {address ? <Button className=' text-[17px] xl:text-[18px] ' text={"Profile"} url="/profile" secondary /> : ""}
                    </div>


                    {/****** Mobile Menu Button ******/}
                    <div
                        className={"menu-burger up-down flex lg:hidden ml-auto " + (menuOpen ? 'menu-open' : '')}
                        onClick={() => setMenuOpen((current) => { return !current })}
                    >
                        <div className="bar" />
                        <div className="bar" />
                        <div className="bar" />
                    </div>

                    {/******* Mobile Menu *******/}

                    <div className='mobile-menu lg:hidden'>
                        <div className={'absolute top-0 right-0 z-1 w-full h-screen transition-colors duration-500 '
                            + (menuOpen ? ' translate-x-0 bg-[#00000034] ' : ' translate-x-full bg-transparent ')}
                            onClick={() => setMenuOpen(false)}
                        ></div>

                        <ul className={'mobile-menu absolute top-0 z-10 right-0 flex flex-col justify-center items-center gap-4 text-lg '
                            + ' w-full h-screen sm:w-2/3 md:w-1/2 bg-[#182029] transition-transform duration-500 '
                            + (menuOpen ? ' translate-x-0 ' : ' translate-x-full ')}>
                            {menuLinks.map((item) => {
                                return <li className='flex justify-center w-full text-white'>
                                    <NavLink className={({ isActive }) => {
                                        return "w-full text-center  border-white py-4 "
                                            + (isActive ? ' text-[#F4AE3F] font-semibold active-link w-full text-center border-b-2 border-t-2 py-4 ' : '')
                                    }} to={item.link}
                                        onClick={() => setMenuOpen(false)}
                                    >{item.name}</NavLink>
                                </li>
                            })}

                            <div className=' flex flex-col items-center justify-center gap-5 mt-3'>
                                <Button secondary text={"Buy a Pass"} />
                                <ConnectButton text={<ConnectWallet className='connect-wallet'></ConnectWallet>} ></ConnectButton>
                            </div>
                        </ul>
                    </div>
                </div>

            </nav>
        );
    }
}

export default Nav;