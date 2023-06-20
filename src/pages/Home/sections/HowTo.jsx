import React, { useEffect } from 'react';
import "../../../styles/HowTo.css";
import AOS from "aos";
import "aos/dist/aos.css";
import Title from '../../../SharedComponents/Title/Title';
import participateImg from '../../../assets/how-to/participate.png';
import playImg from '../../../assets/how-to/play.png';
import mintImg from '../../../assets/how-to/mint.png';
import shapeLeft from '../../../assets/how-to/shape-left.svg'
import shapeRight from '../../../assets/how-to/shape-right.svg'

function HowTo() {
    useEffect(() => {
        AOS.init();
        AOS.refresh();
    }, []);

    return (
        <div className='how-to py-20'>
            <Title className='mb-28' whiteText='HOW TO' coloredText='PLAY' />
            <div className='flex flex-wrap gap-24 lg:gap-6 px-[10%]'>
                <div className='relative flex flex-col justify-center gap-5 items-center w-full lg:w-[calc(33.33%-16px)] px-5 pb-5 pt-20 3xl:pt-28 border-[10px] border-l-0 border-primary '>
                    <h2 className='font-semibold text-[25px]  3xl:text-[40px]'>Participate</h2>
                    <p className='text-center 3xl:text-[25px]'>
                        Get your NFT pass to participate in our exclusive timed events.
                    </p>
                    <img className='absolute top-0 left-[50%] translate-x-[-50%] translate-y-[-50%] w-[150px] 3xl:w-[200px] ' src={participateImg} alt="" />
                    <img className=' absolute top-0 left-0 h-[calc(100%+20px)] translate-y-[-10px] translate-x-[-98%]' src={shapeLeft} alt='' />
                    {/* <img className='flex lg:hidden absolute top-0 left-0 w-[calc(100%+20px)] translate-y- translate-y-[-99%] ' src={shapeTop} alt='' /> */}
                </div>
                <div className='relative flex flex-col justify-center gap-5 items-center w-full lg:w-[calc(33.33%-16px)] px-5 pb-5 pt-20 3xl:pt-28 border-[10px] border-primary '>
                    <h2 className='font-semibold text-[25px]  3xl:text-[40px]'>Play games</h2>
                    <p className='text-center 3xl:text-[25px]'>
                        During this events, play and increase your score as much as you can
                    </p>
                    <img className='absolute top-0 left-[50%] translate-x-[-50%] translate-y-[-50%] w-[130px] 3xl:w-[180px] ' src={playImg} alt="" />
                    <img src={""} alt='' />
                </div>
                <div className='relative flex flex-col justify-center gap-5 items-center w-full lg:w-[calc(33.33%-16px)] px-5 pb-5 pt-20 3xl:pt-28 border-[10px] border-r-0 border-primary '>
                    <h2 className='font-semibold text-[25px]  3xl:text-[40px]'>Reward</h2>
                    <p className='text-center 3xl:text-[25px]'>
                        At the end of the event, you're ready to receive your reward.
                    </p>
                    <img className='absolute top-0 left-[50%] translate-x-[-50%] translate-y-[-50%] w-[150px] 3xl:w-[200px] ' src={mintImg} alt="" />
                    <img className='absolute top-0 right-0 h-[calc(100%+20px)] translate-y-[-10px] translate-x-[100%]' src={shapeRight} alt='' />
                </div>
            </div>
        </div>
    )
}

export default HowTo
