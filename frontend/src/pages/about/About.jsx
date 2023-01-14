import NavBar from "../../components/navBar/NavBar";
import logo from "../../assets/transparent.png";
import { IconBrandLinkedin, IconBrandGithub } from "@tabler/icons";

import "./about.css";
const About = () => {
  return (
    <>
      <NavBar />
      <div className='about-div'>
        <div className='about-text'>
          <img src={logo} alt='logo' className='about-logo' />

          <h4 style={{ fontWeight: 600 }}>
            this fun app
            <br />
            was built by me
          </h4>
          <h3 style={{ fontWeight: 600 }}>My LinkedIn</h3>

          <a
            target='_blank'
            href='https://www.linkedin.com/in/orel-alon-090689184'
          >
            <IconBrandLinkedin className='linkedin' />
          </a>
          <h3 style={{ fontWeight: 600 }}>My project's code</h3>

          <a target='_blank' href='https://github.com/OrelAlon/foodbook-app'>
            <IconBrandGithub className='github' />
          </a>
        </div>
      </div>
    </>
  );
};

export default About;
