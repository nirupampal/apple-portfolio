// components/sections/AboutSection.tsx

export default function AboutSection() {
  return (
    // 3. ABOUT SECTION: Concise Professional Summary
    <section id="about" className="py-24 bg-gray-50 dark:bg-black/95 transition-colors duration-500">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <h2 className="text-5xl font-bold tracking-tight mb-4 text-gray-900 dark:text-white">
          Hello, I'm Nirupam.
        </h2>
        
        <div className="mt-12 space-y-8 text-lg md:text-xl text-gray-700 dark:text-gray-300 font-light">
          <p>
            My journey as a **Fullstack Developer** is rooted in solving complex problems with **elegant, simple code**. I believe the best user experiences are invisible—they just work. I thrive at the intersection of powerful Node.js backends and pixel-perfect React/Next.js interfaces.
          </p>
          <p>
            I have a deep passion for clean architecture, automated testing, and pushing the boundaries of web performance. Whether I’m optimizing a database query or crafting a custom hook, my goal is always the same: **deliver robust, beautiful, and maintainable software.**
          </p>
        </div>
        
        <div className="mt-16">
           <a 
              href="/resume.pdf" 
              className="inline-flex items-center space-x-2 px-6 py-2 border border-gray-900 dark:border-gray-100 text-gray-900 dark:text-gray-100 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-300"
              download
           >
              Download My Resume
           </a>
        </div>
      </div>
    </section>
  );
}