import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Dumbbell } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  return (
    <header 
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-md' : 'bg-white md:bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center space-x-2">
            <Dumbbell className="h-8 w-8 text-primary-500" />
            <span className="font-heading font-bold text-2xl bg-gradient-to-r from-primary-500 to-accent-500 bg-clip-text text-transparent">
              FitGen
            </span>
          </Link>
          
          {/* Navigation desktop */}
          <nav className="hidden md:flex items-center space-x-8">
            {[
              { path: '', label: 'Accueil' },
              { path: 'workouts', label: 'Exercices' },
              { path: 'diet', label: 'Nutrition' },
              { path: 'about', label: 'À propos' }
            ].map((item) => (
              <Link
                key={item.path}
                to={`/${item.path}`}
                className={`font-medium text-lg transition-colors hover:text-primary-500 ${
                  location.pathname === `/${item.path}` 
                    ? 'text-primary-500' 
                    : 'text-neutral-700'
                }`}
              >
                {item.label}
              </Link>
            ))}
            <Link
              to="/generate"
              className="bg-gradient-to-r from-primary-500 to-accent-500 text-white font-medium py-2 px-6 rounded-full hover:opacity-90 transition-opacity"
            >
              Créer un Programme
            </Link>
          </nav>
          
          {/* Bouton menu mobile */}
          <button
            className="md:hidden text-neutral-700 p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
        
        {/* Navigation mobile */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden overflow-hidden"
            >
              <nav className="bg-white/95 backdrop-blur-sm pt-2 pb-6 space-y-4 border-t border-gray-100 mt-2">
                {[
                  { path: '', label: 'Accueil' },
                  { path: 'workouts', label: 'Exercices' },
                  { path: 'diet', label: 'Nutrition' },
                  { path: 'about', label: 'À propos' }
                ].map((item) => (
                  <Link
                    key={item.path}
                    to={`/${item.path}`}
                    className={`block font-medium text-lg transition-colors hover:text-primary-500 px-2 py-3 ${
                      location.pathname === `/${item.path}` 
                        ? 'text-primary-500' 
                        : 'text-neutral-700'
                    }`}
                  >
                    {item.label}
                  </Link>
                ))}
                <Link
                  to="/generate"
                  className="block bg-gradient-to-r from-primary-500 to-accent-500 text-white font-medium py-3 px-6 rounded-full hover:opacity-90 transition-opacity text-center mt-4"
                >
                  Créer un Programme
                </Link>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
};

export default Header;