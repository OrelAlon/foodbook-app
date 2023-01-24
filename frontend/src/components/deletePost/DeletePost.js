import { deletePost } from "../../api/ApiDeleteHandel";

const DeletePost = ({ id }) => {
  const deleteHandler = async () => {
    if (window.confirm(`Are you sure you want to delete this post??`)) {
      try {
        const deleteUserPost = await deletePost(id);
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
