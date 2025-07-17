

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-300 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {/* Company Info */}
          <div>
            <h2 className="text-2xl font-bold text-gray-800">JobPortal</h2>
            <p className="text-gray-600 mt-2">Find your dream job with us.</p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800">Quick Links</h3>
            <ul className="mt-2 space-y-2">
              <li><a href="#" className="text-gray-600 hover:text-blue-500 transition">Home</a></li>
              <li><a href="#" className="text-gray-600 hover:text-blue-500 transition">Jobs</a></li>
              <li><a href="#" className="text-gray-600 hover:text-blue-500 transition">Companies</a></li>
              <li><a href="#" className="text-gray-600 hover:text-blue-500 transition">Contact</a></li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800">Follow Us</h3>
            <div className="flex space-x-4 mt-2">
              <a href="#" className="text-gray-600 hover:text-blue-500 transition">
                <i className="fab fa-facebook text-xl"></i>
              </a>
              <a href="#" className="text-gray-600 hover:text-blue-500 transition">
                <i className="fab fa-twitter text-xl"></i>
              </a>
              <a href="#" className="text-gray-600 hover:text-blue-500 transition">
                <i className="fab fa-linkedin text-xl"></i>
              </a>
              <a href="#" className="text-gray-600 hover:text-blue-500 transition">
                <i className="fab fa-instagram text-xl"></i>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-10 border-t border-gray-300 pt-5 text-center text-sm text-gray-600">
          <p>&copy; 2025 JobPortal. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
