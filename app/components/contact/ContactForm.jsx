"use client";

import { useState } from "react";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    organization: "",
    services: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log(formData);
    // You can add your form submission logic here
  };

  return (
    <form onSubmit={handleSubmit} className="w-full space-y-8 bg-blue-600">
      {/* Name Field */}
      <div className="relative">
        <span className="text-[#A4A4A4] text-sm mb-2 block">01</span>
        <label htmlFor="name" className="block text-white mb-2">
          What's your name? <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          className="w-full bg-transparent border-b border-[#3D3E42] py-3 text-white focus:border-white focus:outline-none"
          placeholder="John Doe"
        />
      </div>

      {/* Email Field */}
      <div className="relative">
        <span className="text-[#A4A4A4] text-sm mb-2 block">02</span>
        <label htmlFor="email" className="block text-white mb-2">
          What's your email? <span className="text-red-500">*</span>
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          className="w-full bg-transparent border-b border-[#3D3E42] py-3 text-white focus:border-white focus:outline-none"
          placeholder="john@doe.com"
        />
      </div>

      {/* Organization Field */}
      <div className="relative">
        <span className="text-[#A4A4A4] text-sm mb-2 block">03</span>
        <label htmlFor="organization" className="block text-white mb-2">
          What's the name of your organization?
        </label>
        <input
          type="text"
          id="organization"
          name="organization"
          value={formData.organization}
          onChange={handleChange}
          className="w-full bg-transparent border-b border-[#3D3E42] py-3 text-white focus:border-white focus:outline-none"
          placeholder="John & Doe ®"
        />
      </div>

      {/* Services Field */}
      <div className="relative">
        <span className="text-[#A4A4A4] text-sm mb-2 block">04</span>
        <label htmlFor="services" className="block text-white mb-2">
          What services are you looking for?
        </label>
        <input
          type="text"
          id="services"
          name="services"
          value={formData.services}
          onChange={handleChange}
          className="w-full bg-transparent border-b border-[#3D3E42] py-3 text-white focus:border-white focus:outline-none"
          placeholder="Web Design, Web Development ..."
        />
      </div>

      {/* Message Field */}
      <div className="relative">
        <span className="text-[#A4A4A4] text-sm mb-2 block">05</span>
        <label htmlFor="message" className="block text-white mb-2">
          Your message <span className="text-red-500">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          required
          rows="4"
          className="w-full bg-transparent border-b border-[#3D3E42] py-3 text-white focus:border-white focus:outline-none"
          placeholder="Hello Dennis, can you help me with ..."
        />
      </div>

      {/* Submit Button */}
      <div className="pt-8">
        <button
          type="submit"
          className="px-8 py-4 bg-white text-[#1C1D20] font-medium rounded-full hover:bg-opacity-90 transition-all"
        >
          Send Message
        </button>
      </div>
    </form>
  );
};

export default ContactForm;
