import { Navigate } from "react-router-dom";

import Login from "../pages/Auth/Login";


const privateRoutes = [
    { path: `*`, element: <Navigate to="/login" replace /> },
    { path: `/login`, element: <Login /> },


];

export default privateRoutes;