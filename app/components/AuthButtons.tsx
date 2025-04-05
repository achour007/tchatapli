'use client';

import Link from 'next/link';
import { FaUserPlus, FaSignInAlt } from 'react-icons/fa';

export default function AuthButtons() {
  return (
    <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
      <Link 
        href="/register" 
        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg flex items-center justify-center gap-2 transition-all duration-300 transform hover:scale-105 shadow-lg"
      >
        <FaUserPlus className="h-5 w-5" />
        <span>S'inscrire</span>
      </Link>
      <Link 
        href="/login" 
        className="bg-white text-blue-600 border-2 border-blue-600 px-6 py-3 rounded-lg flex items-center justify-center gap-2 hover:bg-blue-50 transition-all duration-300 transform hover:scale-105"
      >
        <FaSignInAlt className="h-5 w-5" />
        <span>Se connecter</span>
      </Link>
    </div>
  );
} 