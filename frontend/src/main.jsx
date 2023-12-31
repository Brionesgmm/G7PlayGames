import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import App from "./App";
import Root from "./routes/Root";
import ErrorPage from "./routes/Error";
import Login from "./routes/Login";
import Signup from "./routes/Signup";
import Index from "./routes/Index";
import Profile from "./routes/Profile";
import Logout from "./routes/Logout";
import Feed from "./routes/Feed";
import Post from "./routes/Post";
import PlayGames from "./components/PlayGames";
import Header from "./components/Header";
import PlayTest from "./routes/PlayTest";
import UpdateGame from "./routes/UpdateGame";
import Leaderboard from "./routes/Leaderboard";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <PlayTest />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/logout",
        element: <Logout />,
      },
      {
        path: "/signup",
        element: <Signup />,
      },
      {
        path: "/profile",
        element: <Profile />,
      },
      // {
      //   path: "/updategame",
      //   element: <UpdateGame />,
      // },
      {
        path: "/leaderboard",
        element: <Leaderboard />,
      },
      {
        path: "/post/:id",
        element: <Post />,
      },
      { path: "/play", element: <PlayGames /> },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
