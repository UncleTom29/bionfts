import React from 'react';
import { Database, Shield, Dna, Coins } from 'lucide-react';

const features = [
  {
    icon: <Dna className="w-12 h-12 text-purple-500" />,
    title: 'Tokenization of Biological Assets',
    description: 'Convert genomic data, patents, and research findings into tradeable digital assets on the blockchain.'
  },
  {
    icon: <Database className="w-12 h-12 text-blue-500" />,
    title: 'Decentralized Ownership',
    description: 'Enable transparent revenue sharing and ownership distribution through smart contracts.'
  },
  {
    icon: <Shield className="w-12 h-12 text-purple-500" />,
    title: 'Privacy & Compliance',
    description: 'Built-in tools ensuring secure data handling and regulatory compliance.'
  },
  {
    icon: <Coins className="w-12 h-12 text-blue-500" />,
    title: 'Cross-Chain Interoperability',
    description: 'Trade and utilize your BioNFTs seamlessly across multiple blockchain networks.'
  }
];

const Features = () => {
  return (
    <section id="features" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-4xl font-bold text-gray-900">
            Revolutionizing Biological Asset Management
          </h2>
          <p className="mt-4 text-xl text-gray-600">
            Discover how BioNFTs transform the way we handle biological data and assets
          </p>
        </div>

        <div className="mt-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="relative p-8 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow border border-gray-100"
            >
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-purple-500/5 to-blue-500/5 rounded-full blur-2xl" />
              
              <div className="relative">
                {feature.icon}
                <h3 className="mt-6 text-xl font-semibold text-gray-900">
                  {feature.title}
                </h3>
                <p className="mt-4 text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;