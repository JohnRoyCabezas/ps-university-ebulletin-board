import React from "react";
import NavBar from "../components/Navbar";
import shake from "../images/shake.svg";
import presentation from "../images/presentation.svg";
import networking from "../images/networking.svg";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Pagination, Navigation } from "swiper";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate('/login');
  }
  return (
    <div>
      <NavBar />
      <div className="container mx-auto grid grid-cols-5 gap-4 mt-[25vh]">
        <div className="col-span-3">
          <div className="space-y-2">
            <Swiper
              spaceBetween={30}
              centeredSlides={true}
              autoplay={{
                delay: 2500,
                disableOnInteraction: false,
              }}
              pagination={{
                clickable: true,
              }}
              navigation={true}
              modules={[Autoplay, Pagination, Navigation]}
              className="mySwiper"
            >
              <SwiperSlide>
                <img
                  className="object-fill w-full h-96"
                  src={shake}
                  alt="slide 1"
                />
              </SwiperSlide>
              <SwiperSlide>
                <img
                  className="object-fill w-full h-96"
                  src={presentation}
                  alt="slide 2"
                />
              </SwiperSlide>
              <SwiperSlide>
                <img
                  className="object-fill w-full h-96"
                  src={networking}
                  alt="slide 3"
                />
              </SwiperSlide>
            </Swiper>
          </div>
        </div>
        <div className="col-span-2 mt-5">
          <div>
            <h5 className="font-bold text-6xl">UNIVERSITY</h5>
            <h4 className="font-bold text-4xl">E-BULLETIN BOARD</h4>
          </div>
          <p className="mt-7">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud Lorem ipsum dolor sit amet,
            consectetur adipiscing
          </p>
          <div className="mt-12">
            <p className="mb-5">Already enrolled?</p>
            <button
              onClick={handleClick}
              className="bg-gray-300 hover:ring-1 ring-regal-blue text-regal-blue text-center py-1 px-9 rounded"
            >
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default LandingPage;