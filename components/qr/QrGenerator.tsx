'use client';

import React, { useState } from 'react';
import { generateQRCode } from '@/lib/qr';

const QrGenerator = () => {
  const [inputValue, setInputValue] = useState('');
  const [qrCodeUrl, setQrCodeUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async () => {
    if (!inputValue.trim()) {
      setError('Please enter text or a URL');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const url = await generateQRCode(inputValue);
      setQrCodeUrl(url);
    } catch (err) {
      console.error('Error generating QR code:', err);
      setError('Failed to generate QR code. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleGenerate();
    }
  };

  const handleDownload = () => {
    if (qrCodeUrl) {
      const link = document.createElement('a');
      link.href = qrCodeUrl;
      link.download = `qr-code-${Date.now()}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <div className="container mx-auto p-3 md:p-6 lg:p-8">
      <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">Scan for Instant Guidance</h2>
      <div className="h-1 w-20 bg-primary mx-auto mb-8"></div>
       <p className="text-gray-500 text-lg text-center pb-7">Scan once to get immediate access to essential information.
        No friction, no delays—just<br></br> instant connectivity.</p>
      <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100 flex flex-col lg:flex-row min-h-[600px]">

        {/* Input Section */}
        <div className="w-full lg:w-1/2 p-8 md:p-12 flex flex-col justify-center bg-white relative z-10">
          <div className="max-w-md mx-auto w-full space-y-8">
            <div className="text-center lg:text-left space-y-2">
              <h2 className="text-4xl font-extrabold text-gray-900 tracking-tight">
                QR Code <span className="text-green-600">Generator</span>
              </h2>
              <p className="text-gray-500 text-lg">
                Create customized QR codes instantly.
              </p>
            </div>

            <div className="space-y-6">
              <div className="space-y-2">
                <label htmlFor="qr-input" className="text-sm font-semibold text-gray-700 ml-1">
                  Target URL or Text
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                    </svg>
                  </div>
                  <input
                    id="qr-input"
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="https://example.com"
                    className="block w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-green-500 transition-all duration-200"
                  />
                </div>
              </div>

              {error && (
                <div className="p-4 rounded-xl bg-red-50 border border-red-100 flex items-start space-x-3">
                  <svg className="w-5 h-5 text-red-500 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <p className="text-sm text-red-600 font-medium">{error}</p>
                </div>
              )}

              <button
                onClick={handleGenerate}
                disabled={isLoading || !inputValue.trim()}
                className="w-full py-4 px-6 bg-green-600 hover:bg-green-700 text-white text-lg font-bold rounded-xl shadow-lg hover:shadow-green-500/30 transform hover:-translate-y-0.5 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex justify-center items-center space-x-2"
              >
                {isLoading ? (
                  <>
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span>Generating...</span>
                  </>
                ) : (
                  <>
                    <span>Generate QR Code</span>
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Result Section */}
        <div className="w-full lg:w-1/2 bg-gray-900 p-8 md:p-12 flex flex-col items-center justify-center relative overflow-hidden min-h-[400px] lg:min-h-auto">
          {/* Background Effects */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-green-500/10 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl -ml-20 -mb-20 pointer-events-none"></div>

          <div className="relative z-10 w-full max-w-sm">
            {qrCodeUrl ? (
              <div className="animate-in fade-in zoom-in duration-500 slide-in-from-bottom-4">
                <div className="bg-white/10 backdrop-blur-xl border border-white/20 p-6 rounded-2xl shadow-2xl">
                  <div className="bg-white p-4 rounded-xl shadow-inner aspect-square flex items-center justify-center mb-6">
                    <img
                      src={qrCodeUrl}
                      alt={`QR Code for ${inputValue}`}
                      className="w-full h-full object-contain"
                    />
                  </div>

                  <div className="space-y-4">
                    <div className="bg-black/20 rounded-lg p-3">
                      <p className="text-gray-300 text-xs font-mono text-center break-all line-clamp-2">
                        {inputValue}
                      </p>
                    </div>

                    <button
                      onClick={handleDownload}
                      className="w-full py-3 px-4 bg-white hover:bg-gray-50 text-gray-900 font-bold rounded-xl transition-colors flex items-center justify-center space-x-2 shadow-lg"
                    >
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                      </svg>
                      <span>Download PNG</span>
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center space-y-6 opacity-60">
                <div className="w-24 h-24 bg-white/5 rounded-2xl mx-auto flex items-center justify-center border border-white/10">
                  <svg className="w-12 h-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">Ready to Generate</h3>
                  <p className="text-gray-400">Enter your text or URL to see the QR code here.</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default QrGenerator;