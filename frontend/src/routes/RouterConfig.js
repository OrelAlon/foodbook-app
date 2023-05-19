import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import MainLayoutRoutes from "./MainLayuotRoutes";
import Login from "../pages/login/Login";
import Register from "../pages/register/Register";
import About from "../pages/about/About";

const RouterConfig = () => {
  return (
    <Router>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/about' element={<About />} />

        <Route path='*' element={<MainLayoutRoutes />} />
      </Routes>
    </Router>
  );
};

export default RouterConfig;
