import React, { useState, useEffect } from "react";

const UpdateGame = () => {
  const [games, setGames] = useState([]);
  const [selectedGame, setSelectedGame] = useState(null);
  const [gameId, setGameId] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);
  const [platforms, setPlatforms] = useState({
    Web: { url: "", checked: false },
    iOS: { url: "", checked: false },
    Android: { url: "", checked: false },
  });
  const [links, setLinks] = useState({
    Website: { url: "", checked: false },
    Facebook: { url: "", checked: false },
    Twitter: { url: "", checked: false },
    Discord: { url: "", checked: false },
    Reddit: { url: "", checked: false },
    YouTube: { url: "", checked: false },
  });
  const [networks, setNetworks] = useState([]);
  const [feedbackForm, setFeedbackForm] = useState("");

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

  const selectGame = (game) => {
    setSelectedGame(game);
    setTitle(game.title);
    setDescription(game.description);
    setPlatforms(
      game.platforms || {
        Web: { url: "", checked: false },
        iOS: { url: "", checked: false },
        Android: { url: "", checked: false },
      }
    );
    setLinks(
      game.links || {
        Website: { url: "", checked: false },
        Facebook: { url: "", checked: false },
        Twitter: { url: "", checked: false },
        Discord: { url: "", checked: false },
        Reddit: { url: "", checked: false },
        YouTube: { url: "", checked: false },
      }
    );
    setNetworks(
      game.networks || {
        Polygon: false,
        Ethereum: false,
        Binance: false,
        Avalanche: false,
        Cardano: false,
      }
    );

    setFeedbackForm(game.feedbackForm || "");

    setGameId(game._id);
    console.log(game._id);
    // If your game data includes a file or image, handle it accordingly
    // For example, you might store a URL or reset the file input
    // setFile(game.file || null);
  };

  const handleUpdateSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    console.log(platforms, links, networks);

    const transformedPlatforms = Object.entries(platforms).map(
      ([key, { name, url, checked }]) => ({ name: name, url, checked })
    );
    const transformedLinks = Object.entries(links).map(
      ([key, { name, url, checked }]) => ({ name: name, url, checked })
    );

    const transformedNetworks = networks.map((network) => ({
      name: network.name,
      checked: network.checked,
    }));

    console.log("Transformed Platforms:", transformedPlatforms);
    console.log("Transformed Links:", transformedLinks);

    formData.append("title", title);
    formData.append("description", description);
    formData.append("feedbackForm", feedbackForm);
    if (file) {
      formData.append("file", file);
    }
    formData.append("platforms", JSON.stringify(transformedPlatforms));
    formData.append("links", JSON.stringify(transformedLinks));
    formData.append("networks", JSON.stringify(transformedNetworks));

    try {
      const response = await fetch(
        `/api/game/updateGame/${gameId}?_method=PUT`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (response.ok) {
        // Handle successful update
        console.log("Game updated successfully");
        // Reset form or provide UI feedback
      } else {
        console.error("Failed to update the game");
      }
    } catch (error) {
      console.error("Error updating game:", error);
    }
  };

  return (
    <div className="container">
      <h2 className="updateGameHeader">Update Games</h2>

      {games.length > 0 && (
        <div>
          <h3>Select a Game to Update</h3>
          {games.map((game) => (
            <button
              className="gameUpdateChoices"
              key={game._id}
              onClick={() => selectGame(game)}
            >
              {game.title}
            </button>
          ))}
        </div>
      )}

      {selectedGame && (
        <form onSubmit={handleUpdateSubmit} encType="multipart/form-data">
          <div>
            <label htmlFor="title">Title</label>
            <input
              type="text"
              className="form-control"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              className="form-control"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </div>

          {/* Platforms */}

          <div className="platformSection">
            {Object.entries(platforms).map(([key, { url, checked, name }]) => (
              <div key={key}>
                <input
                  type="checkbox"
                  id={`platform${key}`}
                  checked={checked}
                  onChange={(e) =>
                    setPlatforms({
                      ...platforms,
                      [key]: { ...platforms[key], checked: e.target.checked },
                    })
                  }
                  name={`platforms[${key}]`}
                />
                <label htmlFor={`platform${key}`}>{name}</label>
                <input
                  type="text"
                  value={url}
                  onChange={(e) =>
                    setPlatforms({
                      ...platforms,
                      [key]: { ...platforms[key], url: e.target.value },
                    })
                  }
                  name={`platforms[${key}]url`}
                  placeholder={`${name} URL`}
                />
              </div>
            ))}
          </div>

          {/* Links */}

          <div className="linksSection">
            {Object.entries(links).map(([key, { url, checked, name }]) => (
              <div key={key}>
                <input
                  type="checkbox"
                  id={`link${key}`}
                  checked={checked}
                  onChange={(e) =>
                    setLinks({
                      ...links,
                      [key]: { ...links[key], checked: e.target.checked },
                    })
                  }
                  name={`links[${key}]`}
                />
                <label htmlFor={`link${key}`}>{name}</label>
                <input
                  type="text"
                  value={url}
                  onChange={(e) =>
                    setLinks({
                      ...links,
                      [key]: { ...links[key], url: e.target.value },
                    })
                  }
                  name={`links[${key}]url`}
                  placeholder={`${name} URL`}
                />
              </div>
            ))}
          </div>

          {/* Networks */}

          <div className="networksSection">
            {networks.map((network) => (
              <div key={network._id}>
                <input
                  type="checkbox"
                  id={`network${network._id}`}
                  checked={network.checked}
                  onChange={(e) => {
                    const updatedNetworks = networks.map((net) =>
                      net._id === network._id
                        ? { ...net, checked: e.target.checked }
                        : net
                    );
                    setNetworks(updatedNetworks);
                  }}
                  name={`networks[${network.name}]`}
                />
                <label htmlFor={`network${network._id}`}>{network.name}</label>
              </div>
            ))}
          </div>

          {/*  Feedback form */}

          <div>
            <label htmlFor="feedbackForm">Feedback URL</label>
            <input
              type="text"
              id="feedbackForm"
              value={feedbackForm}
              onChange={(e) => setFeedbackForm(e.target.value)}
            />
          </div>

          {/* File Upload */}

          <div className="mb-3">
            <label htmlFor="imgUpload" className="form-label">
              Image
            </label>
            <input
              type="file"
              className="form-control"
              id="imageUpload"
              onChange={(e) => setFile(e.target.files[0])}
            />
          </div>
          <button type="submit">Update Game</button>
        </form>
      )}
    </div>
  );
};

export default UpdateGame;
