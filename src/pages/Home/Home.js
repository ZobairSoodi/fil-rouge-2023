import React from "react";
import Header from "./sections/Header";
import TopGames from "./sections/TopGames";
import ClaimPass from "./sections/ClaimPass";
import HowTo from "./sections/HowTo";
import './Home.css'


function Home() {

  // const { mutateAsync: upload } = useStorageUpload();
  // const storage = new StorageService(upload);


  return (
    <>
      <Header></Header>
      <TopGames></TopGames>
      <ClaimPass></ClaimPass>
      <HowTo ></HowTo>
    </>
  )
}
export default Home;