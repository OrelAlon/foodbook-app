import axios from "axios";

export async function fetchRestaurant(restaurantname) {
  const res = await axios.get(
    `/api/restaurants/?restaurantname=${restaurantname}`
  );
  return res;
}

export async function fetchRestaurantfetchPosts(restaurant) {
  const res = restaurant.restaurantname
    ? await axios.get(`/api/posts/restaurants/${restaurant.restaurantname}`)
    : await axios.get(`/api/posts/restaurants/${restaurant._id}`);
  console.log(res);
  return res;
}
export async function fetchPosts() {
  const res = await axios.get(`/api/posts/feed`);
  console.log("res");
  console.log(res.data);

  return res.data;
}
