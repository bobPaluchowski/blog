const Footer = () => {
  return (
    <footer className="bg-gray-100 dark:bg-gray-800 py-4">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center text-gray-600 dark:text-gray-300">
        © {new Date().getFullYear()} SystemSeventy7. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
