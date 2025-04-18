"use client";

export default function About() {
  return (
    <main className="w-full h-full relative bg-[#1C1D20]">
      {/* Content Sections */}
      <article className="w-full h-full px-10 py-10 relative z-[5]">
        {/* First Section */}
        <section
          className="w-full h-[100vh] flex flex-col justify-center items-center"
          aria-labelledby="section1-heading"
        >
          <h1
            id="section1-heading"
            className="text-7xl font-bold text-[#dfbb1c] mouse-animate-scale"
          >
            About Our Company
          </h1>
          <p className="sr-only">Introduction to our company</p>
        </section>

        {/* Second Section */}
        <section
          className="w-full h-[100vh] flex flex-col justify-center items-center"
          aria-labelledby="section2-heading"
        >
          <h1
            id="section2-heading"
            className="text-7xl font-bold text-[#0adfcd] mouse-animate-hidden"
          >
            Our Mission
          </h1>
          <p className="sr-only">Details about our company mission</p>
        </section>

        {/* Third Section */}
        <section
          className="w-full h-[100vh] flex flex-col justify-center items-center"
          aria-labelledby="section3-heading"
        >
          <h1
            id="section3-heading"
            className="text-7xl font-bold text-[#9b0d9b] mouse-animate-color"
          >
            Our Values
          </h1>
          <p className="sr-only">Core values of our company</p>
        </section>
      </article>
    </main>
  );
}
