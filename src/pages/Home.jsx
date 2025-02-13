import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setRiskData } from "../redux/riskSlice";
import riskDataJSON from "../assets/riskData.json";
import RiskAnalysis from "../components/RiskAnalysis";

const Home = () => {
  const [address, setAddress] = useState("");
  const dispatch = useDispatch();
  const riskData = useSelector((state) => state.risk.data); 

  const handleSearch = () => {
    const result = riskDataJSON.find((item) => item.source_address === address);
    dispatch(setRiskData(result || null));
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      {!riskData ? (
        <>
          <h1 className="text-3xl font-bold mb-6">Risk Analysis</h1>
          <input
            type="text"
            placeholder="Enter Address..."
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="border p-2 rounded-lg w-80"
          />
          <button onClick={handleSearch} className="bg-blue-500 text-white p-2 mt-4 rounded-lg">
            Search
          </button>
        </>
      ) : (
        <RiskAnalysis />
      )}
    </div>
  );
};

export default Home;
