import { ConnectWallet, useAddress, useContract, useNFT, useNetworkMismatch, useOwnedNFTs } from "@thirdweb-dev/react";
import ConnectButton from "../../SharedComponents/ConnectButton/ConnectButton";
import { FirebaseService } from "../../Shared/Services/firebaseService";
import { useEffect, useState } from "react";
import './Profile.css';
import Title from "../../SharedComponents/Title/Title";
import { Link } from "react-router-dom";
import nftImg from '../../assets/nft-pass/Lizard-man.PNG'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Button from "../../SharedComponents/Button/Button";
import Loading from "../../SharedComponents/Loading/Loading";

function Profile() {

    const settings = {
        centerMode: true,
        infinite: false,
        centerPadding: '0px',
        slidesToShow: 2,
        dots: true,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    arrows: true,
                    centerMode: true,
                    centerPadding: '40px',
                    slidesToShow: 2,
                }
            },
            {
                breakpoint: 992,
                settings: {
                    arrows: true,
                    centerMode: true,
                    centerPadding: '40px',
                    slidesToShow: 2,
                }
            },
            {
                breakpoint: 768,
                settings: {
                    arrows: true,
                    centerMode: true,
                    centerPadding: '40px',
                    slidesToShow: 1,
                }
            },
            {
                breakpoint: 640,
                settings: {
                    arrows: true,
                    centerMode: true,
                    centerPadding: '40px',
                    slidesToShow: 1,
                }
            }
        ]
    }

    const [ticketsActive, setTickets] = useState([]);
    const [addressTimeout, setAddressTimeout] = useState(true);

    const address = useAddress();

    // Get Characters of an address
    const characterContractAddress = process.env.REACT_APP_CHARACTER_CONTRACT;
    const { contract: characterContract } = useContract(characterContractAddress);
    const { data: characters, isLoading: isCharacterLoading, error } = useOwnedNFTs(characterContract, address);

    // Get Tickets of an address
    const ticketContractAddress = process.env.REACT_APP_TICKETS_CONTRACT;
    const { contract: ticketContract } = useContract(ticketContractAddress);
    const { data: tickets, isLoading: isTicketLoading } = useOwnedNFTs(ticketContract, address);

    const firebase = new FirebaseService();

    useEffect(() => {
        async function checkTickets() {
            if (address && tickets) {
                const games = await firebase.getGames();
                setTickets([]);
                games.forEach((game, i) => {
                    tickets.forEach((ticket, j) => {
                        if (game.current_ticket_id == ticket.metadata.id) {
                            setTickets((old) => [...old, ticket]);
                        }
                    })
                })
            }
        }
        checkTickets();
    }, [address, tickets]);

    useEffect(() => {
        setTimeout(() => {
            setAddressTimeout(false)
        }, 1000);
    }, []);



    if (addressTimeout) {
        return (
            <div className="flex justify-center items-center min-h-screen pt-20 3xl:pt-60 bg-grad">
                <Loading />
            </div>
        );
    }
    else if (address) {
        return (
            <div className="flex flex-col justify-center items-center pt-28 3xl:pt-60 pb-20 bg-grad px-[5%]">
                <div>
                    <Title whiteText="YOUR" coloredText="PROFILE" />
                </div>
                <div className="flex flex-wrap justify-center w-full mt-16 gap-8 ">
                    <div className="flex flex-col items-start gap-8 w-[80%] md:w-[calc(35%-50px)] pr-[5%]">
                        <div>
                            <h1 className="mb-2 text-primary text-[25px] 3xl:text-[80px] font-semibold">
                                CHARACTERS
                            </h1>
                            <div className="underline2 w-[130px]"></div>
                        </div>
                        <h2 className="text-[20px] 3xl:text-[50px] font-medium">{characters ? (characters.length > 0 ? "You Have " + characters.length + " characters" : "You don't have any characters") : ""}</h2>
                        <p className="3xl:text-[50px]">
                            you can breathe life into your any of your virtual character by adding fun moves and dances.
                        </p>
                        <ConnectButton text={<ConnectWallet className="connect-wallet" />}></ConnectButton>
                    </div>

                    {/********** Owner's Characters **********/}
                    <div className="flex flex-wrap items-stretch justify-start w-[80%] md:w-[65%] border-[1px] border-primary max-h-[900px] md:h-auto 3xl:max-h-[1200px] overflow-auto ">
                        {isCharacterLoading ?
                            <div className="flex justify-center items-center w-full h-full">
                                <Loading />
                            </div> :
                            (characters && characters.length > 0 ?
                                characters.map((item) => {
                                    return <div className="w-full md:w-1/2 lg:w-1/3  ">
                                        <div className="flex flex-col gap-2 p-4 ">
                                            {/* <img className="w-full bg-[#3D4A51] " src={item.metadata.image} alt="" /> */}
                                            <img className="w-full bg-[#3D4A51] " src={nftImg} alt="" />
                                            <Link className="w-full py-2 bg-primary text-center 3xl:text-[50px]" to={"/animator/" + item.metadata.id}>Animate</Link>
                                        </div>
                                    </div>
                                })
                                : <div className="flex flex-col justify-center items-center gap-5 w-full py-8 ">
                                    <span className="text-[20px] font-medium">You have no characters</span>
                                    <Button text={"GET A CHARACTER"} url={"/mint-nft"} secondary />
                                </div>
                            )
                        }
                    </div>
                </div>



                <div className="flex flex-wrap justify-center items-center w-full mt-28 gap-12 ">
                    <div className="flex flex-col items-start gap-8 w-[80%] md:w-[calc(35%-50px)] pr-[5%]">
                        <div>
                            <h1 className="mb-2 text-primary text-[25px] 3xl:text-[80px] font-semibold">
                                TICKETS
                            </h1>
                            <div className="underline2 w-[130px]"></div>
                        </div>
                        <h2 className="text-[20px] 3xl:text-[50px] font-medium">{tickets ? (tickets.length > 0 ? "You Have " + tickets.length + " active tickets" : "You don't have any active tickets") : ""}</h2>
                        <p className="3xl:text-[50px]">
                            each ticket represents a different event. Click to see your ticket details.
                        </p>
                    </div>

                    {/********** Owner's Tickets **********/}
                    <div className="flex flex-wrap items-start justify-start w-[80%] md:w-[65%] ">
                        {isTicketLoading ?
                            <div className="flex justify-center items-center w-full h-full"><Loading /></div>
                            : (!isTicketLoading && tickets.length > 0 ? <Slider className="w-full md:h-auto" {...settings}>
                                {tickets.map((item) => {
                                    return <div className="px-3">
                                        <img className="w-full" src={item.metadata.image} alt="" />
                                    </div>
                                })}
                            </Slider> : <div className="flex flex-col justify-center items-center gap-4 w-full h-full">
                                <span className="text-[20px] 3xl:text-[60px] font-medium">You have no Tickets</span>
                                <Button text={"Buy a ticket"} url={"/nftpass"} secondary />
                            </div>)
                        }

                    </div>
                </div>

            </div>
        );
    }
    else if (!address) {
        return (
            <div className="flex flex-col justify-center items-center min-h-screen pt-20 bg-grad">
                You need to connect your wallet!
                <ConnectButton text={<ConnectWallet className='connect-wallet'></ConnectWallet>} ></ConnectButton>
            </div>
        );
    }

}

export default Profile;
