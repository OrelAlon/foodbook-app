import axios from "axios";

export async function fetchRestaurant(restaurantname) {
  console.log("restaurantname");
  console.log(restaurantname);

  const res = await axios.get(
    `/api/restaurants/?restaurantname=${restaurantname}`
  );
  console.log(res);

  return res;
}

export async function fetchRestaurantfetchPosts(restaurant) {
  const res = restaurant.restaurantname
    ? await axios.get(`/api/posts/restaurants/${restaurant.restaurantname}`)
    : await axios.get(`/api/posts/restaurants/${restaurant._id}`);
  return res;
}

// export async function fetchRandomSearch() {
//   const data = await axios.get(
//     `https://api.spoonacular.com/recipes/random?apiKey=${process.env.REACT_APP_RANDOM_KEY}&number=1`
//   );

//   return data;
// }
