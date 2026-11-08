import React from "react";
import { Link } from "react-router-dom";

const ContactCard = ({ contact, clickHander }) => {
  const { id, name, email, phone, gender, age, dob, role, avatar } = contact;

  const defaultAvatar = `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(
    name || "user"
  )}`;

  const genderBadgeColor =
    gender === "Male"
      ? "bg-blue-100 text-blue-800 border-blue-300"
      : gender === "Female"
      ? "bg-pink-100 text-pink-800 border-pink-300"
      : "bg-purple-100 text-purple-800 border-purple-300";

  return (
    <div className="bg-white rounded-3xl border border-slate-200/90 shadow-md hover:shadow-2xl transition-all duration-300 flex flex-col justify-between overflow-hidden group hover:-translate-y-1">
      {/* Top Banner Accent */}
      <div className="h-20 bg-gradient-to-r from-slate-900 via-indigo-950 to-purple-950 relative p-4">
        <div className="flex justify-between items-center">
          <span className="px-2.5 py-1 rounded-lg bg-white/10 backdrop-blur-md text-[11px] font-extrabold text-indigo-200 border border-white/10 tracking-wide uppercase">
            {role || "Member"}
          </span>
          <div className="flex space-x-2">
            <Link
              to={{ pathname: `/edit`, state: { contact } }}
              className="w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 backdrop-blur-md flex items-center justify-center text-white/90 hover:text-white transition-all"
              title="Edit Profile"
            >
              <i className="fa-solid fa-pen-to-square text-xs"></i>
            </Link>
            <button
              onClick={() => clickHander(id)}
              className="w-8 h-8 rounded-lg bg-rose-500/20 hover:bg-rose-500/40 backdrop-blur-md flex items-center justify-center text-rose-300 hover:text-white transition-all"
              title="Delete Profile"
            >
              <i className="fa-solid fa-trash text-xs"></i>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-6 pb-6 -mt-10 flex-1">
        {/* Avatar & Gender */}
        <div className="flex items-end justify-between mb-4">
          <div className="relative">
            <img
              src={avatar || defaultAvatar}
              alt={name}
              className="w-20 h-20 rounded-2xl object-cover border-4 border-white shadow-xl bg-slate-100 group-hover:scale-105 transition-transform duration-300"
              onError={(e) => {
                e.target.src = defaultAvatar;
              }}
            />
            <span className="absolute bottom-1 right-1 w-4 h-4 bg-emerald-500 border-2 border-white rounded-full"></span>
          </div>
          <span
            className={`px-3 py-1 rounded-full text-xs font-extrabold border ${genderBadgeColor}`}
          >
            {gender || "Unspecified"}
          </span>
        </div>

        {/* POPOUT NAME */}
        <div className="mb-4">
          <Link
            to={{ pathname: `/contact/${id}`, state: { contact } }}
            className="block text-xl font-black text-slate-900 group-hover:text-indigo-600 transition-colors line-clamp-1 tracking-tight"
          >
            {name}
          </Link>
          <p className="text-xs font-bold text-slate-500 mt-0.5">
            {role || "Team Member"}
          </p>
        </div>

        {/* Info Pill Badges */}
        <div className="space-y-2.5 pt-3 border-t border-slate-100 text-xs font-semibold text-slate-700">
          <div className="flex items-center space-x-2.5 bg-slate-50 p-2 rounded-xl border border-slate-100">
            <i className="fa-solid fa-envelope text-indigo-500 w-4 text-center"></i>
            <span className="truncate text-slate-800 font-bold">{email}</span>
          </div>

          <div className="flex items-center space-x-2.5 bg-slate-50 p-2 rounded-xl border border-slate-100">
            <i className="fa-solid fa-phone text-indigo-500 w-4 text-center"></i>
            <span className="truncate">{phone}</span>
          </div>

          <div className="grid grid-cols-2 gap-2 text-[11px] pt-1">
            <div className="bg-indigo-50/50 p-2 rounded-xl border border-indigo-100 text-indigo-900">
              <span className="text-slate-400 block text-[10px] uppercase font-bold">Age</span>
              <strong className="text-xs font-black">{age} Yrs</strong>
            </div>
            <div className="bg-indigo-50/50 p-2 rounded-xl border border-indigo-100 text-indigo-900">
              <span className="text-slate-400 block text-[10px] uppercase font-bold">DOB</span>
              <strong className="text-xs font-black truncate block">{dob}</strong>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Action */}
      <div className="px-6 py-3.5 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
        <Link
          to={{ pathname: `/contact/${id}`, state: { contact } }}
          className="w-full inline-flex items-center justify-center space-x-2 py-2 rounded-xl text-xs font-extrabold text-white bg-indigo-600 hover:bg-indigo-700 shadow-md shadow-indigo-500/20 transition-all"
        >
          <span>View Profile Details</span>
          <i className="fa-solid fa-arrow-right text-[10px]"></i>
        </Link>
      </div>
    </div>
  );
};

export default ContactCard;
