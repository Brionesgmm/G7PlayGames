import { Link, Outlet } from "react-router-dom";
import { useState } from "react";
import Messages from "../components/Messages";
import { useEffect } from "react";

function Root() {
  const [user, setUser] = useState();
  const [messages, setMessages] = useState({});

  useEffect(() => {
    fetch("/api/user")
      .then((res) => res.json())
      .then((res) => setUser(res.user));
  }, []);

  useEffect(() => {
    const listener = (e) => {
      if (e.key === "Escape") {
        e.preventDefault();
        setMessages({});
      }
    };
    window.addEventListener("keydown", listener);
    return () => window.removeEventListener("keydown", listener);
  }, []);

  return (
    <>
      <div className="headerContainer">
        <header className="header">
          <a className="logoArea" href="https://game7.io/">
            <img className="logo" src="/G7Logo.jpeg" />
            <h1 className="logoText">Game7</h1>
          </a>
          {user && (
            <ul className="adminLinks">
              <Link to="/profile" className="links">
                <li>Games</li>
              </Link>
              <Link to="/leaderboard" className="links">
                <li>Leaderboard</li>
              </Link>
            </ul>
          )}
        </header>
      </div>
      <Messages messages={messages} />
      <Outlet context={{ user, setUser, setMessages }} />
    </>
  );
}

export default Root;
