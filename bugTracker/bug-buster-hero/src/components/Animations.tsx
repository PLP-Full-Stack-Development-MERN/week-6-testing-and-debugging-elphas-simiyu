
import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

export const FadeIn = ({ 
  children, 
  className = '', 
  delay = 0
}: { 
  children: React.ReactNode; 
  className?: string;
  delay?: number;
}) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.4, delay }}
    className={cn(className)}
  >
    {children}
  </motion.div>
);

export const SlideUp = ({ 
  children, 
  className = '', 
  delay = 0
}: { 
  children: React.ReactNode; 
  className?: string;
  delay?: number;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay }}
    className={cn(className)}
  >
    {children}
  </motion.div>
);

export const SlideDown = ({ 
  children, 
  className = '', 
  delay = 0
}: { 
  children: React.ReactNode; 
  className?: string;
  delay?: number;
}) => (
  <motion.div
    initial={{ opacity: 0, y: -20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay }}
    className={cn(className)}
  >
    {children}
  </motion.div>
);

export const ScaleIn = ({ 
  children, 
  className = '', 
  delay = 0
}: { 
  children: React.ReactNode; 
  className?: string;
  delay?: number;
}) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.95 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.4, delay }}
    className={cn(className)}
  >
    {children}
  </motion.div>
);

export const PageTransition = ({ 
  children, 
  className = ''
}: { 
  children: React.ReactNode; 
  className?: string;
}) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.4 }}
    className={cn('min-h-screen w-full', className)}
  >
    {children}
  </motion.div>
);
