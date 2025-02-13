import { useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setRiskData } from "../redux/riskSlice";
import riskDataJSON from "../assets/riskData.json";
import { Typography, TextField, Button, Card, CardContent, Select, MenuItem } from "@mui/material";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, BarChart, Bar, Legend } from "recharts";
import Navbar from "./Navbar"; 
import Footer from "./Footer"; 
import RiskAnalysis2 from "./PieChartAnimated"; 
import "../styles/Home.css";

const dummyTrends = [
  { day: "Mon", risk: 20 },
  { day: "Tue", risk: 50 },
  { day: "Wed", risk: 40 },
  { day: "Thu", risk: 70 },
  { day: "Fri", risk: 30 },
];

const dummyTransactions = [
  { date: "2024-02-10", risk: 80, amount: 500 },
  { date: "2024-02-11", risk: 60, amount: 400 },
  { date: "2024-02-12", risk: 90, amount: 700 },
];

const Home = () => {
  const [address, setAddress] = useState("");
  const [recentSearches, setRecentSearches] = useState([]);
  const [sortOption, setSortOption] = useState("date");

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

  const sortedTransactions = useMemo(() => {
    return [...dummyTransactions].sort((a, b) => {
      if (sortOption === "date") {
        return new Date(a.date) - new Date(b.date);
      } else if (sortOption === "risk") {
        const riskLevels = { Low: 1, Medium: 2, High: 3 };
        return riskLevels[a.risk] - riskLevels[b.risk];
      }
      return 0;
    });
  }, [sortOption]);
  return (
    <div className="home-wrapper">
      <Navbar />
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
            <Card className="transaction-graph">
            <CardContent>
              <Typography variant="h6">Transaction Risk Levels</Typography>
              <Select value={sortOption} onChange={(e) => setSortOption(e.target.value)}>
                <MenuItem value="date">Sort by Date</MenuItem>
                <MenuItem value="risk">Sort by Risk Level</MenuItem>
              </Select>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={sortedTransactions}>
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="amount" fill="#007bff" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
          </div>
        </>
      ) : (
        <RiskAnalysis2 />
      )}
    </div>
      <Footer />
    </div>
  );
};

export default Home;

