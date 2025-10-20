import React, { useState } from 'react';

const UploadExcelPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white flex flex-col items-center justify-center p-4">
      <div className="bg-gray-800 bg-opacity-70 backdrop-filter backdrop-blur-lg rounded-xl shadow-2xl p-8 w-full max-w-4xl border border-gray-700">
        <h1 className="text-4xl font-bold text-center mb-8 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">
          Excel Data Uploader
        </h1>
        <div className="flex flex-col items-center justify-center space-y-4">
          <label htmlFor="excel-upload" className="flex items-center justify-center px-6 py-3 border border-gray-600 rounded-lg shadow-md cursor-pointer hover:bg-gray-700 transition-colors duration-300">
            <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"></path>
            </svg>
            <span className="text-lg font-medium">Upload Excel File</span>
            <input
              id="excel-upload"
              type="file"
              accept=".xlsx, .xls"
              className="hidden"
            />
          </label>
          {/* Progress Indicator */}
          <div className="w-full bg-gray-700 rounded-full h-2.5 mb-4">
            <div className="bg-blue-500 h-2.5 rounded-full" style={{ width: '0%' }}></div>
          </div>
        </div>

        {/* Data Tables */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-gray-700 bg-opacity-50 rounded-lg p-4">
            <h2 className="text-2xl font-semibold mb-4 text-blue-300">Bohol Data</h2>
            <div className="overflow-auto max-h-64 border border-gray-600 rounded-lg">
              <table className="min-w-full divide-y divide-gray-600">
                <thead className="bg-gray-700 sticky top-0">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Header 1</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Header 2</th>
                  </tr>
                </thead>
                <tbody className="bg-gray-800 divide-y divide-gray-700">
                  {/* Bohol Data Rows */}
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-200">Data 1</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-200">Data 2</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div className="bg-gray-700 bg-opacity-50 rounded-lg p-4">
            <h2 className="text-2xl font-semibold mb-4 text-purple-300">Cebu Data</h2>
            <div className="overflow-auto max-h-64 border border-gray-600 rounded-lg">
              <table className="min-w-full divide-y divide-gray-600">
                <thead className="bg-gray-700 sticky top-0">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Header A</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Header B</th>
                  </tr>
                </thead>
                <tbody className="bg-gray-800 divide-y divide-gray-700">
                  {/* Cebu Data Rows */}
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-200">Data A</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-200">Data B</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Section Buttons */}
        <div className="mt-8 flex justify-center space-x-4">
          <button className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg shadow-md text-white font-medium transition-colors duration-300">
            View Bohol
          </button>
          <button className="px-6 py-3 bg-purple-600 hover:bg-purple-700 rounded-lg shadow-md text-white font-medium transition-colors duration-300">
            View Cebu
          </button>
        </div>
      </div>
    </div>
  );
};

export default UploadExcelPage;
