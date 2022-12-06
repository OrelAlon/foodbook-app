import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Register from "./pages/register/Register.jsx";
import Login from "./pages/login/Login.jsx";
import Home from "./pages/home/Home.jsx";
import Profile from "./pages/profile/Profile.jsx";
import Restaurant from "./pages/restaurant/Restaurant";
import AllRestaurants from "./pages/allRestaurants/AllRestaurants";
import AddRestaurant from "./pages/addRestaurant/AddRestaurant.jsx";

import "./App.css";

function App() {
  //test git
  const ProtectedRoute = ({ children }) => {
    const { user } = useContext(AuthContext);
    if (!user) {
      return <Navigate to='/login' />;
    }

    return children;
  };

  return (
    <>
      <div className='App'>
        <Router>
          <Routes>
            <Route path='/'>
              <Route
                index
                element={
                  <ProtectedRoute>
                    <Home />
                  </ProtectedRoute>
                }
              />
              <Route path='/login' element={<Login />} />
              <Route path='/register' element={<Register />} />
              <Route path='/profile/:username' element={<Profile />} />
              <Route path='/Restaurants' element={<AllRestaurants />} />
              <Route
                path='/restaurant/:restaurantname'
                element={<Restaurant />}
              />
              <Route path='/addrestaurant' element={<AddRestaurant />} />
            </Route>
          </Routes>
        </Router>
      </div>
    </>
  );
}

export default App;
