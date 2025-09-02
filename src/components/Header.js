import { createContext, useContext, useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import './Heeader.css';

export const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(localStorage.getItem('language') || 'en');

  useEffect(() => {
    const handleLangChange = () => {
      const newLang = localStorage.getItem('language') || 'en';
      setLanguage(newLang);
    };
    window.addEventListener('language-changed', handleLangChange);
    window.addEventListener('storage', handleLangChange);
    return () => {
      window.removeEventListener('language-changed', handleLangChange);
      window.removeEventListener('storage', handleLangChange);
    };
  }, []);

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

const translations = {
  en: {
    home: "Home",
    home2: "Home 2",
    about: 'About Us',
    services: 'Services',
    allServices: 'All Services',
    education: 'Education Programs',
    healthcare: 'Healthcare Initiatives',
    food: 'Food Distribution',
    disaster: 'Disaster Relief',
    women: 'Women Empowerment',
    elderly: 'Elderly Care',
    blog: 'Blog',
    contact: 'Contact Us',
    logout: 'Logout',
    adminDashboard: 'Admin Dashboard',
    userDashboard: 'User Dashboard',
    language: 'Language',
  },
  ar: {
    home: "الرئيسية",
    home2: "الرئيسية 2",
    about: 'حول',
    services: 'الخدمات',
    allServices: 'كل الخدمات',
    education: 'برامج التعليم',
    healthcare: 'مبادرات الصحة',
    food: 'توزيع الطعام',
    disaster: 'الإغاثة من الكوارث',
    women: 'تمكين المرأة',
    elderly: 'رعاية المسنين',
    blog: 'مدونة',
    contact: 'اتصل بنا',
    logout: 'تسجيل خروج',
    adminDashboard: 'لوحة تحكم المسؤول',
    userDashboard: 'لوحة تحكم المستخدم',
    language: 'اللغة',
  },
  he: {
    home: "בית",
    home2: "בית 2",
    about: 'אודות',
    services: 'שירותים',
    allServices: 'כל השירותים',
    education: 'תוכניות חינוך',
    healthcare: 'יוזמות בריאות',
    food: 'הפצת מזון',
    disaster: 'סיוע באסון',
    women: 'העצמת נשים',
    elderly: 'טיפול בקשישים',
    blog: 'בלוג',
    contact: 'צור קשר',
    logout: 'התנתק',
    adminDashboard: 'לוח מנהל',
    userDashboard: 'לוח משתמש',
    language: 'שפה',
  }
};

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isAvatarDropdownOpen, setIsAvatarDropdownOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isHomeDropdownOpen, setIsHomeDropdownOpen] = useState(false);
  const [isServicesDropdownOpen, setIsServicesDropdownOpen] = useState(false);
  const [theme, setTheme] = useState('light');
  const [userInitials, setUserInitials] = useState('AD');
  const [userData, setUserData] = useState({ firstname: '', lastname: '', email: '' });

  // Language context
  const { language, setLanguage } = useContext(LanguageContext);

  // Get user data from localStorage
  useEffect(() => {
    const user = localStorage.getItem('loggedInUserEmail');
    if (user) {
      try {
        const userDetails = JSON.parse(user);
        const firstname = userDetails.firstName?.[0]?.toUpperCase() || "";
        const lastname = userDetails.lastName?.[0]?.toUpperCase() || "";
        setUserInitials(firstname + lastname);
      } catch (error) {
        console.log("Failed to parse user data", error);
      }
    }
  }, []);

  // Sync theme with localStorage and document root
  useEffect(() => {
    if (typeof window !== 'undefined') {
      document.documentElement.setAttribute('data-theme', theme);
      localStorage.setItem('theme', theme);
      window.dispatchEvent(new Event('theme-changed'));
    }
  }, [theme]);

  // Listen for theme changes from other tabs/pages
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const handleThemeChange = () => {
        const newTheme = localStorage.getItem('theme') || 'light';
        setTheme(newTheme);
      };
      window.addEventListener('theme-changed', handleThemeChange);
      window.addEventListener('storage', handleThemeChange);
      return () => {
        window.removeEventListener('theme-changed', handleThemeChange);
        window.removeEventListener('storage', handleThemeChange);
      };
    }
  }, []);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  const handleLogout = () => {
    localStorage.removeItem('firstname');
    localStorage.removeItem('lastname');
    localStorage.removeItem('email');
    setUserData({ firstname: '', lastname: '', email: '' });
    setUserInitials('AD');
    setIsAvatarDropdownOpen(false);
    navigate('/Login');
  };

  // Check if a path is active
  const isActivePath = (path) => {
    if (path === '/home' && (location.pathname === '/home' || location.pathname === '/home2')) {
      return true;
    }
    return location.pathname === path;
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 w-full transition-colors duration-300 ${theme === 'dark' ? 'bg-[#181818] border-b border-[#222]' : 'bg-white border-b border-gray-200'}`}>
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex pl-4 sm:pl-6 lg:pl-14 items-center">
            <button onClick={() => navigate('/home1')} className="focus:outline-none">
              <img src="/Images/logo111.png" alt="STACKLY" className="h-6 sm:h-8 w-auto" />
            </button>
          </div>

          {/* Hamburger for mobile */}
          <button
            className="hamburger sm:hidden"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Open navigation"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor">
              <rect y="4" width="24" height="2" rx="1"/>
              <rect y="11" width="24" height="2" rx="1"/>
              <rect y="18" width="24" height="2" rx="1"/>
            </svg>
          </button>

          {/* Navigation */}
          <nav className="nav-main hidden sm:flex items-center space-x-8">
            {/* Home with dropdown */}
            <div className="relative inline-block">
              <button
                className={`flex items-center px-3 py-2 rounded-md transition-colors ${theme === 'dark' ? "text-white" : "text-black"} ${isActivePath('/home') ? 'bg-blue-100 text-blue-700 font-semibold' : 'hover:bg-gray-100'}`}
                onClick={() => setIsHomeDropdownOpen(!isHomeDropdownOpen)}
                aria-haspopup="true"
                aria-expanded={isHomeDropdownOpen}
              >
                <span>{translations[language].home}</span>
                <span className="ml-1 text-xs">▼</span>
              </button>
              {isHomeDropdownOpen && (
                <div
                  className={`absolute ${theme === 'dark' ? "bg-[#222] text-white" : "bg-white text-black"} border mt-2 rounded-md shadow-lg z-10 overflow-hidden`}
                  style={{ minWidth: "120px" }}
                >
                  <Link
                    to="/home"
                    className={`block px-4 py-2 transition-colors ${location.pathname === '/home' ? 'bg-blue-100 text-blue-700 font-medium' : 'hover:bg-gray-100'}`}
                    onClick={() => setIsHomeDropdownOpen(false)}
                  >
                    {translations[language].home}
                  </Link>
                  <Link
                    to="/home2"
                    className={`block px-4 py-2 transition-colors ${location.pathname === '/home2' ? 'bg-blue-100 text-blue-700 font-medium' : 'hover:bg-gray-100'}`}
                    onClick={() => setIsHomeDropdownOpen(false)}
                  >
                    {translations[language].home2}
                  </Link>
                </div>
              )}
            </div>

            {/* About Us */}
            <Link 
              to="/aboutus" 
              className={`px-3 py-2 rounded-md transition-colors ${theme === 'dark' ? "text-white" : "text-black"} ${isActivePath('/aboutus') ? 'bg-blue-100 text-blue-700 font-semibold' : 'hover:bg-gray-100'}`}
            >
              {translations[language].about}
            </Link>

            {/* Services with dropdown */}
            <div className="relative inline-block">
              <button
                className={`flex items-center px-3 py-2 rounded-md transition-colors ${theme === 'dark' ? "text-white" : "text-black"} ${isActivePath('/services') ? 'bg-blue-100 text-blue-700 font-semibold' : 'hover:bg-gray-100'}`}
                onClick={() => setIsServicesDropdownOpen(!isServicesDropdownOpen)}
                aria-haspopup="true"
                aria-expanded={isServicesDropdownOpen}
              >
                <span>{translations[language].services}</span>
                <span className="ml-1 text-xs">▼</span>
              </button>
              {isServicesDropdownOpen && (
                <div className={`absolute ${theme === 'dark' ? "bg-[#222] text-white" : "bg-white text-black"} border mt-2 rounded-md shadow-lg z-10 overflow-hidden`}>
                  <Link 
                    to="/services" 
                    className={`block px-4 py-2 transition-colors ${location.pathname === '/services' ? 'bg-blue-100 text-blue-700 font-medium' : 'hover:bg-gray-100'}`}
                    onClick={() => setIsServicesDropdownOpen(false)}
                  >
                    {translations[language].allServices}
                  </Link>
                  <Link 
                    to="/education-programs" 
                    className={`block px-4 py-2 transition-colors ${location.pathname === '/education-programs' ? 'bg-blue-100 text-blue-700 font-medium' : 'hover:bg-gray-100'}`}
                    onClick={() => setIsServicesDropdownOpen(false)}
                  >
                    {translations[language].education}
                  </Link>
                  <Link 
                    to="/healthcare-initiatives" 
                    className={`block px-4 py-2 transition-colors ${location.pathname === '/healthcare-initiatives' ? 'bg-blue-100 text-blue-700 font-medium' : 'hover:bg-gray-100'}`}
                    onClick={() => setIsServicesDropdownOpen(false)}
                  >
                    {translations[language].healthcare}
                  </Link>
                  <Link 
                    to="/food-distribution" 
                    className={`block px-4 py-2 transition-colors ${location.pathname === '/food-distribution' ? 'bg-blue-100 text-blue-700 font-medium' : 'hover:bg-gray-100'}`}
                    onClick={() => setIsServicesDropdownOpen(false)}
                  >
                    {translations[language].food}
                  </Link>
                  <Link 
                    to="/disaster-relief" 
                    className={`block px-4 py-2 transition-colors ${location.pathname === '/disaster-relief' ? 'bg-blue-100 text-blue-700 font-medium' : 'hover:bg-gray-100'}`}
                    onClick={() => setIsServicesDropdownOpen(false)}
                  >
                    {translations[language].disaster}
                  </Link>
                  <Link 
                    to="/women-empowerment" 
                    className={`block px-4 py-2 transition-colors ${location.pathname === '/women-empowerment' ? 'bg-blue-100 text-blue-700 font-medium' : 'hover:bg-gray-100'}`}
                    onClick={() => setIsServicesDropdownOpen(false)}
                  >
                    {translations[language].women}
                  </Link>
                  <Link 
                    to="/elderly-care" 
                    className={`block px-4 py-2 transition-colors ${location.pathname === '/elderly-care' ? 'bg-blue-100 text-blue-700 font-medium' : 'hover:bg-gray-100'}`}
                    onClick={() => setIsServicesDropdownOpen(false)}
                  >
                    {translations[language].elderly}
                  </Link>
                </div>
              )}
            </div>
            
            <Link 
              to="/blog" 
              className={`px-3 py-2 rounded-md transition-colors ${theme === 'dark' ? "text-white" : "text-black"} ${isActivePath('/blog') ? 'bg-blue-100 text-blue-700 font-semibold' : 'hover:bg-gray-100'}`}
            >
              {translations[language].blog}
            </Link>
            
            <Link 
              to="/contact" 
              className={`px-3 py-2 rounded-md transition-colors ${theme === 'dark' ? "text-white" : "text-black"} ${isActivePath('/contact') ? 'bg-blue-100 text-blue-700 font-semibold' : 'hover:bg-gray-100'}`}
            >
              {translations[language].contact}
            </Link>
          </nav>

          {/* Mobile Menu */}
          {mobileOpen && (
            <div className={`mobile-menu sm:hidden absolute top-full left-0 right-0 ${theme === 'dark' ? 'bg-[#222] text-white' : 'bg-white text-black'} border-t ${theme === 'dark' ? 'border-[#333]' : 'border-gray-200'} mt-2 rounded-b-lg shadow-lg z-10`}>
              <div className="flex flex-col p-4 space-y-2">
                {/* Home with dropdown */}
                <div className="relative">
                  <button
                    className={`flex items-center w-full text-left px-3 py-2 rounded-md ${isActivePath('/home') ? 'bg-blue-100 text-blue-700 font-semibold' : ''}`}
                    onClick={() => setIsHomeDropdownOpen(!isHomeDropdownOpen)}
                    aria-haspopup="true"
                    aria-expanded={isHomeDropdownOpen}
                  >
                    <span>{translations[language].home}</span>
                    <span className="ml-1 text-xs">▼</span>
                  </button>
                  {isHomeDropdownOpen && (
                    <div className={`ml-4 mt-1 ${theme === 'dark' ? "bg-[#333]" : "bg-gray-50"} rounded-md overflow-hidden`}>
                      <Link
                        to="/home"
                        className={`block px-4 py-2 ${location.pathname === '/home' ? 'bg-blue-100 text-blue-700 font-medium' : ''}`}
                        onClick={() => {
                          setIsHomeDropdownOpen(false);
                          setMobileOpen(false);
                        }}
                      >
                        {translations[language].home}
                      </Link>
                      <Link
                        to="/home2"
                        className={`block px-4 py-2 ${location.pathname === '/home2' ? 'bg-blue-100 text-blue-700 font-medium' : ''}`}
                        onClick={() => {
                          setIsHomeDropdownOpen(false);
                          setMobileOpen(false);
                        }}
                      >
                        {translations[language].home2}
                      </Link>
                    </div>
                  )}
                </div>

                {/* About Us */}
                <Link 
                  to="/aboutus" 
                  className={`px-3 py-2 rounded-md ${isActivePath('/aboutus') ? 'bg-blue-100 text-blue-700 font-semibold' : ''}`}
                  onClick={() => setMobileOpen(false)}
                >
                  {translations[language].about}
                </Link>

                {/* Services with dropdown */}
                <div className="relative">
                  <button
                    className={`flex items-center w-full text-left px-3 py-2 rounded-md ${isActivePath('/services') ? 'bg-blue-100 text-blue-700 font-semibold' : ''}`}
                    onClick={() => setIsServicesDropdownOpen(!isServicesDropdownOpen)}
                    aria-haspopup="true"
                    aria-expanded={isServicesDropdownOpen}
                  >
                    <span>{translations[language].services}</span>
                    <span className="ml-1 text-xs">▼</span>
                  </button>
                  {isServicesDropdownOpen && (
                    <div className={`ml-4 mt-1 ${theme === 'dark' ? "bg-[#333]" : "bg-gray-50"} rounded-md overflow-hidden`}>
                      <Link 
                        to="/services" 
                        className={`block px-4 py-2 ${location.pathname === '/services' ? 'bg-blue-100 text-blue-700 font-medium' : ''}`}
                        onClick={() => {
                          setIsServicesDropdownOpen(false);
                          setMobileOpen(false);
                        }}
                      >
                        {translations[language].allServices}
                      </Link>
                      <Link 
                        to="/education-programs" 
                        className={`block px-4 py-2 ${location.pathname === '/education-programs' ? 'bg-blue-100 text-blue-700 font-medium' : ''}`}
                        onClick={() => {
                          setIsServicesDropdownOpen(false);
                          setMobileOpen(false);
                        }}
                      >
                        {translations[language].education}
                      </Link>
                      <Link 
                        to="/healthcare-initiatives" 
                        className={`block px-4 py-2 ${location.pathname === '/healthcare-initiatives' ? 'bg-blue-100 text-blue-700 font-medium' : ''}`}
                        onClick={() => {
                          setIsServicesDropdownOpen(false);
                          setMobileOpen(false);
                        }}
                      >
                        {translations[language].healthcare}
                      </Link>
                      <Link 
                        to="/food-distribution" 
                        className={`block px-4 py-2 ${location.pathname === '/food-distribution' ? 'bg-blue-100 text-blue-700 font-medium' : ''}`}
                        onClick={() => {
                          setIsServicesDropdownOpen(false);
                          setMobileOpen(false);
                        }}
                      >
                        {translations[language].food}
                      </Link>
                      <Link 
                        to="/disaster-relief" 
                        className={`block px-4 py-2 ${location.pathname === '/disaster-relief' ? 'bg-blue-100 text-blue-700 font-medium' : ''}`}
                        onClick={() => {
                          setIsServicesDropdownOpen(false);
                          setMobileOpen(false);
                        }}
                      >
                        {translations[language].disaster}
                      </Link>
                      <Link 
                        to="/women-empowerment" 
                        className={`block px-4 py-2 ${location.pathname === '/women-empowerment' ? 'bg-blue-100 text-blue-700 font-medium' : ''}`}
                        onClick={() => {
                          setIsServicesDropdownOpen(false);
                          setMobileOpen(false);
                        }}
                      >
                        {translations[language].women}
                      </Link>
                      <Link 
                        to="/elderly-care" 
                        className={`block px-4 py-2 ${location.pathname === '/elderly-care' ? 'bg-blue-100 text-blue-700 font-medium' : ''}`}
                        onClick={() => {
                          setIsServicesDropdownOpen(false);
                          setMobileOpen(false);
                        }}
                      >
                        {translations[language].elderly}
                      </Link>
                    </div>
                  )}
                </div>
                
                <Link 
                  to="/blog" 
                  className={`px-3 py-2 rounded-md ${isActivePath('/blog') ? 'bg-blue-100 text-blue-700 font-semibold' : ''}`}
                  onClick={() => setMobileOpen(false)}
                >
                  {translations[language].blog}
                </Link>
                
                <Link 
                  to="/contact" 
                  className={`px-3 py-2 rounded-md ${isActivePath('/contact') ? 'bg-blue-100 text-blue-700 font-semibold' : ''}`}
                  onClick={() => setMobileOpen(false)}
                >
                  {translations[language].contact}
                </Link>
              </div>
            </div>
          )}

          {/* Right side controls */}
          <div className="flex items-center space-x-4">
            {/* Language Dropdown */}
            <select
              value={language}
              onChange={e => setLanguage(e.target.value)}
              className={`border rounded px-2 py-1 ${theme === 'dark' ? 'bg-[#222] text-white border-[#444]' : 'bg-white text-black border-gray-300'}`}
              aria-label="Select language"
            >
              <option value="en">English</option>
              <option value="ar">العربية</option>
              <option value="he">עברית</option>
            </select>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-full transition-colors ${theme === 'dark' ? "bg-[#222] text-white hover:bg-[#333]" : "bg-gray-100 text-black hover:bg-gray-200"}`}
              aria-label="Toggle theme"
            >
              {theme === 'light' ? (
                <span role="img" aria-label="Dark mode">🌙</span>
              ) : (
                <span role="img" aria-label="Light mode">☀️</span>
              )}
            </button>

            {/* Avatar Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsAvatarDropdownOpen(!isAvatarDropdownOpen)}
                className="w-10 h-10 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold hover:bg-blue-600 transition-colors"
                aria-label="User menu"
              >
                {userInitials}
              </button>
              {isAvatarDropdownOpen && (
                <div className={`absolute right-0 mt-2 w-40 ${theme === 'dark' ? "bg-[#222] text-white border-[#333]" : "bg-white text-black border-gray-200"} border rounded-md shadow-lg z-10 overflow-hidden`}>
                  <button
                    onClick={handleLogout}
                    className={`block w-full text-left px-4 py-2 transition-colors ${theme === 'dark' ? "hover:bg-[#333]" : "hover:bg-gray-100"}`}
                  >
                    {translations[language].logout}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;