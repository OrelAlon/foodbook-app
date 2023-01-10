import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "../pages/home/Home";
import Login from "../pages/login/Login";
import Register from "../pages/register/Register";
import UserProfile from "../pages/userProfile/UserProfile";
import PostPage from "../pages/postPage/PostPage";
import AllRestaurants from "../pages/allRestaurants/AllRestaurants";
import RestaurantProfile from "../pages/restaurantProfile/RestaurantProfile";
import EditRestaurantPage from "../pages/editRestaurantPage/EditRestaurantPage";
import EditProfileUserPage from "../pages/editProfileUserPage/EditProfileUserPage";
import { ProtectedRoute } from "./ProtectedRoute";

const RouterConfig = () => {
  return (
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
          <Route path='/post' element={<PostPage />} />

          <Route path='/restaurants' element={<AllRestaurants />} />
          <Route
            path='/restaurant/:restaurantname'
            element={<RestaurantProfile />}
          />
          <Route
            path='/editrestaurant/:restaurantname'
            element={<EditRestaurantPage />}
          />

          <Route
            path='/editprofile/:username'
            element={<EditProfileUserPage />}
          ></Route>
        </Route>
      </Routes>
    </Router>
  );
};

export default RouterConfig;
