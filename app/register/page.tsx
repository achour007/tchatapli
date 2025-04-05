'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

interface FormData {
  email: string;
  password: string;
  confirmPassword: string;
  pseudo: string;
  dateNaissance: string;
  sexe: string;
  ville: string;
  bio: string;
  photo: File | null;
  interets: string[];
  langues: string[];
}

const INTERETS_OPTIONS = [
  'Sport', 'Musique', 'Cinéma', 'Lecture', 'Voyage', 
  'Cuisine', 'Art', 'Jeux vidéo', 'Nature', 'Technologie'
];

const LANGUES_OPTIONS = [
  'Français', 'Anglais', 'Espagnol', 'Allemand', 
  'Italien', 'Arabe', 'Chinois', 'Portugais'
];

export default function RegisterPage() {
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: '',
    confirmPassword: '',
    pseudo: '',
    dateNaissance: '',
    sexe: '',
    ville: '',
    bio: '',
    photo: null,
    interets: [],
    langues: []
  });
  const [error, setError] = useState('');
  const [photoPreview, setPhotoPreview] = useState<string>('');

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData({ ...formData, photo: file });
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleInteretToggle = (interet: string) => {
    setFormData(prev => ({
      ...prev,
      interets: prev.interets.includes(interet)
        ? prev.interets.filter(i => i !== interet)
        : [...prev.interets, interet]
    }));
  };

  const handleLangueToggle = (langue: string) => {
    setFormData(prev => ({
      ...prev,
      langues: prev.langues.includes(langue)
        ? prev.langues.filter(l => l !== langue)
        : [...prev.langues, langue]
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Validations
    if (!formData.email || !formData.password || !formData.confirmPassword || 
        !formData.pseudo || !formData.dateNaissance || !formData.sexe) {
      setError('Les champs marqués d\'un * sont obligatoires');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Les mots de passe ne correspondent pas');
      return;
    }

    if (formData.password.length < 8) {
      setError('Le mot de passe doit contenir au moins 8 caractères');
      return;
    }

    if (formData.bio.length > 200) {
      setError('La bio ne doit pas dépasser 200 caractères');
      return;
    }

    // Validation de l'âge
    const birthDate = new Date(formData.dateNaissance);
    const today = new Date();
    const age = today.getFullYear() - birthDate.getFullYear();
    if (age < 18) {
      setError('Vous devez avoir au moins 18 ans pour vous inscrire');
      return;
    }

    try {
      const formDataToSend = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        if (key === 'photo' && value) {
          formDataToSend.append('photo', value);
        } else if (Array.isArray(value)) {
          formDataToSend.append(key, JSON.stringify(value));
        } else if (value !== null) {
          formDataToSend.append(key, value.toString());
        }
      });

      const response = await fetch('/api/register', {
        method: 'POST',
        body: formDataToSend,
      });

      if (response.ok) {
        router.push('/login');
      } else {
        const data = await response.json();
        setError(data.message || 'Une erreur est survenue');
      }
    } catch (err) {
      setError('Erreur de connexion au serveur');
    }
  };

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 animate-gradient">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8 smooth-appear">
          <h1 className="chat-title mb-2">Inscription</h1>
          <p className="text-[var(--text-secondary)]">Rejoignez notre communauté de chat</p>
        </div>

        <div className="chat-card">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Section Informations Principales */}
            <div className="space-y-6">
              <h2 className="chat-section-title">Informations Principales</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="smooth-appear" style={{ animationDelay: '0.1s' }}>
                  <label htmlFor="email" className="block text-sm font-medium text-[var(--text-secondary)] mb-1">
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="chat-input"
                    required
                  />
                </div>

                <div className="smooth-appear" style={{ animationDelay: '0.2s' }}>
                  <label htmlFor="pseudo" className="block text-sm font-medium text-[var(--text-secondary)] mb-1">
                    Pseudo *
                  </label>
                  <input
                    type="text"
                    id="pseudo"
                    name="pseudo"
                    value={formData.pseudo}
                    onChange={(e) => setFormData({ ...formData, pseudo: e.target.value })}
                    className="chat-input"
                    minLength={3}
                    maxLength={20}
                    required
                  />
                </div>

                <div className="smooth-appear" style={{ animationDelay: '0.3s' }}>
                  <label htmlFor="password" className="block text-sm font-medium text-[var(--text-secondary)] mb-1">
                    Mot de passe *
                  </label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className="chat-input"
                    minLength={8}
                    required
                  />
                </div>

                <div className="smooth-appear" style={{ animationDelay: '0.4s' }}>
                  <label htmlFor="confirmPassword" className="block text-sm font-medium text-[var(--text-secondary)] mb-1">
                    Confirmer le mot de passe *
                  </label>
                  <input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                    className="chat-input"
                    required
                  />
                </div>

                <div className="smooth-appear" style={{ animationDelay: '0.5s' }}>
                  <label htmlFor="dateNaissance" className="block text-sm font-medium text-[var(--text-secondary)] mb-1">
                    Date de naissance *
                  </label>
                  <input
                    type="date"
                    id="dateNaissance"
                    name="dateNaissance"
                    value={formData.dateNaissance}
                    onChange={(e) => setFormData({ ...formData, dateNaissance: e.target.value })}
                    className="chat-input"
                    required
                  />
                </div>

                <div className="smooth-appear" style={{ animationDelay: '0.6s' }}>
                  <label className="block text-sm font-medium text-[var(--text-secondary)] mb-1">
                    Sexe *
                  </label>
                  <div className="grid grid-cols-2 gap-4">
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, sexe: 'H' })}
                      className={`chat-tag ${formData.sexe === 'H' ? 'selected' : 'unselected'}`}
                    >
                      Homme
                    </button>
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, sexe: 'F' })}
                      className={`chat-tag ${formData.sexe === 'F' ? 'selected' : 'unselected'}`}
                    >
                      Femme
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Section Informations Complémentaires */}
            <div className="space-y-6 pt-6 border-t border-[var(--chat-bubble)]">
              <h2 className="chat-section-title">Informations Complémentaires</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="smooth-appear" style={{ animationDelay: '0.7s' }}>
                  <label htmlFor="ville" className="block text-sm font-medium text-[var(--text-secondary)] mb-1">
                    Ville
                  </label>
                  <input
                    type="text"
                    id="ville"
                    name="ville"
                    value={formData.ville}
                    onChange={(e) => setFormData({ ...formData, ville: e.target.value })}
                    className="chat-input"
                  />
                </div>

                <div className="smooth-appear" style={{ animationDelay: '0.8s' }}>
                  <label htmlFor="bio" className="block text-sm font-medium text-[var(--text-secondary)] mb-1">
                    Bio (200 caractères max)
                  </label>
                  <textarea
                    id="bio"
                    name="bio"
                    value={formData.bio}
                    onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                    maxLength={200}
                    rows={3}
                    className="chat-input"
                  />
                </div>

                <div className="md:col-span-2 smooth-appear" style={{ animationDelay: '0.9s' }}>
                  <label className="block text-sm font-medium text-[var(--text-secondary)] mb-1">
                    Photo de profil
                  </label>
                  <div className="flex items-center space-x-4">
                    <div className="chat-avatar-container">
                      <div className="chat-avatar-inner">
                        {photoPreview ? (
                          <Image
                            src={photoPreview}
                            alt="Preview"
                            fill
                            className="object-cover"
                          />
                        ) : (
                          <div className="flex items-center justify-center h-full text-[var(--text-secondary)]">
                            <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                          </div>
                        )}
                      </div>
                    </div>
                    <input
                      type="file"
                      id="photo"
                      name="photo"
                      accept="image/*"
                      onChange={handlePhotoChange}
                      className="chat-input-file"
                    />
                    <label htmlFor="photo">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                      </svg>
                      Choisir une photo
                    </label>
                  </div>
                </div>

                <div className="md:col-span-2 smooth-appear" style={{ animationDelay: '1s' }}>
                  <label className="block text-sm font-medium text-[var(--text-secondary)] mb-1">
                    Centres d'intérêt
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {INTERETS_OPTIONS.map((interet) => (
                      <button
                        key={interet}
                        type="button"
                        onClick={() => handleInteretToggle(interet)}
                        className={`chat-tag ${formData.interets.includes(interet) ? 'selected' : 'unselected'}`}
                      >
                        {interet}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="md:col-span-2 smooth-appear" style={{ animationDelay: '1.1s' }}>
                  <label className="block text-sm font-medium text-[var(--text-secondary)] mb-1">
                    Langues parlées
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {LANGUES_OPTIONS.map((langue) => (
                      <button
                        key={langue}
                        type="button"
                        onClick={() => handleLangueToggle(langue)}
                        className={`chat-tag ${formData.langues.includes(langue) ? 'selected' : 'unselected'}`}
                      >
                        {langue}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {error && (
              <div className="bg-[var(--error-color)]/10 text-[var(--error-color)] p-4 rounded-lg text-sm">
                {error}
              </div>
            )}

            <button
              type="submit"
              className="chat-button w-full"
            >
              S'inscrire
            </button>
          </form>
        </div>
      </div>
    </div>
  );
} 