import React from 'react';

export default function Display({ expr, ans, error }) {
  return (
    <div className="relative bg-white p-4 rounded-lg shadow-md">
      {/* ANS value in the top-left corner */}
      <div className="absolute top-2 left-2 text-gray-500 text-sm">
        ANS: {ans}
      </div>
      {/* Expression */}
      <div className="text-right text-gray-700 text-lg">{expr || '0'}</div>
      {/* Error message */}
      {error && <div className="text-red-500 text-sm text-right">{error}</div>}
    </div>
  );
}