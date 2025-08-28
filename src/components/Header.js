import React, { createContext, useContext, useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

// Language Context
export const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('en');
  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

// 2. Translations object
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
    healthcare: 'مبادرات الرعاية الصحية',
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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isHomeDropdownOpen, setIsHomeDropdownOpen] = useState(false);
  const homeDropdownTimeout = React.useRef();
  const [isServicesDropdownOpen, setIsServicesDropdownOpen] = useState(false);
  const servicesDropdownTimeout = React.useRef();
  const [theme, setTheme] = useState('light');
  const [userInitials, setUserInitials] = useState('AD');
  const [userData, setUserData] = useState({ firstname: '', lastname: '', email: '' });

  // Language context
  const { language, setLanguage } = useContext(LanguageContext);

  // Get user data from localStorage
  useEffect(() => {
    const user= localStorage.getItem('loggedInUserEmail')
    if(user)
    {
      try{
        const userdetils= JSON.parse(user)
        const firstname = userdetils.firstName?.[0]?.toUpperCase()||"" ;
        const lastname = userdetils.lastName?.[0]?.toUpperCase()||"" ;
        setUserInitials(firstname+lastname);



      }
      catch(error){
        console.log("failed",error)

      }
    }
    
  }, []);

  // Sync theme with localStorage and document root
  useEffect(() => {
    if (typeof window !== 'undefined') {
      document.documentElement.setAttribute('data-theme', theme);
      localStorage.setItem('theme', theme);
      // Notify other tabs/pages
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

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleHomeDropdown = () => {
    setIsHomeDropdownOpen(!isHomeDropdownOpen);
  };

  const toggleServicesDropdown = () => {
    setIsServicesDropdownOpen(!isServicesDropdownOpen);
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

  // Check if on admin dashboard (adjust path as needed)
  const isAdmin = location.pathname.startsWith('/admindashboard');

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 w-full transition-colors duration-300 ${theme === 'dark' ? 'bg-[#181818] border-b border-[#222]' : 'bg-white border-b border-gray-200'}`}>
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className="flex pl-4 sm:pl-6 lg:pl-14 items-center">
            <button onClick={() => navigate('/home1')} className="focus:outline-none">
              <img src="/Images/logo111.png" alt="STACKLY" className="h-6 sm:h-8 w-auto" />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex items-center space-x-8">
            {/* Home with dropdown symbol */}
            <div className="relative inline-block">
              <button
                className={`flex items-center ${theme === 'dark' ? "text-white" : "text-black"}`}
                onClick={() => setIsHomeDropdownOpen(!isHomeDropdownOpen)}
                aria-haspopup="true"
                aria-expanded={isHomeDropdownOpen}
                style={{ fontWeight: location.pathname === "/home" ? "bold" : "normal" }}
              >
                <span onClick={() => navigate('/home')}>{translations[language].home}</span>
                <span className="ml-1">▼</span>
              </button>
              {isHomeDropdownOpen && (
                <div
                  className={`absolute ${theme === 'dark' ? "bg-[#222] text-white" : "bg-white text-black"} border mt-2 rounded shadow-lg z-10`}
                  style={{ minWidth: "120px" }}
                >
                  <Link
                    to="/home"
                    className="block px-4 py-2"
                    onClick={() => setIsHomeDropdownOpen(false)}
                  >
                    {translations[language].home}
                  </Link>
                  <Link
                    to="/home2"
                    className="block px-4 py-2"
                    onClick={() => setIsHomeDropdownOpen(false)}
                  >
                    {translations[language].home2}
                  </Link>
                </div>
              )}
            </div>

            {/* About Us */}
            <Link to="/aboutus" className={theme === 'dark' ? "text-white" : "text-black"}>{translations[language].about}</Link>

            {/* Services with dropdown symbol */}
            <div className="relative inline-block">
              <button
                className={`flex items-center ${theme === 'dark' ? "text-white" : "text-black"}`}
                onClick={() => setIsServicesDropdownOpen(!isServicesDropdownOpen)}
                aria-haspopup="true"
                aria-expanded={isServicesDropdownOpen}
              >
                <span>{translations[language].services}</span>
                <span className="ml-1">▼</span>
              </button>
              {isServicesDropdownOpen && (
                <div className={`absolute ${theme === 'dark' ? "bg-[#222] text-white" : "bg-white text-black"} border mt-2 rounded shadow-lg z-10`}>
                  <Link to="/services" className="block px-4 py-2" onClick={() => setIsServicesDropdownOpen(false)}>{translations[language].allServices}</Link>
                  <Link to="/education-programs" className="block px-4 py-2" onClick={() => setIsServicesDropdownOpen(false)}>{translations[language].education}</Link>
                  <Link to="/healthcare-initiatives" className="block px-4 py-2" onClick={() => setIsServicesDropdownOpen(false)}>{translations[language].healthcare}</Link>
                  <Link to="/food-distribution" className="block px-4 py-2" onClick={() => setIsServicesDropdownOpen(false)}>{translations[language].food}</Link>
                  <Link to="/disaster-relief" className="block px-4 py-2" onClick={() => setIsServicesDropdownOpen(false)}>{translations[language].disaster}</Link>
                  <Link to="/women-empowerment" className="block px-4 py-2" onClick={() => setIsServicesDropdownOpen(false)}>{translations[language].women}</Link>
                  <Link to="/elderly-care" className="block px-4 py-2" onClick={() => setIsServicesDropdownOpen(false)}>{translations[language].elderly}</Link>
                </div>
              )}
            </div>
            <Link to="/blog" className={theme === 'dark' ? "text-white" : "text-black"}>{translations[language].blog}</Link>
            <Link to="/contact" className={theme === 'dark' ? "text-white" : "text-black"}>{translations[language].contact}</Link>
          </nav>

          {/* Right side controls */}
          <div className="flex items-center space-x-4">
            {/* Language Dropdown */}
            <select
              value={language}
              onChange={e => setLanguage(e.target.value)}
              className="border rounded px-2 py-1"
              aria-label="Select language"
            >
              <option value="en">English</option>
              <option value="ar">العربية</option>
              <option value="he">עברית</option>
            </select>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-full ${theme === 'dark' ? "bg-[#222] text-white hover:bg-[#333]" : "bg-gray-100 text-black hover:bg-gray-200"}`}
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
                className="w-10 h-10 rounded-full bg-blue-400 text-white flex items-center justify-center font-bold"
                aria-label="User menu"
              >
                {userInitials}
              </button>
              {isAvatarDropdownOpen && (
                <div className={`absolute right-0 mt-2 w-40 ${theme === 'dark' ? "bg-[#222] text-white" : "bg-white text-black"} border rounded shadow-lg z-10`}>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 hover:bg-gray-100"
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