'use client';

import { useState, useEffect } from 'react';
import { Message, User } from '../types/chat';
import { generateAnonymousName } from '../utils/anonymousNames';
import { checkRevealRequest, requestRevealIdentity, respondToRevealRequest } from '../services/chatService';
import Image from 'next/image';
import RevealRequestButton from './RevealRequestButton';
import RevealConfirmDialog from './RevealConfirmDialog';

interface ChatMessageProps {
  message: Message;
  sender: User;
  currentUserId: string;
  showAvatar?: boolean;
  conversationId: string;
}

export default function ChatMessage({ 
  message, 
  sender, 
  currentUserId, 
  showAvatar = true,
  conversationId
}: ChatMessageProps) {
  const isOwnMessage = message.senderId === currentUserId;
  const [hasRequested, setHasRequested] = useState(false);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  
  // Déterminer si on doit afficher un pseudo anonyme
  const shouldShowAnonymous = message.isAnonymous && !isOwnMessage;
  const displayName = shouldShowAnonymous ? generateAnonymousName(sender.id) : sender.pseudo;

  useEffect(() => {
    if (shouldShowAnonymous) {
      checkRevealRequest(conversationId, currentUserId)
        .then(setHasRequested)
        .catch(console.error);
    }
  }, [conversationId, currentUserId, shouldShowAnonymous]);

  const handleRevealRequest = async () => {
    await requestRevealIdentity(conversationId, currentUserId);
    setHasRequested(true);
  };

  const handleConfirmReveal = async () => {
    await respondToRevealRequest(conversationId, message.id, true);
    setShowConfirmDialog(false);
  };

  const handleRejectReveal = async () => {
    await respondToRevealRequest(conversationId, message.id, false);
    setShowConfirmDialog(false);
  };

  return (
    <>
      <div className={`flex items-end gap-2 mb-4 ${isOwnMessage ? 'flex-row-reverse' : 'flex-row'}`}>
        {showAvatar && (
          <div className="flex-shrink-0">
            <div className="chat-avatar-container w-8 h-8">
              <div className="chat-avatar-inner">
                {sender.photo ? (
                  <Image
                    src={sender.photo}
                    alt={displayName}
                    fill
                    className="object-cover rounded-full"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-[var(--primary-color)] text-white rounded-full">
                    {displayName.charAt(0).toUpperCase()}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
        
        <div className={`flex flex-col ${isOwnMessage ? 'items-end' : 'items-start'}`}>
          <span className="text-xs text-[var(--text-secondary)] mb-1">
            {displayName}
          </span>
          
          <div className={`max-w-[70%] px-4 py-2 rounded-2xl ${
            isOwnMessage 
              ? 'bg-gradient-to-r from-[var(--primary-color)] to-[var(--secondary-color)] text-white' 
              : 'bg-[var(--chat-bubble)] text-[var(--text-primary)]'
          }`}>
            <p className="text-sm">{message.content}</p>
          </div>
          
          <div className="flex items-center gap-2 mt-1">
            <span className="text-xs text-[var(--text-secondary)]">
              {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </span>

            {shouldShowAnonymous && !isOwnMessage && (
              <RevealRequestButton
                onRequest={handleRevealRequest}
                hasRequested={hasRequested}
              />
            )}
          </div>
        </div>
      </div>

      <RevealConfirmDialog
        isOpen={showConfirmDialog}
        onConfirm={handleConfirmReveal}
        onReject={handleRejectReveal}
        requesterName={displayName}
      />
    </>
  );
} 