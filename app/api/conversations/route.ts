import { NextResponse } from 'next/server';
import { ConversationModel } from '@/app/models/Conversation';
import { MessageModel } from '@/app/models/Message';
import connectDB from '@/app/lib/mongodb';
import mongoose from 'mongoose';

// Récupérer les conversations d'un utilisateur
export async function GET(request: Request) {
  try {
    await connectDB();
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');

    if (!userId) {
      return NextResponse.json(
        { message: 'ID utilisateur requis' },
        { status: 400 }
      );
    }

    // Récupérer les conversations avec le dernier message
    const conversations = await ConversationModel.find({
      participants: userId
    })
    .populate('lastMessage')
    .populate('participants', 'pseudo photo')
    .sort({ 'lastMessage.timestamp': -1 });

    return NextResponse.json(
      conversations.map(conv => conv.toConversationObject()),
      { status: 200 }
    );
  } catch (error) {
    console.error('Erreur lors de la récupération des conversations:', error);
    return NextResponse.json(
      { message: 'Erreur serveur' },
      { status: 500 }
    );
  }
}

// Créer une nouvelle conversation
export async function POST(request: Request) {
  try {
    await connectDB();
    const { senderId, receiverId, initialMessage, isAnonymous = true } = await request.json();

    if (!senderId || !receiverId || !initialMessage) {
      return NextResponse.json(
        { message: 'Données manquantes' },
        { status: 400 }
      );
    }

    // Vérifier qu'une conversation n'existe pas déjà
    const existingConversation = await ConversationModel.findOne({
      participants: { $all: [senderId, receiverId] }
    });

    if (existingConversation) {
      return NextResponse.json(
        { message: 'Une conversation existe déjà entre ces utilisateurs' },
        { status: 400 }
      );
    }

    // Créer la conversation
    const conversation = new ConversationModel({
      participants: [senderId, receiverId],
      initiatorId: senderId,
      isAnonymous
    });

    // Créer le premier message
    const message = new MessageModel({
      content: initialMessage,
      senderId: new mongoose.Types.ObjectId(senderId),
      receiverId: new mongoose.Types.ObjectId(receiverId),
      conversationId: conversation._id,
      isAnonymous,
      isInitialMessage: true
    });

    // Sauvegarder le message et mettre à jour la conversation
    await message.save();
    conversation.lastMessage = message._id;
    await conversation.save();

    // Retourner la conversation avec le message
    const populatedConversation = await conversation
      .populate('lastMessage')
      .populate('participants', 'pseudo photo');

    return NextResponse.json(
      populatedConversation.toConversationObject(),
      { status: 201 }
    );
  } catch (error) {
    console.error('Erreur lors de la création de la conversation:', error);
    return NextResponse.json(
      { message: 'Erreur serveur' },
      { status: 500 }
    );
  }
} 