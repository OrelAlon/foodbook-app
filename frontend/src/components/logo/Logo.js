import React from 'react';
import { Link } from 'react-router-dom';
import foodbook from '../../assets/foodbook.png';
import '../../App.scss';

function Logo() {
  const handleClick = () => {
    window.location.reload();
  };

  return (
    <Link to='/' style={{ textDecoration: 'none' }} onClick={handleClick}>
      <img className='logo' src={foodbook} alt='foodbook' />
    </Link>
  );
}

export default Logo;
