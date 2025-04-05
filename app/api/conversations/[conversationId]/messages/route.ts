import { NextResponse } from 'next/server';
import { MessageModel } from '@/app/models/Message';
import ConversationModel from '@/app/models/Conversation';
import connectDB from '@/app/lib/mongodb';
import mongoose from 'mongoose';

// Récupérer les messages d'une conversation
export async function GET(
  request: Request,
  { params }: { params: { conversationId: string } }
) {
  try {
    await connectDB();
    const { conversationId } = params;

    // Vérifier si la conversation existe
    const conversation = await ConversationModel.findById(conversationId);
    if (!conversation) {
      return NextResponse.json(
        { error: 'Conversation non trouvée' },
        { status: 404 }
      );
    }

    // Récupérer les messages avec pagination
    const messages = await MessageModel.find({ conversationId })
      .sort({ createdAt: -1 })
      .limit(50)
      .populate('senderId', 'pseudo');

    return NextResponse.json(messages);
  } catch (error) {
    console.error('Erreur lors de la récupération des messages:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la récupération des messages' },
      { status: 500 }
    );
  }
}

// Ajouter un nouveau message
export async function POST(
  request: Request,
  { params }: { params: { conversationId: string } }
) {
  try {
    await connectDB();
    const { conversationId } = params;
    const { senderId, content } = await request.json();

    // Vérifier si la conversation existe
    const conversation = await ConversationModel.findById(conversationId);
    if (!conversation) {
      return NextResponse.json(
        { error: 'Conversation non trouvée' },
        { status: 404 }
      );
    }

    // Vérifier si l'utilisateur fait partie de la conversation
    if (!conversation.participants.includes(senderId)) {
      return NextResponse.json(
        { error: 'Vous ne faites pas partie de cette conversation' },
        { status: 403 }
      );
    }

    // Trouver le receiverId (l'autre participant)
    const receiverId = conversation.participants.find(
      (p: mongoose.Types.ObjectId | string) => p.toString() !== senderId
    );

    if (!receiverId) {
      return NextResponse.json(
        { error: 'Impossible de trouver le destinataire' },
        { status: 400 }
      );
    }

    // Créer le nouveau message
    const message = await MessageModel.create({
      conversationId,
      senderId,
      receiverId,
      content,
    });

    // Mettre à jour le dernier message de la conversation
    conversation.lastMessage = message._id;
    await conversation.save();

    // Populer le message avec les informations de l'expéditeur
    await message.populate('senderId', 'pseudo');

    return NextResponse.json(message, { status: 201 });
  } catch (error) {
    console.error('Erreur lors de la création du message:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la création du message' },
      { status: 500 }
    );
  }
} 