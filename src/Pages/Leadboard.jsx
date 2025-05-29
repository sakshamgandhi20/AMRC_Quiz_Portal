import React, { useContext, useEffect, useState } from "react";
import { ConfigContext } from "../Context/ConfigContext";
import { useNavigate } from "react-router-dom";

const Leaderboard = () => {
  const { config } = useContext(ConfigContext);
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (!config || !config.sheetUrl) return;

    const fetchLeaderboard = async () => {
      try {
        const response = await fetch(config.sheetUrl);
        const data = await response.json();

        const leaderboardData = data.map((entry) => {
          const name = entry["𝗢𝗻𝗹𝘆 𝗡𝗮𝗺𝗲 : (No BK, No last name )  Write in English"] || "";
          const location = entry["𝗣𝗟𝗔𝗖𝗘"] || "";
          const rawScore = entry["Score"] || "0 / 50";
          const scoreMatch = rawScore.match(/^(\d+)\s*\/\s*\d+$/);
          const score = scoreMatch ? parseInt(scoreMatch[1]) : 0;

          return { name, location, score };
        }).filter(entry => entry.name);

        leaderboardData.sort((a, b) => b.score - a.score);
        setEntries(leaderboardData);
      } catch (err) {
        console.error(err);
        setError("Failed to load leaderboard. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchLeaderboard();
  }, [config]);

  const handleBack = () => {
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-purple-50 p-6 relative">
      {/* Back button */}
      <button
        onClick={handleBack}
        className="absolute top-4 left-4 bg-gray-300 text-white px-4 py-2 rounded hover:bg-gray-400"
      >
        ⬅ Back
      </button>

      <h1 className="text-3xl font-bold text-center text-purple-700 mb-6">🏆 Leaderboard</h1>
      {loading ? (
        <p className="text-center text-black">Loading...</p>
      ) : error ? (
        <p className="text-center text-red-600">{error}</p>
      ) : (
        <div className="overflow-x-auto mb-4">
          <table className="min-w-full text-black bg-white border border-gray-300">
            <thead>
              <tr className="bg-purple-100">
                <th className="py-2 px-4 border">Name</th>
                <th className="py-2 px-4 border">Location</th>
                <th className="py-2 px-4 border">Score</th>
              </tr>
            </thead>
            <tbody>
              {entries.map((entry, index) => (
                <tr key={index} className="text-center">
                  <td className="py-2 px-4 border">{entry.name}</td>
                  <td className="py-2 px-4 border">{entry.location}</td>
                  <td className="py-2 px-4 border font-semibold text-purple-600">{entry.score}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Leaderboard;
