// import { useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { setRiskData } from "../redux/riskSlice";
// import riskDataJSON from "../assets/riskData.json";
// import RiskAnalysis2 from "../components/PieChartAnimated";
// import "../styles/Home.css";

// const Home = () => {
//   const [address, setAddress] = useState("");
//   const dispatch = useDispatch();
//   const riskData = useSelector((state) => state.risk.data);

//   const handleSearch = () => {
//     const result = riskDataJSON.find((item) => item.source_address === address);
//     dispatch(setRiskData(result || null));
//   };

//   return (
//     <div className="home-container">
//       {!riskData ? (
//         <>
//           <h1 className="title">Risk Analysis</h1>
//           <input
//             type="text"
//             placeholder="Enter Address..."
//             value={address}
//             onChange={(e) => setAddress(e.target.value)}
//             className="input-box"
//           />
//           <button onClick={handleSearch} className="search-button">
//             Search
//           </button>
//         </>
//       ) : (
//         <RiskAnalysis2 />
//       )}
//     </div>
//   );
// };

// export default Home;

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setRiskData } from "../redux/riskSlice";
import riskDataJSON from "../assets/riskData.json";
import RiskAnalysis2 from "../components/PieChartAnimated";
import { Button, TextField, Card, CardContent, Typography } from "@mui/material";
import { motion } from "framer-motion";
import "../styles/Home.css";

const Home = () => {
  const [address, setAddress] = useState("");
  const [recentSearches, setRecentSearches] = useState([]);
  const dispatch = useDispatch();
  const riskData = useSelector((state) => state.risk.data);

  const handleSearch = () => {
    if (!address.trim()) return;
    
    const result = riskDataJSON.find((item) => item.source_address === address);
    dispatch(setRiskData(result || null));

    setRecentSearches((prev) => {
      const updatedSearches = [address, ...prev.filter((a) => a !== address)];
      return updatedSearches.slice(0, 5);
    });
  };

  const handleRandomSearch = () => {
    const randomAddress = riskDataJSON[Math.floor(Math.random() * riskDataJSON.length)].source_address;
    setAddress(randomAddress);
    handleSearch();
  };

  return (
    <motion.div 
      className="home-container"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {!riskData ? (
        <>
          <motion.h1 
            className="title"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Risk Analysis System
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <TextField
              label="Enter Address"
              variant="outlined"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              fullWidth
              className="input-box"
            />
          </motion.div>

          <motion.div
            className="button-group"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Button variant="contained" color="primary" onClick={handleSearch}>
              Search
            </Button>
            <Button variant="outlined" color="secondary" onClick={handleRandomSearch}>
              Random Address
            </Button>
          </motion.div>

          {/* Recent Searches Section */}
          {recentSearches.length > 0 && (
            <motion.div
              className="recent-searches"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <Typography variant="h6">Recent Searches:</Typography>
              {recentSearches.map((addr, index) => (
                <Card 
                  key={index} 
                  className="search-card"
                  onClick={() => {
                    setAddress(addr);
                    handleSearch();
                  }}
                >
                  <CardContent>
                    <Typography>{addr}</Typography>
                  </CardContent>
                </Card>
              ))}
            </motion.div>
          )}

          {/* Additional Content */}
          <motion.div
            className="info-section"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <Typography variant="h5">Why Risk Analysis Matters?</Typography>
            <Typography variant="body1">
              Risk analysis helps identify potential threats and vulnerabilities in an entity’s transactions and network.
              It provides valuable insights into risk levels, enabling better decision-making.
            </Typography>
          </motion.div>
        </>
      ) : (
        <RiskAnalysis2 />
      )}
    </motion.div>
  );
};

export default Home;

