import React from 'react';

interface SpinnerProps {
  size?: 'small' | 'medium' | 'large';
}

const Spinner: React.FC<SpinnerProps> = ({ size = 'medium' }) => {
  const sizeClasses = {
    small: 'w-6 h-6 border-2',
    medium: 'w-10 h-10 border-3',
    large: 'w-16 h-16 border-4',
  };

  return (
    <div className="flex justify-center items-center">
      <div className={`${sizeClasses[size]} rounded-full border-blue-200 border-t-blue-500 animate-spin`}></div>
    </div>
  );
};

export default Spinner;