import gif from "../../assets/fastfood.gif";

const Loading = () => {
  return (
    // <div style={{ backgroundColor: "black" }}>
    <img src={gif} alt='Loading...' className='loading' />
    // </div>
  );
};

export default Loading;