import Me from "../../assets/noAvatar.png";
import { Restaurants } from "../../dummyData";

import "./sharePost.css";

const SharePost = () => {
  const submitHandler = (e) => {
    e.preventDefault();
    console.log("Submit");
  };
  return (
    <div className='share'>
      <div className='shareWrapper'>
        <div className='shareTop'>
          <img className='shareProfileImg' src={Me} alt='' />

          <input
            className='shareInput'
            placeholder={"What do you think ?"}
            // ref={desc}
          />
        </div>
        <hr className='shareHr' />

        <form className='shareBottom' onSubmit={submitHandler}>
          <div className='shareOptions'>
            <label htmlFor='file' className='shareOption'>
              {/* <PermMedia htmlColor='tomato' className='shareIcon' /> */}
              <span className='shareOptionText'>Photo</span>
              <input
                style={{ display: "none" }}
                type='file'
                id='file'
                accept='.png,.jpeg,.jpg,.jfif'
                // onChange={(e) => setFile(e.target.files[0])}
              />
            </label>
            <div className='shareOption'>
              {/* <Label htmlColor='blue' className='shareIcon' /> */}
              <span className='shareOptionText'>Tag- </span>
              <label htmlFor='restaurant'> a place:</label>
              <select
                className='select'
                name='restaurant'
                id='restaurant'
                defaultValue={"DEFAULT"}
                required
                // onChange={(e) => setRestaurantName(e.target.value)}
              >
                <option value='DEFAULT' disabled>
                  {" "}
                  -- Restaurant --{" "}
                </option>
                {Restaurants.map((res) => {
                  return (
                    <option key={res._id} value={res._id}>
                      {res.restaurantname}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>
          <button className='shareButton' type='submit'>
            Share
          </button>
        </form>
      </div>
    </div>
  );
};

export default SharePost;
