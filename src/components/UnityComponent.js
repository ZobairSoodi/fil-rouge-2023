import React, { useEffect, Fragment, useState } from "react";
import { Unity, useUnityContext } from "react-unity-webgl";
import { Button } from "@chakra-ui/react";
import { UnityService } from "../Shared/Services/serviceUnity";
import { useAddress, useMetamask, useContract, useOwnedNFTs } from "@thirdweb-dev/react";
import { FaExpand } from "react-icons/fa";
import { FirebaseService } from "../Shared/Services/firebaseService";
const contractAddress = process.env.REACT_APP_TICKETS_CONTRACT;

function UnityComponent({ game }) {
  const [screenHeight, setScreenHeight] = useState(window.innerHeight);

  useEffect(() => {
    const handleResize = () => {
      setScreenHeight(window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const isLargeScreen = screenHeight > 2800;

  let address = useAddress();

  const { contract: ticket } = useContract(contractAddress);
  const { data: Tickets, isLoading } = useOwnedNFTs(ticket, address);
  const firebase = new FirebaseService();
  // eslint-disable-next-line
  const [adressStatus, setAdressStatus] = useState({});

  const updateGame = (gameData) => {
    // Mettez à jour le jeu avec les nouvelles données
    // par exemple, en utilisant la fonction `sendMessage` pour envoyer les données à Unity
    console("yeeeeeeeeeeee")
  }
  useEffect(() => {
    const check = async () => {
      if (address && !isLoading) {

        let hasCurrentTicket = false;
        Tickets.forEach((item) => {
          if (Number(item.metadata.id) === Number(game.current_ticket_id)) {
            hasCurrentTicket = true;
          }
        });

        const hasDoc = await firebase.checkLeaderboard(game.title, address, game.current_ticket_id);

        // If the address has a ticket and a document in Firebase, inform Unity that it can update the game score for this address in this game.
        if (hasCurrentTicket && hasDoc) {
          setAdressStatus((old) => { return { ...old, "scoreState": "allowed" } });
        }

        // If the address has a ticket but doesn't have any document in Firebase, create a document for them and inform Unity that it can update the score.
        else if (hasCurrentTicket && !hasDoc) {
          setAdressStatus((old) => { return { ...old, "scoreState": "allowed" } });
          firebase.initScore(game.title, address, game.current_ticket_id);
        }

        // If the address has a document in Firebase but doesn't have any tickets, inform Unity to consider them as a guest and mark the state of this document in Firebase as canceled. 
        else if (!hasCurrentTicket && hasDoc) {
          setAdressStatus((old) => { return { ...old, "scoreState": "not allowed" } });
          firebase.changeScorePerm(game.title, address, game.current_ticket_id, "not allowed");
        }

        // If the address doesn't have any tickets, inform Unity to consider this user as a guest.
        else {
          setAdressStatus((old) => { return { ...old, "scoreState": "not allowed" } });
        }

        /*
        {
          GameID,
          walletAddress,
          ScoreState,
          docId,
          .
          .
          .
        }
        */

      }
    }
    check();
    // eslint-disable-next-line
  }, [address, isLoading]);


  let {
    unityProvider,
    UNSAFE__detachAndUnloadImmediate: detachAndUnloadImmediate,
    sendMessage,
    isLoaded,
    loadingProgression,
    // eslint-disable-next-line
    unload,
    requestFullscreen,
  } = useUnityContext({
    loaderUrl: `/${game.folder}/Build/${game.file}.loader.js`,
    dataUrl: `/${game.folder}/Build/${game.file}.data`,
    frameworkUrl: `/${game.folder}/Build/${game.file}.framework.js`,
    codeUrl: `/${game.folder}/Build/${game.file}.wasm`,
  });
  const connect = useMetamask();
  const service = new UnityService(sendMessage, address, connect);
  // const quitGame = async () => {
  //   await unload();
  // };
  const toggleFullscreen = () => {
    requestFullscreen(true);
  };

  useEffect(() => {
    return () => {
      detachAndUnloadImmediate().catch((reason) => {
        if (reason) console.log(reason);
      });
    };
  }, [detachAndUnloadImmediate]);

  useEffect(() => {
    //detect all events coming from the Unity game
    window.OnUnityEvent = (jsonData) => {
      //jsonData is the data provided with the event
      service.HandleEvents(jsonData);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoaded, address]);

  return (
    <div className="relative">
      {!isLoaded ? <div className="absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] text-[35px] font-semibold">
        <div className="flex flex-col justify-center items-center ">
          <span>Loading</span>
          <span>{Math.round(loadingProgression * 100)}%</span>
        </div>
      </div> : ""}
      <Fragment>
        <Unity
          unityProvider={unityProvider}
          style={{
            width: '100%',
            height: isLargeScreen ? '1500px' : '600px',
            border: '2px solid black',
            background: '#3D4A51',
          }}
        />
      </Fragment>

      <div className="absolute bottom-5 right-5 flex gap-4">
        <Button onClick={toggleFullscreen}>
          <FaExpand className="text-white text-[35px] hover:scale-125"></FaExpand>
        </Button>
      </div>
    </div>
  );
}

export default UnityComponent;
