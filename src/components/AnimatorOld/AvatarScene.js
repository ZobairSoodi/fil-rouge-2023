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
import Loading from "../../SharedComponents/Loading/Loading";

function AvatarScene({ contract }) {
  const [animationProp, setAnimationProp] = useState("");
  const [id, setId] = useState("0");
  const address = useAddress();
  const { data: ownerNFTs, isLoading: isNftsLoading } = useOwnedNFTs(
    contract,
    address
  );

  useEffect(() => {
    if (!isNftsLoading && ownerNFTs && ownerNFTs.length > 0) {
      const { metadata } = ownerNFTs[0];
      setId(metadata.id);
    }
  }, [isNftsLoading, ownerNFTs]);

  const { data: animation, isLoading } = useContractRead(
    contract,
    "getNftAnimation",
    id
  );

  useEffect(() => {
    if (!isLoading && animation && animation.length > 0) {
      setAnimationProp(animation[0]);
    }
  }, [isLoading, animation]);

  const [character, setCharacter] = useState("avatar");

  return (

    <CharacterAnimationsProvider>
      <div className="flex flex-wrap justify-center border-l-[1px] border-b-[1px] border-solid border-[#60B49C] h-full pt-10 ">
        <div className="relative w-full md:w-[50%] h-[650px] px-5 ">
          <Canvas shadows camera={{ position: [1, 1.5, 2.5], fov: 50 }}>

            <Experience character={character} />
          </Canvas>
        </div>
        <div className="w-full md:w-[50%]">
          <div className="flex items-start mt-5 w-full">
            <p className="text-[25px] ml-5 mb-5">
              NFT : {ownerNFTs ? ownerNFTs[0]?.metadata.name : <Loading />}
            </p>
          </div>
          {animationProp && ownerNFTs ? (
            <Interface
              setCharacter={setCharacter}
              character={character}
              contract={contract}
              NFT={ownerNFTs[0]}
              animationProp={animationProp}
              id={id}
            />
          ) : (
            null
          )}
        </div>
      </div>
    </CharacterAnimationsProvider>
  );
}

export default AvatarScene;
