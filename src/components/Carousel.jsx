import React from 'react'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

const Carousel = () => {
    const carouselImages = [
    "https://i.pinimg.com/736x/ff/a5/fe/ffa5fe03badced94ce0c0a33d51cfcac.jpg",
    "https://i.pinimg.com/736x/b0/f4/02/b0f40236efeac1176545b4f656b44728.jpg",
    "https://i.pinimg.com/736x/78/06/df/7806dfec5befd72670ca66b60355b989.jpg",
    "https://i.pinimg.com/736x/55/ad/59/55ad59f476ed96c7d96d287e0538b660.jpg"
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
  )
}

export default Carousel