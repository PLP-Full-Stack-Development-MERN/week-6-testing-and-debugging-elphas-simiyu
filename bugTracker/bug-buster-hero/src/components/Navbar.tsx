
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Bug, Plus } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

const Navbar: React.FC = () => {
  const location = useLocation();
  
  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="sticky top-0 z-10 bg-white bg-opacity-80 backdrop-blur-md border-b border-slate-200 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between h-16">
        <Link to="/" className="flex items-center space-x-2">
          <Bug size={24} className="text-primary" />
          <span className="font-semibold text-xl text-foreground">Bug Tracker</span>
        </Link>
        
        <nav className="flex items-center space-x-4">
          <NavLink to="/" currentPath={location.pathname}>
            Dashboard
          </NavLink>
          <Link 
            to="/report" 
            className="flex items-center space-x-1 bg-primary text-primary-foreground px-4 py-2 rounded-full text-sm font-medium hover:bg-primary/90 transition-colors"
          >
            <Plus size={16} />
            <span>Report Bug</span>
          </Link>
        </nav>
      </div>
    </motion.header>
  );
};

interface NavLinkProps {
  to: string;
  currentPath: string;
  children: React.ReactNode;
}

const NavLink: React.FC<NavLinkProps> = ({ to, currentPath, children }) => {
  const isActive = currentPath === to;
  
  return (
    <Link 
      to={to} 
      className={cn(
        "relative px-3 py-2 text-sm font-medium transition-colors",
        isActive 
          ? "text-primary" 
          : "text-muted-foreground hover:text-foreground"
      )}
    >
      {children}
      {isActive && (
        <motion.div 
          layoutId="nav-indicator"
          className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        />
      )}
    </Link>
  );
};

export default Navbar;
