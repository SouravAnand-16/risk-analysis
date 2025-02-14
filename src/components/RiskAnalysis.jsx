import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import { setRiskData } from "../redux/riskSlice";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer,
  PieChart, Pie, Cell, RadialBarChart, RadialBar, PolarAngleAxis
} from "recharts";
import { useEffect, useState } from "react";
import "../styles/RiskAnalysis.css";

const COLORS = ["#FF5733", "#33FF57", "#337BFF"];

const RiskAnalysis = () => {
  const dispatch = useDispatch();
  const riskData = useSelector((state) => state.risk.data);
  const [animatedScore, setAnimatedScore] = useState(0);

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
      {/* Animated Header */}
      <motion.h2 
        className="risk-title"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        Risk Analysis
      </motion.h2>

      <motion.p
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
        <strong>Risk Score:</strong> {animatedScore.toFixed(0)}%
      </motion.p>

      <motion.p
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
      >
        <strong>Risk Level:</strong> {riskData.risk}
      </motion.p>

      {/* Risk-O-Meter */}
      <motion.h3 
        className="chart-title"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
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
            <PolarAngleAxis type="number" domain={[0, 100]} angleAxisId={0} tick={false} />
            <RadialBar 
              minAngle={15} 
              background 
              clockWise 
              dataKey="value" 
              fill={animatedScore > 70 ? "#FF5733" : animatedScore > 40 ? "#FFC107" : "#33FF57"} 
            />
            <Tooltip />
          </RadialBarChart>
        </ResponsiveContainer>
      </motion.div>

      {/* Bar Chart */}
      <motion.h3 className="chart-title">Entity Comparison</motion.h3>
      <motion.div 
        className="chart-container"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.8 }}
      >
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={barChartData}>
            <XAxis dataKey="level" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="Risky" fill="#FF5733" animationDuration={1500} />
            <Bar dataKey="Non-Risky" fill="#33FF57" animationDuration={1500} />
          </BarChart>
        </ResponsiveContainer>
      </motion.div>

      {/* Pie Chart */}
      <motion.h3 className="chart-title">Risk Percentage Distribution</motion.h3>
      <motion.div 
        className="chart-container"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.9 }}
      >
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
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
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

export default RiskAnalysis;
