import NavBar from "../../components/navBar/NavBar";
import logo from "../../assets/logo.jpeg";

const About = () => {

	return (
    <div>
      <NavBar />
      <div style={{padding:55,backgroundColor:'white',textAlign:'center'}}>

				<img width="25%" src={logo} alt='' />{" "}
				<h1 style={{marginTop:0}}>Foodbook</h1>

				<h4 style={{fontWeight:400}}>this fun app was<br/>built by me</h4>

				<h3 style={{fontWeight:400}}>
					check my LinkedIn
					<br/>
					<a href="https://www.linkedin.com/in/orel-alon-090689184">Orel Alon</a>
				</h3>

				<h3 style={{fontWeight:400}}>
					and the projetc's<br/>
					<a href="https://github.com/OrelAlon/foodbook-app">github</a>
				</h3>

      </div>
    </div>
  );
};

export default About;
