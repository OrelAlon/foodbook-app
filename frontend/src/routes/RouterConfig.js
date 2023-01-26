import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "../pages/home/Home";
import Login from "../pages/login/Login";
import About from "../pages/about/About";
import Register from "../pages/register/Register";
import UserProfile from "../pages/userProfile/UserProfile";
import PostPage from "../pages/postPage/PostPage";
import AllItemsPage from "../pages/allItemsPage/AllItemsPage";
import RestaurantProfile from "../pages/restaurantProfile/RestaurantProfile";
import EditRestaurantPage from "../pages/editRestaurantPage/EditRestaurantPage";
import EditProfileUserPage from "../pages/editProfileUserPage/EditProfileUserPage";
import EditPostPage from "../pages/editPostPage/EditPostPage";

import DownBar from "../components/downBar/DownBar";

import { ProtectedRoute } from "./ProtectedRoute";
import React from "react";

const RouterConfig = () => {
  const [showGrid, setShowGrid] = useState(false);

  return (
    <Router>
      <Routes>
        <Route path='/'>
          <Route
            index
            element={
              <ProtectedRoute>
                <Home showGrid={showGrid} />
              </ProtectedRoute>
            }
          />
          <Route path='/login' element={<Login />} />
          <Route path='/about' element={<About />} />
          <Route path='/register' element={<Register />} />
          <Route path='/profile/:username' element={<UserProfile />} />
          <Route path='/post/:id' element={<PostPage />} />
          <Route path='/users' element={<AllItemsPage type={"users"} />} />
          <Route
            path='/restaurants'
            element={<AllItemsPage type={"restaurants"} />}
          />
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
          <Route path='/editpost/:id' element={<EditPostPage />}></Route>
        </Route>
      </Routes>
      <DownBar showGrid={showGrid} setShowGrid={setShowGrid} />
    </Router>
  );
};

export default RouterConfig;
