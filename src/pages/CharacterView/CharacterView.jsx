import { useAddress, useContract, useMetamask } from "@thirdweb-dev/react";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import AvatarScene from "../../components/Animator/AvatarScene";
import React from "react";
import Title from "../../SharedComponents/Title/Title"
import { useParams } from "react-router-dom";
import Loading from "../../SharedComponents/Loading/Loading";


const contractAddress = process.env.REACT_APP_CHARACTER_CONTRACT;

function CharacterView() {
    const [balanceCount, setBalance] = useState();
    const connect = useMetamask();
    let address = useAddress();
    const params = useParams();
    const { contract } = useContract(contractAddress);
    const balanceOf = async () => {
        if (address) {
            Swal.clickCancel();
            if (contract) {
                const balanceOf = await contract.erc721.balanceOf(address);
                setBalance(Number(balanceOf));
                if (Number(balanceOf) > 0) {
                    // Swal.fire("Nice you have " + Number(balanceOf) + "Characters");
                    // window.location.href = "/animator"
                } else {
                    Swal.fire({
                        title: "Oops, You don't have NFTs!",
                        text: "do you want to Mint your NFT ?",
                        icon: 'warning',
                        showCancelButton: true,
                        confirmButtonColor: '#3085d6',
                        cancelButtonColor: '#d33',
                        confirmButtonText: 'Claim NFT!'
                    }).then((result) => {
                        if (result.isConfirmed) {
                            window.location.href = '/mint-nft';
                        }
                    })
                }
            }
        } else {
            Swal.fire({
                title: "Oops, You need to connect your wallet!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Connect Wallet!'
            }).then(async (result) => {
                if (result.isConfirmed) {
                    const conn = await connect();
                    if (!conn.error) {
                        address = conn.data.account;
                        Swal.clickCancel();
                        balanceOf();
                    }
                }
            })

        }

    }
    useEffect(() => {
        balanceOf();
        // eslint-disable-next-line
    }, [contract, address]);

    return (
        <React.StrictMode>
            <div className="min-h-screen bg-grad py-36 3xl:py-60">
                {address ?
                    <>
                        <Title className="" whiteText="ANIMATE" coloredText="CHARACTER"></Title>
                        {balanceCount > 0 ? <AvatarScene contract={contract} nftID={params.id}></AvatarScene> : ""}
                    </>
                    : <div><Loading /></div>
                }
            </div>
        </React.StrictMode>

    )

}

export default CharacterView;