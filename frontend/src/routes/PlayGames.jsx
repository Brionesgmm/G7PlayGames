import React, { useEffect, useState } from "react";
import Game from "../components/Game";

const PlayGames = () => {
  const [games, setGames] = useState([]);

  const fetchGamesData = async () => {
    try {
      const response = await fetch("/api/game/getGames");
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      console.log(data);
      setGames(data);
    } catch (error) {
      console.error("Fetching data failed", error);
    }
  };

  useEffect(() => {
    fetchGamesData();
  }, []);

  const gamesElement = games.map((game) => {
    return (
      <div key={game._id}>
        <h2>{game.title}</h2>
        <img src={`${game.image}`} alt={`${game.title}`} />
        <p>{game.description}</p>
      </div>
    );
  });

  return <div>{gamesElement}</div>;
};

export default PlayGames;
