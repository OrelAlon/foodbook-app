import React from "react";

const TagPost = ({ el }) => {
  return (
    <>
      <li>
        <a href='#' className='tag'>
          {el}
        </a>
      </li>
    </>
  );
};

export default TagPost;
