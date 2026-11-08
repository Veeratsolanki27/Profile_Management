import React, { useState } from "react";
import { useHistory, useLocation, Link } from "react-router-dom";

const EditContact = ({ updateContactHandler }) => {
  const history = useHistory();
  const location = useLocation();
  const contactToEdit = location.state?.contact || {};

  const [formData, setFormData] = useState({
    id: contactToEdit.id || "",
    name: contactToEdit.name || "",
    email: contactToEdit.email || "",
    phone: contactToEdit.phone || "",
    gender: contactToEdit.gender || "Male",
    age: contactToEdit.age || "",
    dob: contactToEdit.dob || "",
    role: contactToEdit.role || "",
    avatar: contactToEdit.avatar || "",
  });

  const [errors, setErrors] = useState({});

  const validateEmail = (email) => {
    const gmailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
    return gmailRegex.test(email.trim());
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        setErrors((prev) => ({
          ...prev,
          avatar: "Image size must be under 2MB",
        }));
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({ ...prev, avatar: reader.result }));
        if (errors.avatar) {
          setErrors((prev) => ({ ...prev, avatar: null }));
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      const updated = { ...prev, [name]: value };

      if (name === "dob" && value) {
        const birthDate = new Date(value);
        const today = new Date();
        let age = today.getFullYear() - birthDate.getFullYear();
        const m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
          age--;
        }
        if (age >= 0) updated.age = age;
      }

      return updated;
    });

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = "Full Name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email address is required";
    } else if (!validateEmail(formData.email)) {
      newErrors.email = "Email MUST end with @gmail.com (e.g. user@gmail.com)";
    }
    if (!formData.phone.trim()) newErrors.phone = "Phone number is required";
    if (!formData.role.trim()) newErrors.role = "Role/Job Title is required";
    if (!formData.gender) newErrors.gender = "Gender selection is required";
    if (!formData.dob) newErrors.dob = "Date of Birth is required";
    if (!formData.age) newErrors.age = "Age is required";
    if (!formData.avatar) newErrors.avatar = "Profile Picture is required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    updateContactHandler({
      ...formData,
      email: formData.email.trim(),
    });

    history.push("/");
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      {/* Page Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <span className="px-3 py-1 rounded-full text-xs font-extrabold tracking-wider uppercase bg-amber-100 text-amber-800 mb-2 inline-block">
            Edit Mode
          </span>
          <h2 className="text-3xl font-extrabold bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-800 bg-clip-text text-transparent">
            Update Profile Details
          </h2>
          <p className="text-sm font-medium text-slate-500 mt-1">
            All fields below are mandatory.
          </p>
        </div>
        <Link
          to="/"
          className="inline-flex items-center space-x-2 text-sm font-bold text-slate-600 hover:text-indigo-600 px-4 py-2 rounded-xl bg-white border border-slate-200 shadow-sm hover:shadow-md transition-all"
        >
          <i className="fa-solid fa-arrow-left"></i>
          <span>Back</span>
        </Link>
      </div>

      {/* Form Card */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden">
        <form onSubmit={handleSubmit} className="p-6 md:p-8 space-y-6">
          {/* Avatar File Upload */}
          <div className="p-6 bg-gradient-to-br from-indigo-50/50 via-slate-50 to-purple-50/30 rounded-2xl border-2 border-dashed border-indigo-200 text-center">
            <div className="flex flex-col items-center">
              <div className="relative mb-3 group">
                <img
                  src={
                    formData.avatar ||
                    `https://api.dicebear.com/7.x/avataaars/svg?seed=${
                      formData.name ? encodeURIComponent(formData.name) : "default"
                    }`
                  }
                  alt="Profile Preview"
                  className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-xl bg-white"
                />
                <label
                  htmlFor="avatarUploadEdit"
                  className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-indigo-600 text-white flex items-center justify-center cursor-pointer shadow-lg hover:bg-indigo-500 transition-transform active:scale-95"
                  title="Choose image file from local device"
                >
                  <i className="fa-solid fa-camera text-xs"></i>
                </label>
              </div>

              <label htmlFor="avatarUploadEdit" className="cursor-pointer">
                <span className="text-sm font-extrabold text-indigo-600 hover:text-indigo-700 underline underline-offset-4">
                  Change Profile Picture from Local Device
                </span>
                <span className="text-rose-500 font-bold ml-1">*</span>
              </label>
              <input
                id="avatarUploadEdit"
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />
              <p className="text-xs text-slate-400 mt-1">
                PNG, JPG, or WEBP (Max 2MB)
              </p>

              {errors.avatar && (
                <p className="text-xs text-rose-500 mt-2 font-bold flex items-center bg-rose-50 px-3 py-1 rounded-lg border border-rose-200">
                  <i className="fa-solid fa-circle-exclamation mr-1.5"></i> {errors.avatar}
                </p>
              )}
            </div>
          </div>

          {/* Form Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Full Name */}
            <div>
              <label className="block text-sm font-bold text-slate-800 mb-1.5">
                Full Name <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <i className="fa-solid fa-user absolute left-3.5 top-3.5 text-slate-400 text-sm"></i>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`w-full pl-10 pr-4 py-3 text-sm font-semibold rounded-xl border ${
                    errors.name ? "border-rose-500 bg-rose-50/40" : "border-slate-300"
                  } focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all`}
                />
              </div>
              {errors.name && (
                <p className="text-xs text-rose-500 mt-1.5 font-bold flex items-center">
                  <i className="fa-solid fa-circle-exclamation mr-1"></i> {errors.name}
                </p>
              )}
            </div>

            {/* Email (Mandatory @gmail.com) */}
            <div>
              <label className="block text-sm font-bold text-slate-800 mb-1.5">
                Email Address <span className="text-rose-500">* (@gmail.com)</span>
              </label>
              <div className="relative">
                <i className="fa-solid fa-envelope absolute left-3.5 top-3.5 text-slate-400 text-sm"></i>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full pl-10 pr-4 py-3 text-sm font-semibold rounded-xl border ${
                    errors.email ? "border-rose-500 bg-rose-50/40" : "border-slate-300"
                  } focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all`}
                />
              </div>
              {errors.email ? (
                <p className="text-xs text-rose-500 mt-1.5 font-bold flex items-center">
                  <i className="fa-solid fa-circle-exclamation mr-1"></i> {errors.email}
                </p>
              ) : (
                <p className="text-xs text-emerald-600 mt-1 font-semibold">
                  <i className="fa-solid fa-circle-check mr-1"></i> Format: @gmail.com required
                </p>
              )}
            </div>

            {/* Phone Number */}
            <div>
              <label className="block text-sm font-bold text-slate-800 mb-1.5">
                Phone Number <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <i className="fa-solid fa-phone absolute left-3.5 top-3.5 text-slate-400 text-sm"></i>
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className={`w-full pl-10 pr-4 py-3 text-sm font-semibold rounded-xl border ${
                    errors.phone ? "border-rose-500 bg-rose-50/40" : "border-slate-300"
                  } focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all`}
                />
              </div>
              {errors.phone && (
                <p className="text-xs text-rose-500 mt-1.5 font-bold flex items-center">
                  <i className="fa-solid fa-circle-exclamation mr-1"></i> {errors.phone}
                </p>
              )}
            </div>

            {/* Role / Job Title */}
            <div>
              <label className="block text-sm font-bold text-slate-800 mb-1.5">
                Role / Job Title <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <i className="fa-solid fa-briefcase absolute left-3.5 top-3.5 text-slate-400 text-sm"></i>
                <input
                  type="text"
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  className={`w-full pl-10 pr-4 py-3 text-sm font-semibold rounded-xl border ${
                    errors.role ? "border-rose-500 bg-rose-50/40" : "border-slate-300"
                  } focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all`}
                />
              </div>
              {errors.role && (
                <p className="text-xs text-rose-500 mt-1.5 font-bold flex items-center">
                  <i className="fa-solid fa-circle-exclamation mr-1"></i> {errors.role}
                </p>
              )}
            </div>

            {/* Gender */}
            <div>
              <label className="block text-sm font-bold text-slate-800 mb-1.5">
                Gender <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <i className="fa-solid fa-venus-mars absolute left-3.5 top-3.5 text-slate-400 text-sm"></i>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  className={`w-full pl-10 pr-4 py-3 text-sm font-semibold rounded-xl border ${
                    errors.gender ? "border-rose-500 bg-rose-50/40" : "border-slate-300"
                  } focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all bg-white`}
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Non-binary">Non-binary</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              {errors.gender && (
                <p className="text-xs text-rose-500 mt-1.5 font-bold flex items-center">
                  <i className="fa-solid fa-circle-exclamation mr-1"></i> {errors.gender}
                </p>
              )}
            </div>

            {/* Date of Birth */}
            <div>
              <label className="block text-sm font-bold text-slate-800 mb-1.5">
                Date of Birth <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <i className="fa-solid fa-calendar-days absolute left-3.5 top-3.5 text-slate-400 text-sm"></i>
                <input
                  type="date"
                  name="dob"
                  value={formData.dob}
                  onChange={handleChange}
                  className={`w-full pl-10 pr-4 py-3 text-sm font-semibold rounded-xl border ${
                    errors.dob ? "border-rose-500 bg-rose-50/40" : "border-slate-300"
                  } focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all bg-white`}
                />
              </div>
              {errors.dob && (
                <p className="text-xs text-rose-500 mt-1.5 font-bold flex items-center">
                  <i className="fa-solid fa-circle-exclamation mr-1"></i> {errors.dob}
                </p>
              )}
            </div>

            {/* Age */}
            <div>
              <label className="block text-sm font-bold text-slate-800 mb-1.5">
                Age <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <i className="fa-solid fa-hashtag absolute left-3.5 top-3.5 text-slate-400 text-sm"></i>
                <input
                  type="number"
                  name="age"
                  value={formData.age}
                  onChange={handleChange}
                  min="1"
                  max="120"
                  className={`w-full pl-10 pr-4 py-3 text-sm font-semibold rounded-xl border ${
                    errors.age ? "border-rose-500 bg-rose-50/40" : "border-slate-300"
                  } focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all`}
                />
              </div>
              {errors.age && (
                <p className="text-xs text-rose-500 mt-1.5 font-bold flex items-center">
                  <i className="fa-solid fa-circle-exclamation mr-1"></i> {errors.age}
                </p>
              )}
            </div>
          </div>

          {/* Submission Bar */}
          <div className="flex items-center justify-between pt-6 border-t border-slate-100">
            <p className="text-xs font-semibold text-rose-500">
              * All fields are strictly mandatory
            </p>
            <div className="flex items-center space-x-3">
              <Link
                to="/"
                className="px-5 py-2.5 rounded-xl text-sm font-bold text-slate-600 hover:bg-slate-100 transition-colors"
              >
                Cancel
              </Link>
              <button
                type="submit"
                className="px-6 py-3 rounded-xl text-sm font-extrabold text-white bg-gradient-to-r from-indigo-600 via-indigo-700 to-purple-700 hover:from-indigo-500 hover:to-purple-600 shadow-xl shadow-indigo-600/30 active:scale-95 transition-all"
              >
                <i className="fa-solid fa-floppy-disk mr-2"></i> Update Profile
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditContact;
