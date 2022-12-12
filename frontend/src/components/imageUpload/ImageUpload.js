import "../sharePost/sharePost.css";

const ImageUpload = ({ file, setFile }) => {
  return (
    <div className=''>
      <i
        onClick={() => {
          setFile(null);
        }}
        className='remove-image'
      >
        X
      </i>
      <img
        src={file ? URL.createObjectURL(file) : null}
        alt={file ? file.name : null}
        className='img-preview'
      />
    </div>
  );
};

export default ImageUpload;