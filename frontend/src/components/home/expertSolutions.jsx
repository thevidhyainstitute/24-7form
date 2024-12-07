import React from "react";

const ExpertSolutions = () => {
  return (
    <>
      {/* Main Section */}
      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col-reverse lg:flex-row items-center gap-16 md:gap-0">
          {/* Left Image with Circle Design */}
          <div className="relative flex-1 flex justify-center mb-8 sm:mb-0">
            <div className="relative w-72 h-72 sm:w-96 sm:h-96">
              <img
                src="https://images.squarespace-cdn.com/content/v1/647e19832ff041718f9f0756/1708063029128-ZLSJ66BRHH1UZTAF9F57/Why+Professional+Pest+Control+Services+are+Vital+for+Homes.jpg"
                alt="Pest control service"
                className="w-full h-full rounded-full object-cover border-4 border-green-500"
              />
              <div className="absolute -bottom-10 -left-10 w-36 h-36 bg-green-500 rounded-full"></div>
            </div>
          </div>

          {/* Right Content */}
          <div className="flex-1 text-center sm:text-left px-4 lg:px-8">
            <h2 className="text-sm text-green-500 font-semibold uppercase mb-2">
              Who we are
            </h2>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-800 mb-6 leading-snug">
              Protect your home with our expert solutions.
            </h1>
            <p className="text-gray-600 text-lg md:text-xl mb-6">
              Neque mauris dis tempus volutpat fringilla. Enim hendrerit
              nascetur viverra fermentum efficitur mi. Metus aliquam suscipit
              pede maecenas mi nibh pellentesque morbi ut.
            </p>

            {/* List in two columns */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-left text-gray-800 mb-6">
              {[
                "Extensive Experience",
                "Holistic Approach",
                "Superior Customer Service",
                "Cutting-Edge Technology",
                "Flexibility and Affordability",
                "Results Guarantee",
                "Trusted Reputation",
              ].map((item, index) => (
                <div key={index} className="flex items-center justify-center">
                  <svg
                    className="w-5 h-5 text-green-500 mr-2"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  {item}
                </div>
              ))}
            </div>

            <button className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-full shadow-lg transition duration-300">
              Discover More
              <svg
                className="w-5 h-5 ml-2 hidden sm:block"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Vision Section */}
      <div className="bg-gradient-to-r from-green-400 to-blue-400 py-20 px-4 md:px-0 sm:px-8 lg:px-16 flex flex-col lg:flex-row justify-between items-center">
        {/* Text Content */}
        <div className="max-w-[32rem] mx-auto flex-1 text-center sm:text-left px-4 sm:px-0">
          <h1 className="text-4xl sm:text-4xl lg:text-4xl font-bold text-white mb-4 max-w-[80%] mx-auto sm:mx-0">
            Protect your home with our expert solutions.
          </h1>
          <p className="text-white mb-8 text-lg sm:text-xl leading-relaxed">
            Sollicitudin mus morbi mi proin tincidunt felis nullam augue lorem
            dolor fames netus sit fusce.
          </p>
        </div>

        {/* Vision & Mission Cards */}
        <div className="flex flex-wrap gap-8 flex-col items-center sm:flex-row justify-center lg:justify-start max-w-[40rem] w-full lg:mt-0">
          {/* Vision Card */}
          <div className="bg-white p-8 sm:p-10 border rounded-md flex-1 max-w-[300px] mx-4">
            <h2 className="text-2xl font-bold text-black mb-4 text-center">
              Our Vision
            </h2>
            <p className="text-black text-center text-sm sm:text-base">
              Auctor vulputate libero dolor fames ex etiam tristique eu faucibus
              quis aenean puris nullam non.
            </p>
          </div>

          {/* Mission Card */}
          <div className="bg-white p-8 sm:p-10 border rounded-md flex-1 max-w-[300px] mx-4">
            <h2 className="text-2xl font-bold text-black mb-4 text-center">
              Our Mission
            </h2>
            <p className="text-black text-center text-sm sm:text-base">
              Auctor vulputate libero dolor fames ex etiam tristique eu faucibus
              quis aenean puris nullam non.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default ExpertSolutions;
