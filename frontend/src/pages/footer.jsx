import React from "react";

const Footer = () => {
  return (
    <footer className="bg-blue-900 text-gray-300 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        
        {/* Left Side: Page Name and Transaction Information */}

        <div className="flex flex-col items-center">
          <img
            src="./24x7-pestControl.png"
            alt="pest-control"
            className="h-32"
          />
          <p>Transaction ID: #123456789</p>

        </div>

        {/* Social Media Links (Center) */}
        <div className="mt-6 flex flex-col items-center">
          <p>Website: <span>bugblock.com</span></p>
          <p>Best solutions for pest control</p>

          {/* Instagram Link Below Website and Description */}
          <p className="mt-2">
            📸 Instagram: <span>instagram.com/bugblock</span>
          </p>
        </div>

        {/* Right Side: Contact Information */}
        <div>
          <p>📍 123 Main Street, City Center, NY</p>
          <p>📧 support@bugblock.com</p>
          <p>☎️ +1 800-123-4567</p>
        </div>

      </div>

      {/* Copyright */}
      <div className="text-center mt-8 text-gray-500 text-sm">
        © 2024 BugBlock. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
