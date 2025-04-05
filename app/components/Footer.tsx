'use client';

import Link from 'next/link';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="bg-[var(--primary-blue)] py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-8">
          <div>
            <h3 className="text-[var(--accent-blue)] text-base sm:text-lg font-semibold mb-4">
              À propos
            </h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-white/80 hover:text-[var(--accent-blue)] transition-colors text-sm sm:text-base">
                  Notre histoire
                </Link>
              </li>
              <li>
                <Link href="/team" className="text-white/80 hover:text-[var(--accent-blue)] transition-colors text-sm sm:text-base">
                  Notre équipe
                </Link>
              </li>
              <li>
                <Link href="/careers" className="text-white/80 hover:text-[var(--accent-blue)] transition-colors text-sm sm:text-base">
                  Carrières
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-[var(--accent-blue)] text-base sm:text-lg font-semibold mb-4">
              Support
            </h3>
            <ul className="space-y-2">
              <li>
                <Link href="/help" className="text-white/80 hover:text-[var(--accent-blue)] transition-colors text-sm sm:text-base">
                  Centre d'aide
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-white/80 hover:text-[var(--accent-blue)] transition-colors text-sm sm:text-base">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-white/80 hover:text-[var(--accent-blue)] transition-colors text-sm sm:text-base">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-[var(--accent-blue)] text-base sm:text-lg font-semibold mb-4">
              Légal
            </h3>
            <ul className="space-y-2">
              <li>
                <Link href="/privacy" className="text-white/80 hover:text-[var(--accent-blue)] transition-colors text-sm sm:text-base">
                  Politique de confidentialité
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-white/80 hover:text-[var(--accent-blue)] transition-colors text-sm sm:text-base">
                  Conditions d'utilisation
                </Link>
              </li>
              <li>
                <Link href="/cookies" className="text-white/80 hover:text-[var(--accent-blue)] transition-colors text-sm sm:text-base">
                  Politique des cookies
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-[var(--accent-blue)] text-base sm:text-lg font-semibold mb-4">
              Réseaux sociaux
            </h3>
            <div className="flex space-x-4">
              <Link 
                href="https://facebook.com" 
                className="text-white/80 hover:text-[var(--accent-blue)] transition-colors transform hover:scale-110"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaFacebook className="h-6 w-6" />
              </Link>
              <Link 
                href="https://twitter.com" 
                className="text-white/80 hover:text-[var(--accent-blue)] transition-colors transform hover:scale-110"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaTwitter className="h-6 w-6" />
              </Link>
              <Link 
                href="https://instagram.com" 
                className="text-white/80 hover:text-[var(--accent-blue)] transition-colors transform hover:scale-110"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaInstagram className="h-6 w-6" />
              </Link>
              <Link 
                href="https://linkedin.com" 
                className="text-white/80 hover:text-[var(--accent-blue)] transition-colors transform hover:scale-110"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaLinkedin className="h-6 w-6" />
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-[var(--secondary-blue)]">
          <p className="text-[var(--accent-blue)] text-center text-sm">
            © {new Date().getFullYear()} Tchat App. Tous droits réservés.
          </p>
        </div>
      </div>
    </footer>
  );
} 