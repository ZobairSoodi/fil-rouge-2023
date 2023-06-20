import "./styles/Home.css";
import React, { Fragment, useEffect, useState } from "react";
import Home from "./pages/Home/Home";
import Games from "./pages/Games/Games";
import PlayGame from "./pages/PlayGame/PlayGame";
import MintNFT from "./pages/MintNFT/MintNFT";
import MetadataForm from "./components/MetadataForm";
import Leaderboard from "./pages/Leaderboard/Leaderboard";
import CharacterView from "./pages/CharacterView/CharacterView";
import NFTpass from "./pages/NFTpass/nftpass";
import { FirebaseService } from "./Shared/Services/firebaseService";
import Nav from "./SharedComponents/Nav/Nav";
import Footer from "./SharedComponents/Footer/Footer";
import Profile from "./pages/Profile/Profile";
import About from "./pages/About/About";
import { Routes, Route, useLocation } from 'react-router-dom';
import AddGame from "./pages/admin/Add game/AddGame";
import AdminGames from "./pages/admin/AdminGames/AdminGames";

export default function App() {
  const { pathname } = useLocation();
  const [navType, setNavType] = useState("public");
  const [expand, setExpand] = useState(true);

  useEffect(() => {
    if (pathname.includes("admin")) {
      setNavType("admin")
    }
    if(window.innerWidth <= 600){
      setExpand(false);
    }
  }, []);

  return (
    <div className="App">
      <Nav expand={expand} setExpand={setExpand} />
      <div  className={navType === "admin" ? (expand ? " ml-[60px] sm:ml-[200px] " : " ml-[60px] ") : ""}>
        {navType === "admin" ?
          <div>
            <Routes>
              <Route path="/admin/games/add" element={<AddGame />} />
              <Route path="/admin/games" element={<AdminGames />} />
            </Routes>
          </div> :
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/nftpass" element={<NFTpass />} />
            <Route path="/games" element={<Games />} />
            <Route path="/play/:game" element={<PlayGame />} />
            <Route path="/about" element={<About />} />
            <Route path="/animator/:id" element={<CharacterView />} />
            <Route path="/mint-nft" element={<MintNFT />} />
            <Route path="/form" element={<MetadataForm />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>}

        <Footer></Footer>
      </div>
    </div >
  );
}



