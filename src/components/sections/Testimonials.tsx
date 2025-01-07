import React from 'react';
import { Quote } from 'lucide-react';

const testimonials = [
  {
    quote: "BioNFTs has revolutionized how we monetize our research findings. The platform's ease of use and security features are outstanding.",
    author: "Dr. Sarah Chen",
    role: "Lead Researcher, GenomeTech Institute"
  },
  {
    quote: "As an investor, BioNFTs opened up entirely new opportunities in the biotech space. The transparency and liquidity are game-changing.",
    author: "Michael Rodriguez",
    role: "Biotech Investment Fund Manager"
  },
  {
    quote: "The platform's compliance tools have made it incredibly simple to tokenize and trade biological assets while maintaining regulatory standards.",
    author: "Dr. James Wilson",
    role: "Biotechnology Patent Holder"
  }
];

const Testimonials = () => {
  return (
    <section id="testimonials" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-4xl font-bold text-gray-900">What Our Users Say</h2>
          <p className="mt-4 text-xl text-gray-600">Trusted by leading researchers and investors</p>
        </div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="relative">
              <div className="bg-gray-50 p-8 rounded-2xl">
                <Quote className="w-8 h-8 text-purple-500 mb-4" />
                <p className="text-gray-600 italic mb-6">{testimonial.quote}</p>
                <div>
                  <p className="font-semibold text-gray-900">{testimonial.author}</p>
                  <p className="text-sm text-gray-500">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
export default Testimonials