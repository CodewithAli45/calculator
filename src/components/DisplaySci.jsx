// src/components/Display.jsx
import React from 'react';

export default function Display({ input, result, error, showANS }) {
  return (
    <div className="p-4 bg-gray-900 rounded-2xl border border-gray-800 text-right text-white">
      {/* Top Row: ANS and Error */}
      <div className="flex justify-between items-start">
        {showANS && (
          <div className="text-xs text-gray-400">
            ANS: {result?.lastAns ?? '0'}
          </div>
        )}
        {error && (
          <div className="text-xs text-red-400">
            ⚠ {error}
          </div>
        )}
      </div>

      {/* Input Display */}
      <div className="mt-2 text-3xl sm:text-4xl font-mono break-words">
        {input || '0'}
      </div>

      {/* Result Display */}
      {result?.value !== undefined && (
        <div className="mt-1 text-sm text-gray-400">
          = {result.value}
        </div>
      )}
    </div>
  );
}
