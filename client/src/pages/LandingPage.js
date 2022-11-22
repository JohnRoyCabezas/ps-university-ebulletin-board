import React, { useContext, useEffect } from "react";
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
import { UserContext } from "../utils/UserContext";

const LandingPage = () => {
  const {user} = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    !user
      ? navigate("/")
      : user?.role_user?.role_id === 2
      ? navigate("/adminannouncement")
      : navigate("/announcement");
  }, []);

  return (
    <div className="flex flex-col h-screen">
      <NavBar />
      <div className="flex h-full gap-x-2 px-5 justify-center items-center">
        <div className="w-2/3">
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
        <div className="w-1/3">
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
            <p className="mb-2">Already enrolled?</p>
            <button
              onClick={() => navigate("/login")}
              className="bg-gray-300 hover:ring-1 ring-regal-blue text-regal-blue text-center py-1 px-9 rounded"
            >
              Login
            </button>
          </div>
          <div className="mt-12">
            <p className="mb-2">Register your university here</p>
            <button
              onClick={() => navigate("/createuniversity")}
              className="bg-gray-300 hover:ring-1 ring-regal-blue text-regal-blue text-center py-1 px-9 rounded"
            >
              Create University
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default LandingPage;
