// import LRU from 'lru-cache';

// const postCache = new LRU({ max: 500 });

// const likeHandler = async (_id, currentUser) => {
//   const cachedPost = postCache.get(_id);
//   if (cachedPost) {
//     // Update the like count and isLiked state based on the cached post
//     setLike(cachedPost.likes);
//     setIsLiked(cachedPost.isLiked);
//     return;
//   }

//   try {
//     const response = await axios.put(`/api/posts/${_id}/like`, {
//       userId: currentUser._id,
//     });
//     if (response.data === "The post has been liked") {
//       setLike((prevLike) => prevLike + 1);
//       setIsLiked(true);
//       postCache.set(_id, { likes: prevLike + 1, isLiked: true });
//     } else if (response.data === "The post has been disliked") {
//       setLike((prevLike) => prevLike - 1);
//       setIsLiked(false);
//       postCache.set(_id, { likes: prevLike - 1, isLiked: false });
//     }
//   } catch (error) {
//     console.log(error);
//   }
// };
