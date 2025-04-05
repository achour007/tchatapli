'use client';

import Link from 'next/link';

export default function LoginButton() {
  return (
    <div className="flex justify-center">
      <div className="relative group p-4">
        <div className="absolute inset-0 bg-[var(--light-blue)] rounded-full transform scale-x-150 scale-y-75 -z-10 
                      group-hover:bg-[var(--accent-blue)] transition-colors duration-300"></div>
        <Link 
          href="/login" 
          className="btn-secondary text-sm sm:text-base px-10 py-4 rounded-lg font-medium
                   border-2 border-[var(--primary-blue)] text-[var(--primary-blue)]
                   hover:bg-[var(--light-blue)] hover:border-[var(--secondary-blue)]
                   transform hover:scale-105 transition-all duration-300
                   bg-white relative z-10"
        >
          Se connecter
        </Link>
      </div>
    </div>
  );
} 