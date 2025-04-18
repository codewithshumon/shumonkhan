"use client";

export default function Home() {
  return (
    <main className="w-full h-full relative bg-[#1C1D20]">
      {/* Hero and Content Sections */}
      <article className="w-full h-full px-10 py-10 relative z-[5]">
        {/* Hero Section */}
        <section
          className="w-full h-[100vh] flex flex-col justify-center items-center"
          aria-labelledby="hero-heading"
        >
          <h1
            id="hero-heading"
            className="text-7xl font-bold text-[#dfbb1c] mouse-animate-scale"
          >
            Welcome to Our Creative Studio
          </h1>
          <p className="sr-only">
            Innovative digital solutions for your business
          </p>
        </section>

        {/* Services Section */}
        <section
          className="w-full h-[100vh] flex flex-col justify-center items-center"
          aria-labelledby="services-heading"
        >
          <h1
            id="services-heading"
            className="text-7xl font-bold text-[#0adfcd] mouse-animate-hidden"
          >
            Our Premium Services
          </h1>
          <p className="sr-only">Discover our range of professional services</p>
        </section>

        {/* Portfolio Showcase */}
        <section
          className="w-full h-[100vh] flex flex-col justify-center items-center"
          aria-labelledby="portfolio-heading"
        >
          <h1
            id="portfolio-heading"
            className="text-7xl font-bold text-[#9b0d9b] mouse-animate-color"
          >
            Featured Work
          </h1>
          <p className="sr-only">Explore our successful projects</p>
        </section>
      </article>
    </main>
  );
}
