// src/pages/Quiz.js
import React, { useEffect, useState, useContext } from "react";
import { ConfigContext } from "../Context/ConfigContext";
import { useNavigate } from "react-router-dom";

const Quiz = () => {
  const { config } = useContext(ConfigContext);
  const [timeLeft, setTimeLeft] = useState(null);
  const [showForm, setShowForm] = useState(true);
  const navigate = useNavigate();

  // Helper to get quiz duration in seconds
  const getQuizDuration = () => (config?.quizDuration ? config.quizDuration * 60 : 0);

  useEffect(() => {
    const allowed = sessionStorage.getItem("instructionsRead");
    if (!allowed) {
      navigate("/instructions");
    }
  }, [navigate]);

  useEffect(() => {
    if (!config) return;

    const storedFormUrl = localStorage.getItem("quizFormUrl");
    const storedTimeLeft = localStorage.getItem("quizTimeLeft");
    let initialTimeLeft = getQuizDuration();

    // If form link changed, reset timer and update localStorage
    if (storedFormUrl !== config.googleFormUrl) {
      localStorage.setItem("quizFormUrl", config.googleFormUrl);
      localStorage.setItem("quizTimeLeft", initialTimeLeft);
      setTimeLeft(initialTimeLeft);
      setShowForm(true);
    } else if (storedTimeLeft !== null) {
      // Resume timer from localStorage
      setTimeLeft(Number(storedTimeLeft));
      setShowForm(Number(storedTimeLeft) > 0);
    } else {
      // First time load
      localStorage.setItem("quizFormUrl", config.googleFormUrl);
      localStorage.setItem("quizTimeLeft", initialTimeLeft);
      setTimeLeft(initialTimeLeft);
      setShowForm(true);
    }
    // Only run when config changes
  }, [config]);

  // Timer effect
  useEffect(() => {
    if (timeLeft === null || timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        const next = prev - 1;
        localStorage.setItem("quizTimeLeft", next);
        if (next <= 0) {
          setShowForm(false);
          localStorage.setItem("quizTimeLeft", 0);
          clearInterval(timer);
        }
        return next;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  const formatTime = (seconds) => {
    if (seconds === null || seconds < 0) return "0:00";
    const min = Math.floor(seconds / 60);
    const sec = seconds % 60;
    return `${min}:${sec.toString().padStart(2, "0")}`;
  };

  if (!config) return <p>Loading quiz...</p>;

  return (
    <div className="min-h-screen bg-purple-50 flex flex-col items-center">
      <div className="w-full max-w-4xl bg-white rounded shadow-md">
        <h1 className="text-4xl font-bold text-center text-purple-700 mb-2">Avyakt Murli Readers Quiz 📝 </h1>
        <>
          {/* Sticky timer and warning */}
          <div className="sticky top-0 z-20 bg-white py-2">
            {showForm && timeLeft <= 120 && (
              <div className="text-center text-yellow-600 mb-2 font-medium">
               ⚠️ जल्दी करें! 2 मिनट से भी कम समय बचा है।
              </div>
            )}
            <p className="text-center font-medium text-green-600 mb-2">
              Time Remaining: <span className="font-bold">{formatTime(timeLeft)}</span>
            </p>
          </div>
          {showForm ? (
            <div className="aspect-video border rounded">
              <iframe
                src={config.googleFormUrl}
                title="Quiz Form"
                width="100%"
                height="800"
                frameBorder="0"
                allowFullScreen
              ></iframe>
            </div>
          ) : (
            <div>
              <div className="text-center text-red-600 font-semibold mt-4">
                ⏰ Your quiz time is over. Please return to the home page.
              </div>
              <div className="flex justify-center gap-4 mt-6">
                <button
                  className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 transition"
                  onClick={() => navigate("/")}
                >
                  Home
                </button>
                <button
                  className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
                  onClick={() => navigate("/result")}
                  disabled={showForm}
                  title={showForm ? "Finish the quiz to view results" : ""}
                >
                  View Result
                </button>
              </div>
            </div>
          )}

        </>
      </div>
    </div>
  );
};

export default Quiz;
