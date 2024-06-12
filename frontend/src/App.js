import Login from "./pages/Auth/Login";

import { Route, Routes } from "react-router-dom";

import DefaultLayout from "./Layout/DefaultLayout";
import privateRoutes from './routes/privateRoute'

import { useIsAuthenticated } from './hooks/useAuth';


import './App.css'

function App() {
  
  let { isAuthenticated } = useIsAuthenticated();

  return (
    <>
      
      {isAuthenticated && <DefaultLayout  />}

      <Routes>
        {!isAuthenticated && privateRoutes.map((route, index) => (
          <Route key={index} {...route} />
        ))}

      </Routes>
    </>
  );
}

export default App;
