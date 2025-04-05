import { NextResponse } from 'next/server';
import ConversationModel from '@/app/models/Conversation';
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
        { error: 'ID utilisateur requis' },
        { status: 400 }
      );
    }

    // Récupérer les conversations de l'utilisateur
    const conversations = await ConversationModel.find({
      participants: userId
    })
      .sort({ updatedAt: -1 })
      .populate('participants', 'pseudo photo')
      .populate('lastMessage');

    return NextResponse.json(
      conversations.map(conv => conv.toConversation())
    );
  } catch (error) {
    console.error('Erreur lors de la récupération des conversations:', error);
    return NextResponse.json(
      { error: 'Erreur serveur' },
      { status: 500 }
    );
  }
}

// Créer une nouvelle conversation
export async function POST(request: Request) {
  try {
    await connectDB();
    const { senderId, receiverId, initialMessage } = await request.json();

    if (!senderId || !receiverId || !initialMessage) {
      return NextResponse.json(
        { error: 'Tous les champs sont requis' },
        { status: 400 }
      );
    }

    // Vérifier si une conversation existe déjà
    const existingConversation = await ConversationModel.findOne({
      participants: { $all: [senderId, receiverId] }
    });

    if (existingConversation) {
      return NextResponse.json(
        { error: 'Une conversation existe déjà' },
        { status: 400 }
      );
    }

    // Créer une nouvelle conversation
    const conversation = await ConversationModel.create({
      participants: [senderId, receiverId]
    });

    // Créer le message initial
    const message = await MessageModel.create({
      conversationId: conversation._id,
      senderId,
      content: initialMessage,
      isAnonymous: true
    });

    // Mettre à jour la dernière conversation
    conversation.lastMessage = message._id;
    await conversation.save();

    // Récupérer la conversation avec les données populées
    const populatedConversation = await ConversationModel.findById(conversation._id)
      .populate('participants', 'pseudo photo')
      .populate('lastMessage');

    return NextResponse.json(populatedConversation?.toConversation());
  } catch (error) {
    console.error('Erreur lors de la création de la conversation:', error);
    return NextResponse.json(
      { error: 'Erreur serveur' },
      { status: 500 }
    );
  }
} 