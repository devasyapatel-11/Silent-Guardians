
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Shield, Menu, X, Moon, Sun, User, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const location = useLocation();
  const { user, signOut } = useAuth();

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

  const handleSignOut = async () => {
    await signOut();
    closeMobileMenu();
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
            <span className="font-semibold text-lg">Silent Guardians</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            <Link to="/how-it-works" className={`nav-link ${isActive('/how-it-works') ? 'text-foreground font-medium' : ''}`}>
              How It Works
            </Link>
            <Link to="/support-circles" className={`nav-link ${isActive('/support-circles') ? 'text-foreground font-medium' : ''}`}>
              Support Circles
            </Link>
            <Link to="/emergency-support" className={`nav-link ${isActive('/emergency-support') ? 'text-foreground font-medium' : ''}`}>
              Emergency Help
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
            
            {user ? (
              <div className="hidden md:block">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                      <User className="h-5 w-5" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem asChild>
                      <Link to="/dashboard">Dashboard</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link to="/profile">Profile</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={handleSignOut}>
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Log out</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            ) : (
              <div className="hidden md:block">
                <Button asChild variant="ghost" className="mr-2">
                  <Link to="/auth/login">Log in</Link>
                </Button>
                <Button asChild className="bg-primary hover:bg-primary/90 text-white rounded-full px-6 py-2">
                  <Link to="/auth/register">Sign Up</Link>
                </Button>
              </div>
            )}
            
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
              to="/support-circles"
              className="block px-3 py-2 rounded-md text-base font-medium hover:bg-secondary transition duration-150 ease-in-out"
              onClick={closeMobileMenu}
            >
              Support Circles
            </Link>
            <Link
              to="/emergency-support"
              className="block px-3 py-2 rounded-md text-base font-medium hover:bg-secondary transition duration-150 ease-in-out"
              onClick={closeMobileMenu}
            >
              Emergency Help
            </Link>
            <Link
              to="/resources"
              className="block px-3 py-2 rounded-md text-base font-medium hover:bg-secondary transition duration-150 ease-in-out"
              onClick={closeMobileMenu}
            >
              Resources
            </Link>
            <div className="pt-2">
              {user ? (
                <>
                  <Button asChild className="w-full mb-2">
                    <Link to="/dashboard" onClick={closeMobileMenu}>Dashboard</Link>
                  </Button>
                  <Button variant="outline" className="w-full" onClick={handleSignOut}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </Button>
                </>
              ) : (
                <>
                  <Button asChild variant="outline" className="w-full mb-2">
                    <Link to="/auth/login" onClick={closeMobileMenu}>Log in</Link>
                  </Button>
                  <Button asChild className="w-full">
                    <Link to="/auth/register" onClick={closeMobileMenu}>Sign Up</Link>
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
