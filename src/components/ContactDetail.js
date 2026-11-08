import React from "react";
import { Link, useLocation } from "react-router-dom";

const ContactDetail = () => {
  const location = useLocation();
  const contact = location.state?.contact || {};
  const { name, email, phone, gender, age, dob, role, avatar } = contact;

  const defaultAvatar = `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(
    name || "user"
  )}`;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Top Back Nav */}
      <div className="mb-6">
        <Link
          to="/"
          className="inline-flex items-center space-x-2 text-sm font-extrabold text-slate-700 hover:text-indigo-600 px-4 py-2 rounded-xl bg-white border border-slate-200 shadow-sm transition-all"
        >
          <i className="fa-solid fa-arrow-left"></i>
          <span>Back to Directory</span>
        </Link>
      </div>

      {/* Main Profile Card Container */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl overflow-hidden">
        {/* Rich & Vibrant Hero Header */}
        <div className="bg-gradient-to-r from-slate-950 via-indigo-950 to-purple-950 p-6 sm:p-10 text-white relative overflow-hidden">
          {/* Background Decorative Patterns */}
          <div className="absolute right-0 top-0 translate-x-10 -translate-y-10 w-72 h-72 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none"></div>
          <div className="absolute right-10 bottom-2 text-white/5 text-9xl font-black pointer-events-none select-none">
            <i className="fa-solid fa-id-card"></i>
          </div>

          {/* Header Action Bar */}
          <div className="flex items-center justify-between mb-8 relative z-10">
            <span className="px-3.5 py-1 rounded-full text-xs font-black uppercase tracking-widest bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center space-x-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse mr-1"></span>
              Verified Profile
            </span>
            <Link
              to={{ pathname: `/edit`, state: { contact } }}
              className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 backdrop-blur-md text-xs font-extrabold text-white border border-white/15 transition-all flex items-center space-x-2 shadow-lg"
            >
              <i className="fa-solid fa-pen-to-square"></i>
              <span>Edit Profile</span>
            </Link>
          </div>

          {/* Profile Hero Spotlight (Photo & Name Side-by-Side) */}
          <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-4 sm:space-y-0 sm:space-x-6 relative z-10">
            {/* UNCUT Photo Container */}
            <div className="relative shrink-0">
              <img
                src={avatar || defaultAvatar}
                alt={name}
                className="w-28 h-28 sm:w-36 sm:h-36 rounded-3xl object-cover border-4 border-white/20 shadow-2xl bg-white/10"
                onError={(e) => {
                  e.target.src = defaultAvatar;
                }}
              />
              <span className="absolute bottom-2 right-2 w-5 h-5 bg-emerald-500 border-2 border-white rounded-full"></span>
            </div>

            {/* Popout Name & Badges */}
            <div className="text-center sm:text-left pt-2">
              <span className="px-3 py-1 rounded-lg bg-indigo-500/30 text-indigo-200 text-xs font-extrabold tracking-wider uppercase border border-indigo-400/30 inline-block mb-2">
                {role || "Team Member"}
              </span>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight leading-tight">
                {name || "Unknown User"}
              </h1>
              <p className="text-sm font-semibold text-slate-300 mt-2 flex items-center justify-center sm:justify-start space-x-2">
                <i className="fa-solid fa-envelope text-indigo-400"></i>
                <span>{email}</span>
              </p>
            </div>
          </div>
        </div>

        {/* Profile Card Body Details */}
        <div className="p-6 sm:p-10">
          <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-6">
            Personal & Professional Metadata
          </h3>

          {/* Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Email */}
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-100">
              <div className="text-xs font-extrabold text-slate-400 uppercase tracking-wider mb-1 flex items-center space-x-2">
                <i className="fa-solid fa-envelope text-indigo-500"></i>
                <span>Mandatory @gmail.com Email</span>
              </div>
              <p className="text-base font-extrabold text-slate-900 flex items-center">
                {email}
                <i className="fa-solid fa-circle-check text-emerald-500 ml-2 text-sm" title="Verified Gmail"></i>
              </p>
            </div>

            {/* Phone */}
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-100">
              <div className="text-xs font-extrabold text-slate-400 uppercase tracking-wider mb-1 flex items-center space-x-2">
                <i className="fa-solid fa-phone text-indigo-500"></i>
                <span>Phone Number</span>
              </div>
              <p className="text-base font-extrabold text-slate-900">
                {phone}
              </p>
            </div>

            {/* Gender */}
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-100">
              <div className="text-xs font-extrabold text-slate-400 uppercase tracking-wider mb-1 flex items-center space-x-2">
                <i className="fa-solid fa-venus-mars text-indigo-500"></i>
                <span>Gender</span>
              </div>
              <p className="text-base font-extrabold text-slate-900">
                {gender}
              </p>
            </div>

            {/* Age */}
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-100">
              <div className="text-xs font-extrabold text-slate-400 uppercase tracking-wider mb-1 flex items-center space-x-2">
                <i className="fa-solid fa-cake-candles text-indigo-500"></i>
                <span>Age</span>
              </div>
              <p className="text-base font-extrabold text-slate-900">
                {age} Years Old
              </p>
            </div>

            {/* Date of Birth */}
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-100">
              <div className="text-xs font-extrabold text-slate-400 uppercase tracking-wider mb-1 flex items-center space-x-2">
                <i className="fa-solid fa-calendar-days text-indigo-500"></i>
                <span>Date of Birth</span>
              </div>
              <p className="text-base font-extrabold text-slate-900">
                {dob}
              </p>
            </div>

            {/* Role */}
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-100">
              <div className="text-xs font-extrabold text-slate-400 uppercase tracking-wider mb-1 flex items-center space-x-2">
                <i className="fa-solid fa-briefcase text-indigo-500"></i>
                <span>Role / Job Title</span>
              </div>
              <p className="text-base font-extrabold text-slate-900">
                {role}
              </p>
            </div>
          </div>

          {/* Action Footer */}
          <div className="mt-8 pt-6 border-t border-slate-100 flex items-center justify-between">
            <Link
              to="/"
              className="px-6 py-3 rounded-xl text-sm font-extrabold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors"
            >
              Back to Directory
            </Link>
            <Link
              to={{ pathname: `/edit`, state: { contact } }}
              className="px-6 py-3 rounded-xl text-sm font-extrabold text-white bg-indigo-600 hover:bg-indigo-500 transition-all shadow-lg shadow-indigo-500/20"
            >
              Edit Profile Details
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactDetail;
