import React, { useState } from "react";
import { Link } from "react-router-dom";
import ContactCard from "./ContactCard";

const ContactList = ({ contacts, getContactId }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [genderFilter, setGenderFilter] = useState("All");
  const [viewMode, setViewMode] = useState("grid"); // 'grid' or 'list'

  const deleteContactHandler = (id) => {
    if (window.confirm("Are you sure you want to delete this profile?")) {
      getContactId(id);
    }
  };

  const filteredContacts = contacts.filter((contact) => {
    const term = searchTerm.toLowerCase();
    const matchesSearch =
      (contact.name && contact.name.toLowerCase().includes(term)) ||
      (contact.email && contact.email.toLowerCase().includes(term)) ||
      (contact.role && contact.role.toLowerCase().includes(term)) ||
      (contact.phone && contact.phone.toLowerCase().includes(term));

    const matchesGender =
      genderFilter === "All" || contact.gender === genderFilter;

    return matchesSearch && matchesGender;
  });

  const maleCount = contacts.filter((c) => c.gender === "Male").length;
  const femaleCount = contacts.filter((c) => c.gender === "Female").length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
      {/* Impressive Hero Stats Banner */}
      <div className="bg-gradient-to-r from-slate-950 via-indigo-950 to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-2xl mb-8 relative overflow-hidden">
        <div className="absolute right-0 top-0 translate-x-12 -translate-y-12 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl"></div>
        <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div>
            <span className="px-3 py-1 rounded-full text-xs font-extrabold tracking-widest uppercase bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 mb-3 inline-block">
              Directory Dashboard
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
              Enterprise Profile Directory
            </h2>
            <p className="text-sm font-medium text-slate-300 mt-1 max-w-xl">
              Manage complete member profiles with mandatory verification, roles, contact details, and gender metrics.
            </p>
          </div>

          {/* Quick Metrics */}
          <div className="grid grid-cols-3 gap-3 bg-white/10 backdrop-blur-md p-3.5 rounded-2xl border border-white/10">
            <div className="text-center px-3 py-1">
              <span className="block text-2xl font-black text-white">{contacts.length}</span>
              <span className="text-[10px] font-bold text-slate-300 uppercase">Total</span>
            </div>
            <div className="text-center px-3 py-1 border-x border-white/10">
              <span className="block text-2xl font-black text-blue-400">{maleCount}</span>
              <span className="text-[10px] font-bold text-slate-300 uppercase">Male</span>
            </div>
            <div className="text-center px-3 py-1">
              <span className="block text-2xl font-black text-pink-400">{femaleCount}</span>
              <span className="text-[10px] font-bold text-slate-300 uppercase">Female</span>
            </div>
          </div>
        </div>
      </div>

      {/* Toolbar & Search Controls */}
      <div className="bg-white rounded-2xl p-4 sm:p-6 border border-slate-200 shadow-xl mb-8 space-y-4 md:space-y-0 md:flex md:items-center md:justify-between">
        {/* Search Input */}
        <div className="relative flex-1 max-w-lg">
          <i className="fa-solid fa-magnifying-glass absolute left-4 top-3.5 text-slate-400 text-sm"></i>
          <input
            type="text"
            placeholder="Search by name, @gmail.com, role, phone..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-11 pr-10 py-3 text-sm font-semibold rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm("")}
              className="absolute right-3.5 top-3.5 text-slate-400 hover:text-slate-600"
            >
              <i className="fa-solid fa-xmark text-sm"></i>
            </button>
          )}
        </div>

        {/* Filters & View Toggle */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Gender Select Filter */}
          <div className="relative">
            <select
              value={genderFilter}
              onChange={(e) => setGenderFilter(e.target.value)}
              className="pl-4 pr-9 py-2.5 text-sm font-bold rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 bg-white text-slate-800 cursor-pointer appearance-none"
            >
              <option value="All">All Genders</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Non-binary">Non-binary</option>
              <option value="Other">Other</option>
            </select>
            <i className="fa-solid fa-chevron-down absolute right-3.5 top-3.5 text-slate-400 text-xs pointer-events-none"></i>
          </div>

          {/* View Mode Toggle */}
          <div className="flex bg-slate-100 p-1 rounded-xl border border-slate-200">
            <button
              onClick={() => setViewMode("grid")}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                viewMode === "grid"
                  ? "bg-white text-indigo-600 shadow-sm"
                  : "text-slate-500 hover:text-slate-800"
              }`}
              title="Grid View"
            >
              <i className="fa-solid fa-grip mr-1.5"></i> Grid
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                viewMode === "list"
                  ? "bg-white text-indigo-600 shadow-sm"
                  : "text-slate-500 hover:text-slate-800"
              }`}
              title="List View"
            >
              <i className="fa-solid fa-list mr-1.5"></i> Table
            </button>
          </div>

          {/* Add Profile CTA */}
          <Link
            to="/add"
            className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-xl text-sm font-extrabold text-white bg-indigo-600 hover:bg-indigo-500 shadow-lg shadow-indigo-500/20 transition-all active:scale-95"
          >
            <i className="fa-solid fa-plus text-xs"></i>
            <span>Add Profile</span>
          </Link>
        </div>
      </div>

      {/* Directory Content */}
      {filteredContacts.length > 0 ? (
        viewMode === "grid" ? (
          /* Grid Layout */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredContacts.map((contact) => (
              <ContactCard
                contact={contact}
                clickHander={deleteContactHandler}
                key={contact.id}
              />
            ))}
          </div>
        ) : (
          /* Table / List View Layout */
          <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-900 text-white text-xs font-extrabold uppercase tracking-wider">
                    <th className="py-4 px-6">Member Profile</th>
                    <th className="py-4 px-6">Email Address</th>
                    <th className="py-4 px-6">Phone</th>
                    <th className="py-4 px-6">Gender</th>
                    <th className="py-4 px-6">Age / DOB</th>
                    <th className="py-4 px-6 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-sm font-semibold text-slate-700">
                  {filteredContacts.map((contact) => (
                    <tr
                      key={contact.id}
                      className="hover:bg-slate-50/80 transition-colors"
                    >
                      <td className="py-4 px-6">
                        <div className="flex items-center space-x-3">
                          <img
                            src={
                              contact.avatar ||
                              `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(
                                contact.name
                              )}`
                            }
                            alt={contact.name}
                            className="w-11 h-11 rounded-xl object-cover border-2 border-indigo-200 bg-white shadow-sm"
                          />
                          <div>
                            <Link
                              to={{
                                pathname: `/contact/${contact.id}`,
                                state: { contact },
                              }}
                              className="text-base font-black text-slate-900 hover:text-indigo-600 block"
                            >
                              {contact.name}
                            </Link>
                            <span className="text-xs font-bold text-slate-500">
                              {contact.role || "Team Member"}
                            </span>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-6 text-slate-800 font-bold">
                        {contact.email}
                      </td>
                      <td className="py-4 px-6">{contact.phone}</td>
                      <td className="py-4 px-6">
                        <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-indigo-50 text-indigo-700 border border-indigo-200">
                          {contact.gender}
                        </span>
                      </td>
                      <td className="py-4 px-6">
                        <span className="block font-bold">{contact.age} Yrs</span>
                        <span className="text-xs text-slate-400">{contact.dob}</span>
                      </td>
                      <td className="py-4 px-6 text-right space-x-2">
                        <Link
                          to={{
                            pathname: `/contact/${contact.id}`,
                            state: { contact },
                          }}
                          className="px-3 py-1.5 rounded-lg bg-indigo-50 hover:bg-indigo-100 text-indigo-600 text-xs font-extrabold inline-block transition-colors"
                        >
                          View
                        </Link>
                        <Link
                          to={{
                            pathname: `/edit`,
                            state: { contact },
                          }}
                          className="px-3 py-1.5 rounded-lg bg-amber-50 hover:bg-amber-100 text-amber-700 text-xs font-extrabold inline-block transition-colors"
                        >
                          Edit
                        </Link>
                        <button
                          onClick={() => deleteContactHandler(contact.id)}
                          className="px-3 py-1.5 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-600 text-xs font-extrabold inline-block transition-colors"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )
      ) : (
        /* Empty State */
        <div className="text-center py-16 bg-white rounded-3xl border border-slate-200 shadow-xl max-w-lg mx-auto p-6">
          <div className="w-16 h-16 bg-indigo-50 rounded-2xl flex items-center justify-center mx-auto mb-4 text-indigo-600 text-2xl">
            <i className="fa-solid fa-users-slash"></i>
          </div>
          <h3 className="text-xl font-black text-slate-900 mb-1">
            No Profiles Found
          </h3>
          <p className="text-sm font-medium text-slate-500 mb-6">
            No member profiles match your current search parameters.
          </p>
          <button
            onClick={() => {
              setSearchTerm("");
              setGenderFilter("All");
            }}
            className="px-5 py-2.5 rounded-xl text-sm font-bold text-indigo-600 bg-indigo-50 hover:bg-indigo-100 transition-colors"
          >
            Reset Filters
          </button>
        </div>
      )}
    </div>
  );
};

export default ContactList;
