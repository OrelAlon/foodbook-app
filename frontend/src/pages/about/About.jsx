import NavBar from "../../components/navBar/NavBar";
import logo from "../../assets/transparent.png";
import {
  IconBrandLinkedin,
  IconBrandGithub,
  IconFileInfo,
} from "@tabler/icons";

import "./about.css";
const About = () => {
  return (
    <>
      <NavBar />
      <div className='about-div'>
        <div className='about-text'>
          <img src={logo} alt='logo' className='about-logo' />

          <h4 style={{ fontWeight: 800 }}>
            this fun app
            <br />
            was built by me
          </h4>
          <h3 style={{ fontWeight: 800 }}>My CV</h3>

          <a
            target='_blank'
            href='https://drive.google.com/file/d/1cmnvZl-lBD85br5w5tJORF-F6hEz8Vlc/view?usp=share_link'
          >
            <IconFileInfo className='cv' size={50} />
          </a>
          <h3 style={{ fontWeight: 800 }}>My LinkedIn</h3>

          <a
            target='_blank'
            href='https://www.linkedin.com/in/orel-alon-090689184'
          >
            <IconBrandLinkedin className='linkedin' size={50} />
          </a>
          <h3 style={{ fontWeight: 800 }}>My project's code</h3>

          <a target='_blank' href='https://github.com/OrelAlon/foodbook-app'>
            <IconBrandGithub className='github' size={50} />
          </a>
        </div>
      </div>
    </>
  );
};

export default About;
