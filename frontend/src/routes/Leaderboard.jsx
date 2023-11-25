import React, { useEffect, useState } from "react";

const Leaderboard = () => {
  const [users, setUsers] = useState([]);
  const [addUsername, setAddUsername] = useState("");
  const [addScore, setAddScore] = useState(0);
  const [oldUserScore, setOldUserScore] = useState([]);
  const [isAddingNewUsers, setIsAddingNewUsers] = useState(false);

  console.log(addUsername, addScore);
  console.log(users);

  const fetchLeaderBoardData = async () => {
    try {
      const response = await fetch(`/api/leaderboard/getLeaderboard`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log(data);
      setUsers(data.users);
      setOldUserScore(data.users);
    } catch (error) {
      console.error("Fetching data failed", error);
    }
  };

  const updateUsers = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const data = { users: users };

    const response = await fetch(form.action, {
      method: form.method,
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const json = await response.json();
    setUsers(json.users);
    setOldUserScore(json.users);
  };

  function addUser() {
    setUsers((preUsers) => {
      return [
        ...preUsers,
        { username: addUsername, score: addScore, id: `${Date.now()}` },
      ];
    });
    setOldUserScore((preUsers) => {
      return [
        ...preUsers,
        { username: addUsername, score: addScore, id: `${Date.now()}` },
      ];
    });
  }

  function deleteUser(id) {
    setUsers((preUsers) => {
      return preUsers.filter((prevUser) => prevUser.id !== id);
    });
  }

  function updateScore(userId, event) {
    setUsers((preUsers) => {
      return preUsers.map((user) => {
        if (user.id === userId) {
          return { ...user, score: parseInt(event.target.value) };
        } else {
          return user;
        }
      });
    });
  }

  useEffect(() => {
    fetchLeaderBoardData();
  }, []);

  return (
    <div className="leaderboardSection">
      <div className="addUsers">
        <div className="enterUsers">
          <div className="usernameInput">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              placeholder="Enter Username"
              value={addUsername}
              onChange={(e) => setAddUsername(e.target.value)}
            />
          </div>
          <div className="scoreInput">
            <label htmlFor="score">Score</label>
            <input
              type="number"
              id="score"
              name="score"
              placeholder="Enter score"
              value={addScore}
              onChange={(e) => setAddScore(e.target.value)}
            />
          </div>
          <button className="addUserBtn btn" onClick={addUser}>
            New User
          </button>
        </div>
        <form
          action="/api/leaderboard/updateLeaderboard?_method=PUT"
          encType="multipart/form-data"
          method="POST"
          onSubmit={updateUsers}
        >
          <button className="updateUsersBtn">Update Users</button>
        </form>
      </div>
      <div className="showUsers">
        {users
          .sort((a, b) => b.score - a.score)
          .map((user, index) => {
            return (
              <div className="userInfoInputs" key={user.id}>
                <div className="rankColumn ">
                  <h3>Rank: {index + 1}</h3>
                </div>
                <div className="nameColumn">
                  <h3>{user.username}</h3>
                </div>
                <div className="scoreColumn">
                  <input
                    type="number"
                    value={user.score}
                    onChange={(e) => updateScore(user.id, e)}
                  />
                  {user.score !==
                    oldUserScore.find((oldUser) => oldUser.id === user.id)
                      .score && (
                    <h3>
                      Old score:
                      {
                        oldUserScore.find((oldUser) => oldUser.id === user.id)
                          .score
                      }
                    </h3>
                  )}
                </div>
                <div className="deleteButtonColumn">
                  <button onClick={() => deleteUser(user.id)}>Delete</button>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Leaderboard;
