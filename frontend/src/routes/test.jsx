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
//   const [updatePosts, setUpdatePosts] = useState([]);
//   const [data, setData] = useState([]);
//   const [resultsFound, setResultsFound] = useState(undefined);
//   const [msgResults, setMsgResults] = useState("");
//   const [loading, setLoading] = useState(true);

//   const [restaurantUserPick, setRestaurantUserPick] = useState(null);
//   const [dishTypePick, setDishTypePick] = useState(null);
//   const [foodCatgoryPick, setFoodCatgoryPick] = useState([]);

//   const [pageNumber, setPageNumber] = useState(1);

//   const { posts, hasMore, loadingFetch, error } = useFetchPosts(4, pageNumber);
//   //
//   useEffect(() => {
//     setUpdatePosts(posts);
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
//     setPageNumber(1);
//   }

//   const handleUpdateSearch = (updatedSearch) => {
//     console.log("fron handleUpdateSearch");
//     console.log(updatedSearch);
//   };

//   return (
//     <div className='feed'>
//       <div className='feedWrapper'>
//         <FilterImagesModel
//           setFoodCatgoryPick={setFoodCatgoryPick}
//           setRestaurantUserPick={setRestaurantUserPick}
//           setDishTypePick={setDishTypePick}
//           // setData={setDataCallback}
//           handleUpdateSearch={handleUpdateSearch}
//           posts={updatePosts}
//         />

//         <>
//           {showGrid ? (
//             <div>
//               <PostsFeed posts={updatePosts} ref={lastPostElementRef} />
//             </div>
//           ) : (
//             <div>
//               <GridFeed posts={updatePosts} ref={lastPostElementRef} />
//             </div>
//           )}
//         </>

//         <div>
//           {loadingFetch && (
//             <div className='center-div'>
//               <Loader />
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Feed;

// //
// //
// //
// import React from "react";

// import Post from "../post/Post";

// const PostsFeed = React.forwardRef((props, ref) => {
//   const { posts } = props;
//   return (
//     <div>
//       {posts.map((p, index) => {
//         if (posts.length === index + 1) {
//           return (
//             <div key={p._id}>
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
// import React, { useState, useEffect } from "react";

// import { Space, Select } from "@mantine/core";
// import { IconSearch } from "@tabler/icons";

// import { dishTypeOptions } from "../../assets/foodData";

// import axios from "axios";

// import "./filterImagesModel.css";

// const FilterImagesModel = ({ posts, handleUpdateSearch }) => {
//   const [restaurantsList, setRestaurantsList] = useState([]);
//   const [data, setData] = useState([]);
//   const [resultsFound, setResultsFound] = useState(undefined);
//   const [msgResults, setMsgResults] = useState("");
//   const [loading, setLoading] = useState(true);
//   const [restaurantUserPick, setRestaurantUserPick] = useState(null);
//   const [dishTypePick, setDishTypePick] = useState(null);
//   const [foodCatgoryPick, setFoodCatgoryPick] = useState([]);
//   const [filteredData, setFilteredData] = useState(posts);

//   const styleSelect = {
//     root: { width: "60%", margin: "auto" },
//     input: { "&::placeholder": { textAlign: "center" } },
//   };
//   useEffect(() => {
//     const filters = {
//       restaurantUserPick,
//       dishTypePick,
//       foodCatgoryPick,
//     };
//     setFilteredData(filterData(posts, filters));
//   }, [restaurantUserPick, dishTypePick, foodCatgoryPick, posts]);

//   const filterData = (data, filters) => {
//     let updatedShearch = posts;
//     console.log("pppppppposts");
//     console.log(posts);
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
//     return handleUpdateSearch(updatedShearch);

//     if (updatedShearch.length > 0) {
//       console.log("here");
//       handleUpdateSearch(updatedShearch);
//     } else {
//       setMsgResults("No matching foods found, go out and get us a picture 😜");
//     }

//     setResultsFound(updatedShearch.length > 0);
//   };

//   useEffect(() => {
//     const fetchRestaurants = async () => {
//       const res = await axios.get(`/api/restaurants/restaurants`);
//       sortRestaurants(res.data);
//     };

//     const sortRestaurants = (res) => {
//       let arr = [];
//       res.map((el) => {
//         arr.push({
//           value: el._id,
//           label: el.restaurantname,
//           group: el.city,
//         });
//       });
//       return setRestaurantsList(
//         arr.sort((a, b) =>
//           a.label.toLowerCase() > b.label.toLowerCase() ? 1 : -1
//         )
//       );
//     };

//     fetchRestaurants();
//   }, []);

//   return (
//     <>
//       <form>
//         <Select
//           icon={<IconSearch size={16} />}
//           data={restaurantsList}
//           onChange={setRestaurantUserPick}
//           placeholder='Search By Resraurant ...'
//           searchable
//           clearable
//           styles={styleSelect}
//         />

//         <Space h='sm' />
//         <Select
//           icon={<IconSearch size={16} />}
//           data={dishTypeOptions}
//           onChange={setDishTypePick}
//           placeholder='Whice Course ?'
//           clearable
//           styles={styleSelect}
//         />
//         <Space h='sm' />
//         {/* <MultiSelect
//           icon={<IconSearch size={16} />}
//           data={foodCategoryOptions}
//           onChange={setFoodCatgoryPick}
//           placeholder='Whice Catgory ?'
//           styles={styleSelect}
//           clearable
//         />{" "}
//         <Space h='sm' /> */}
//       </form>
//     </>
//   );
// };
// export default FilterImagesModel;

// //
// //
// //
// import React, { useState, useEffect } from "react";

// import { Link } from "react-router-dom";

// import ImageModal from "../imageModal/ImageModal";

// import "./gridFeed.css";

// const GridFeed = React.forwardRef((props, ref) => {
//   const { posts } = props;
//   const [openedImage, setOpenedImage] = useState(false);
//   // useEffect(() => {}, [posts]);

//   return (
//     <div className='grid-container'>
//       <section className='image-grid-list'>
//         {posts?.map((image, index) => (
//           <Link key={index} to={`/post/${image._id}`} ref={ref}>
//             <div className='image-grid-item'>
//               <div className='image-grid'>
//                 <figure className='image-grid-img'>
//                   <img src={image.img} alt={image.img} />
//                 </figure>
//                 <span className='image-grid-overlay'>
//                   <p>
//                     <span className='image-grid-likes'>
//                       🤤 {image.likes.length}
//                     </span>
//                     {/* <span className='image-grid-comments'>10</span> */}
//                   </p>
//                 </span>
//               </div>
//             </div>
//           </Link>
//         ))}
//       </section>
//       <ImageModal
//         img={openedImage}
//         openedImage={openedImage}
//         setOpenedImage={setOpenedImage}
//       ></ImageModal>
//     </div>
//   );
// });
// export default GridFeed;
// //
// //
// //
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
