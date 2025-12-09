const NavBar = () => {
  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav className="bg-white shadow-sm fixed top-0 w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <span 
              onClick={() => window.location.href="/"} 
              className="text-xl font-bold text-blue-600 cursor-pointer"
            >
              Portfolio
            </span>
          </div>
          <div className="hidden md:flex space-x-8">
            <button 
              onClick={() => scrollToSection("about")} 
              className="text-gray-700 hover:text-blue-600 transition duration-200 font-medium"
            >
              About
            </button>
            <button 
              onClick={() => scrollToSection("projects")} 
              className="text-gray-700 hover:text-blue-600 transition duration-200 font-medium"
            >
              Projects
            </button>
            <button 
              onClick={() => scrollToSection("clients")} 
              className="text-gray-700 hover:text-blue-600 transition duration-200 font-medium"
            >
              Clients
            </button>
            <button 
              onClick={() => scrollToSection("contact")} 
              className="text-gray-700 hover:text-blue-600 transition duration-200 font-medium"
            >
              Contact
            </button>
            <button 
              onClick={() => window.location.href="/admin/login"} 
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-200"
            >
              Admin
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
