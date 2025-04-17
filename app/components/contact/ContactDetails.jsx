"use client";

const ContactDetails = () => {
  return (
    <div className="text-white space-y-8 bg-amber-300">
      <h3 className="text-2xl font-medium mb-6">Contact Details</h3>

      {/* Name */}
      <div className="flex items-start">
        <span className="text-[#A4A4A4] text-sm w-8 flex-shrink-0">01</span>
        <div>
          <p className="text-[#A4A4A4] text-sm mb-1">Name</p>
          <p className="text-lg">Dennis Snellenberg</p>
        </div>
      </div>

      {/* Phone */}
      <div className="flex items-start">
        <span className="text-[#A4A4A4] text-sm w-8 flex-shrink-0">02</span>
        <div>
          <p className="text-[#A4A4A4] text-sm mb-1">Phone</p>
          <p className="text-lg">+1 (123) 456-7890</p>
        </div>
      </div>

      {/* Email */}
      <div className="flex items-start">
        <span className="text-[#A4A4A4] text-sm w-8 flex-shrink-0">03</span>
        <div>
          <p className="text-[#A4A4A4] text-sm mb-1">Email</p>
          <p className="text-lg">hello@dennissnell.com</p>
        </div>
      </div>

      {/* Location */}
      <div className="flex items-start">
        <span className="text-[#A4A4A4] text-sm w-8 flex-shrink-0">04</span>
        <div>
          <p className="text-[#A4A4A4] text-sm mb-1">Based in</p>
          <p className="text-lg">Amsterdam, Netherlands</p>
        </div>
      </div>

      {/* Social Links (optional) */}
      <div className="flex items-start pt-4">
        <span className="text-[#A4A4A4] text-sm w-8 flex-shrink-0">05</span>
        <div className="flex space-x-6">
          <a href="#" className="hover:text-[#A4A4A4] transition-colors">
            Twitter
          </a>
          <a href="#" className="hover:text-[#A4A4A4] transition-colors">
            LinkedIn
          </a>
          <a href="#" className="hover:text-[#A4A4A4] transition-colors">
            Dribbble
          </a>
        </div>
      </div>
    </div>
  );
};

export default ContactDetails;
