import React, { useState, useEffect } from "react";

const ViewLeaderboard = () => {
  const [users, setUsers] = useState([]);

  const fetchLeaderBoardData = async () => {
    try {
      const response = await fetch(`/api/leaderboard/getLeaderboard`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log(data);
      setUsers(data.users);
    } catch (error) {
      console.error("Fetching data failed", error);
    }
  };

  useEffect(() => {
    fetchLeaderBoardData();
  }, []);

  return (
    <div className="viewLeaderboard">
      <div className="usersInfo headerRow">
        <div className="rankColumn">
          <h3 className="rank">Rank</h3>
        </div>
        <div className="nameColumn">
          <h3 className="username">Username</h3>
        </div>
        <div className="scoreColumn">
          <h3 className="score">Score</h3>
        </div>
      </div>
      {users
        .sort((a, b) => b.score - a.score)
        .map((user, index) => {
          return (
            <div className="usersInfo" key={user.id}>
              <div className="rankColumn rank">
                <h3 className="rank">{index + 1}</h3>
              </div>
              <div className="nameColumn username">
                <h3 className="username">{user.username}</h3>
              </div>
              <div className="scoreColumn score">
                <h3 className="score">{user.score}</h3>
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default ViewLeaderboard;
