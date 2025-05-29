// src/pages/Instructions.js
import React, { useContext } from "react";
import { ConfigContext } from "../Context/ConfigContext";
import { useNavigate } from "react-router-dom";

const Instructions = () => {
  const { config } = useContext(ConfigContext);
  const navigate = useNavigate();

  if (!config) return <p>Loading instructions...</p>;

  const handleStartQuiz = () => {
    sessionStorage.setItem("instructionsRead", "true");
    sessionStorage.removeItem("quizStartTime"); // Clear old session if any
    navigate("/quiz");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-purple-50">
      <div className="bg-white p-8 rounded shadow max-w-2xl w-full">
        <h1 className="text-2xl font-bold mb-4 text-purple-700">📋 Quiz Instructions</h1>
        <p className="mb-6 text-left text-blue-600 whitespace-pre-line">{config.instructions}</p>
        <button
          onClick={handleStartQuiz}
          className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-6 rounded"
        >
          Start Quiz
        </button>
      </div>
    </div>
  );
};

export default Instructions;