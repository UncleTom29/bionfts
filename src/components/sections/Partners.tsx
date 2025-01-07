import React from 'react';

const partners = [
  { name: 'GenomeTech Institute', logo: 'https://images.unsplash.com/photo-1624397630702-040cd1cd8c1f?auto=format&fit=crop&w=100&h=100&q=80' },
  { name: 'BioResearch Labs', logo: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&w=100&h=100&q=80' },
  { name: 'Global Biotech', logo: 'https://images.unsplash.com/photo-1579165466741-7f35e4755660?auto=format&fit=crop&w=100&h=100&q=80' },
  { name: 'Future Sciences', logo: 'https://images.unsplash.com/photo-1581093806997-124204d9fa9d?auto=format&fit=crop&w=100&h=100&q=80' }
];

const Partners = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900">Trusted Partners</h2>
          <p className="mt-4 text-gray-600">Working with leading institutions in biotech and blockchain</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center">
          {partners.map((partner, index) => (
            <div key={index} className="flex justify-center">
              <img
                src={partner.logo}
                alt={partner.name}
                className="h-16 w-16 object-contain filter grayscale hover:grayscale-0 transition-all"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Partners