import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import { setRiskData } from "../redux/riskSlice";
import { 
  BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, 
  PieChart, Pie, Cell, RadialBarChart, RadialBar, PolarAngleAxis 
} from "recharts";
import { useEffect, useState } from "react";

const COLORS = ["#FF5733", "#33FF57", "#337BFF"]; 

const RiskAnalysis1 = () => {
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
      className="mt-6 p-6 border rounded-lg shadow-lg w-full max-w-lg bg-white"
    >
      <h2 className="text-xl font-semibold text-center mb-4">Risk Analysis</h2>

      <p><strong>Address:</strong> {riskData.source_address}</p>
      <p><strong>Risk Score:</strong> {animatedScore.toFixed(0)}%</p>
      <p><strong>Risk Level:</strong> {riskData.risk}</p>

      {/* Animated Risk-O-Meter */}
      <h3 className="text-lg font-semibold mt-4">Risk-O-Meter</h3>
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <ResponsiveContainer width="100%" height={200}>
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
      <h3 className="text-lg font-semibold mt-4">Entity Comparison</h3>
      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={barChartData}>
          <XAxis dataKey="level" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="Risky" fill="#FF5733" />
          <Bar dataKey="Non-Risky" fill="#33FF57" />
        </BarChart>
      </ResponsiveContainer>

      {/* Pie Chart */}
      <h3 className="text-lg font-semibold mt-4">Risk Percentage Distribution</h3>
      <ResponsiveContainer width="100%" height={250}>
        <PieChart>
          <Pie data={pieChartData} cx="50%" cy="50%" outerRadius={80} fill="#8884d8" label>
            {pieChartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>

      {/* Back Button */}
      <button 
        className="mt-4 px-4 py-2 bg-red-500 text-white rounded-lg w-full"
        onClick={() => dispatch(setRiskData(null))}
      >
        Back
      </button>
    </motion.div>
  );
};

export default RiskAnalysis1;
