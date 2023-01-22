import axios from "axios";

export async function fetchRestaurant(restaurantname) {
  const res = await axios.get(
    `/api/restaurants/?restaurantname=${restaurantname}`
  );
  return res;
}

export async function fetchPostsRestaurant(restaurant) {
  const res = restaurant.restaurantname
    ? await axios.get(`/api/posts/restaurants/${restaurant.restaurantname}`)
    : await axios.get(`/api/posts/restaurants/${restaurant._id}`);
  return res;
}

export async function fetchPostsUser(username) {
  const res = await axios.get(`/api/posts/profile/${username}`);
  return res;
}

export async function fetchPostsWithFilters() {
  const res = await axios.get(`/api/posts/feed`);

  return res.data;
}
