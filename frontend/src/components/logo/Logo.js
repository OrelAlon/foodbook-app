import React from 'react';
import { useNavigate } from 'react-router-dom';
import foodbook from '../../assets/foodbook.png';
import '../../App.scss';

function Logo() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/'); // Navigate to the main page
    window.location.reload(); // Reload the page
  };

  return (
    <div onClick={handleClick} style={{ cursor: 'pointer' }}>
      <img className='logo' src={foodbook} alt='foodbook' />
    </div>
  );
}

export default Logo;
