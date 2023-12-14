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

const router = createBrowserRouter(
  [
    {
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <div>Asd</div>,
        },
      ],
    },
    {
      element: <Layout />,
      children: [
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
