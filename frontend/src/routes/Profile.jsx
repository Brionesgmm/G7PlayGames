import { useEffect, useState } from "react";
import { Link, useOutletContext } from "react-router-dom";
import PostList from "../components/PostList";

const Profile = () => {
  const { user, setMessages } = useOutletContext();

  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch("/api/profile")
      .then((res) => res.json())
      .then((data) => setPosts(data));
  }, []);

  console.log(posts);

  if (!user) {
    return null;
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);

    const platformsArray = formData
      .get("platforms")
      .split(",")
      .map((el) => el.trim());
    const linksArray = formData
      .get("links")
      .split(",")
      .map((el) => el.trim());
    const networksArray = formData
      .get("networks")
      .split(",")
      .map((el) => el.trim());

    const modifiedFormData = new FormData();
    formData.forEach((value, key) => {
      if (!["platforms", "links", "networks"].includes(key)) {
        modifiedFormData.append(key, value);
      }
    });

    platformsArray.forEach((platform) =>
      modifiedFormData.append("platforms", platform)
    );
    linksArray.forEach((link) => modifiedFormData.append("links", link));
    networksArray.forEach((network) =>
      modifiedFormData.append("networks", network)
    );

    const response = await fetch(form.action, {
      method: form.method,
      body: modifiedFormData,
    });
    const json = await response.json();
    if (json.messages) {
      setMessages(json.messages);
    }
    if (json.post) {
      setPosts([...posts, json.post]);
      form.reset();
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
            <form
              action="/api/game/createGame"
              encType="multipart/form-data"
              method="POST"
              onSubmit={handleSubmit}
            >
              <div className="mb-3">
                <label htmlFor="title" className="form-label">
                  Title
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="title"
                  name="title"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="description" className="form-label">
                  Description
                </label>
                <textarea
                  className="form-control"
                  id="description"
                  name="description"
                ></textarea>
              </div>
              <div className="mb-3">
                <label htmlFor="platforms" className="form-label">
                  Platforms
                </label>
                <textarea
                  className="form-control"
                  id="platforms"
                  name="platforms"
                ></textarea>
              </div>
              <div className="mb-3">
                <label htmlFor="links" className="form-label">
                  Links
                </label>
                <textarea
                  className="form-control"
                  id="links"
                  name="links"
                ></textarea>
              </div>
              <div className="mb-3">
                <label htmlFor="networks" className="form-label">
                  Networks
                </label>
                <textarea
                  className="form-control"
                  id="networks"
                  name="networks"
                ></textarea>
              </div>
              <div className="mb-3">
                <label htmlFor="imgUpload" className="form-label">
                  Image
                </label>
                <input
                  type="file"
                  className="form-control"
                  id="imageUpload"
                  name="file"
                />
              </div>
              <button type="submit" className="btn btn-primary" value="Upload">
                Submit
              </button>
            </form>
          </div>
        </div>
        <div className="col-6">
          <PostList posts={posts} />
          <div className="row justify-content-center mt-5">
            <Link className="btn btn-primary" to="/feed">
              Return to Feed
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
