// src/pages/Home.js
import React from "react";
import { useNavigate } from "react-router-dom";
import { ConfigContext } from "../Context/ConfigContext";

import Footer from "../components/Footer";
import Carousel from "../components/Carousel";


const Home = () => {
  const navigate = useNavigate();
  const { config } = React.useContext(ConfigContext);
  console.log(config);

  

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-100 to-sky-300 flex flex-col items-center justify-center p-4">
      {/* Title */}
      {/* <h1 className="text-4xl md:text-5xl font-bold text-center text-purple-700 mb-6">
        Welcome to AMRC Quiz Portal
      </h1> */}
      <h1 className="text-xl md:text-5xl font-bold text-center text-purple-700 mb-6">
        Welcome to Avyakt Murli Readers Club Quiz 📖
      </h1>

      {/* Carousel Banner */}
      <Carousel/>

      {/* Optional spiritual image or quote */}
      <p className="text-2xl text-center max-w-2xl text-white text-shadow-lg/20 italic mb-6"
        lang="hi"
        translate="no">
        {config?.Thought || "“The soul is the light of the world.” - Brahma Kumaris"}
      </p>

      {/* Buttons */}
      <div className="flex flex-col md:flex-row gap-6">
        <button
          onClick={() => navigate("/instructions")}
          className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-full text-lg transition duration-300"
        >
          Start Quiz
        </button>

        <button
          onClick={() => navigate("/result")}
          className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-full text-lg transition duration-300"
        >
          View Result
        </button>

        <button
          onClick={() => navigate("/leaderboard")}
          className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-full text-lg transition duration-300"
        >
          View Leaderboard
        </button>
      </div>

      {/* Footer (optional) */}
      <Footer />
    </div>
  );
};

export default Home;
// This Home component serves as the landing page for the Brahma Kumaris Quiz Portal.
