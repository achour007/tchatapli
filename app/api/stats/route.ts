import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // TODO: Récupérer les statistiques depuis la base de données
    const stats = {
      totalUsers: 0,
      onlineUsers: 0,
      maleUsers: 0,
      femaleUsers: 0,
      totalConversations: 0,
      activeConversations: 0, // Conversations avec des messages dans les dernières 24h
      totalMessages: 0,
      averageMessagesPerUser: 0,
      mostActiveCity: '',
      mostPopularInterests: [],
      mostSpokenLanguages: []
    };

    // TODO: Calculer les statistiques

    return NextResponse.json(stats, { status: 200 });
  } catch (error) {
    console.error('Erreur lors de la récupération des statistiques:', error);
    return NextResponse.json(
      { message: 'Erreur serveur' },
      { status: 500 }
    );
  }
} 