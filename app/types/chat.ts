export interface User {
  id: string;
  pseudo: string;
  email: string;
  dateNaissance: string;
  sexe: 'H' | 'F';
  ville?: string;
  bio?: string;
  photo?: string;
  interets?: string[];
  langues?: string[];
}

export interface Message {
  id: string;
  content: string;
  senderId: string;
  receiverId: string;
  timestamp: number;
  isAnonymous: boolean; // Indique si le message doit être affiché de manière anonyme
  isInitialMessage: boolean; // Indique si c'est le premier message de la conversation
}

export interface Conversation {
  id: string;
  participants: string[]; // IDs des utilisateurs
  lastMessage?: Message;
  createdAt: number;
  isAnonymous: boolean; // Indique si la conversation a commencé de manière anonyme
  initiatorId: string; // ID de l'utilisateur qui a commencé la conversation
} 