import React from 'react';
import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center px-6 relative z-10 text-center">
      <div className="bg-brand-white/[0.02] border border-brand-white/[0.05] rounded-3xl p-12 backdrop-blur-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-900/[0.05] blur-3xl rounded-full -translate-y-1/2 translate-x-1/4 pointer-events-none" />
        <h1 className="text-8xl font-display text-brand-white font-bold mb-4">404</h1>
        <h2 className="text-2xl font-display text-brand-gray-300 mb-6">Page Not Found</h2>
        <p className="text-brand-gray-500 mb-8 max-w-sm mx-auto">
          The page you are looking for does not exist or has been moved.
        </p>
        <Link 
          to="/" 
          className="inline-flex items-center justify-center px-6 py-3 bg-brand-white text-brand-black text-sm font-medium rounded-xl hover:bg-brand-gray-300 transition-colors"
        >
          Return Home
        </Link>
      </div>
    </div>
  );
}
