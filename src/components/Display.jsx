import React from 'react';

export default function Display({ expr, ans, error }) {
  return (
    <div className="bg-gray-100 rounded-lg p-3 min-h-[72px] flex flex-col justify-between">
      <div className="text-sm text-gray-500">ANS: <span className="font-medium">{ans}</span></div>
      <div className="text-right mt-1 break-words text-2xl font-mono">{expr || '0'}</div>
      {error && <div className="text-red-600 text-sm mt-2">{error}</div>}
    </div>
  );
}