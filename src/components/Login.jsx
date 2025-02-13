import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/login.css";
import loginImg from "../assets/images/login.svg";
import signupImg from "../assets/images/signup.svg";

const Login = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const togglePanel = () => {
    setIsSignUp(!isSignUp);
  };

  const handleLogin = (e) => {
    e.preventDefault();

    if (email === "admin" && password === "admin@123") {
      navigate("/home"); 
    } else {
      setError("Invalid credentials! Try again.");
    }
  };

  return (
    <div className={`container ${isSignUp ? "sign-up-mode" : ""}`}>
      <div className="forms-container">
        <div className="signin-signup">
          <form className="sign-in-form" onSubmit={handleLogin}>
            <h2 className="title">Login</h2>
            <div className="input-field">
              <i className="fas fa-user"></i>
              <input
                type="text"
                placeholder="Username"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="input-field">
              <i className="fas fa-lock"></i>
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            {error && <p className="error-message">{error}</p>}
            <input type="submit" value="Login" className="btn solid" />
          </form>
        </div>
      </div>

      <div className="panels-container">
        <div className="panel left-panel">
          <div className="content">
            <h3>Join Analytic Community</h3>
            <p>
              {/* Login in to participate in coding quizzes, connect with developers, and expand your coding network. */}
            </p>
            <button className="btn transparent" onClick={togglePanel}>
              Log in
            </button>
          </div>
          <img src={loginImg} className="image" alt="login" />
        </div>
        <div className="panel right-panel">
          <div className="content">
            <h3>One of us?</h3>
            <p>
              Ready for a coding challenge? Log in to test your coding knowledge and skills.
            </p>
            <button className="btn transparent" onClick={togglePanel}>
              Log in
            </button>
          </div>
          <img src={signupImg} className="image" alt="signup" />
        </div>
      </div>
    </div>
  );
};

export default Login;
