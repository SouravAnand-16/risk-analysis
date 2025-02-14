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
            Gain deep insights, track trends, and make data-driven decisions
            with ease. Our powerful analytics platform helps you visualize
            complex data, assess risks, and uncover opportunities—all in one
            place.
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

