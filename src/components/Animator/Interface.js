import { useCharacterAnimations } from "./Context/CharacterAnimationsContext";
import { useContractWrite, Web3Button } from "@thirdweb-dev/react";
import { useEffect, useState } from "react";
import animationsDefault from './defaultAnimations.json';
import polygon from "../../assets/button/Polygon.svg"
import './interface.css'
import Swal from 'sweetalert2';
import Polygon from "../../SharedComponents/Polugon/Polygon";

const Interface = ({ setCharacter, character, contract, animationProp, NFT, id }) => {
  // eslint-disable-next-line
  const [defaultAnimations, setdefaultAnimations] = useState(animationsDefault);
  const [selectedAnimation, setSelectedAnimation] = useState(defaultAnimations.filter(i => i.name === animationProp)[0]);
  const { animations, animationIndex, setAnimationIndex } = useCharacterAnimations();
  const [activeTab, setActiveTab] = useState(1);

  const handleApplyChanges = async () => {
    try {
      await mutateAsync([id, selectedAnimation.name, selectedAnimation.url]);

      Swal.fire({
        icon: 'success',
        title: 'Changes applied successfully!',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true
      });
    } catch (error) {
      Swal.fire({
        icon: 'error',
        text: error.message,
        confirmButtonText: 'Ok close'
      });
    }
  };
  const { mutateAsync } = useContractWrite(
    contract,
    "setAnimationUrl",
  );

  useEffect(() => {
    setAnimationIndex(defaultAnimations.id);
    // eslint-disable-next-line
  }, [])

  useEffect(() => {
    setSelectedAnimation(defaultAnimations.filter(i => i.name === animationProp)[0]);
    setAnimationIndex(defaultAnimations.filter(i => i.name === animationProp)[0].id);
    // eslint-disable-next-line
  }, [])

  useEffect(() => {
    console.log(selectedAnimation, "NFT selectedAnimation");
    console.log(animations, "NFT animations");
    console.log(NFT, "NFT data", contract);
    // eslint-disable-next-line
  }, [selectedAnimation])

  return (
    <div className="flex flex-col items-center px-5">

      {/******* Menu *******/}
      <div className="flex justify-between w-full text-white font-[Audiowide] text-[14px] xl:text-[16px] ">

        <button className={"relative flex justify-center items-center w-[30%] py-5 "
          + " border-r-[1px] border-[#60B49C] bg-[#3D4A51] 3xl:text-[50px] "
          + (activeTab === 1 ? " bg-[#3d4a5158] " : "")}
          onClick={() => setActiveTab(1)}
        >
          <Polygon active={activeTab} index={1} />
          Animation
        </button>

        <button className={"relative flex justify-center items-center w-[30%] py-5 "
          + "border-r-[1px] border-[#60B49C] bg-[#3D4A51] 3xl:text-[50px] "
          + (activeTab === 2 ? " bg-[#3d4a5158] " : "")}
          onClick={() => setActiveTab(2)}
        >
          <Polygon active={activeTab} index={2} />
          Attributes
        </button>

        <button className={"relative flex justify-center items-center w-[30%] py-5 "
          + "border-r-[1px] border-[#60B49C] bg-[#3D4A51] 3xl:text-[50px] "
          + (activeTab === 3 ? " bg-[#3d4a5158] " : "")}
          onClick={() => setActiveTab(3)}
        >
          <Polygon active={activeTab} index={3} />
          Rankings
        </button>
      </div>

      {/******** Animation Tab ********/}
      <div className={"flex-col space-y-2 w-[80%] "
        + (activeTab === 1 ? " flex " : "hidden")}
      >
        <h2 className="text-[16px] text-[#CACACA] mb-2 mt-5 3xl:text-[50px]">
          change animation
        </h2>
        <div className=" flex flex-wrap gap-3 3xl:text-[50px]">
          {animations.slice(0, animations.length - 1).map((animation, index) => (
            <button
              key={animation}
              className={`animation-btn px-4 py-4 rounded-sm w-[calc(50%-6px)] focus:outline-none ${index === animationIndex
                ? "bg-[#60B49C] text-white"
                : " text-white"
                }`}
              onClick={() => {
                setAnimationIndex(index);
                setSelectedAnimation(() => defaultAnimations.filter(item => item.id === index)[0])
              }}
            >
              {animation}
            </button>

          ))}
        </div>


        <Web3Button
          className="change-animation 3xl:text-[50px] "
          contractAddress={process.env.REACT_APP_CHARACTER_CONTRACT}
          action={handleApplyChanges}

        >Apply Changes
        </Web3Button>
      </div>

      {/******** Attributes Tab ********/}
      <div className={"flex flex-col flex-wrap py-4 space-y-2 w-[80%]  "
        + (activeTab === 2 ? " flex " : " hidden ")}
      >
        <h2 className="text-[16px] text-[#CACACA] mb-2 mt-5 3xl:text-[50px] ">
          Character Attributes:
        </h2>

        <div className=" flex flex-wrap gap-3 w-full 3xl:text-[50px] ">
          {
            // true ? textAttributes.map((item) => {
            NFT.metadata.attributes ? NFT.metadata.attributes.map((item) => {
              return (
                <div className={"flex flex-col justify-center items-center gap-2 rounded-sm w-[calc(50%-6px)] px-2 py-2 "
                  + " border-2 border-[#60B49C] bg-[#60b49c67] "}>
                  <span className="text-[#8effdf] text-[20px] 3xl:text-[50px] font-[Oswald] font-bold tracking-wider uppercase  ">{item.trait_type}</span>
                  <span className="font-[Oswald] font-normal tracking-wider">{item.value}</span>
                </div>
              )
            }) : <div>
              There are no attributes for this character
            </div>
          }
        </div>

      </div>

      {/******** Stats Tab ********/}
      <div className={"flex flex-col flex-wrap py-4 space-y-2 w-[80%] "
        + (activeTab === 3 ? " flex " : " hidden ")}
      >
        <h2 className="text-[16px] text-[#CACACA] mb-2 mt-5 3xl:text-[50px] ">
          Character Rankings:
        </h2>

      </div>

    </div >
  );
};

export default Interface;
