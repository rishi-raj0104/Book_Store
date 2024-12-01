import React from 'react';
import bannerImg from "../../assets/banner.png";

const Banner = () => {
  return (
    <div className="flex flex-col md:flex-row-reverse py-6 justify-between items-center gap-12 px-8 bg-gradient-to-l from-blue-50 to-blue-200 rounded-lg shadow-xl">
      <div className="md:w-1/2 w-full flex items-center md:justify-end">
        <img src={bannerImg} alt="Banner Image" className="max-w-full rounded-lg shadow-md"/>
      </div>
      <div className="md:w-1/2 w-full text-center md:text-left">
        <h1 className="md:text-5xl text-3xl font-semibold text-gray-900 mb-6 leading-tight">
          New Releases This Week
        </h1>
        <p className="text-lg text-gray-700 mb-8">
          It's time to update your reading list with some of the latest and greatest releases in the literary world. From heart-pumping thrillers to captivating memoirs, this week's new releases offer something for everyone.
        </p>
        <button className="bg-mainbutton text-white  px-6 py-3 rounded-lg hover:bg-slate-800 transition-colors duration-300 ease-in-out shadow-md">
          Subscribe
        </button>
      </div>
    </div>
  );
};

export default Banner;
