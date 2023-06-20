import { Web3Button, useAddress, useContract, useContractRead, useStorageUpload, useMintNFT, useNFT, useOwnedNFTs } from "@thirdweb-dev/react";
import './mintNft.css';
import { MintMetaData } from "../../Shared/Classes/classes";
import { useEffect, useState } from "react";
import Swal from 'sweetalert2';
import Title from "../../SharedComponents/Title/Title";
// import Button from "../../SharedComponents/Button/Button";
import subtract from '../../assets/background/Subtract.png';
import aboutCharacter from '../../assets/background/about-character.png'
import ConnectButton from "../../SharedComponents/ConnectButton/ConnectButton";
import Button from "../../SharedComponents/Button/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleNotch, faSpinner } from "@fortawesome/free-solid-svg-icons";
import Loading from "../../SharedComponents/Loading/Loading";


const contractAddress = process.env.REACT_APP_CHARACTER_CONTRACT;

function MintNFT() {

  const { contract } = useContract(contractAddress);
  const { mutateAsync: upload } = useStorageUpload();
  const { mutateAsync: mintNft, isLoading } = useMintNFT(contract);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const address = useAddress();
  const { data: nextTokenId } = useContractRead(contract, "nextTokenIdToMint");
  const { data: totalNFTs, isTotalLoading } = useOwnedNFTs(contract, address);

  const [metadata, setMetadata] = useState(null);

  useEffect(() => {
    if (nextTokenId) {
      const nextToken = parseInt(nextTokenId._hex);
      const metadata = new MintMetaData(nextToken);
      setMetadata(metadata);
    }
  }, [nextTokenId]);



  const showProfileBTN = () => {
    if (totalNFTs && totalNFTs.length > 0) {
      return (
        <Button url={"/profile"} text={"Check Your Character"} ></Button>
      )
    }
    else if(totalNFTs && totalNFTs.length === 0) {
      return (
        <ConnectButton text={<Web3Button className="connect-wallet" contractAddress={contractAddress} action={handleMintNFT} disabled={isLoading || !metadata}>
          {isLoading ? "Minting..." : "GET YOUR CHARACTER"}
        </Web3Button>}></ConnectButton>
      );
    }
    else{
      return <Button text={<FontAwesomeIcon spin icon={faCircleNotch} />} ></Button>

    }
  }


  const handleMintNFT = async () => {
    let isUploadCompleted = false;
    try {
      Swal.fire({
        title: 'Minting NFT',
        html: '<div class="spinner-container"><div class="spinner"></div>Please wait for uploading metadata.</div>',
        showConfirmButton: false,
        allowOutsideClick: false,
        didOpen: async () => {
          const uploadPromise = upload({ data: [metadata] });

          Swal.showLoading();
          Swal.update({
            html: '<div class="spinner-container"><div class="spinner"></div>Please wait for uploading metadata.</div>'
          });

          uploadPromise.then(() => {
            isUploadCompleted = true;
            Swal.update({
              html: '<div class="spinner-container"><div class="spinner"></div>Minting the character</div>'
            });
          });

          const mintPromise = mintNft({
            metadata: metadata,
            to: address,
          });

          mintPromise.catch((error) => {
            if (error.message === "MetaMask Typed Message Signature: User denied message signature.") {
              Swal.close();
              Swal.fire({
                icon: 'error',
                title: ' User denied message signature.',
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true
              });
            } else {
              throw error;
            }
          });
          await Promise.all([uploadPromise, mintPromise]);
          if (isUploadCompleted) {
            Swal.close();
            Swal.fire({
              icon: 'success',
              title: successMessage ? successMessage : 'NFT Minted successfully!',
              showConfirmButton: false,
              timer: 3000,
              timerProgressBar: true
            });
          } else {
            Swal.update({
              html: '<div class="spinner-container"><div class="spinner"></div> Upload canceled or minting failed. Please try again.</div>',
              showConfirmButton: true,
              allowOutsideClick: true
            });
          }
        }
      });
    } catch (error) {
      // Set error message and display error Toast
      setErrorMessage(error.message.split(':')[1].trim());
      const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer);
          toast.addEventListener('mouseleave', Swal.resumeTimer);
        },
      });
      Toast.fire({
        icon: 'error',
        title: errorMessage ? errorMessage : 'An error occurred while minting the NFT.',
      });
    }
  };
  const { contract: NftContract } = useContract(process.env.REACT_APP_CHARACTER_CONTRACT)
  // const { data: contractData, isDataLoading, dataError } = useMetadata(NftContract);

  const { data: firstNFT, isFirstNftLoading } = useNFT(NftContract, 0)


  if (!isFirstNftLoading) {
    console.log("first NFT", firstNFT);
  }

  if (!isFirstNftLoading && firstNFT) {
    return (
      <div className="bg-grad pt-20">

        <div className="flex flex-col pt-28 pb-20 px-[5%]">
          <div>
            <Title whiteText="MINT" coloredText="NFT" />
          </div>

          <div className="flex flex-wrap items-center gap-10 mt-10">
            <div className="relative flex justify-center w-full lg:w-[calc(50%-20px)]">
              <img className="relative z-10 w-[70%]" src={firstNFT.metadata.image} alt="" />
              <img className="absolute bottom-[-16px] left-0 w-full " src={subtract} alt="" />
            </div>
            <div className="flex flex-col items-center lg:items-start gap-4 w-full lg:w-[calc(50%-20px)]">
              <span className="text-[25px] sm:text-[18px] text-center">Mint your NFT, FOR FREE!</span>
              <h2 className="text-[30px] sm:text-[40px] text-center ">{firstNFT.metadata.name}</h2>
              <p className="w-[80%] text-[24px] font-light text-center lg:text-left">
                This lizard has a multitude of talents that are sure to impress you and offer significant advantages in future games on our platform.
              </p>

              {showProfileBTN()}

            </div>
          </div>

          <div className="flex flex-wrap justify-around flex-row-reverse mt-[100px]">
            <div className="flex items-center justify-center w-full lg:w-1/2">
              <img className="w-full lg:w-[80%] mb-10 lg:mb-0" src={aboutCharacter} alt="about-contract" />

            </div>
            <div className="flex flex-col justify-center items-center lg:items-start w-full lg:w-1/2">
              <h1 className="mb-4 font-semibold text-[30px] md:text-[35px] lg:text-[40px]">ABOUT CONTRACT</h1>
              <div className="underline2"></div>
              {/* <h2 className="text-[25px] mt-8">{contractData.name}</h2> */}
              <p className="w-[90%] text-[22px] mt-5 font-light text-center lg:text-left">
                This 3D character will be utilized in the upcoming game, offering users who own it an enhanced opportunity to gather additional resources and attain a higher score. <br></br>
                This is adynamic NFT (ERC-721) that give it owner the ability to change and preview their dance, as well as other future content, within our platform. You can instantly see their changed dance on our platform or on the OpenSea .
              </p>
            </div>
          </div>
        </div>
      </div>
    )
  }
  else {
    return <div className="flex items-center justify-center w-full h-screen bg-bg1">
      <h1><Loading /></h1>
    </div>
  }
}

export default MintNFT;
