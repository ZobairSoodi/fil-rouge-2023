import { useEffect, useState } from "react";
import { FirebaseService } from "../../../Shared/Services/firebaseService";
import GameCard from "../../../SharedComponents/GameCard/GameCard";
import Title from "../../../SharedComponents/Title/Title";
import image from "../../../assets/games-thumbnails/zombie.png";
import Button from "../../../SharedComponents/Button/Button";
import Loading from "../../../SharedComponents/Loading/Loading";
function AdminGames() {
    const firebase = new FirebaseService();
    const [gamesData, setGames] = useState();

    useEffect(() => {
        const getGame = async () => {
            const data = await firebase.getGames();
            console.log(data);
            setGames(data);
        }
        getGame();
        // eslint-disable-next-line
    }, []);

    return (
        <div className="bg-grad pt-10 pb-20 px-[10%] min-h-screen">
            {/* <Title className="mb-10" whiteText="Browse" coloredText="Games" /> */}
            <div className="flex flex-wrap gap-4 justify-between mb-10">
                <h1 className={"flex font-semibold text-[40px] 3xl:text-[55px]"}>
                    <span>Browse</span>
                    &nbsp;
                    <span className="text-primary">Games</span>
                </h1>
                <Button text={"Add Game"} secondary url={"/admin/games/add"} />
            </div>
            <div className="flex flex-wrap justify-start gap-8 items-center ">
                {gamesData && gamesData.length > 0 ? gamesData.map((game, i) => {
                    return <div className={'relative flex flex-col items-center w-full md:w-[calc(50%-16px)] lg:w-[calc(33%-22px)] xl:w-[calc(25%-24px)] '} key={i}>
                        <GameCard game={game} setGames={setGames} />
                    </div>
                }) : (gamesData && gamesData.length === 0 ?
                    <div className="flex justify-center w-full">no games</div>
                    : <div className="flex justify-center items-center w-full py-10"><Loading /></div>
                )
                }
            </div>
        </div>
    );
}

export default AdminGames;