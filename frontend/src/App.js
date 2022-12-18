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
import UserProfile from "./pages/userProfile/UserProfile";
import RestaurantProfile from "./pages/restaurantProfile/RestaurantProfile";
import AllRestaurants from "./pages/allRestaurants/AllRestaurants";
import EditProfileUserPage from "./pages/editProfileUserPage/EditProfileUserPage";

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
              <Route path='/profile/:username' element={<UserProfile />} />

              <Route path='/restaurants' element={<AllRestaurants />} />
              <Route
                path='/restaurant/:restaurantname'
                element={<RestaurantProfile />}
              />
              <Route
                path='/editprofile/:username'
                element={<EditProfileUserPage />}
              ></Route>
            </Route>
          </Routes>
        </Router>
      </div>
    </>
  );
}

export default App;
