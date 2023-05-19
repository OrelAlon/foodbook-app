import axios from "axios";

// post delete
export const deletePost = async (id) => {
  const res = await axios.delete(`/api/posts/${id}`);
  return res;
};

// post delete
export const deleteItem = async (type, id) => {
  console.log(type);
  const res = await axios.delete(`/api/${type}/${id}`);
  return res;
};
