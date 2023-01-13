import React from "react";
import TagPost from "../tagPost/TagPost";

const AllTags = ({ foodCategory = [], dishType = [] }) => {
  return (
    <div>
      <ul className='tags '>
        {foodCategory.map((el, i) => (
          <TagPost key={i} el={el} />
        ))}
      </ul>
      <ul className='tags'>
        {dishType.map((el, i) => (
          <TagPost key={i} el={el} />
        ))}
      </ul>
    </div>
  );
};

export default AllTags;
