import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./app/shared/layout/Layout";
import Volleyball from "./app/volleyball/Volleyball";
import Futsal from "./app/futsal/Futsal";
import PingPong from "./app/pingPong/PingPong";
import Basketball from "./app/basketball/Basketball";
import Cross from "./app/cross/Cross";
import Swimming from "./app/swimming/Swimming";
import AdminLogin from "./app/adminLogin/AdminLogin";
import { createContext } from "react";
import { initializeApp } from "firebase/app";
import AdminVolleyball from "./app/adminVolleyball/AdminVolleyball";
import AdminPingPong from "./app/adminPingPong/adminPingPong";
import AdminBasketball from "./app/adminBasketball/AdminBasketball";
import AdminFutsal from "./app/adminFutsal/AdminFutsal";
import AdminCross from "./app/adminCross/AdminCross";
import AdminSwimming from "./app/adminSwimming/AdminSwimming";
import AdminChees from "./app/adminChess/AdminChess";
import Chess from "./app/chess/Chess";
import IndexPage from "./app/indexPage/IndexPage";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
};

const app = initializeApp(firebaseConfig);

export const FsContext = createContext(app);

const router = createBrowserRouter(
  [
    {
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <IndexPage />,
        },
        {
          path: "/odbojka",
          element: <Volleyball />,
        },
        {
          path: "/futsal",
          element: <Futsal />,
        },
        {
          path: "/stolni-tenis",
          element: <PingPong />,
        },
        {
          path: "/kosarka",
          element: <Basketball />,
        },
        {
          path: "/kros",
          element: <Cross />,
        },
        {
          path: "/plivanje",
          element: <Swimming />,
        },
        {
          path: "/sah",
          element: <Chess />,
        },
      ],
    },
    {
      path: "/admin",
      element: <AdminLogin />,
    },
    {
      element: <Layout isAdmin={true} />,
      children: [
        {
          path: "/admin/odbojka",
          element: <AdminVolleyball />,
        },
        {
          path: "/admin/futsal",
          element: <AdminFutsal />,
        },
        {
          path: "/admin/stolni-tenis",
          element: <AdminPingPong />,
        },
        {
          path: "/admin/kosarka",
          element: <AdminBasketball />,
        },
        {
          path: "/admin/kros",
          element: <AdminCross />,
        },
        {
          path: "/admin/plivanje",
          element: <AdminSwimming />,
        },
        {
          path: "/admin/sah",
          element: <AdminChees />,
        },
      ],
    },
  ],
  { basename: "/trogir-2024/" }
);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
