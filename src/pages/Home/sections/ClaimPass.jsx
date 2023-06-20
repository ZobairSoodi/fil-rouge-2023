import React, { useEffect } from 'react';
import "../../../styles/ClaimPass.css";
import cloud from "../../../assets/background/cloud.png";
import lizardNFT from "../../../assets/nft-pass/Lizard-man.PNG";
import walletToken from "../../../assets/wallet/wallet-sign.png";
import { ConnectWallet } from "@thirdweb-dev/react";
import AOS from "aos";
import "aos/dist/aos.css";
import Title from '../../../SharedComponents/Title/Title';
import ConnectButton from '../../../SharedComponents/ConnectButton/ConnectButton';
import Button from '../../../SharedComponents/Button/Button';


function ClaimPass() {
    useEffect(() => {
        AOS.init();
        AOS.refresh();
    }, []);

    return (
        <div id='claim-pass-container' className='relative overflow-x-hidden overflow-y-hidden py-20 bg-bg1'>

            {/* Background Clouds */}
            <img className='absolute top-[20%] right-0 translate-x-[30%] w-[230px] 3xl:w-[400px] opacity-[0.2]' src={cloud} alt='' />
            <img className='absolute top-[30%] left-0 translate-x-[30%] w-[230px] 3xl:w-[400px] opacity-[0.3]' src={cloud} alt='' />
            <img className='absolute top-[60%] right-0 w-[230px] 3xl:w-[400px] opacity-[0.2]' src={cloud} alt='' />
            <img className='absolute top-[80%] left-0 w-[230px] 3xl:w-[400px] opacity-[0.2]' src={cloud} alt='' />

            {/* Claim Pass Title */}
            <div data-aos="fade-up" data-aos-duration="700"
                className='titleSection flex flex-col items-center justify-center mb-12'>
                <Title coloredText='GAME' whiteText='PASS' reverse />
                <p className='w-[90%] md:w-[70%] lg:w-[50%] text-[20px] 3xl:text-[45px] font-light text-center mt-10 mb-8'>
                    To receive your pass and have the chance to appear in the ranking
                    associated with this NFT pass within our platform, you just need
                    to sign a message in your wallet.
                </p>
            </div>

            <div className='flex flex-col items-center md:items-stretch md:flex-row justify-center w-full px-12'>

                {/********* ClaimPass card : connect wallet *********/}
                <div data-aos="fade-right" data-aos-duration="700" data-aos-once="true" data-aos-delay="200"
                    className='flex flex-col items-start gap-3'>
                    <div className='relative bg-primary px-12 py-[35px] 3xl:px-[150px] 3xl:py-[45px] rounded-[15px]'>
                        <div className={'absolute top-0 left-0 translate-x-[-50%] translate-y-[-50%]'
                            + ' flex justify-center items-center bg-[#297A62] text-white text-[30px] w-[70px] h-[70px]  3xl:w-[100px] 3xl:h-[100px] 3xl:text-[45px] rounded-full'}
                        >
                            01
                        </div>
                        <div className="flex flex-col items-center gap-5 3xl:gap-16 ">
                            <div className='text-black text-lg font-medium 3xl:text-[50px]'>Connect your wallet</div>
                            <ConnectButton text={<ConnectWallet className='connect-wallet'></ConnectWallet>} secondary ></ConnectButton>
                        </div>
                    </div>
                </div>

                {/********* ClaimPass card : click mint *********/}
                <div data-aos="zoom-in" data-aos-duration="700" data-aos-once="true" data-aos-delay="200"
                    className='flex flex-col items-start gap-3 md:ml-[140px] mt-[100px] 3xl:mt-[150px]'>
                    <div className='relative bg-primary px-[70px] py-[35px] 3xl:px-[65px] 3xl:py-[45px] rounded-[15px]'>
                        <div className={'absolute top-0 left-0 translate-x-[-50%] translate-y-[-50%]'
                            + ' flex justify-center items-center bg-[#297A62] text-white text-[30px] w-[70px] h-[70px]  3xl:w-[100px] 3xl:h-[100px] 3xl:text-[45px] rounded-full'}
                        >
                            02
                        </div>
                        <div className='flex flex-col justify-center items-center'>
                            <div className='text-black text-lg 3xl:text-[50px] font-medium text-center'>Hit the <span className='text-secondary'>MINT</span> button</div>
                            <img className='w-[120px]' src={lizardNFT} alt='' />
                            <Button text={"MINT NOW"} secondary />
                        </div>
                    </div>
                </div>
            </div>



            <div className='flex flex-col items-center md:items-stretch md:flex-row justify-center w-full px-12 '>

                {/********* ClaimPass card : Add token *********/}
                <div data-aos="fade-up" data-aos-duration="700" data-aos-once="true" data-aos-delay="200"
                    className='relative mt-[100px] md:mt-[-120px] flex flex-col items-start gap-3'>
                    <div className='relative bg-primary px-12 py-[35px] 3xl:py-[45px] rounded-[15px]'>
                        <div className={'absolute top-0 left-0 translate-x-[-50%] translate-y-[-50%]'
                            + ' flex justify-center items-center bg-[#297A62] text-white text-[30px] w-[70px] h-[70px]  3xl:w-[100px] 3xl:h-[100px] 3xl:text-[45px] rounded-full'}
                        >
                            03
                        </div>
                        <div className="flex flex-col items-center">
                            <div className='text-black text-lg 3xl:text-[50px] font-medium mb-3 3xl:mb-8 '>You'll be asked to sign your wallet</div>
                            <img className='w-[240px] 3xl:w-[350px]' src={walletToken} alt='' />
                        </div>
                    </div>
                </div>

                {/********* ClaimPass card : done *********/}
                <div data-aos="fade-left" data-aos-duration="700" data-aos-once="true" data-aos-delay="200"
                    className='flex flex-col items-start gap-3 md:ml-[140px] mt-[100px]'>
                    <div className='relative bg-primary px-[70px] py-[35px] 3xl:px-[65px] 3xl:py-[55px] rounded-[15px]'>
                        <div className={'absolute top-0 left-0 translate-x-[-50%] translate-y-[-50%]'
                            + ' flex justify-center items-center bg-[#297A62] text-white text-[30px] w-[70px] h-[70px]  3xl:w-[100px] 3xl:h-[100px] 3xl:text-[45px] rounded-full'}
                        >
                            04
                        </div>
                        <div className='flex flex-col justify-center items-center gap-4'>
                            <div className='flex flex-col 3xl:gap-5 text-black text-lg 3xl:text-[50px] text-center font-medium'>
                                <span>Congrats! </span>
                                <span>you've got your NFT</span>
                            </div>
                            {/* <img className='w-[180px]' src={passClaimed} alt='' /> */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );


    // return (
    //     <div className='claimPAss_Section mt-36'>
    //         <div className='titleSection flex justify-center'>
    //             <h1 className='text-[#3D3232] text-[25px] w-fit relative'>
    //                 <img className='w-[190px] absolute -bottom-8 right-0 -z-10 translate-x-1/2' src={cloud} alt="" />
    //                 <span className='text-[#FFB951] z-20'>CLAIM</span> GAME PASS
    //             </h1>
    //         </div>

    //         <div className='passDetails flex flex-col mt-7'>

    //             <div className='flex justify-between items-center bg-[#297A62] w-full h-[400px]'>


    //                 <div className='flex flex-col justify-center w-[50%]'>
    //                     <p className='text-[19px] text-left tracking-[1px] leading-8 mb-3'>
    //                         How to mint your free game pass ?
    //                     </p>
    //                     <p className='text-left mb-2'>- Connect your wallet</p>
    //                     <p className='text-left mb-3'>- Hit the <span className='text-[#FFB951]'> MINT </span>
    //                         button
    //                     </p>
    //                     <p className='text-[19px] text-left tracking-[1px] leading-8 mb-3'>
    //                         You'll be asked to add token to your wallet
    //                     </p>
    //                     <p className='text-left'>- Hit the <span className='text-[#1c2d41]'>Add token</span> button</p>
    //                 </div>

    //                 <img className='h-full' src={walletToken} alt="" />


    //             </div>

    //             <div className='flex flex-col items-center justify-center bg-primary w-2/4'>
    //                 <img className='w-1/4 border-solid border-[#3D3232]' src={catNft} alt="" />
    //                 <button className='bg-[#FFB951] h-16 w-60 mt-8 text-[#3D3232] text-[20px] hover:text-white duration-500'>MINT</button>
    //             </div>

    //         </div>

    //     </div>
    // );
}

export default ClaimPass
