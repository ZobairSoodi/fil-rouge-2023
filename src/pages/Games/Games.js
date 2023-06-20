import { React, useEffect, useState } from 'react';
import AOS from "aos";
import "aos/dist/aos.css";
import { FirebaseService } from '../../Shared/Services/firebaseService';
import Title from '../../SharedComponents/Title/Title';
import ButtonAlt from '../../SharedComponents/ButtonAlt/ButtonAlt';

function Games() {
    const firebase = new FirebaseService();
    const [gamesData, setGames] = useState([]);

    useEffect(() => {
        AOS.init();
        AOS.refresh();
        const getGame = async () => {
            const data = await firebase.getGames();
            console.log(data);
            setGames(data);
        }
        getGame();
        // eslint-disable-next-line
    }, []);

    return (
        <div className='top-games Container flex flex-col items-center pt-28 pb-20 '>

            <Title whiteText='TOP' coloredText='GAMES' />

            <div className='GamesCards w-9/12 mt-20 flex flex-wrap justify-start gap-8 items-center'>

                {gamesData.map((item) => {
                    return (
                        <div className={'relative flex flex-col items-center w-full md:w-[calc(50%-16px)] lg:w-[calc(33.33%-22px)] '
                            + ' aspect-[1/1.3] border-b-[1px] border-primary '}
                            data-aos="zoom-in" data-aos-duration="700" data-aos-delay="400"
                        >
                            <img className='w-full h-full object-cover' src={item.image} alt="" />
                            <div className='absolute flex items-end w-full h-full p-10 '
                                style={{ background: 'linear-gradient(180deg, rgba(17, 17, 17, 0) 0%, #111111 100%)' }}
                            >
                                <div className='game-layer flex flex-col items-start gap-3 '>
                                    <span className='text-[25px] xl:text-[30px] font-bold '>{item.title}</span>
                                    <p className='text-[14px] xl:text-[16px]'>{item.description}</p>
                                    <ButtonAlt text={"Play Now"} url={"/play/" + item.title} secondary />
                                </div>
                            </div>
                        </div>
                    )
                })}


                <div className={'relative flex flex-col items-center w-full md:w-[calc(50%-16px)] lg:w-[calc(33.33%-22px)] '
                    + ' aspect-[1/1.3] border-b-[1px] border-primary '}
                    data-aos="zoom-in" data-aos-duration="700" data-aos-delay="400"
                >
                    <img className='w-full h-full object-cover' src="https://ipfs.thirdwebcdn.com/ipfs/QmSo295DQT7x5ykLWc2C4nmGEHUGABoZeJ4rYWgHBdJ3HK/gsgdx.PNG" alt="" />
                    <div className='absolute flex items-end w-full h-full p-10 '
                        style={{ background: 'linear-gradient(180deg, rgba(17, 17, 17, 0) 0%, #111111 100%)' }}
                    >
                        <div className='game-layer flex flex-col items-start gap-3 '>
                            <span className='text-[25px] xl:text-[30px] font-bold '>Zombie Survival</span>
                            <p className='text-[14px] xl:text-[16px]'>
                                Can your Decentraland avatar survive in the zombie land?
                                Play using your Decentraland avatar.
                            </p>
                            <ButtonAlt text={"Play Now"} url={"/play/Zombie Survival"} secondary />
                        </div>
                    </div>
                </div>


                {/* {gamesData.map((item) => {
                    return (
                        <div data-aos="zoom-in" data-aos-duration="700" data-aos-delay="400"
                            className='topGame flex flex-col items-center w-full md:w-[calc(50%-16px)] lg:w-[calc(33.33%-22px)] bg-[#60B49C] pb-3'>
                            <img className='w-full' src={item.image} alt="" />
                            <h2 className='text-[18px] mt-4'>{item.title}</h2>
                            <p className='text-[15px] mt-4'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Hic repellat inventore, ab fuga.</p>
                            <a href={"/play/" + item.title} element={<PlayGame />}>
                                <button className='bg-[#FFB951] text-[#3D3232] h-12 w-40 mt-8 hover:text-white duration-500'>Play</button>
                            </a>
                        </div>
                    )
                })} */}
            </div>
        </div>
    )
}

export default Games
