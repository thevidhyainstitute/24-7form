import React from "react";

const Hero = () => {
  return (
    <div className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 flex flex-col-reverse lg:flex-row items-center">
        
        {/* Left Content */}
        <div className="flex-1 text-center sm:text-left px-4 lg:px-8">
          <h1 className="text-4xl md:text-5xl lg:text-5xl font-bold text-gray-800 mt-6 mb-6">
            Protect your home with our expert solutions.
          </h1>
          <p className="text-gray-600 text-lg md:text-xl mb-8">
            Keep your home safe from pests with customized solutions tailored to
            your needs. We offer reliable and efficient pest control services.
          </p>
          <button className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded shadow transition duration-300">
            Discover More
          </button>
        </div>

        {/* Right Image */}
        <div className="flex-1 flex justify-center mb-8 md:mb-0">
          <img
            src="https://images.squarespace-cdn.com/content/v1/647e19832ff041718f9f0756/1708063029128-ZLSJ66BRHH1UZTAF9F57/Why+Professional+Pest+Control+Services+are+Vital+for+Homes.jpg"
            alt="Pest control service"
            className="w-3/4 md:w-2/3 lg:w-full h-auto rounded-lg shadow-md"
          />
        </div>

      </div>
    </div>
  );
};

export default Hero;
