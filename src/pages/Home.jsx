import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setRiskData } from "../redux/riskSlice";
import riskDataJSON from "../assets/riskData.json";
import RiskAnalysis2 from "../components/PieChartAnimated";
import { Button, TextField, Card, CardContent, Typography } from "@mui/material";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import "../styles/Home.css";

const dummyTrends = [
  { day: "Mon", risk: 30 },
  { day: "Tue", risk: 45 },
  { day: "Wed", risk: 50 },
  { day: "Thu", risk: 70 },
  { day: "Fri", risk: 85 },
];

const Home = () => {
  const [address, setAddress] = useState("");
  const [recentSearches, setRecentSearches] = useState([]);
  const dispatch = useDispatch();
  const riskData = useSelector((state) => state.risk.data);

  const handleSearch = () => {
    if (!address.trim()) return;
    const result = riskDataJSON.find((item) => item.source_address === address);
    dispatch(setRiskData(result || null));
    setRecentSearches((prev) => [address, ...prev.slice(0, 4)]);
  };

  const handleRecentSearch = (addr) => {
    setAddress(addr);
    handleSearch();
  };

  const getRandomAddress = () => {
    const randomIndex = Math.floor(Math.random() * riskDataJSON.length);
    setAddress(riskDataJSON[randomIndex].source_address);
  };

  return (
    <div className="home-container">
      {!riskData ? (
        <>
          <Typography variant="h4" className="title">
            Risk Analysis Portal
          </Typography>

          <TextField
            variant="outlined"
            label="Enter Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="input-box"
          />

          <Button variant="contained" color="primary" onClick={handleSearch} className="search-button">
            Search
          </Button>

          <Button variant="outlined" color="secondary" onClick={getRandomAddress} className="random-button">
            Suggest Random Address
          </Button>

          {recentSearches.length > 0 && (
            <div className="recent-searches">
              <Typography variant="h6">Recent Searches:</Typography>
              {recentSearches.map((addr, index) => (
                <Button key={index} onClick={() => handleRecentSearch(addr)} className="recent-search-button">
                  {addr}
                </Button>
              ))}
            </div>
          )}

          <div className="info-section">
            <Card className="info-card">
              <CardContent>
                <Typography variant="h6">What is Risk Analysis?</Typography>
                <Typography variant="body2">
                  Risk analysis helps assess the potential threats and vulnerabilities associated with an entity or address.
                </Typography>
              </CardContent>
            </Card>
            <Card className="trend-analysis">
            <CardContent>
              <Typography variant="h6">Risk Trends Over Time</Typography>
              <ResponsiveContainer width="100%" height={200}>
                <LineChart data={dummyTrends}>
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="risk" stroke="#FF5733" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
          </div>
          {/* <Card className="trend-analysis">
            <CardContent>
              <Typography variant="h6">Risk Trends Over Time</Typography>
              <ResponsiveContainer width="100%" height={200}>
                <LineChart data={dummyTrends}>
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="risk" stroke="#FF5733" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card> */}
        </>
      ) : (
        <RiskAnalysis2 />
      )}
    </div>
  );
};

export default Home;
