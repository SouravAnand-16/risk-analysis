import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import { setRiskData } from "../redux/riskSlice";
import { 
  BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, 
  PieChart, Pie, Cell, RadialBarChart, RadialBar, PolarAngleAxis 
} from "recharts";

const COLORS = ["#FF5733", "#33FF57", "#337BFF"]; 

const RiskAnalysis = () => {
  const dispatch = useDispatch();
  const riskData = useSelector((state) => state.risk.data);

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

  const riskScoreValue = parseFloat(riskData.risk_score);
  const gaugeData = [{ name: "Risk Score", value: riskScoreValue }];

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      className="mt-6 p-6 border rounded-lg shadow-lg w-full max-w-lg bg-white"
    >
      <h2 className="text-xl font-semibold text-center mb-4">Risk Analysis</h2>

      <p><strong>Address:</strong> {riskData.source_address}</p>
      <p><strong>Risk Score:</strong> {riskData.risk_score}</p>
      <p><strong>Risk Level:</strong> {riskData.risk}</p>

      {/* Risk-O-Meter (Gauge Chart) */}
      <h3 className="text-lg font-semibold mt-4">Risk-O-Meter</h3>
      <ResponsiveContainer width="100%" height={200}>
        <RadialBarChart 
          innerRadius="50%" 
          outerRadius="100%" 
          data={gaugeData} 
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
            fill={riskScoreValue > 70 ? "#FF5733" : riskScoreValue > 40 ? "#FFC107" : "#33FF57"} 
          />
          <Tooltip />
        </RadialBarChart>
      </ResponsiveContainer>

      {/* Bar Chart */}
      <h3 className="text-lg font-semibold mt-4">Entity Comparison (Bar Chart)</h3>
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
      <h3 className="text-lg font-semibold mt-4">Risk Percentage (Pie Chart)</h3>
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

export default RiskAnalysis;
