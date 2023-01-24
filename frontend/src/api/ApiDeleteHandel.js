import axios from "axios";

// post delete
export const deletePost = async (id) => {
  const res = await axios.delete(`/api/posts/${id}`);
  return res;
};
