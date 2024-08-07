import axios from 'axios';

const BASE_URL = 'http://localhost:5500';

export async function fetchAll(items) {
  const res = await axios.get(`/api/${items}/${items}`);
  return res;
}

//  users fetch
export async function fetchUserData(username) {
  const res = await axios.get(`/api/users/?username=${username}`);
  return res;
}
export async function fetchUserDataById(userId) {
  const res = await axios.get(`/api/users/?userId=${userId}`);
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
export async function fetchPostId(postId) {
  const res = await axios.get(`/api/posts/?id=${postId}`);
  return res;
}

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
      restaurantUserPick !== null ? `&search=${restaurantUserPick}` : ''
    }${cityPick !== null ? `&city=${cityPick}` : ''}${
      dishTypePick !== null ? `&dishType=${dishTypePick}` : ''
    }`
  );
  return res.data;
}

// Add a comment to a post
export async function addCommentToPost(postId, comment) {
  const res = await axios.post(`/api/posts/${postId}/comment`, comment);
  return res.data;
}

// Fetch comments by post ID
export async function fetchCommentsByPostId(postId) {
  const res = await axios.get(`/api/posts/${postId}/comments`);
  return res.data;
}

export const deleteCommentFromPost = async (postId, commentId) => {
  try {
    const response = await axios.delete(
      `${BASE_URL}/api/posts/${postId}/comments/${commentId}`
    );
    return response.data;
  } catch (error) {
    console.error('Error deleting comment:', error);
    throw error;
  }
};
