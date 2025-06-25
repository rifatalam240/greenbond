import React from "react";
import Banner from "../components/Banner";
import Featuredgardeners from "../components/Featuredgardeners";
import Trendingtips from "../components/Trendingtips";
import GardeningQuotes from "../components/GardeningQuotes";
import Lottie from "lottie-react";
import gardeningAnimation from "../assets/gardeninganimation.json";
import UpcomingEvents from "../context/UpcomingEvents";

const Home = () => {
  return (
    <div className="space-y-10">
      <div className="flex justify-center lg:min-h-[100vh]">
        <div className="w-72 md:w-96">
          <Lottie animationData={gardeningAnimation} loop={true} />
        </div>
      </div>
      <Banner />

      <Featuredgardeners />
      <Trendingtips />
      <UpcomingEvents />
      <GardeningQuotes />
    </div>
  );
};

export default Home;
