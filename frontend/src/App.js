import { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import axios from "axios";

import Register from "./pages/register/Register.jsx";
import Login from "./pages/login/Login.jsx";
import Home from "./pages/home/Home.jsx";
import AddRestaurant from "./pages/addRestaurant/AddRestaurant.jsx";
import "./App.css";

function App() {
  // useEffect(() => {
  //   const fetchPost = async () => {
  //     const res = await axios.get("/restaurants/restaurants");
  //     console.log(res.data);
  //   };
  //   fetchPost();
  // }, []);

  return (
    <div className='App'>
      <Router>
        <Routes>
          <Route path='/login' element={<Login />} />

          <Route path='/register' element={<Register />} />
          <Route path='/' element={<Home />} />
          <Route path='/addrestaurant' element={<AddRestaurant />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
