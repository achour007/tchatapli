'use client';

import Link from 'next/link';

export default function RegisterButton() {
  return (
    <div className="flex justify-center mb-6">
      <div className="relative group p-4">
        <div className="absolute inset-0 bg-[var(--light-blue)] rounded-full transform scale-x-150 scale-y-75 -z-10 
                      group-hover:bg-[var(--accent-blue)] transition-colors duration-300"></div>
        <Link 
          href="/register" 
          className="btn-primary text-sm sm:text-base px-10 py-4 rounded-lg font-bold 
                   bg-gradient-to-r from-[var(--primary-blue)] to-[var(--dark-blue)]
                   hover:from-[var(--dark-blue)] hover:to-[var(--primary-blue)]
                   transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl
                   text-white relative z-10"
        >
          Créer un compte
        </Link>
      </div>
    </div>
  );
} 