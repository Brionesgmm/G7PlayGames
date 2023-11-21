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
          <a className="logoArea" href="https://game7.io/">
            <img className="logo" src="/G7Logo.jpeg" />
            <h1 className="logoText">Game7</h1>
          </a>
        </header>
      </div>
      <Messages messages={messages} />
      <Outlet context={{ user, setUser, setMessages }} />
    </>
  );
}

export default Root;
