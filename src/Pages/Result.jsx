import React, { useState, useContext } from "react";
import { ConfigContext } from "../Context/ConfigContext";
import { useNavigate } from "react-router-dom";

const Result = () => {
  const { config } = useContext(ConfigContext);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [location, setLocation] = useState("");
  const [resultFound, setResultFound] = useState(false);
  const [checking, setChecking] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setChecking(true);
    setError("");
    try {
      const response = await fetch(config.sheetUrl);
      const data = await response.json();
      const match = data.find((entry) =>
        (entry["𝗢𝗻𝗹𝘆 𝗡𝗮𝗺𝗲: (No BK, no last name) Write in English."] || "").toLowerCase() === name.toLowerCase() 
      &&
        entry["𝗠𝗼𝗯𝗶𝗹𝗲 𝗡𝘂𝗺𝗯𝗲𝗿 (Do not write 0 or +91 before your  number.  Eg: 9987654321✔️)"] === phone
         &&
        (entry["𝗣lace"] || "").toLowerCase() === location.toLowerCase()
      );

      if (match) {
        setResultFound(true);
      } else {
        setError("No result found. Please check your details./ कोई परिणाम नहीं मिला। कृपया अपना विवरण जांचें।");
      }
    } catch (err) {
      setError("Failed to fetch results. Please try again later./ परिणाम प्राप्त करने में विफल। कृपया बाद में पुनः प्रयास करें।");
    }
    setChecking(false);
  };

  const goToLeaderboard = () => {
    navigate("/leaderboard");
  };

  const handleBack = () => {
    navigate('/'); // Go to the previous page
  };

  return (
    <div className="min-h-screen bg-purple-50 flex flex-col items-center">
      <div className="bg-white rounded shadow w-full max-w-md mt-8">
        <h1 className="text-2xl font-bold text-center text-purple-700 mb-4">View Your Quiz Result 📄</h1>

        {!resultFound ? (
          <div className="p-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
                className="w-full text-black px-4 py-2 border rounded"
                required
              />
              <input
                type="text"
                name="number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Enter your phone number"
                className="w-full text-black px-4 py-2 border rounded"
                required
              />
              <input
                type="text"
                name="location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Enter your location"
                className="w-full text-black px-4 py-2 border rounded"
                required
              />
              <button
                type="submit"
                className="w-full bg-purple-600 text-white py-2 rounded hover:bg-purple-700"
                disabled={checking}
              >
                {checking ? "Checking..." : "View Result"}
              </button>
              {error && <p className="text-red-600 text-center">{error}</p>}
            </form>
          </div>
        ) : (
          <div className="mt-4 px-4">
            <p className="text-green-600 font-medium text-center mb-4">✅ Your result is available below:</p>
            <iframe
              src={config.googleFormUrl}
              title="Quiz Result"
              width="100%"
              height="700"
              frameBorder="0"
              allowFullScreen
            ></iframe>
          </div>
        )}

        <div className="p-4 flex flex-col sm:flex-row justify-center gap-4">
          <button
            onClick={goToLeaderboard}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            View Leaderboard
          </button>
          <button
            onClick={handleBack}
            className="bg-gray-300 text-white px-4 py-2 rounded hover:bg-gray-400"
          >
            Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default Result;
