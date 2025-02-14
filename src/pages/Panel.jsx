import "../styles/Panel.css";
import heroImage from "../assets/images/heroimg.png";
import Navbar from "../components/Navbar";  
import Footer from "../components/Footer"; 

const Panel = () => {
  return (
    <div>
      <Navbar /> 

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-cont">
          <h1>
            The Best <span className="salmonpink">Analytic App</span>
          </h1>
          <p>
           
          </p>
          <button>
            <a href="./pages/about.html">About Us</a>
          </button>
        </div>
        <div className="hero-img">
          <img src={heroImage} alt="hero image" />
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Panel;

