import React, { useEffect, useState } from "react";
import UnityComponent from "../../components/UnityComponent";
import { useParams } from "react-router-dom";
import { FirebaseService } from "../../Shared/Services/firebaseService";
import "../../styles/PlayGame.css";
import metamaskLOGO from "../../assets/logo/metamask.png";
import { ConnectWallet } from "@thirdweb-dev/react";
import './PlayGame.css';
import ConnectButton from "../../SharedComponents/ConnectButton/ConnectButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleExclamation } from "@fortawesome/free-solid-svg-icons";
import Title from "../../SharedComponents/Title/Title";
import Button from "../../SharedComponents/Button/Button";
import HowTo from "../Home/sections/HowTo";

function PlayGame() {
    const firebase = new FirebaseService();
    const { game } = useParams();
    const [gameData, setGame] = useState();
    const [leaderboard, setLeaderboard] = useState([]);
    const [allGames, setAllGames] = useState([]);
    useEffect(() => {
        const getGame = async () => {
            const data = await firebase.getGame(game);
            console.log("gaaaaaaaaaaaaaame", data);
            setGame(data);
            const dataExcept = await firebase.getGamesExcept(game);
            setAllGames(dataExcept);
            await firebase.getGameLeaderboard(game, setLeaderboard);
        }
        getGame();
        // eslint-disable-next-line
    }, []);

    return (
        <div className="flex flex-col text-white justify-center items-center bg-bg2 pt-28 pb-20">
            <div className="w-full px-[5%]">
                <div className="flex justify-between text-2xl py-4">
                    <div className="flex flex-col justify-center items-start font-semibold text-[40px]">
                        <h1 className="mb-6"><span className="text-white">{gameData ? gameData.title : ''}</span>
                        </h1>
                        <div className="underline3"></div>
                    </div>
                </div>

                <div className="flex flex-wrap w-full">

                    <div className="w-full lg:w-[70%] xl:w-[75%]">
                        <div className="w-full">
                            {/* <img className="w-full" src={require('../assets/games-thumbnails/img.2.png')} alt="" /> */}
                            {gameData !== undefined ? (<UnityComponent game={gameData} />) : ""}
                        </div>
                        <div className="flex flex-wrap gap-3 w-full pt-2">
                            {allGames.map((item) => {
                                return (
                                    <a className="w-[calc(50%-6px)] md:w-[calc(25%-9px)] " href={"/play/" + item.title}>
                                        <img className="w-48" src={item.image} alt="" />
                                    </a>
                                );
                            })}
                        </div>
                    </div>

                    <div className="flex flex-col w-full lg:w-[30%] xl:w-[25%] px-4 ">
                        <div className="flex flex-col justify-center items-center w-full py-6 ">
                            <img className="w-[60px]" src={metamaskLOGO} alt="" />
                            <div className="connectWalletBtn1">
                                <ConnectButton text={<ConnectWallet className='connect-wallet' />} ></ConnectButton>
                            </div>
                        </div>
                        <div className="h-full w-full p-5 border-2 border-primary">
                            <div className="flex justify-center items-center gap-2 pb-5 text-xl">
                                <h1>leaderboard</h1>
                                <div className="text-secondary">
                                    <FontAwesomeIcon icon={faCircleExclamation} />
                                </div>
                            </div>
                            <div className="text-lg">
                                <ul className="flex flex-col gap-5 items-start justify-start">
                                    {leaderboard !== undefined ? leaderboard.map((item, index) => (
                                        <li className="flex justify-between w-full" key={index}>
                                            <span title={item.fullname}>
                                                {item.fullname.length > 15 ? item.fullname.slice(0, 15) + " ..." : item.fullname}
                                            </span>
                                            <span className="text-secondary">{item.highscore}</span>
                                        </li>
                                    )) : ''}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex flex-wrap w-full mt-32  px-[5%]">
                <div className="flex flex-col justify-start items-start w-full md:w-[50%] lg:w-[60%] pr-[5%]">
                    <h1 className="mb-4 font-semibold text-[30px] md:text-[35px] lg:text-[40px]">ABOUT <span className="text-primary uppercase">{gameData ? gameData.title : ''}</span>
                    </h1>
                    <div className="underline2"></div>
                    <p className="mt-8 text-[18px]">
                        {gameData ? gameData.description : ''}
                    </p>
                </div>

                <div className="relative flex items-start w-full md:w-[50%] lg:w-[40%]">
                    <img className="w-[100%] h-full object-cover mt-5 md:mt-0" src={gameData ? gameData.image : ''} alt="" />
                    <div className="absolute top-0 left-0 w-full h-full" style={{ background: 'linear-gradient(180deg, rgba(17, 17, 17, 0) 0%, #111111 100%)' }} />
                </div>

            </div>

            <div className="flex flex-col justify-center w-full mt-32">

                <HowTo />
                {/* <div className="flex justify-center w-full mb-5">
                    <Title whiteText="HOW TO" coloredText="PLAY" />
                </div> */}

                {/* <div className="flex justify-center items-center w-full mt-8">
                    <ion-icon name="caret-back-outline"></ion-icon>
                    <div className="flex w-full py-5 bg-[#3D4A51] relative">
                        <div className="flex flex-col items-center w-[60%] px-2 py-2">
                            <h1 className="w-full text-white text-[35px] mb-5">
                                COLLECT coins to increase your score
                            </h1>
                            <p className="text-white font-[Audiowide]">
                                Collect as many coins as you can to increase your <br /> score.
                                Choose your path carefully - some <br /> platforms have coins
                                and others have enemies!
                            </p>
                        </div>
                        <img
                            className="h-[150%] absolute bottom-0 right-0"
                            src={require('../../assets/background/boy-yo 1.png')}
                            alt=""
                        />
                    </div>
                    <ion-icon name="caret-forward-outline" ></ion-icon>
                </div> */}
            </div>


            <div className="flex flex-col w-full mt-24  px-[5%]">
                <div className="mb-10">
                    <Title coloredText="DINOMITE" whiteText="GIFTS AND NFTS" reverse />
                </div>

                <div className="flex flex-wrap justify-evenly w-full text-white">

                    <div className={"relative flex flex-col justify-center items-center gap-5 "
                        + " w-[100%] sm:w-[80%] lg:w-[35%] px-12 py-10 bg-[#3D4A51] "}
                    >
                        <h2 className="font-bold text-[28px]">Play-to-mint</h2>
                        <p className="text-center">Play-to-mint refers to a gameplay mechanic in which players can earn NFTs by playing a game. These NFTs can then be used for a variety of purposes, such as in-game items or they can be traded on NFT marketplaces.</p>
                        <button className="mt-8">
                            <Button text={"Buy Now"} />
                        </button>

                        <img className="hidden sm:inline-block absolute bottom-0 left-0 translate-y-[40px] translate-x-[-80%] max-h-full" src={require('../../assets/background/avatar_couple.png')} alt=''></img>
                    </div>



                    <div className={"relative flex flex-col justify-center items-center gap-5 "
                        + " w-[100%] sm:w-[80%] lg:w-[35%] mt-8 lg:mt-0 px-12 py-10 bg-[#3D4A51]"}
                    >
                        <h2 className="font-bold text-[28px]">PLay-to-earn</h2>
                        <p className="text-center">Play-to-earn is a broader concept that refers to games or applications that reward players with cryptocurrency or other valuable digital assets for participating in the game. Essentially, by playing the game, the player is "earning" cryptocurrency or other valuable digital assets.</p>
                        <button className="mt-8">
                            <Button text={"Buy Now"} />
                        </button>

                        <img className="hidden sm:inline-block absolute bottom-0 right-0 translate-y-[40px] translate-x-[80%] max-h-full" src={require('../../assets/background/avatar_man.png')} alt=''></img>
                    </div>
                </div>
            </div>
        </div>
    );



}
export default PlayGame;