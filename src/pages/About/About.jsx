import React from "react";
import Title from "../../SharedComponents/Title/Title";
import './About.css';
function About() {
  return (
    <div className='about-us Container flex flex-col items-center pt-32 pb-20 '>
      <Title whiteText='ABOUT' coloredText='US' />
      <div className="flex flex-wrap justify-between items-center mt-10 px-[20%]">
        <img className="w-[calc(20%-20px)]" src="/logo_green.png" alt="" />
        <p className="w-[calc(80%-20px)]">
          Our platform offers a wide range of captivating games for players to enjoy.
          Additionally, we host limited-time events tailored for players who possess a
          special NFT pass, allowing them to compete for the highest score.
          Successful participants will be rewarded with new NFT items as a sign of their achievements,
          which can be used in games to enhance their chances of increasing their score in upcoming events.
        </p>
      </div>
    </div>);

}
export default About;
