import mongoose from 'mongoose';
import { Conversation } from '../types/chat';

const conversationSchema = new mongoose.Schema({
  participants: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }],
  lastMessage: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Message'
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  isAnonymous: {
    type: Boolean,
    default: true
  },
  initiatorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  revealRequests: [{
    requesterId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    status: {
      type: String,
      enum: ['pending', 'accepted', 'rejected'],
      default: 'pending'
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  }]
});

// Méthode pour vérifier si un utilisateur a déjà fait une demande de révélation
conversationSchema.methods.hasRequestedReveal = function(userId: string): boolean {
  return this.revealRequests.some(request => 
    request.requesterId.toString() === userId && 
    request.status === 'pending'
  );
};

// Méthode pour convertir en objet Conversation
conversationSchema.methods.toConversationObject = function(): Conversation {
  return {
    id: this._id.toString(),
    participants: this.participants.map(p => p.toString()),
    lastMessage: this.lastMessage,
    createdAt: this.createdAt.getTime(),
    isAnonymous: this.isAnonymous,
    initiatorId: this.initiatorId.toString()
  };
};

export const ConversationModel = mongoose.models.Conversation || 
  mongoose.model('Conversation', conversationSchema); 