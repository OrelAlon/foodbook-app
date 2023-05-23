import React, { useState } from 'react';
import {
  Button,
  Typography,
  Box,
  createTheme,
  Dialog,
  DialogTitle,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import logoVertical from '../assets/img/logo-vertical.png';
import logo from '../assets/img/logo-icons-only.png';
import { googleLogin } from '../services/google-auth.service';
import CloseIcon from '@mui/icons-material/Close';
import FacebookOutlinedIcon from '@mui/icons-material/FacebookOutlined';
import TwitterIcon from '@mui/icons-material/Twitter';
import GoogleIcon from '@mui/icons-material/Google';

const WelcomePage: React.FC = () => {
  const theme = createTheme();

  theme.typography.h2 = {
    fontSize: '3.5rem',
    fontWeight: '100',
  };

  const navigate = useNavigate();
  const [openPopup, setOpenPopup] = useState(false);

  const goToWizard = () => {
    navigate('/create-story');
  };

  const handleGoogleLogin = () => {
    googleLogin();
  };

  return (
    <Box
      sx={{
        display: 'flex',
        placeContent: 'center',
        placeItems: 'center',
        gap: '1rem',
        flexDirection: 'column',
        height: 'calc(100vh - 10rem)',
      }}
    >
      <img
        src={logo}
        style={{ height: 'auto', maxWidth: '300px' }}
        alt='logo'
      />
      <Typography
        variant='h4'
        sx={{
          textAlign: 'center',
          fontWeight: 'light',
          lineHeight: '1.5',
          maxWidth: '45rem',
          marginBottom: '3rem',
          '@media screen and (max-width: 600px)': {
            fontSize: '1.5rem',
          },
          '@media screen and (min-width: 600px) and (max-width: 900px)': {
            fontSize: '2rem',
          },
        }}
      >
        Create personalized social stories for individuals with communication
        differences
      </Typography>
      <Button variant='contained' color='primary' onClick={goToWizard}>
        Get Started
      </Button>

      <Button
        variant='contained'
        color='primary'
        onClick={() => setOpenPopup(true)}
      >
        Sign in
      </Button>
      <Dialog
        open={openPopup}
        onClose={() => setOpenPopup(false)}
        PaperProps={{
          sx: {
            width: 642,
            height: 467,
            borderRadius: 3,
            display: 'flex',
            flexDirection: 'row',
          },
        }}
      >
        <Box
          sx={{
            width: '50%',
            backgroundColor: '#E5ECE2',
            padding: '1rem',
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
          }}
        >
          <img
            src={logo}
            style={{
              height: 'auto',
              width: '225px',
              display: 'block',
              margin: '0 auto',
            }}
            alt='logo'
          />
          <Box sx={{ textAlign: 'center', mt: '1rem' }}>
            <p style={{ fontWeight: 600, fontSize: 40, marginTop: 0 }}>
              Welcome!
            </p>
            <p
              style={{ fontFamily: 'Roboto', lineHeight: '1.3', marginTop: 0 }}
            >
              Let's start practicing social interactions easily today
            </p>
          </Box>
        </Box>

        <Box sx={{ width: '50%', backgroundColor: '#D9D9D9', padding: '1rem' }}>
          <DialogTitle
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginTop: 10,
            }}
          >
            <Typography
              gutterBottom
              variant='h6'
              align='center'
              sx={{ fontWeight: '600' }}
            >
              Sign in to continue
            </Typography>

            <Button
              color='inherit'
              onClick={() => setOpenPopup(false)}
              sx={{ position: 'absolute', top: 0, right: 0 }}
            >
              <CloseIcon />
            </Button>
          </DialogTitle>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '1rem',
              p: 2,
            }}
          >
            <Button
              variant='contained'
              sx={{
                backgroundColor: '#3B5998',
                width: 165,
                height: 44,

                color: '#FFFFFF',
                '&:hover': {
                  backgroundColor: '#3B5998',
                },
                borderRadius: 3,
              }}
              // onClick={handleFacebookLogin}
            >
              <FacebookOutlinedIcon sx={{ color: 'white', marginRight: 3 }} />{' '}
              Facebook
            </Button>
            <Button
              variant='contained'
              sx={{
                backgroundColor: '#008BAE',
                width: 165,
                height: 44,
                color: '#FFFFFF',
                '&:hover': {
                  backgroundColor: '#008BAE',
                },
                borderRadius: 3,
              }}
              // onClick={handleTwitterLogin}
            >
              <TwitterIcon sx={{ color: 'white', marginRight: 3 }} /> Twitter
            </Button>
            <Button
              variant='contained'
              sx={{
                backgroundColor: '#FDB18B',
                width: 165,
                height: 44,
                color: '#FFFFFF',
                '&:hover': {
                  backgroundColor: '#FDB18B',
                },
                borderRadius: 3,
              }}
              onClick={handleGoogleLogin}
            >
              <GoogleIcon sx={{ color: 'white', marginRight: 3 }} /> Google
            </Button>
          </Box>
        </Box>
      </Dialog>
    </Box>
  );
};

export default WelcomePage;
