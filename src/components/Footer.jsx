import "../styles/Panel.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="touch">
        <h3>Get in Touch</h3>
        <p>Dont miss any updates on Risk!</p>
        <form action="https://formspree.io/f/mbjnozop" className="f_subscribe_two mailchimp" method="post">
          <input type="text" name="email" className="form-control memail" placeholder="Email" />
          <button type="submit">Subscribe</button>
        </form>
      </div>
      <div className="footer-menu">
        <h3>Menu</h3>
        <ul>
          <li><a href="../index.html">Home</a></li>
          <li><a href="../pages/about.html">About</a></li>
          <li><a href="../pages/services.html">Services</a></li>
          <li><a href="#">Contact</a></li>
        </ul>
      </div>
      <div className="footer-help">
        <h3>Help</h3>
        <ul>
          <li><a href="#">FAQ</a></li>
          <li><a href="#">Terms & Conditions</a></li>
          <li><a href="#">Reporting</a></li>
          <li><a href="#">Documentation</a></li>
          <li><a href="#">Support Policy</a></li>
          <li><a href="#">Privacy</a></li>
        </ul>
      </div>
      <div className="footer-team">
        <h3>Team Solutions</h3>
        <div className="socials">
          <a href="#" className="fab fa-facebook"></a>
          <a href="#" className="fab fa-twitter"></a>
          <a href="https://www.linkedin.com/in/shlok-gaikwad-667b431a6/" className="fab fa-linkedin"></a>
          <a href="#" className="fab fa-pinterest"></a>
        </div>
      </div>
      <div className="footer-bg">
        <div className="footer-bg-one"></div>
        <div className="footer-bg-two"></div>
      </div>
    </footer>
  );
};

export default Footer;

