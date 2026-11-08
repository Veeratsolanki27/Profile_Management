import React from "react";
import { Link } from "react-router-dom";

const Header = ({ totalContacts = 0 }) => {
  return (
    <header className="sticky top-0 z-50 bg-slate-900/90 backdrop-blur-md border-b border-slate-800 text-white shadow-lg mb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & App Name */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 p-0.5 shadow-md shadow-indigo-500/20 group-hover:scale-105 transition-transform duration-200">
              <div className="w-full h-full bg-slate-900 rounded-[10px] flex items-center justify-center">
                <i className="fa-solid fa-address-book text-indigo-400 text-lg"></i>
              </div>
            </div>
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-white via-slate-100 to-indigo-200 bg-clip-text text-transparent">
                Profile Hub
              </h1>
              <p className="text-xs text-indigo-400 font-medium">Enterprise Directory</p>
            </div>
          </Link>

          {/* Action Button */}
          <div className="flex items-center space-x-4">
            <Link
              to="/add"
              className="inline-flex items-center space-x-2 px-4 py-2 rounded-xl text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 shadow-lg shadow-indigo-600/30 hover:shadow-indigo-500/40 transition-all duration-200"
            >
              <i className="fa-solid fa-user-plus text-xs"></i>
              <span>Add Profile</span>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
