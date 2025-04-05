'use client';

interface RevealConfirmDialogProps {
  isOpen: boolean;
  onConfirm: () => void;
  onReject: () => void;
  requesterName: string;
}

export default function RevealConfirmDialog({
  isOpen,
  onConfirm,
  onReject,
  requesterName
}: RevealConfirmDialogProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-6 max-w-md w-full mx-4 shadow-xl animate-fade-in">
        <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-2">
          Demande de révélation d'identité
        </h3>
        
        <p className="text-[var(--text-secondary)] mb-6">
          {requesterName} souhaite connaître votre véritable identité. Acceptez-vous de la révéler ?
        </p>

        <div className="flex gap-4 justify-end">
          <button
            onClick={onReject}
            className="px-4 py-2 rounded-lg text-sm font-medium
              bg-[var(--chat-bubble)] text-[var(--text-secondary)]
              hover:bg-[var(--chat-bubble)]/80 transition-colors"
          >
            Non
          </button>
          
          <button
            onClick={onConfirm}
            className="px-4 py-2 rounded-lg text-sm font-medium
              bg-[var(--primary-color)] text-white
              hover:bg-[var(--secondary-color)] transition-colors"
          >
            Oui
          </button>
        </div>
      </div>
    </div>
  );
} 