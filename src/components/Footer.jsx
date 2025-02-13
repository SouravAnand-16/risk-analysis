import "../styles/Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <p>&copy; {new Date().getFullYear()} Risk Analysis. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
