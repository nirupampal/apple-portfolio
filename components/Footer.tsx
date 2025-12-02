// components/Footer.tsx
import { FaGithub, FaLinkedin } from 'react-icons/fa';

export default function Footer() {
  return (
    // FOOTER: Informative & Light
    <footer className="py-8 bg-white dark:bg-gray-900 text-center text-sm text-gray-500 dark:text-gray-400 border-t border-gray-100 dark:border-gray-800">
        <div className="flex justify-center space-x-6 mb-3">
          {/* Social Links */}
          <a href="https://linkedin.com/in/yourprofile" target="_blank" rel="noopener noreferrer" className="hover:text-gray-700 dark:hover:text-gray-200 transition-colors" aria-label="LinkedIn">
            <FaLinkedin className="w-5 h-5" />
          </a>
          <a href="https://github.com/yourusername" target="_blank" rel="noopener noreferrer" className="hover:text-gray-700 dark:hover:text-gray-200 transition-colors" aria-label="GitHub">
            <FaGithub className="w-5 h-5" />
          </a>
        </div>
        <p className="text-xs">&copy; {new Date().getFullYear()} Nirupam Pal. All Rights Reserved.</p>
        <p className="text-xs mt-1">Design inspired by Apple Inc.</p>
    </footer>
  );
}