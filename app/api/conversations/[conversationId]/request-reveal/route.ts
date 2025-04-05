import { NextResponse } from 'next/server';

export async function POST(
  request: Request,
  { params }: { params: { conversationId: string } }
) {
  try {
    const { requesterId } = await request.json();
    const { conversationId } = params;

    if (!requesterId || !conversationId) {
      return NextResponse.json(
        { message: 'Paramètres manquants' },
        { status: 400 }
      );
    }

    // TODO: Vérifier que l'utilisateur a accès à cette conversation
    // TODO: Vérifier que la conversation est bien en mode anonyme
    // TODO: Vérifier que l'utilisateur n'a pas déjà fait une demande

    // Simuler l'enregistrement de la demande
    // À remplacer par l'enregistrement dans la base de données
    console.log(`Nouvelle demande de révélation d'identité :`, {
      conversationId,
      requesterId,
      timestamp: new Date().toISOString()
    });

    // Envoyer une notification à l'initiateur de la conversation
    // TODO: Implémenter le système de notification en temps réel

    return NextResponse.json(
      { message: 'Demande envoyée avec succès' },
      { status: 200 }
    );

  } catch (error) {
    console.error('Erreur lors de la demande de révélation:', error);
    return NextResponse.json(
      { message: 'Erreur lors de la demande de révélation' },
      { status: 500 }
    );
  }
} 