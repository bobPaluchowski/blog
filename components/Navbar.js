import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Moon, Sun, Github, Linkedin } from 'lucide-react';

const Navbar = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    // You would implement the actual theme switching logic here
  };

  return (
    <nav className="sticky top-0 z-10 bg-white dark:bg-gray-800 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <Link href="/">
              <Image src="/images/logo.jpg" alt="Dupa" width={40} height={40} className="rounded-full" />
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <Link href="https://github.com" className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white">
              <Github size={24} />
            </Link>
            <Link href="https://upwork.com" className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white">
              <img src="/api/placeholder/24/24" alt="Upwork" className="w-6 h-6" />
            </Link>
            <Link href="https://linkedin.com" className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white">
              <Linkedin size={24} />
            </Link>
            <button
              onClick={toggleTheme}
              className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white focus:outline-none"
            >
              {isDarkMode ? <Sun size={24} /> : <Moon size={24} />}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
