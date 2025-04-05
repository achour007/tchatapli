import { NextResponse } from 'next/server';
import { MessageModel } from '@/app/models/Message';
import { ConversationModel } from '@/app/models/Conversation';
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

    if (!conversationId) {
      return NextResponse.json(
        { message: 'ID de conversation requis' },
        { status: 400 }
      );
    }

    // Vérifier que la conversation existe
    const conversation = await ConversationModel.findById(conversationId);
    if (!conversation) {
      return NextResponse.json(
        { message: 'Conversation non trouvée' },
        { status: 404 }
      );
    }

    // Récupérer les messages avec pagination
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '50');
    const skip = (page - 1) * limit;

    const messages = await MessageModel.find({ conversationId })
      .sort({ timestamp: -1 })
      .skip(skip)
      .limit(limit)
      .populate('senderId', 'pseudo photo');

    return NextResponse.json(
      messages.map(msg => msg.toMessageObject()),
      { status: 200 }
    );
  } catch (error) {
    console.error('Erreur lors de la récupération des messages:', error);
    return NextResponse.json(
      { message: 'Erreur serveur' },
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

    if (!conversationId || !senderId || !content) {
      return NextResponse.json(
        { message: 'Données manquantes' },
        { status: 400 }
      );
    }

    // Vérifier que la conversation existe et récupérer ses détails
    const conversation = await ConversationModel.findById(conversationId);
    if (!conversation) {
      return NextResponse.json(
        { message: 'Conversation non trouvée' },
        { status: 404 }
      );
    }

    // Vérifier que l'utilisateur fait partie de la conversation
    if (!conversation.participants.includes(new mongoose.Types.ObjectId(senderId))) {
      return NextResponse.json(
        { message: 'Utilisateur non autorisé' },
        { status: 403 }
      );
    }

    // Trouver le receiverId (l'autre participant)
    const receiverId = conversation.participants.find(
      p => p.toString() !== senderId
    );

    // Créer le nouveau message
    const newMessage = new MessageModel({
      content,
      senderId: new mongoose.Types.ObjectId(senderId),
      receiverId,
      conversationId: new mongoose.Types.ObjectId(conversationId),
      isAnonymous: conversation.isAnonymous && conversation.initiatorId.toString() === senderId,
      isInitialMessage: false
    });

    await newMessage.save();

    // Mettre à jour le dernier message de la conversation
    conversation.lastMessage = newMessage._id;
    await conversation.save();

    // Retourner le message avec les informations de l'expéditeur
    const populatedMessage = await newMessage.populate('senderId', 'pseudo photo');

    return NextResponse.json(
      populatedMessage.toMessageObject(),
      { status: 201 }
    );
  } catch (error) {
    console.error('Erreur lors de l\'envoi du message:', error);
    return NextResponse.json(
      { message: 'Erreur serveur' },
      { status: 500 }
    );
  }
} 