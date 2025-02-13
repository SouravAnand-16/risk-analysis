import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Panel from "./pages/Panel";
import Login from './components/Login'
import Home from './components/Home';
import "./App.css"; 

const App = () => {
  return (
    <Router>
      <div className="app-container">
        {/* <Navbar /> */}
        <div className="main-content">
          <Routes>
            <Route path="/" element={<Panel />} />
            <Route path="/login" element={<Login />} />
            <Route path="/home" element={<Home />} />
            <Route path="/about" element={<h1 className="page-heading">About Page</h1>} />
            <Route path="/contact" element={<h1 className="page-heading">Contact Page</h1>} />
          </Routes>
        </div>
        {/* <Footer /> */}
      </div>
    </Router>
  );
};

export default App;
