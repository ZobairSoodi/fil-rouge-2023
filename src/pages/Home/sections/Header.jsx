import React, { useEffect } from 'react';
import AOS from 'aos'
import "aos/dist/aos.css";
import headerImg from '../../../assets/background/header-img.png'
import Button from '../../../SharedComponents/Button/Button';
import headerShape from '../../../assets/background/header-shape.svg'

function Header() {

    useEffect(() => {
        AOS.init();
        AOS.refresh();
    }, []);

    return (
        <div className='relative w-full'>
            <header className='fixed top-0 -z-10 h-screen w-full flex items-center lpt-[72px] llg:pt-[82px]'>
                <div className='w-full lg:w-1/2 px-[5%]'>
                    <div className="flex flex-col justify-center items-start font-semibold text-[40px] 3xl:text-[95px]">
                        <h1 className="mb-6">WELCOME TO <span className="text-primary">  DINOMITE</span>
                        </h1>
                        <div className="underline2 3xl:border-t-[10px] 3xl:w-[250px] "></div>
                        <p className='text-[15px] 3xl:text-[45px] text-[#c7c6c6] font-light mt-5 3xl:mt-10'>
                            Our platform offers a wide range of captivating games for players to enjoy.
                            Additionally, we host limited-time events tailored for players who possess
                            a special NFT pass, allowing them to compete for the highest score.
                            Successful participants will be rewarded with new NFT items as a sign
                            of their achievements, which can be used in games to enhance their chances
                            of increasing their score in upcoming events.
                        </p>
                    </div>
                    <p className='mt-16 text-[23px] 3xl:text-[50px] font-medium'>
                        View our collection of <span className='text-primary'>Games</span>  or <span className='text-primary'>Mint</span> your
                        first character:
                    </p>
                    <div className='flex flex-wrap gap-4 mt-5'>
                        <Button text={"ALL GAMES"} url="/games" />
                        <Button text={"GET YOUR CHARACTER"} url="/mint-nft" secondary />
                    </div>
                </div>
                <div className='hidden lg:flex w-1/2'>
                    <img className='w-full header-img' src={headerImg} alt="" />
                </div>

            </header>
            <div className="mt-[100vh]"></div>

            <img className='absolute bottom-[-1px] left-0 w-full' src={headerShape} alt="" />
        </div>
    )
}

export default Header
