// components/Header.tsx
'use client'; // Required for using useState and client-side interactions

import Link from 'next/link';
import { IoLogoApple, IoMenu, IoClose } from 'react-icons/io5';
import { useState } from 'react';

// Define the structure for navigation items, including an optional dropdown
const navItems = [
  { name: 'Home', href: '/' },
  { 
    name: 'Work', 
    href: '#', 
    dropdown: [
      { name: 'Featured Projects', href: '#projects' },
      { name: 'Case Studies', href: '#studies' },
      { name: 'Technologies', href: '#skills' },
    ] 
  },
  { name: 'About', href: '#about' },
  { name: 'Contact', href: '#contact' },
];

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  const handleDropdownToggle = (name: string) => {
    setActiveDropdown(activeDropdown === name ? null : name);
  };
  
  // Custom styled link component for better reuse and hover effects
  const NavLink = ({ href, children, ...props }: { href: string; children: React.ReactNode; [key: string]: any }) => (
    <Link 
      href={href} 
      className="text-sm font-light tracking-wide text-gray-800 dark:text-gray-100 hover:text-blue-500 transition-colors duration-200 py-1"
      {...props}
    >
      {children}
    </Link>
  );

  return (
    <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-3xl bg-white/70 dark:bg-gray-900/70 shadow-sm transition-shadow duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-12 flex items-center justify-between">
        
        {/* Left: Logo/Name */}
        <NavLink href="/" className="text-lg font-semibold tracking-tight">    Nirupam Pal
        </NavLink>
        
        {/* Center: Desktop Navigation Links with Dropdown */}
        <nav className="hidden lg:flex space-x-8 text-sm font-medium h-full">
          {navItems.map((item) => (
            <div
              key={item.name}
              className="relative flex items-center h-full"
              onMouseEnter={() => item.dropdown && setActiveDropdown(item.name)}
              onMouseLeave={() => item.dropdown && setActiveDropdown(null)}
            >
              <NavLink href={item.href} onClick={() => item.dropdown && handleDropdownToggle(item.name)}>
                {item.name}
              </NavLink>

              {/* Dropdown Menu (Conceptual Styling) */}
              {item.dropdown && activeDropdown === item.name && (
                <div className="absolute top-full mt-2 w-56 p-2 rounded-lg shadow-2xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 animate-fadeInUp">
                  {item.dropdown.map((subItem) => (
                    <Link
                      key={subItem.name}
                      href={subItem.href}
                      className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-md transition-colors duration-150"
                      onClick={() => setActiveDropdown(null)} // Close on click
                    >
                      {subItem.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>

        {/* Right: CTA and Mobile Button */}
        <div className="flex items-center space-x-4">
          <a 
            href="#contact"
            className="hidden sm:inline-flex text-xs px-3 py-1 bg-gray-700 text-white rounded-full hover:bg-gray-600 transition-colors duration-200 transform hover:scale-[1.02]"
          >
            Get In Touch
          </a>
          
          {/* Mobile Menu Button */}
          <button
            onClick={toggleMobileMenu}
            className="lg:hidden text-gray-800 dark:text-gray-100 p-1"
            aria-expanded={isMobileMenuOpen}
            aria-label="Toggle navigation"
          >
            {isMobileMenuOpen ? <IoClose className="w-6 h-6" /> : <IoMenu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Content */}
      <div 
        className={`lg:hidden overflow-hidden transition-all duration-500 ease-in-out ${
          isMobileMenuOpen ? 'max-h-96 opacity-100 py-4' : 'max-h-0 opacity-0'
        } bg-white/90 dark:bg-gray-900/90 border-t border-gray-200 dark:border-gray-800`}
      >
        <nav className="flex flex-col space-y-2 px-6">
          {navItems.map((item) => (
            <div key={item.name}>
                <Link 
                    href={item.href} 
                    className="block py-2 text-base font-medium text-gray-800 dark:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-md transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                >
                    {item.name}
                </Link>
                {/* Mobile Dropdown items can be handled here if needed */}
            </div>
          ))}
        </nav>
      </div>
      
      {/* Required Tailwind Animation Keyframes in globals.css (Conceptual) */}
      <style jsx global>{`
        /* Add this to your globals.css or ensure it's loaded */
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeInUp {
          animation: fadeInUp 0.3s ease-out forwards;
        }
      `}</style>
    </header>
  );
}