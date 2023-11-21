import { React, useState } from "react";
import PlayGames from "../components/PlayGames";

const PlayTest = () => {
  const [activeTab, setActiveTab] = useState({
    playTest: true,
    leaderboard: false,
  });

  function changeTab(key) {
    setActiveTab({
      playTest: key === "playTest",
      leaderboard: key === "leaderboard",
    });
  }

  return (
    <div>
      <h1 className="playGamesText">Playtest Games</h1>
      <p></p>
      <div className="tabsSection">
        <button
          className="btn playTestBtn"
          onClick={() => changeTab("playTest")}
        >
          Play Games
        </button>
        <button
          className="btn leaderboardBtn"
          onClick={() => changeTab("leaderboard")}
        >
          Leaderboard
        </button>
      </div>
      {activeTab.playTest && <PlayGames />}
    </div>
  );
};

export default PlayTest;
