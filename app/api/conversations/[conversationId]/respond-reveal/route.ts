import { NextResponse } from 'next/server';

export async function POST(
  request: Request,
  { params }: { params: { conversationId: string } }
) {
  try {
    const { requestId, accepted } = await request.json();
    const { conversationId } = params;

    if (!requestId || accepted === undefined || !conversationId) {
      return NextResponse.json(
        { message: 'Paramètres manquants' },
        { status: 400 }
      );
    }

    // TODO: Vérifier que la demande existe et est en attente
    // TODO: Vérifier que l'utilisateur est bien l'initiateur de la conversation
    
    if (accepted) {
      // TODO: Mettre à jour le statut de la conversation pour révéler l'identité
      console.log(`Identité révélée dans la conversation ${conversationId}`);
      
      return NextResponse.json(
        { 
          message: 'Identité révélée avec succès',
          status: 'revealed'
        },
        { status: 200 }
      );
    } else {
      // TODO: Marquer la demande comme refusée
      console.log(`Demande de révélation refusée pour la conversation ${conversationId}`);
      
      return NextResponse.json(
        { 
          message: 'Demande refusée',
          status: 'rejected'
        },
        { status: 200 }
      );
    }

  } catch (error) {
    console.error('Erreur lors de la réponse à la demande:', error);
    return NextResponse.json(
      { message: 'Erreur lors de la réponse à la demande' },
      { status: 500 }
    );
  }
} 