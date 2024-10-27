import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Homepage } from "./pages/Homepage/Homepage";
import { Dashboard } from "./pages/Dashboard/Dashboard";
import { Chat } from "./pages/Chat/Chat";
import { RootLayout } from "./layouts/RootLayout/RootLayout";
import { DashboardLayout } from "./layouts/DashboardLayout/DashboardLayout";
import { Login } from "./pages/Login/Login";
import { Register } from "./pages/Register/Register";

const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      {
        path: "/",
        element: <Homepage />,
      },
      {
        path: "/login/*",
        element: <Login />,
      },
      {
        path: "/register/*",
        element: <Register />,
      },
      {
        element: <DashboardLayout />,
        children: [
          { path: "/dashboard", element: <Dashboard /> },
          { path: "/dashboard/chats/:id", element: <Chat /> },
        ],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
