// src/pages/Home.js
import React from "react";
import { useNavigate } from "react-router-dom";
import { ConfigContext } from "../Context/ConfigContext";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

const Home = () => {
  const navigate = useNavigate();
  const { config } = React.useContext(ConfigContext);
  console.log(config);

  const carouselImages = [
    "https://bkdailynews.org/wp-content/uploads/2021/06/WhatsApp-Image-2021-06-23-at-07.39.52-5.jpeg",
    "https://i.pinimg.com/600x315/59/7a/f9/597af9742ecde62164bf825209e37da4.jpg",
    "data:image/jpeg;base64,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"
  ];

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-100 to-sky-300 flex flex-col items-center justify-center p-4">
      {/* Title */}
      <h1 className="text-4xl md:text-5xl font-bold text-center text-purple-700 mb-6">
        Welcome to AMRC Quiz Portal
      </h1>

      {/* Carousel Banner */}
      <div className="w-full max-w-3xl h-[48vw] md:h-[400px] mb-6 rounded overflow-hidden">
        <Slider {...sliderSettings}>
          {carouselImages.map((img, index) => (
            <div key={index} className="w-full h-full">
              <img
                src={img}
                alt={`Slide ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </Slider>
      </div>

      {/* Optional spiritual image or quote */}
      <p className="text-2xl text-center max-w-2xl text-white text-shadow-lg/20 italic mb-6">
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
      <footer className="mt-12 text-sm text-gray-500">
        Om Shanti ✨ | Powered by React + Firebase
      </footer>
    </div>
  );
};

export default Home;
// This Home component serves as the landing page for the Brahma Kumaris Quiz Portal.
