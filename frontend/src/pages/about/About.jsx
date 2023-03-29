import NavBar from "../../components/navBar/NavBar";
import git from "../../assets/git.png";
import link from "../../assets/link.png";
import me from "../../assets/me.jpg";
import res from "../../assets/ress.png";
import GoBackButton from "../../components/goBackButton/GoBackButton";

import "./about.css";

const About = () => {
  return (
    <>
      {/* <NavBar /> */}

      <div className='about-me'>
        <div className='about-me__header'>
          <h1 className='about-me__title'>About Me...</h1>
          <img src={me} alt='Profile' className='about-me__img' />
        </div>
        <div className='about-me__text'>
          <p
            className='about-me__text-p'
            style={{ animationDelay: "1s", opacity: 0 }}
          >
            {" "}
            Starting as a small project, it has grown into a real platform for
            food lovers to discover and share their culinary experiences.
          </p>
          <p
            className='about-me__text-p'
            style={{ animationDelay: "2s", opacity: 0 }}
          >
            As a developer, I constantly strive to learn new things and can't
            wait to launch my next project.
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
            href='https://drive.google.com/file/d/1aMqqF4EBkX0yxGMIkduXb5mzvA5mNDwV/view?usp=sharing'
            className='about-me__link'
          >
            <img src={res} alt='Profile' className='about-me__img' />{" "}
          </a>
        </div>
        <div className='aboutGo'>
          <GoBackButton />
        </div>
      </div>
    </>
  );
};

export default About;
