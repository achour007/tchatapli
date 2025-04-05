import mongoose from 'mongoose';
import { Conversation } from '../types/chat';

interface RevealRequest {
  requesterId: mongoose.Types.ObjectId;
  status: 'pending' | 'accepted' | 'rejected';
  createdAt: Date;
}

interface ConversationDocument extends mongoose.Document {
  participants: mongoose.Types.ObjectId[];
  lastMessage: mongoose.Types.ObjectId | null;
  revealRequests: RevealRequest[];
  createdAt: Date;
  updatedAt: Date;
  hasRequestedReveal(userId: string): boolean;
  addRevealRequest(requesterId: string): Promise<void>;
  respondToRevealRequest(requesterId: string, accept: boolean): Promise<void>;
  toConversation(): Conversation;
}

const conversationSchema = new mongoose.Schema({
  participants: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }],
  lastMessage: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Message',
    default: null
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
}, {
  timestamps: true
});

// Méthode pour vérifier si un utilisateur a déjà fait une demande de révélation
conversationSchema.methods.hasRequestedReveal = function(userId: string): boolean {
  return this.revealRequests.some((request: RevealRequest) => 
    request.requesterId.toString() === userId && 
    request.status === 'pending'
  );
};

// Méthode pour ajouter une demande de révélation
conversationSchema.methods.addRevealRequest = async function(requesterId: string): Promise<void> {
  if (this.hasRequestedReveal(requesterId)) {
    throw new Error('Une demande de révélation est déjà en cours');
  }

  this.revealRequests.push({
    requesterId: new mongoose.Types.ObjectId(requesterId),
    status: 'pending',
    createdAt: new Date()
  });

  await this.save();
};

// Méthode pour répondre à une demande de révélation
conversationSchema.methods.respondToRevealRequest = async function(
  requesterId: string,
  accept: boolean
): Promise<void> {
  const request = this.revealRequests.find(
    (r: RevealRequest) => r.requesterId.toString() === requesterId && r.status === 'pending'
  );

  if (!request) {
    throw new Error('Aucune demande de révélation en cours');
  }

  request.status = accept ? 'accepted' : 'rejected';
  await this.save();
};

// Méthode pour convertir en objet Conversation
conversationSchema.methods.toConversation = function(): Conversation {
  const conversation: Conversation = {
    id: this._id.toString(),
    participants: this.participants.map((p: mongoose.Types.ObjectId) => p.toString()),
    lastMessage: this.lastMessage?.toString() || null,
    createdAt: this.createdAt,
    isAnonymous: true,
    initiatorId: this.participants[0].toString()
  };
  return conversation;
};

const ConversationModel = mongoose.model<ConversationDocument>('Conversation', conversationSchema);

export default ConversationModel; 