import React from "react";

const pestServices = [
  {
    title: "Pest Control",
    image:
      "https://media.istockphoto.com/id/1341381731/photo/pest-control-exterminator-man-spraying-termite-pesticide.jpg?s=612x612&w=0&k=20&c=o_RC_X5IauOWChr8Kv4xVCHk_LusNNwIQJOt6Mihj4g=",
    description:
      "Accumsan iaculis dictumst morbi eros laoreet cursus. Viverra orci sem eu tincidunt et sagittis eras leo faucibus dictum convallis.",
    linkText: "Learn more",
  },
  {
    title: "Termite Control",
    image:
      "https://content.app-sources.com/s/40574786550593908/uploads/Backgrounds/AdobeStock_411971550-scaled.jpeg-7540256.webp",
    description:
      "Accumsan iaculis dictumst morbi eros laoreet cursus. Viverra orci sem eu tincidunt et sagittis eras leo faucibus dictum convallis.",
    linkText: "Learn more",
  },
  {
    title: "Bed Bug Control",
    image: "https://cdn.dubaiclean.com/uploads/2023/01/untitled-design-51.jpg",
    description:
      "Accumsan iaculis dictumst morbi eros laoreet cursus. Viverra orci sem eu tincidunt et sagittis eras leo faucibus dictum convallis.",
    linkText: "Learn more",
  },
  {
    title: "Mosquito Control",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS9ZrCI9Rz9dYPQYRo69n7dt63B4eyMiFTBXoVcrUjLvvcTKQk71IrKrATcxi0o0_p4-6E&usqp=CAU",
    description:
      "Accumsan iaculis dictumst morbi eros laoreet cursus. Viverra orci sem eu tincidunt et sagittis eras leo faucibus dictum convallis.",
    linkText: "Learn more",
  },
  {
    title: "Rodent Control",
    image:
      "https://img.freepik.com/premium-photo/side-view-man-doing-pest-control_107420-29689.jpg?semt=ais_hybrid",
    description:
      "Accumsan iaculis dictumst morbi eros laoreet cursus. Viverra orci sem eu tincidunt et sagittis eras leo faucibus dictum convallis.",
    linkText: "Learn more",
  },
  {
    title: "Commercial Services",
    image:
      "https://cpcindia.in/wp-content/uploads/2017/02/How-often-should-pest-control-be-done-min-840x562.png",
    description:
      "Accumsan iaculis dictumst morbi eros laoreet cursus. Viverra orci sem eu tincidunt et sagittis eras leo faucibus dictum convallis.",
    linkText: "Learn more",
  },
];

const PestSolutions = () => {
  return (
    <div className="bg-gray-100 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h2 className="text-sm text-green-500 font-semibold uppercase mb-2">
            What We Offer
          </h2>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-800 mb-3 max-w-[80%] mx-auto">
            Get rid of unwanted pests!
          </h1>
          <p className="text-gray-600 mb-12 max-w-3xl mx-auto text-lg sm:text-xl leading-relaxed">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit
            tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.
          </p>
        </div>

        {/* Service Grid Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {pestServices.map((service, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col h-full"
            >
              {/* Image Section */}
              <img
                src={service.image}
                alt={service.title}
                className="w-full h-[200px] object-cover"
              />
              {/* Text Content */}
              <div className="p-6 flex flex-col flex-grow">
                <h2 className="text-2xl font-bold text-green-600 mb-2 text-center">
                  {service.title}
                </h2>
                <p className="text-gray-600 mb-4 flex-grow text-center text-sm sm:text-base">
                  {service.description}
                </p>
                <a
                  href="#"
                  className="mt-auto text-blue-500 font-semibold text-center hover:underline"
                >
                  {service.linkText}
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PestSolutions;