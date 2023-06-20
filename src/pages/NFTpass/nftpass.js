import React from "react";
import { useAddress, useContract, useNFT, useOwnedNFTs, Web3Button } from "@thirdweb-dev/react";
import Title from "../../SharedComponents/Title/Title";
import aboutNFT from "../../assets/nft-pass/about.png";
import ConnectButton from "../../SharedComponents/ConnectButton/ConnectButton";
import Swal from "sweetalert2";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleNotch } from "@fortawesome/free-solid-svg-icons";
import Loading from "../../SharedComponents/Loading/Loading";
import Button from "../../SharedComponents/Button/Button";

function NFTpass() {
  // Your smart contract address
  const contractAddress = process.env.REACT_APP_TICKETS_CONTRACT;
  // Token ID of the NFT you wish to airdrop
  const tokenId = 0; // the tokenId to look up

  const { contract: PassContract } = useContract(
    contractAddress
  );
  const address = useAddress();
  const { data: nft, isLoading: nftpassisLoading } = useNFT(PassContract, tokenId);
  const { data: totalNFTs, isTotalLoading } = useOwnedNFTs(PassContract, address);

  const ClaimButton = () => {
    if (address && totalNFTs && totalNFTs.length > 0) {
      return <Button text={"Already claimed"} disabled={true} />
    }
    else if (address && totalNFTs && totalNFTs.length === 0) {
      return <ConnectButton text={<Web3Button
        className="connect-wallet"
        contractAddress="0xE1f375E0dD69B2eeC059014CB0D0919c080ecE45"
        action={(PassContract) =>
         PassContract.erc1155.claim(0, 1)
        }

        onSuccess={() => {
          const Toastsuccess = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.addEventListener('mouseenter', Swal.stopTimer)
              toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
          })
          Toastsuccess.fire({
            icon: 'success',
            title: "NFT Minted successfully!",
          })
        }}

        onError={() => {
          const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.addEventListener('mouseenter', Swal.stopTimer)
              toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
          })
          Toast.fire({
            icon: 'error',
            title: 'An error occurred while minting the NFT.',
          })
        }
        }
      >
        CLAIM NOW
      </Web3Button>}>
      </ConnectButton>
    }
    else {
      return <Button text={<Loading />} disabled={true} />
    }
  }


  if (!nftpassisLoading) {

    return (
      <div className="bg-bg1 flex flex-col pt-28 pb-20 px-[5%]">
        <div>
          <Title whiteText="CLAIM" coloredText="TICKET" />
        </div>

        <div className="flex flex-wrap items-center gap-10 mt-20">
          <div className="w-full lg:w-[calc(50%-20px)]">
            <img className="" src={nft.metadata.image} alt="" />
          </div>
          <div className="flex flex-col items-center lg:items-start gap-4 w-full lg:w-[calc(50%-20px)]">
            <span className="text-[25px] sm:text-[30px] text-center">Claim your game pass!</span>
            <h2 className="text-[30px] sm:text-[40px] text-center ">{nft.metadata.name}</h2>
            <p className="text-[20px]">
              <span className="text-[#E5E77F]">{nft.supply}/100 </span>
              Claimed
            </p>
            {ClaimButton()}
          </div>
        </div>

        <div className="flex flex-wrap justify-around flex-row-reverse mt-[100px]">
          <div className="flex items-center justify-center w-full lg:w-1/2">
            <img className="w-full lg:w-[80%] mb-10 lg:mb-0" src={aboutNFT} alt="about-ticket" />
          </div>
          <div className="flex flex-col justify-center items-center lg:items-start w-full lg:w-1/2">
            <h1 className="mb-4 font-semibold text-[30px] md:text-[35px] lg:text-[40px]">ABOUT TICKET</h1>
            <div className="underline2"></div>
            <p className="w-[80%] text-[24px] font-light mt-8 text-center lg:text-left">
              This ticket allows you to appear on the Zombie Survival leaderboard within our platform.
            </p>
          </div>
        </div>

        {/* <iframe
          src="https://ipfs.thirdwebcdn.com/ipfs/QmfK9mw9eQKE9vCbtZht9kygpkNWffdwibsJPnCo7MBN4M/erc1155.html?contract=0xE1f375E0dD69B2eeC059014CB0D0919c080ecE45&chain=%7B%22name%22%3A%22Mumbai%22%2C%22chain%22%3A%22Polygon%22%2C%22rpc%22%3A%5B%22https%3A%2F%2Fmumbai.rpc.thirdweb.com%2F5a9bc94b87f7cbbbfbbc234bf1e07f0adf5f3cf3012c9f26f9fc9820d64df93a%22%5D%2C%22nativeCurrency%22%3A%7B%22name%22%3A%22MATIC%22%2C%22symbol%22%3A%22MATIC%22%2C%22decimals%22%3A18%7D%2C%22shortName%22%3A%22maticmum%22%2C%22chainId%22%3A80001%2C%22testnet%22%3Atrue%2C%22slug%22%3A%22mumbai%22%7D&tokenId=0"
          width="600px"
          height="600px"
          style={{ "max-width": "100%" }}
          frameborder="0"
        ></iframe> */}
      </div>
    );
  }
  else if (nftpassisLoading) {
    return <div className="flex items-center justify-center w-full h-screen bg-bg1">
      <h1><Loading /></h1>
    </div>
  }

}

export default NFTpass;

