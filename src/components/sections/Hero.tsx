import React from 'react';
import { Dna } from 'lucide-react';
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const navigate = useNavigate();

  const handleLaunchClick = () => {
    navigate("/dapp"); // Navigate to /app
  };
  return (
    <div className="relative min-h-screen flex items-center">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-50 to-blue-50" />
      
      {/* Content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-5xl md:text-6xl font-bold leading-tight">
              <span className="bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent">
                Empowering the Future
              </span>
              {' '}of Biological Assets with NFTs
            </h1>
            <p className="mt-6 text-xl text-gray-600 leading-relaxed">
              BioNFTs bridge the gap between biological innovation and decentralized ownership through tokenized data solutions.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-4">
              <button onClick={handleLaunchClick} className="bg-gradient-to-r from-purple-600 to-blue-500 text-white px-8 py-4 rounded-full text-lg font-semibold hover:opacity-90 transition-opacity">
                Launch DApp
              </button>
              {/* <button className="border-2 border-purple-600 text-purple-600 px-8 py-4 rounded-full text-lg font-semibold hover:bg-purple-50 transition-colors">
                Learn More
              </button> */}
            </div>
          </div>
          
          <div className="relative">
            <div className="w-full h-[500px] rounded-2xl bg-gradient-to-br from-purple-500/10 to-blue-500/10 backdrop-blur-xl border border-white/20 p-8 flex items-center justify-center">
              <Dna size={240} className="text-purple-500 animate-pulse" />
            </div>
            
            {/* Floating elements */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-purple-500/10 rounded-full blur-2xl" />
            <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;