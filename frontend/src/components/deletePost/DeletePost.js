import axios from "axios";

const DeletePost = ({ id }) => {
  const deleteHandler = async () => {
    if (window.confirm(`Are you sure you want to delete this post??`)) {
      try {
        await axios.delete(`/api/posts/${id}`);
        window.location.reload();
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <>
      <div className='postTopRight delete' onClick={deleteHandler}>
        X{" "}
      </div>
    </>
  );
};

export default DeletePost;
