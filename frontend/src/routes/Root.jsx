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

  return (
    <>
      <div className="headerContainer">
        <header className="header">
          <div className="logoArea">
            <img className="logo" src="/public/G7Logo.jpeg" />
            <h1 className="logoText">Game7</h1>
          </div>
        </header>
      </div>
      <Messages messages={messages} />
      <Outlet context={{ user, setUser, setMessages }} />
    </>
  );
}

export default Root;
