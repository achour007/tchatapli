'use client';

import { useState, useCallback, useMemo } from 'react';
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

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  }, []);

  const handleSubmit = useCallback(async (e: React.FormEvent<HTMLFormElement>) => {
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

      router.push('/');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Une erreur est survenue');
    } finally {
      setIsLoading(false);
    }
  }, [formData, router]);

  const errorMessage = useMemo(() => {
    if (!error) return null;
    return (
      <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-lg text-sm text-red-700">
        {error}
      </div>
    );
  }, [error]);

  const submitButton = useMemo(() => (
    <button
      type="submit"
      disabled={isLoading}
      className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-[var(--primary-color)] hover:bg-[var(--secondary-color)] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[var(--primary-color)] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {isLoading ? (
        <span className="absolute left-0 inset-y-0 flex items-center pl-3">
          <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        </span>
      ) : null}
      {isLoading ? 'Connexion en cours...' : 'Se connecter'}
    </button>
  ), [isLoading]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[var(--primary-color)] to-[var(--secondary-color)] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-2xl transform transition-all duration-500 hover:scale-105">
        <div className="text-center">
          <h1 className="text-3xl font-extrabold text-gray-900 mb-2">Connexion</h1>
          <p className="text-gray-600">
            Bienvenue ! Connectez-vous pour accéder à votre compte
          </p>
        </div>

        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <div className="rounded-md shadow-sm space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] focus:border-transparent transition-all duration-300"
                placeholder="Votre email"
                required
                autoComplete="email"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Mot de passe
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] focus:border-transparent transition-all duration-300"
                placeholder="Votre mot de passe"
                required
                autoComplete="current-password"
              />
            </div>
          </div>

          {errorMessage}

          <div>
            {submitButton}
          </div>

          <div className="text-center">
            <Link 
              href="/register" 
              className="text-[var(--primary-color)] hover:text-[var(--secondary-color)] transition-colors font-medium"
            >
              Pas encore inscrit ? Créez un compte
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
} 