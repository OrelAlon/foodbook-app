import axios from "axios";

//  users fetch
export async function fetchUserData(username) {
  const res = await axios.get(`/api/users/?username=${username}`);
  return res;
}

export async function fetchAllUsers() {
  const res = await axios.get(`/api/users/users`);
  return res;
}

//  restaurants fetch
export async function fetchRestaurantData(restaurantname) {
  const res = await axios.get(
    `/api/restaurants/?restaurantname=${restaurantname}`
  );
  return res;
}

export async function fetchAllRestaurants() {
  const res = await axios.get(`/api/restaurants/restaurants`);
  return res;
}

//  posts fetch

export async function fetchPostsRestaurant(restaurantname) {
  const res = await axios.get(`/api/posts/restaurants/${restaurantname}`);
  return res;
}

export async function fetchPostsUser(username) {
  const res = await axios.get(`/api/posts/profile/${username}`);
  return res;
}

export async function fetchPostsWithFilters(
  page,
  restaurantUserPick,
  cityPick,
  dishTypePick
) {
  const res = await axios.get(
    `/api/posts/feed?page=${page}${
      restaurantUserPick !== null ? `&search=${restaurantUserPick}` : ""
    }${cityPick !== null ? `&city=${cityPick}` : ""}${
      dishTypePick !== null ? `&dishType=${dishTypePick}` : ""
    }`
  );
  return res.data;
}
