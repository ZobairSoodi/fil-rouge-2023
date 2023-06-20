import { useEffect, useState } from "react";
import { FirebaseService } from "../../Shared/Services/firebaseService";
import Title from "../../SharedComponents/Title/Title";

function Leaderboard() {
    const firebase = new FirebaseService();
    const [leaderboard, setLeaderboard] = useState([]);
    const [allGames, setAllGames] = useState([]);
    const [selected, setSelected] = useState("Tunnels");

    useEffect(() => {
        const getGame = async () => {
            const games = await firebase.getGames();
            console.log(games)
            setAllGames(games)
            await firebase.getGameLeaderboard("Tunnels", setLeaderboard);
        }
        getGame();
        // eslint-disable-next-line
    }, []);

    const handleLeaderChange = async (e) => {
        setSelected(e.target.selectedOptions[0].value);
        console.log(selected);
        await firebase.getGameLeaderboard(e.target.selectedOptions[0].value, setLeaderboard);
    }

    return (
        <div className="flex flex-col justify-center items-center px-[10%] pt-20 pb-10 bg-grad">
            <div className="mt-16 mb-16">
                <Title whiteText={<>LEADER<span className="text-primary">BOARD</span></>}/>
            </div>
            <div className="flex gap-3 w-[90%] pb-5 text-xl">
                <select className="px-2 bg-[#60B49C] text-[#fff] text-[25px] font-[Mukta-Regular] border-[2px] border-[#000] rounded-[5px]"
                    onChange={handleLeaderChange}>
                    {allGames.map((item, i) => {
                        return <option key={i} value={item.title}>{item.title}</option>
                    })}
                </select>
                <div className="flex items-center scale-150 text-[#FFB951]">
                    <ion-icon name="alert-circle-outline"></ion-icon>
                </div>
            </div>
            <div className="w-[90%] h-full ">

                <div className="border-2  border-black rounded-[5px] overflow-hidden">
                    <div className="py-4 bg-[#60B49C] text-[29px] text-[#fff] font-[Audiowide]">{selected} Leaderboard</div>
                    <ul className="flex flex-col gap-5 items-start justify-start px-10 py-5 text-[25px] uppercase">
                        <li className="flex justify-between w-full font-[Audiowide]">
                            <span>player name</span>
                            <span className="text-[#FFB951]">score</span>
                        </li>
                        {leaderboard !== undefined ? leaderboard.map((item, index) => (
                            <li className="flex justify-between w-full text-[22px] font-[Mukta-Regular] font-light tracking-wider" key={index}>
                                <span className="flex items-center" title={item.fullname}>
                                    <span className="text-[18px] font-[Audiowide] min-w-[12px] mr-[6px]">
                                        {index + 1}
                                    </span>
                                    <span className="mr-[6px]">
                                        -
                                    </span>
                                    <span>
                                        {item.fullname.length > 30 ? item.fullname.slice(0, 30) + " ..." : item.fullname}
                                    </span>
                                </span>
                                <span className="text-[#FFB951]">{item.highscore}</span>
                            </li>
                        )) : ''}
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default Leaderboard;