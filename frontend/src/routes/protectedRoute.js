import { Navigate } from "react-router-dom";

import Article from "../pages/Article/Article";
import EditArticle from "../pages/Article/EditArticle";

const { id, username } = JSON.parse(localStorage.getItem('user')) || "";

const protectedRoutes = [
    { path: `*`, element: <Navigate to="/article" replace /> },
    { path: `/article`, element: <Article  id={id} name={username}/> },
    { path: `/editArticle/:id`, element: <EditArticle  id={id} name={username}/> },

]

export default protectedRoutes 
