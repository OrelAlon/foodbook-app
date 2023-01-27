import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import MainLayoutRoutes from "./MainLayuotRoutes";
import Login from "../pages/login/Login";
import Register from "../pages/register/Register";

const RouterConfig = () => {
  return (
    <Router>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='*' element={<MainLayoutRoutes />} />
      </Routes>
    </Router>
  );
};

export default RouterConfig;
