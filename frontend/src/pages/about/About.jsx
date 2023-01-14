import NavBar from "../../components/navBar/NavBar";
import logo from "../../assets/transparent.png";
import { IconBrandLinkedin, IconBrandGithub } from "@tabler/icons";

const About = () => {
  return (
    <div>
      <NavBar />
      <div style={{ padding: 55, textAlign: "center" }}>
        <img width='30%' src={logo} alt='' />{" "}
        <h4 style={{ fontWeight: 400 }}>
          this fun app
          <br />
          was built by me
        </h4>
        <h3 style={{ fontWeight: 400 }}>
          check my LinkedIn
          <br />
          <a
            target='_blank'
            href='https://www.linkedin.com/in/orel-alon-090689184'
          >
            <IconBrandLinkedin className='linkedin' />
          </a>
        </h3>
        <h3 style={{ fontWeight: 400 }}>
          and the code project
          <br />
          <a target='_blank' href='https://github.com/OrelAlon/foodbook-app'>
            <IconBrandGithub className='github' />
          </a>
        </h3>
      </div>
    </div>
  );
};

export default About;
