import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Shooters from "./components/Shooters.jsx";
import Player from "./components/Player.jsx";
import Team from "./components/Team.jsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Shooters/>
    },
    {
        path: "/player/:id",
        element: <Player/>
    },
    {
        path: "/team/:id",
        element: <Team/>
    },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <RouterProvider router={router}>
            <App/>
        </RouterProvider>
    </React.StrictMode>,
)
