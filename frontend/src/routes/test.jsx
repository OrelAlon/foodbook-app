// //PostsFeed
// import React from "react";

// import Post from "../post/Post";

// const PostsFeed = React.forwardRef((props, ref) => {
//   const { posts } = props;
//   return (
//     <div>
//       {posts.map((p, index) => {
//         if (posts.length === index + 1) {
//           return (
//             <div ref={ref} key={p._id}>
//               <Post post={p} />
//             </div>
//           );
//         }
//         return <Post key={p._id} post={p} />;
//       })}
//     </div>
//   );
// });

// export default PostsFeed;

// //
// //
// //Feed

// import { useState, useEffect, useRef, useCallback } from "react";

// import axios from "axios";

// import { Loader } from "@mantine/core";
// import useFetchPosts from "../../api/useFetchPosts";
// import Post from "../post/Post";
// import PostsFeed from "../postsFeed/PostsFeed";
// import GridFeed from "../gridFeed/GridFeed";
// import FilterImagesModel from "../filterImagesModel/FilterImagesModel";
// import "./feed.css";

// const Feed = ({ showGrid }) => {
//   const [postss, setPostss] = useState([]);
//   const [data, setData] = useState([]);
//   const [resultsFound, setResultsFound] = useState(undefined);
//   const [msgResults, setMsgResults] = useState("");
//   const [loading, setLoading] = useState(true);

//   const [restaurantUserPick, setRestaurantUserPick] = useState(null);
//   const [dishTypePick, setDishTypePick] = useState(null);
//   const [foodCatgoryPick, setFoodCatgoryPick] = useState([]);

//   //
//   // const [query, setQuery] = useState("");
//   const [pageNumber, setPageNumber] = useState(1);

//   const { posts, hasMore, loadingFetch, error } = useFetchPosts(4, pageNumber);
//   console.log(posts);
//   //
//   useEffect(() => {
//     setData(posts);
//     setPostss(posts);
//   }, [posts]);

//   const observer = useRef();

//   const lastPostElementRef = useCallback(
//     (node) => {
//       if (loadingFetch) return;
//       if (observer.current) observer.current.disconnect();
//       observer.current = new IntersectionObserver((entries) => {
//         if (entries[0].isIntersecting && hasMore) {
//           setPageNumber((prevPageNumber) => prevPageNumber + 1);
//         }
//       });
//       if (node) observer.current.observe(node);
//     },
//     [loadingFetch, hasMore]
//   );

//   function handleSearch(e) {
//     // setQuery(e.target.value);
//     setPageNumber(1);
//   }

//   // useEffect(() => {
//   //   setLoading(true);

//   //   const fetchPosts = async () => {
//   //     const res = await axios.get(
//   //       `/api/posts/feed?page=${page}&size=${pageSize}`
//   //     );
//   //     console.log("res.data");
//   //     console.log(res.data);
//   //     setData(res.data);
//   //     setPosts(res.data);
//   //     setLoading(false);
//   //   };
//   //   fetchPosts();
//   // }, [restaurantUserPick]);

//   const applyFilters = () => {
//     let updatedShearch = data;
//     if (restaurantUserPick) {
//       updatedShearch = updatedShearch.filter((item) =>
//         item.restaurantId.includes(restaurantUserPick)
//       );
//     }

//     // courseTypePick Filter
//     if (dishTypePick) {
//       updatedShearch = updatedShearch.filter((el) =>
//         el.dishType.includes(dishTypePick)
//       );
//     }

//     // foodCatgoryPick Filter
//     if (foodCatgoryPick.length > 0) {
//       updatedShearch = updatedShearch.filter((el) =>
//         foodCatgoryPick.every((v) => el.foodCategory.includes(v))
//       );
//     }
//     if (updatedShearch.length > 0) {
//       setPostss(updatedShearch);
//     } else {
//       setMsgResults("No matching foods found, go out and get us a picture 😜");
//     }

//     setResultsFound(updatedShearch.length > 0);
//   };

//   useEffect(() => {
//     applyFilters();
//   }, [restaurantUserPick, dishTypePick, foodCatgoryPick, data]);

//   return (
//     <div className='feed'>
//       <div className='feedWrapper'>
//         <FilterImagesModel
//           setFoodCatgoryPick={setFoodCatgoryPick}
//           setRestaurantUserPick={setRestaurantUserPick}
//           setDishTypePick={setDishTypePick}
//         />
//         <PostsFeed posts={posts} ref={lastPostElementRef} />

//         {/* {loadingFetch ? (
//           <div className='center-div'>
//             <Loader />
//           </div>
//         ) : (
//           <>
//             {resultsFound !== undefined && resultsFound && showGrid ? (
//             ) : resultsFound && !showGrid ? (
//               <div>
//                 <GridFeed images={posts} />
//               </div>
//             ) : resultsFound === false ? (
//               <div className='center-div msg-results'>{msgResults}</div>
//             ) : null}
//           </>
//         )} */}
//       </div>
//     </div>
//   );
// };

// export default Feed;

// //
// //
// //postcontroll

// const Post = require("../models/Post");
// const User = require("../models/User");
// const Restaurant = require("../models/Restaurant");
// const cloudinary = require("cloudinary");

// //
// const getPost = async (req, res) => {
//   const postId = req.query.id;

//   try {
//     const post = await Post.findById(postId);
//     res.status(201).json(post);
//   } catch (error) {
//     console.log(error.message);
//   }
// };

// //
// const createPost = async (req, res) => {
//   const file = req.files.img;
//   // upload to cloudinary
//   const result = await cloudinary.v2.uploader.upload(file.tempFilePath, {
//     folder: "avatars",
//     width: 500,
//     crop: "scale",
//     effect: "sharpen",
//   });
//   const newPost = new Post({
//     userId: req.body.userId,
//     restaurantId: req.body.restaurantId,
//     foodCategory: JSON.parse(req.body.foodCategory),
//     dishType: JSON.parse(req.body.dishType),
//     price: req.body.price,
//     img: result.secure_url,
//   });
//   try {
//     const savedPost = await newPost.save();
//     res.status(200).json(savedPost);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// };

// //
// const updatePost = async (req, res) => {
//   try {
//     const post = await Post.findById(req.params.id);
//     if (post.userId === req.body.userId) {
//       await post.updateOne({ $set: req.body });
//       res.status(200).json("this post has been updated");
//     } else {
//       res.status(403).json("you can update only your post");
//     }
//   } catch (err) {
//     res.status(500).json(err);
//   }
// };

// //
// const deletePost = async (req, res) => {
//   try {
//     const post = await Post.findById(req.params.id);
//     await post.deleteOne();
//     res.status(200).json("the post has been deleted");
//   } catch (err) {
//     res.status(500).json(err);
//   }
// };

// // const test = await Post.find().populate("user").populate("restaurant");
// // console.log(test);

// //
// const getAllPosts = async (req, res) => {
//   try {
//     const page = req.query.page || 1;

//     const pageSize = req.query.q || 10;

//     const data = await Post.find()
//       .sort({ createdAt: -1 })
//       .skip((page - 1) * pageSize)
//       .limit(pageSize);
//     res.status(201).json(data);
//   } catch (error) {
//     console.log(error.message);
//   }
// };

// //
// const getUserPost = async (req, res) => {
//   try {
//     const currentUser = await Post.findById(req.params.userId).sort({
//       createdAt: -1,
//     });
//     const userPosts = await Post.find({ userId: currentUser._id }).sort({
//       createdAt: -1,
//     });
//     const friendPosts = await Promise.all(
//       currentUser.followings.map((friendId) => {
//         return console.log("working!!!");
//       })
//     );
//     res.status(200).json(userPosts.concat(...friendPosts));
//   } catch (err) {
//     res.status(500).json("error: " + err);
//   }
// };

// //
// const getUsernamePost = async (req, res) => {
//   try {
//     const user = await User.findOne({ username: req.params.username }).sort({
//       createdAt: -1,
//     });
//     const posts = await Post.find({ userId: user._id }).sort({
//       createdAt: -1,
//     });
//     res.status(200).json(posts);
//   } catch (err) {
//     res.status(500).json("no!" + err);
//   }
// };

// //
// const getRestaurantPosts = async (req, res) => {
//   try {
//     const restaurant = await Restaurant.findOne({
//       restaurantname: req.params.restaurantname,
//     });
//     const posts = await Post.find({ restaurantId: restaurant._id }).sort({
//       createdAt: -1,
//     });
//     res.status(200).json(posts);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// };

// //
// const likePost = async (req, res) => {
//   try {
//     const post = await Post.findByIdAndUpdate(req.params.id);

//     if (!post.likes.includes(req.body.userId)) {
//       await post.updateOne({ $push: { likes: req.body.userId } });
//       res.status(200).json("The post has been liked");
//     } else {
//       await post.updateOne({ $pull: { likes: req.body.userId } });
//       res.status(200).json("The post has been disliked");
//     }
//   } catch (err) {
//     res.status(500).json(err);
//   }
// };

// module.exports = {
//   getPost,
//   createPost,
//   updatePost,
//   deletePost,
//   getAllPosts,
//   getUserPost,
//   getUsernamePost,
//   getRestaurantPosts,
//   likePost,
// };

// //PostsFeed
// import React from "react";

// import Post from "../post/Post";

// const PostsFeed = React.forwardRef((props, ref) => {
//   const { posts } = props;
//   return (
//     <div>
//       {posts.map((p, index) => {
//         if (posts.length === index + 1) {
//           return (
//             <div ref={ref} key={p._id}>
//               <Post post={p} />
//             </div>
//           );
//         }
//         return <Post key={p._id} post={p} />;
//       })}
//     </div>
//   );
// });

// export default PostsFeed;

// //
// //
// //
// import { useEffect, useState } from "react";
// import axios from "axios";

// export default function useFetchPosts(query = 4, pageNumber) {
//   const [loadingFetch, setLoadingFetch] = useState(true);
//   const [error, setError] = useState(false);
//   const [posts, setPosts] = useState([]);
//   const [hasMore, setHasMore] = useState(false);

//   useEffect(() => {
//     setPosts([]);
//   }, [query]);

//   useEffect(() => {
//     setLoadingFetch(true);
//     setError(false);
//     let cancel;
//     axios({
//       method: "GET",
//       url: `/api/posts/feed`,
//       params: { q: query, page: pageNumber },
//       cancelToken: new axios.CancelToken((c) => (cancel = c)),
//     })
//       .then((res) => {
//         setPosts((prevPosts) => {
//           return [...new Set([...prevPosts, ...res.data])];
//         });
//         setHasMore(res.data.length > 0);
//         setLoadingFetch(false);
//       })
//       .catch((e) => {
//         if (axios.isCancel(e)) return;
//         setError(true);
//       });
//     return () => cancel();
//   }, [query, pageNumber]);

//   return { loadingFetch, error, posts, hasMore };
// }
