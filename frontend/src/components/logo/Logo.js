import { Link } from "react-router-dom";

function Logo() {
  return (
    <>
      <Link to='/' className='none'>
        <p className='logo'>Foodbook</p>
      </Link>
    </>
  );
}

export default Logo;
