import React, { useContext } from "react";
import { ConfigContext } from "../Context/ConfigContext";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft, FaPlay } from "react-icons/fa"; // Font Awesome icons

const Instructions = () => {
  const { config } = useContext(ConfigContext);
  const navigate = useNavigate();

  if (!config) return <p>Loading instructions...</p>;

  const handleStartQuiz = () => {
    sessionStorage.setItem("instructionsRead", "true");
    sessionStorage.removeItem("quizStartTime");
    navigate("/quiz");
  };

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-purple-50">
      <div className="bg-white p-8 rounded shadow max-w-2xl w-full">
        <h1 className="text-2xl font-bold mb-4 text-purple-700">📋 Quiz Instructions</h1>

        <p className="mb-6 text-left text-blue-600 whitespace-pre-line">
          {config.instructions}
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={handleStartQuiz}
            className="flex items-center justify-center gap-2 bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-6 rounded"
          >
            <FaPlay />
            Start Quiz
          </button>

          <button
            onClick={handleBack}
            className="flex items-center justify-center gap-2 bg-gray-300 hover:bg-gray-400 text-white font-semibold py-2 px-6 rounded"
          >
            <FaArrowLeft />
            Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default Instructions;
