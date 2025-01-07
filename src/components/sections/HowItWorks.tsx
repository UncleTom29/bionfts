import React from 'react';
import { Wallet, ShoppingCart, Coins } from 'lucide-react';

const steps = [
  {
    icon: <Wallet className="w-12 h-12 text-purple-500" />,
    title: 'Connect Your Wallet',
    description: 'Connect your wallet and explore available BioNFTs in our marketplace.'
  },
  {
    icon: <ShoppingCart className="w-12 h-12 text-blue-500" />,
    title: 'Trade Assets',
    description: 'Buy, stake, or trade tokenized biological assets with full ownership rights.'
  },
  {
    icon: <Coins className="w-12 h-12 text-purple-500" />,
    title: 'Earn Rewards',
    description: 'Earn rewards and royalties from your tokenized biological assets.'
  }
];

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-4xl font-bold text-gray-900">How It Works</h2>
          <p className="mt-4 text-xl text-gray-600">Get started with BioNFTs in three simple steps</p>
        </div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
                <div className="flex justify-center">{step.icon}</div>
                <h3 className="mt-6 text-xl font-semibold text-gray-900 text-center">{step.title}</h3>
                <p className="mt-4 text-gray-600 text-center">{step.description}</p>
              </div>
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-1/2 -right-4 w-8 h-0.5 bg-gray-300" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default HowItWorks