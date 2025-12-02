// components/sections/HeroSection.tsx
import Link from 'next/link';

export default function HeroSection() {
  return (
    // 1. HOME SECTION: Full-Screen, High-Impact
    <section 
      id="home" 
      className="relative h-screen flex flex-col justify-center items-center text-center pt-12 overflow-hidden bg-white dark:bg-black/95 transition-colors duration-500 border-b dark:border-gray-800"
    >
      <div className="z-10 px-6 max-w-5xl">
        <p className="text-xl md:text-2xl text-blue-600 dark:text-blue-400 font-medium tracking-wide mb-4 animate-fadeInUp delay-100">
          Introducing Nirupam Pal.
        </p>
        <h1 className="text-6xl md:text-8xl font-extrabold tracking-tighter text-gray-900 dark:text-white transition-colors duration-500 animate-fadeInUp delay-300">
          Crafting Digital Products That Define Experience.
        </h1>
        <p className="mt-8 text-lg md:text-xl text-gray-500 dark:text-gray-400 max-w-3xl mx-auto font-light animate-fadeInUp delay-500">
          I'm a Fullstack Developer specializing in **modern UIs** and **scalable backend solutions** using Next.js and Node.js.
        </p>

        <Link 
          href="#works" 
          className="mt-12 inline-flex items-center space-x-2 px-8 py-3 bg-gray-900 text-white dark:bg-gray-100 dark:text-gray-900 text-lg font-medium rounded-full transition-all duration-300 transform hover:scale-[1.03] shadow-xl hover:shadow-2xl animate-fadeInUp delay-700"
        >
          Explore My Work
        </Link>
      </div>
    </section>
  );
}