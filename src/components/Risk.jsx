import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import { setRiskData } from "../redux/riskSlice";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  RadialBarChart,
  RadialBar,
  PolarAngleAxis,
} from "recharts";
import { useEffect, useState } from "react";
import "../styles/Risk.css";

const COLORS = ["#FF5733", "#33FF57", "#337BFF"];

const Test = () => {
  const dispatch = useDispatch();
  const riskData = useSelector((state) => state.risk.data);
  const [animatedScore, setAnimatedScore] = useState(0);

  const getRiskColor = (value) => {
    if (typeof value === "string") {
      switch (value.toLowerCase()) {
        case "low risky":
          return "green";
        case "moderate risky":
          return "orange";
        case "highly risky":
          return "red";
        default:
          return "black";
      }
    } else if (typeof value === "number") {
      if (value >= 70) {
        return "red";
      } else if (value >= 40) {
        return "orange";
      } else {
        return "green";
      }
    }
    return "black";
  };

  useEffect(() => {
    if (riskData) {
      let start = 0;
      const interval = setInterval(() => {
        start += 1;
        if (start >= parseFloat(riskData.risk_score)) {
          setAnimatedScore(parseFloat(riskData.risk_score));
          clearInterval(interval);
        } else {
          setAnimatedScore(start);
        }
      }, 10);
      return () => clearInterval(interval);
    }
  }, [riskData]);

  if (!riskData) return null;

  const barChartData = riskData.level_vise_risk_analysis.map((level) => ({
    level: `Level ${level.level}`,
    Risky: level.risky_entities_count,
    "Non-Risky": level.non_risky_entities_count,
  }));

  const pieChartData = riskData.level_vise_risk_analysis.map((level) => ({
    name: `Level ${level.level}`,
    value: parseFloat(level.risk_percentage),
  }));

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="risk-container"
    >
      {/* Risk Details Section */}
      <motion.div className="risk-details-container">
        <motion.div>
          <motion.h2
            className="risk-title"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            style={{
              background:
                "linear-gradient(to right, #00BFFF, #1E90FF, #4B0082)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              display: "inline-block",
            }}
          >
            Risk Analysis
          </motion.h2>

          {/* <motion.p
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <strong>Address:</strong> {riskData.source_address}
          </motion.p>

          <motion.p
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <strong>Risk Score:</strong>
            <span
              style={{ color: getRiskColor(animatedScore), fontWeight: "bold", marginLeft: "5px" }} 
            >
              {animatedScore.toFixed(0)}%
            </span>
          </motion.p>

          <motion.p
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <strong>Risk Level:</strong>
            <span
              style={{ color: getRiskColor(riskData.risk), fontWeight: "bold", marginLeft: "5px" }}
            >
              {riskData.risk}
            </span>
          </motion.p> */}

          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              marginTop: "10px",
            }}
          >
            <tbody>
              <tr>
                <td
                  style={{
                    fontWeight: "bold",
                    padding: "5px",
                    whiteSpace: "nowrap",
                  }}
                >
                  Address:
                </td>
                <td style={{ padding: "5px", color: "#228B22" }}>{riskData.source_address}</td>
              </tr>
              <tr>
                <td
                  style={{
                    fontWeight: "bold",
                    padding: "5px",
                    whiteSpace: "nowrap",
                  }}
                >
                  Risk Score:
                </td>
                <td
                  style={{
                    padding: "5px",
                    color: getRiskColor(animatedScore),
                    fontWeight: "bold",
                  }}
                >
                  {animatedScore.toFixed(0)}%
                </td>
              </tr>
              <tr>
                <td
                  style={{
                    fontWeight: "bold",
                    padding: "5px",
                    whiteSpace: "nowrap",
                  }}
                >
                  Risk Level:
                </td>
                <td
                  style={{
                    padding: "5px",
                    color: getRiskColor(riskData.risk),
                    fontWeight: "bold",
                  }}
                >
                  {riskData.risk}
                </td>
              </tr>
            </tbody>
          </table>
        </motion.div>

        <motion.div>
          <motion.h3
            className="risk-title"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            style={{
              background:
                "linear-gradient(to right, #00BFFF, #1E90FF, #4B0082)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              display: "inline-block",
              marginTop: "10px",
            }}
          >
            Risk-O-Meter
          </motion.h3>

          <motion.div
            className="chart-container"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.7 }}
          >
            <ResponsiveContainer width="100%">
              <RadialBarChart
                innerRadius="50%"
                outerRadius="100%"
                data={[{ name: "Risk Score", value: animatedScore }]}
                startAngle={180}
                endAngle={0}
              >
                <PolarAngleAxis
                  type="number"
                  domain={[0, 100]}
                  angleAxisId={0}
                  tick={false}
                />
                <RadialBar
                  minAngle={15}
                  background
                  clockWise
                  dataKey="value"
                  fill={
                    animatedScore > 70
                      ? "#FF5733"
                      : animatedScore > 40
                      ? "#FFC107"
                      : "#33FF57"
                  }
                />
                <Tooltip />
              </RadialBarChart>
            </ResponsiveContainer>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Charts Section (PieChart + BarChart) */}
      <motion.div
        className="charts-container"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.9 }}
      >
        {/* Bar Chart */}
        <motion.div
          className="chart-box"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <h3
            className="chart-title"
            style={{
              background:
                "linear-gradient(to right, #00BFFF, #1E90FF, #4B0082)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              display: "inline-block",
            }}
          >
            Entity Comparison
          </h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={barChartData}>
              <XAxis dataKey="level" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="Risky" fill="#FF5733" animationDuration={1500} />
              <Bar
                dataKey="Non-Risky"
                fill="#33FF57"
                animationDuration={1500}
              />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Pie Chart */}
        <motion.div
          className="chart-box"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.9 }}
        >
          <h3
            className="chart-title"
            style={{
              background:
                "linear-gradient(to right, #00BFFF, #1E90FF, #4B0082)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              display: "inline-block",
            }}
          >
            Risk Percentage Distribution
          </h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={pieChartData}
                cx="50%"
                cy="50%"
                outerRadius={80}
                label
                animationDuration={1500}
              >
                {pieChartData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </motion.div>
      </motion.div>

      {/* Animated Back Button */}
      <motion.button
        className="back-button"
        onClick={() => dispatch(setRiskData(null))}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        transition={{ type: "spring", stiffness: 400, damping: 10 }}
      >
        Back
      </motion.button>
    </motion.div>
  );
};

export default Test;
