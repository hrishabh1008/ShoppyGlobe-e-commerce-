import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center animate-fade-in">
      <div className="relative mb-8">
        <div className="text-[120px] md:text-[180px] font-bold text-primary/10 tracking-wider">404</div>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="material-icons-round text-7xl md:text-8xl text-primary">sentiment_dissatisfied</span>
        </div>
      </div>
      
      <h1 className="text-3xl md:text-4xl font-bold text-secondary mb-4">Page Not Found</h1>
      <p className="text-lg text-gray-600 max-w-xl mb-12">
        The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
      </p>
      
      <Link 
        to="/" 
        className="btn btn-primary inline-flex items-center"
      >
        <span className="material-icons-round mr-2">home</span>
        Back to Home
      </Link>
    </div>
  );
};

export default NotFound; 