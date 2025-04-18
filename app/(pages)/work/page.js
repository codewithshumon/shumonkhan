"use client";

export default function Work() {
  return (
    <main className="w-full h-full relative bg-[#1C1D20]">
      {/* Portfolio Sections */}
      <article className="w-full h-full px-10 py-10 relative z-[5]">
        {/* Featured Project Section */}
        <section
          className="w-full h-[100vh] flex flex-col justify-center items-center"
          aria-labelledby="featured-project"
        >
          <h1
            id="featured-project"
            className="text-7xl font-bold text-[#dfbb1c] mouse-animate-scale"
          >
            Featured Project
          </h1>
          <p className="sr-only">Showcase of our most prominent work</p>
        </section>

        {/* Recent Work Section */}
        <section
          className="w-full h-[100vh] flex flex-col justify-center items-center"
          aria-labelledby="recent-work"
        >
          <h1
            id="recent-work"
            className="text-7xl font-bold text-[#0adfcd] mouse-animate-hidden"
          >
            Recent Projects
          </h1>
          <p className="sr-only">Collection of our latest client work</p>
        </section>

        {/* Case Studies Section */}
        <section
          className="w-full h-[100vh] flex flex-col justify-center items-center"
          aria-labelledby="case-studies"
        >
          <h1
            id="case-studies"
            className="text-7xl font-bold text-[#9b0d9b] mouse-animate-color"
          >
            Case Studies
          </h1>
          <p className="sr-only">
            Detailed breakdowns of our project successes
          </p>
        </section>
      </article>
    </main>
  );
}
