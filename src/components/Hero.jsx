// Hero.jsx
import React from "react";

const Hero = () => {
  return (
    <section className="bg-blue-50 min-h-screen flex items-center">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-4xl sm:text-5xl font-bold text-blue-700 mb-4">
          Analyze Your Property & Nearby Points of Interest
        </h1>
        <p className="text-gray-700 text-lg sm:text-xl mb-8">
          Enter your address or property PIN, select an area, and get insights
          with a downloadable PDF report.
        </p>
        <a
          href="#property-form"
          className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg text-lg font-medium hover:bg-blue-700 transition"
        >
          Get Started
        </a>
      </div>
    </section>
  );
};

export default Hero;
