import React, { useState, useEffect } from "react";
import { Canvas } from "react-three-fiber";
import Experience from "./Experience";
import Interface from "./Interface";
import { CharacterAnimationsProvider } from "./Context/CharacterAnimationsContext";
import {
  useContractRead,
  useAddress,
  useOwnedNFTs,
} from "@thirdweb-dev/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLink, faUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";
import Loading from "../../SharedComponents/Loading/Loading";

function AvatarScene({ contract, nftID }) {
  const [animationProp, setAnimationProp] = useState("");
  const [targetedNFT, setTargetedNFT] = useState();
  const address = useAddress();
  const { data: ownerNFTs, isLoading: isNftsLoading } = useOwnedNFTs(
    contract,
    address
  );

  const contractURL = contract.erc721.contractWrapper.readContract.address;
  const openseaLink = "https://testnets.opensea.io/assets/mumbai/" + contractURL + "/";

  useEffect(() => {
    if (!isNftsLoading && ownerNFTs && ownerNFTs.length > 0) {
      const nft = ownerNFTs.filter((item) => item.metadata.id == nftID)[0];
      console.log("kkk", ownerNFTs);
      setTargetedNFT(nft);
    }
  }, [isNftsLoading, ownerNFTs]);

  const { data: animation, isLoading } = useContractRead(
    contract,
    "getNftAnimation",
    nftID
  );

  useEffect(() => {
    if (!isLoading && animation && animation.length > 0) {
      setAnimationProp(animation[0]);
    }
    console.log(animation);
  }, [isLoading, animation]);

  const [character, setCharacter] = useState("avatar");

  return (

    <CharacterAnimationsProvider>
      <div className="flex flex-wrap justify-center border-l-[1px] border-b-[1px] border-solid border-[#60B49C] h-full pt-10 ">
        <div className="relative w-full md:w-[60%] h-[600px] 3xl:h-[1400px] px-5 ">
          {/* {!isNftsLoading ?
            <Canvas shadows camera={{ position: [1.2, 1.7, 2.7], fov: 50 }}>
              <Experience character={character} />
            </Canvas>
            : <div className="flex justify-center items-center w-full h-full"><Loading /></div>
          } */}

        </div>
        <div className="w-full md:w-[40%]">
          <div className="flex flex-wrap justify-between items-center gap-4 mt-5 w-full px-5 mb-5">
            {targetedNFT ?
              <>
                <p className="text-[25px]  3xl:text-[50px] ">

                  {targetedNFT.metadata.name}
                </p>
                <div className="flex gap-4 3xl:text-[50px] ">
                  <a target="_blank" href={targetedNFT ? openseaLink + targetedNFT.metadata.id : ""} title="Open in Opensea">Opensea <FontAwesomeIcon icon={faUpRightFromSquare}></FontAwesomeIcon></a>
                  <a target="_blank" href={targetedNFT ? "https://dinoapi.dinomite.click/character/" + targetedNFT.metadata.id : ""} title="Open in Opensea">Our API <FontAwesomeIcon icon={faUpRightFromSquare}></FontAwesomeIcon></a>
                </div>
              </>
              : <Loading />
            }
          </div>
          {animationProp && ownerNFTs ? (
            targetedNFT ? <Interface
              setCharacter={setCharacter}
              character={character}
              contract={contract}
              NFT={ownerNFTs[0]}
              animationProp={animationProp}
              id={targetedNFT.metadata.id}
            /> : <Loading />
          ) : (
            <Loading />
          )}
        </div>
      </div>
    </CharacterAnimationsProvider >
  );
}

export default AvatarScene;
