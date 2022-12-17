import { Link } from "react-router-dom";

function Logo() {
  return (
    <>
      <Link
        to='/'
        style={{ textDecoration: "none" }}
        onClick={() => window.location.reload(false)}
      >
        <p className='logo'>Foodbook</p>
      </Link>
    </>
  );
}

export default Logo;
