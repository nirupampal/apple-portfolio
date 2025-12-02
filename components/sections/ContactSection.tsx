// components/sections/ContactSection.tsx

export default function ContactSection() {
  return (
    // 4. CONTACT SECTION: Minimalist CTA
    <section id="contact" className="py-24 bg-white dark:bg-gray-900 transition-colors duration-500">
      <div className="max-w-4xl mx-auto px-6 text-center border-t border-b border-gray-200 dark:border-gray-800 py-16">
        <h2 className="text-4xl md:text-6xl font-extrabold tracking-tighter mb-4 text-gray-900 dark:text-white">
          Have a Project?
        </h2>
        <p className="text-xl text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto font-light">
          I'm currently accepting new opportunities for ambitious digital products. Let's build something exceptional.
        </p>

        <a 
          href="mailto:your_email@example.com" // Update your email here
          className="inline-flex items-center space-x-2 px-10 py-4 bg-blue-600 text-white text-xl font-semibold rounded-lg hover:bg-blue-700 transition-all duration-300 transform hover:scale-[1.02] shadow-xl shadow-blue-500/40"
        >
          Say Hello
        </a>
      </div>
    </section>
  );
}