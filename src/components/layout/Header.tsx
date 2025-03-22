
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Shield, Menu, X, Moon, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    
    // Check if user prefers dark mode
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setIsDarkMode(true);
      document.documentElement.classList.add('dark');
    }
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'glass py-3' : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 text-foreground" onClick={closeMobileMenu}>
            <Shield className="h-8 w-8 text-primary animate-pulse-subtle" />
            <span className="font-semibold text-lg">SecureSisterhood</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            <Link to="/how-it-works" className={`nav-link ${isActive('/how-it-works') ? 'text-foreground font-medium' : ''}`}>
              How It Works
            </Link>
            <Link to="/join" className={`nav-link ${isActive('/join') ? 'text-foreground font-medium' : ''}`}>
              Join Securely
            </Link>
            <Link to="/get-help" className={`nav-link ${isActive('/get-help') ? 'text-foreground font-medium' : ''}`}>
              Get Help
            </Link>
            <Link to="/resources" className={`nav-link ${isActive('/resources') ? 'text-foreground font-medium' : ''}`}>
              Resources
            </Link>
          </div>

          {/* Right-side actions */}
          <div className="flex items-center space-x-4">
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-full hover:bg-secondary transition-colors duration-200"
              aria-label="Toggle dark mode"
            >
              {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            
            <div className="hidden md:block">
              <Button asChild className="bg-primary hover:bg-primary/90 text-white rounded-full px-6 py-2">
                <Link to="/dashboard">Dashboard</Link>
              </Button>
            </div>
            
            <button
              className="p-2 rounded-md md:hidden text-foreground"
              onClick={toggleMobileMenu}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </nav>

        {/* Mobile Navigation */}
        <div
          className={`absolute inset-x-0 top-full mt-0 transition-all duration-300 md:hidden glass border-t border-border ${
            isMobileMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none'
          }`}
        >
          <div className="px-4 py-3 space-y-1">
            <Link
              to="/how-it-works"
              className="block px-3 py-2 rounded-md text-base font-medium hover:bg-secondary transition duration-150 ease-in-out"
              onClick={closeMobileMenu}
            >
              How It Works
            </Link>
            <Link
              to="/join"
              className="block px-3 py-2 rounded-md text-base font-medium hover:bg-secondary transition duration-150 ease-in-out"
              onClick={closeMobileMenu}
            >
              Join Securely
            </Link>
            <Link
              to="/get-help"
              className="block px-3 py-2 rounded-md text-base font-medium hover:bg-secondary transition duration-150 ease-in-out"
              onClick={closeMobileMenu}
            >
              Get Help
            </Link>
            <Link
              to="/resources"
              className="block px-3 py-2 rounded-md text-base font-medium hover:bg-secondary transition duration-150 ease-in-out"
              onClick={closeMobileMenu}
            >
              Resources
            </Link>
            <div className="pt-2">
              <Button asChild className="w-full bg-primary hover:bg-primary/90 text-white rounded-full">
                <Link to="/dashboard" onClick={closeMobileMenu}>Dashboard</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
