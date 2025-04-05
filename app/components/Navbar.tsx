'use client';

import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="w-full bg-white/90 backdrop-blur-sm shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <div className="text-xl font-bold text-[var(--primary-blue)]">
            ChatApp
          </div>
          <div className="flex gap-8">
            <Link 
              href="/login" 
              className="btn-secondary text-sm sm:text-base px-6 py-2 rounded-lg font-medium
                       border-2 border-[var(--primary-blue)] text-[var(--primary-blue)]
                       hover:bg-[var(--light-blue)] hover:border-[var(--secondary-blue)]
                       transform hover:scale-105 transition-all duration-300
                       bg-white"
            >
              Se connecter
            </Link>
            <Link 
              href="/register" 
              className="btn-primary text-sm sm:text-base px-6 py-2 rounded-lg font-bold 
                       bg-gradient-to-r from-[var(--primary-blue)] to-[var(--dark-blue)]
                       hover:from-[var(--dark-blue)] hover:to-[var(--primary-blue)]
                       transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl
                       text-white"
            >
              S'inscrire
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
} 