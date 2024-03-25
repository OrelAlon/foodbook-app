import React, { useState, useContext } from "react";

import { Routes, Route } from "react-router-dom";
import NavBar from "../components/navBar/NavBar";
import Home from "../pages/home/Home";
import About from "../pages/about/About";
import UserProfile from "../pages/userProfile/UserProfile";
import PostPage from "../pages/postPage/PostPage";
import AllItemsPage from "../pages/allItemsPage/AllItemsPage";
import RestaurantProfile from "../pages/restaurantProfile/RestaurantProfile";
import EditRestaurantPage from "../pages/editRestaurantPage/EditRestaurantPage";
import EditProfileUserPage from "../pages/editProfileUserPage/EditProfileUserPage";
import EditPostPage from "../pages/editPostPage/EditPostPage";
import RatingStarsPage from "../pages/ratingStarsPage/RatingStarsPage";
import Login from "../pages/login/Login";
import DownBar from "../components/downBar/DownBar";
import { AuthContext } from "../context/AuthContext";
import { ProtectedRoute } from "./ProtectedRoute";
import NavBar from "../components/navBar/NavBar";
function MainLayoutRoutes() {
  const [showGrid, setShowGrid] = useState(false);
  const { user } = useContext(AuthContext);
  if (!user) {
    return <Login />
  }
  return (
    <>
      <React.Fragment />
      <NavBar />
      <div className="page">

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
            <Route path='/about' element={<About />} />
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
            <Route path='/ratingstars' element={<RatingStarsPage />}></Route>
          </Route>
        </Routes>
      </div>


      <DownBar showGrid={showGrid} setShowGrid={setShowGrid} />

      <React.Fragment />
    </>
  );
}

export default MainLayoutRoutes;
