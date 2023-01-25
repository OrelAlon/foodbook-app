import NavBar from "../../components/navBar/NavBar";
import logo from "../../assets/transparent.png";
import git from "../../assets/git.png";
import link from "../../assets/link.png";
import me from "../../assets/me.jpg";
import res from "../../assets/ress.png";
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
      <div className='about-me'>
        <div className='about-me__header'>
          <h1 className='about-me__title'>About Me</h1>
          <img src={me} alt='Profile' className='about-me__img' />
        </div>
        <div className='about-me__text'>
          <p>
            Starting as a small project, it has grown into a real platform for
            food lovers to discover and share their culinary experiences.
          </p>
          <p>
            As a developer, I constantly strive to improve the user experience
            and am proud to utilize the MERN stack to realize this vision
          </p>
        </div>

        <div className='about-me__links'>
          <a
            target='_blank'
            href='https://www.linkedin.com/in/orel-alon-090689184'
            className='about-me__link'
          >
            <img src={link} alt='Profile' className='about-me__img' />{" "}
          </a>
          <a
            target='_blank'
            href='https://github.com/OrelAlon/foodbook-app'
            className='about-me__link'
          >
            <img src={git} alt='Profile' className='about-me__img' />{" "}
          </a>
          <a
            target='_blank'
            href='https://drive.google.com/file/d/1DU_z9W7dIIeLniNXZR10N7M85ZA5X7u9/view?usp=sharing'
            className='about-me__link'
          >
            <img src={res} alt='Profile' className='about-me__img' />{" "}
          </a>
        </div>
      </div>
    </>
  );
};

export default About;
