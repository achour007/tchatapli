'use client';

import { useState } from 'react';

interface RevealRequestButtonProps {
  onRequest: () => Promise<void>;
  hasRequested: boolean;
}

export default function RevealRequestButton({ onRequest, hasRequested }: RevealRequestButtonProps) {
  const [isRequesting, setIsRequesting] = useState(false);

  const handleClick = async () => {
    if (hasRequested || isRequesting) return;
    
    setIsRequesting(true);
    try {
      await onRequest();
    } catch (error) {
      console.error('Erreur lors de la demande de révélation:', error);
    } finally {
      setIsRequesting(false);
    }
  };

  return (
    <button
      onClick={handleClick}
      disabled={hasRequested || isRequesting}
      className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200
        ${hasRequested 
          ? 'bg-[var(--chat-bubble)] text-[var(--text-secondary)]' 
          : 'bg-[var(--primary-color)] text-white hover:bg-[var(--secondary-color)]'
        } disabled:opacity-50 disabled:cursor-not-allowed`}
    >
      {hasRequested 
        ? 'Demande envoyée' 
        : isRequesting 
          ? 'Envoi...' 
          : 'Demander l\'identité'}
    </button>
  );
} 