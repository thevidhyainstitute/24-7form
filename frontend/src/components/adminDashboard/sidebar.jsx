import React, { useState } from "react";
import {
  FaTachometerAlt,
  FaRegFileAlt,
  FaTable,
  FaChartBar,
  FaIcons,
  FaUser,
  FaBook,
  FaBars,
  FaTimes
} from "react-icons/fa";
import { Link } from "react-router-dom";

const Sidebar = ({ userDetails }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Hamburger Menu for Mobile */}
      <div className="lg:hidden">
        <button
          onClick={toggleSidebar}
          className="text-black focus:outline-none lg:hidden fixed top-[1.4rem] right-4 z-50 p-2 rounded-md"
        >
          <div className="w-6 h-0.5 bg-black mb-2"></div>
          <div className="w-6 h-0.5 bg-black mb-2"></div>
          <div className="w-6 h-0.5 bg-black"></div>
        </button>
      </div>

      {/* Overlay for Mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-40 md:hidden"
          onClick={toggleSidebar}
        />
      )}

      {/* Sidebar */}
      <div
  className={` 
    fixed mt-[1rem] top-0 left-0 w-64 bg-white text-gray-800 shadow-md rounded-lg 
    transform transition-transform duration-300 ease-in-out z-50 border
    ${isOpen ? 'translate-x-0' : '-translate-x-full'}
    md:relative md:translate-x-0 md:block
    overflow-y-auto
    flex flex-col
  `}
>
  {/* Profile Section */}
  <div className="flex flex-col px-6 py-4 bg-blue-500 border rounded-lg">
    <div className="flex items-center">
      <div>
        <h2 className="font-semibold text-white text-lg">{userDetails?.name}</h2>
        <p className="text-sm text-white">{userDetails?.email}</p>
      </div>
    </div>
  </div>

  {/* Navigation Section */}
  <div className="mt-4 flex-1 overflow-y-auto">
    <nav>
      <ul>
        <Link to="/admin-dashboard" onClick={toggleSidebar}>
          <li className="flex items-center text-gray-600 hover:bg-gray-100 hover:text-gray-900 p-4 rounded-lg cursor-pointer space-x-3">
            <FaTachometerAlt className="text-blue-500 text-lg" />
            <span>Dashboard</span>
          </li>
        </Link>

        <Link to="/admin-dashboard/create-technician" onClick={toggleSidebar}>
          <li className="flex items-center text-gray-600 hover:bg-gray-100 hover:text-gray-900 p-4 rounded-lg cursor-pointer space-x-3">
            <FaRegFileAlt className="text-orange-500 text-lg" />
            <span>Create Technician</span>
          </li>
        </Link>

        {/* Other menu items */}
        <li className="flex items-center text-gray-600 hover:bg-gray-100 hover:text-gray-900 p-4 rounded-lg cursor-pointer space-x-3">
          <FaRegFileAlt className="text-green-500 text-lg" />
          <span>Basic UI Elements</span>
        </li>
        <li className="flex items-center text-gray-600 hover:bg-gray-100 hover:text-gray-900 p-4 rounded-lg cursor-pointer space-x-3">
          <FaTable className="text-purple-500 text-lg" />
          <span>Tables</span>
        </li>
        <li className="flex items-center text-gray-600 hover:bg-gray-100 hover:text-gray-900 p-4 rounded-lg cursor-pointer space-x-3">
          <FaChartBar className="text-red-500 text-lg" />
          <span>Charts</span>
        </li>
        <li className="flex items-center text-gray-600 hover:bg-gray-100 hover:text-gray-900 p-4 rounded-lg cursor-pointer space-x-3">
          <FaIcons className="text-pink-500 text-lg" />
          <span>Icons</span>
        </li>
        <li className="flex items-center text-gray-600 hover:bg-gray-100 hover:text-gray-900 p-4 rounded-lg cursor-pointer space-x-3">
          <FaUser className="text-teal-500 text-lg" />
          <span>User Pages</span>
        </li>
        <li className="flex items-center text-gray-600 hover:bg-gray-100 hover:text-gray-900 p-4 rounded-lg cursor-pointer space-x-3">
          <FaBook className="text-indigo-500 text-lg" />
          <span>Documentation</span>
        </li>
      </ul>
    </nav>
  </div>
</div>
    </>
  );
};

export default Sidebar;
