import React, { useState, useEffect } from "react";
import { Link, useOutletContext } from "react-router-dom";
import PostList from "../components/PostList";

const Profile = () => {
  const { user, setMessages } = useOutletContext();
  const [posts, setPosts] = useState([]);
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
  const [networks, setNetworks] = useState({
    Polygon: false,
    Ethereum: false,
    Binance: false,
    Avalanche: false,
    Cardano: false,
  });

  useEffect(() => {
    fetch("/api/profile")
      .then((res) => res.json())
      .then((data) => setPosts(data));
  }, []);

  if (!user) {
    return null;
  }

  const handleInputChange = (event, type, name) => {
    const value =
      event.target.type === "checkbox"
        ? event.target.checked
        : event.target.value;

    if (type === "platforms") {
      setPlatforms((prev) => ({
        ...prev,
        [name]: {
          ...prev[name],
          [event.target.name.endsWith("url") ? "url" : "checked"]: value,
        },
      }));
    } else if (type === "links") {
      setLinks((prev) => ({
        ...prev,
        [name]: {
          ...prev[name],
          [event.target.name.endsWith("url") ? "url" : "checked"]: value,
        },
      }));
    } else if (type === "networks") {
      setNetworks((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData();
    // Transform the state objects into the desired format
    // Transform the state objects into the desired format
    const transformedPlatforms = Object.entries(platforms).map(
      ([key, { url, checked }]) => ({ name: key, url, checked })
    );
    const transformedLinks = Object.entries(links).map(
      ([key, { url, checked }]) => ({ name: key, url, checked })
    );
    const transformedNetworks = Object.entries(networks).map(
      ([key, checked]) => ({ name: key, checked })
    );

    // Initialize FormData and append transformed data
    formData.append("title", title);
    formData.append("description", description);
    formData.append("platforms", JSON.stringify(transformedPlatforms));
    formData.append("links", JSON.stringify(transformedLinks));
    formData.append("networks", JSON.stringify(transformedNetworks));

    if (file) {
      formData.append("file", file);
    }

    try {
      const response = await fetch("/api/game/createGame", {
        method: "POST",
        body: formData,
      });

      const json = await response.json();
      if (json.messages) {
        setMessages(json.messages);
      }
      if (json.game) {
        form.reset();
        setTitle("");
        setDescription("");
        setFile(null);
        setPlatforms({
          Web: { url: "", checked: false },
          iOS: { url: "", checked: false },
          Android: { url: "", checked: false },
        });
        setLinks({
          Website: { url: "", checked: false },
          Facebook: { url: "", checked: false },
          Twitter: { url: "", checked: false },
          Discord: { url: "", checked: false },
          Reddit: { url: "", checked: false },
          YouTube: { url: "", checked: false },
        });
        setNetworks({
          Polygon: false,
          Ethereum: false,
          Binance: false,
          Avalanche: false,
          Cardano: false,
        });
      }
    } catch (error) {
      console.error("Fetching data failed", error);
    }
  };

  return (
    <div className="container">
      <div className="row mt-5">
        <div className="col-6">
          <div>
            <p>
              <strong>User Name</strong>: {user.userName}
            </p>
            <p>
              <strong>Email</strong>: {user.email}
            </p>
            <Link to="/logout" className="col-3 btn btn-primary">
              Logout
            </Link>
          </div>
          <div className="mt-5">
            <h2>Add a game</h2>
            <form onSubmit={handleSubmit} encType="multipart/form-data">
              <div className="mb-3">
                <label htmlFor="title" className="form-label">
                  Title
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="description" className="form-label">
                  Description
                </label>
                <textarea
                  className="form-control"
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                ></textarea>
              </div>

              {/* Platforms */}
              <div className="platformSection">
                {Object.entries(platforms).map(([key, { url, checked }]) => (
                  <div key={key}>
                    <input
                      type="checkbox"
                      id={`platform${key}`}
                      checked={checked}
                      onChange={(e) => handleInputChange(e, "platforms", key)}
                      name={`platforms[${key}]`}
                    />
                    <label htmlFor={`platform${key}`}>{key}</label>
                    <input
                      type="text"
                      value={url}
                      onChange={(e) => handleInputChange(e, "platforms", key)}
                      name={`platforms[${key}]url`}
                      placeholder={`${key} URL`}
                    />
                  </div>
                ))}
              </div>
              {/* Links */}
              <div className="linksSection">
                {Object.entries(links).map(([key, { url, checked }]) => (
                  <div key={key}>
                    <input
                      type="checkbox"
                      id={`link${key}`}
                      checked={checked}
                      onChange={(e) => handleInputChange(e, "links", key)}
                      name={`links[${key}]`}
                    />
                    <label htmlFor={`link${key}`}>{key}</label>
                    <input
                      type="text"
                      value={url}
                      onChange={(e) => handleInputChange(e, "links", key)}
                      name={`links[${key}]url`}
                      placeholder={`${key} URL`}
                    />
                  </div>
                ))}
              </div>
              {/* Networks */}
              <div className="networksSection">
                {Object.entries(networks).map(([key, checked]) => (
                  <div key={key}>
                    <input
                      type="checkbox"
                      id={`network${key}`}
                      checked={checked}
                      onChange={(e) => handleInputChange(e, "networks", key)}
                      name={`networks[${key}]`}
                    />
                    <label htmlFor={`network${key}`}>{key}</label>
                  </div>
                ))}
              </div>
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

              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
