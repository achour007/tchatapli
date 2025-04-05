'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function LoginPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Une erreur est survenue');
      }

      // Redirection vers la page d'accueil après connexion réussie
      router.push('/');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Une erreur est survenue');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 animate-gradient">
      <div className="max-w-md mx-auto">
        <div className="text-center mb-8 smooth-appear">
          <h1 className="chat-title mb-2">Connexion</h1>
          <p className="text-[var(--text-secondary)]">
            Bienvenue ! Connectez-vous pour accéder à votre compte
          </p>
        </div>

        <div className="chat-card">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="smooth-appear" style={{ animationDelay: '0.1s' }}>
              <label htmlFor="email" className="block text-sm font-medium text-[var(--text-secondary)] mb-1">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="chat-input"
                required
                autoComplete="email"
              />
            </div>

            <div className="smooth-appear" style={{ animationDelay: '0.2s' }}>
              <label htmlFor="password" className="block text-sm font-medium text-[var(--text-secondary)] mb-1">
                Mot de passe
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="chat-input"
                required
                autoComplete="current-password"
              />
            </div>

            {error && (
              <div className="bg-[var(--error-color)]/10 text-[var(--error-color)] p-4 rounded-lg text-sm">
                {error}
              </div>
            )}

            <div className="flex items-center justify-between text-sm">
              <Link 
                href="/register" 
                className="text-[var(--primary-color)] hover:text-[var(--secondary-color)] transition-colors"
              >
                Pas encore inscrit ?
              </Link>
              <Link 
                href="/forgot-password" 
                className="text-[var(--primary-color)] hover:text-[var(--secondary-color)] transition-colors"
              >
                Mot de passe oublié ?
              </Link>
            </div>

            <button
              type="submit"
              className="chat-button w-full"
              disabled={isLoading}
            >
              {isLoading ? 'Connexion en cours...' : 'Se connecter'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
} 