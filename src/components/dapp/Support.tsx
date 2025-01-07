import React from 'react';
import { MessageCircle, Mail, FileQuestion } from 'lucide-react';

const Support = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h2 className="text-2xl font-bold mb-6">Support Center</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-md">
          <MessageCircle className="h-8 w-8 text-purple-600 mb-4" />
          <h3 className="text-lg font-semibold mb-2">Live Chat</h3>
          <p className="text-gray-600 mb-4">Get instant help from our support team</p>
          <button className="w-full px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors">
            Start Chat
          </button>
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow-md">
          <Mail className="h-8 w-8 text-purple-600 mb-4" />
          <h3 className="text-lg font-semibold mb-2">Email Support</h3>
          <p className="text-gray-600 mb-4">Send us your questions or concerns</p>
          <button className="w-full px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors">
            Contact Us
          </button>
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow-md">
          <FileQuestion className="h-8 w-8 text-purple-600 mb-4" />
          <h3 className="text-lg font-semibold mb-2">FAQ</h3>
          <p className="text-gray-600 mb-4">Browse our frequently asked questions</p>
          <button className="w-full px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors">
            View FAQs
          </button>
        </div>
      </div>
    </div>
  );
};

export default Support;