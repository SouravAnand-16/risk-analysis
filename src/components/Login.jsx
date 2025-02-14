import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setUser } from "../redux/userSlice";
import "../styles/Login.css";
import loginImg from "../assets/images/login.svg";
import signupImg from "../assets/images/signup.svg";

const Login = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const togglePanel = () => {
    setIsSignUp(!isSignUp);
  };

  const handleLogin = (e) => {
    e.preventDefault();

    if (email === "admin" && password === "admin@123") {
     dispatch(setUser({email}));
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
              Welcome back! Log in to access insightful analytics, track risk
              patterns, and make informed decisions with real-time data.
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
              Connect with data enthusiasts, share insights, and stay ahead with
              the latest trends in analytics. Join our community to collaborate,
              learn, and grow together!
            </p>
            <button className="btn transparent" onClick={togglePanel}>
              Signup
            </button>
          </div>
          <img src={signupImg} className="image" alt="signup" />
        </div>
      </div>
    </div>
  );
};

export default Login;
