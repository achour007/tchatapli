import mongoose from 'mongoose';
import { Message } from '../types/chat';

const messageSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true
  },
  senderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  receiverId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  conversationId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Conversation',
    required: true
  },
  timestamp: {
    type: Date,
    default: Date.now
  },
  isAnonymous: {
    type: Boolean,
    default: false
  },
  isInitialMessage: {
    type: Boolean,
    default: false
  },
  isRead: {
    type: Boolean,
    default: false
  }
});

// Méthode pour convertir en objet Message
messageSchema.methods.toMessageObject = function(): Message {
  return {
    id: this._id.toString(),
    content: this.content,
    senderId: this.senderId.toString(),
    receiverId: this.receiverId.toString(),
    timestamp: this.timestamp.getTime(),
    isAnonymous: this.isAnonymous,
    isInitialMessage: this.isInitialMessage
  };
};

// Index pour améliorer les performances des requêtes
messageSchema.index({ conversationId: 1, timestamp: -1 });
messageSchema.index({ senderId: 1, timestamp: -1 });
messageSchema.index({ receiverId: 1, timestamp: -1 });

export const MessageModel = mongoose.models.Message || mongoose.model('Message', messageSchema); 