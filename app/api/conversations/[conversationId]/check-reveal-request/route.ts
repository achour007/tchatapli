import { NextResponse } from 'next/server';

export async function GET(
  request: Request,
  { params }: { params: { conversationId: string } }
) {
  try {
    const { conversationId } = params;
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');

    if (!userId || !conversationId) {
      return NextResponse.json(
        { message: 'Paramètres manquants' },
        { status: 400 }
      );
    }

    // TODO: Vérifier dans la base de données si une demande existe
    // Pour l'instant, on simule qu'aucune demande n'a été faite
    const hasRequested = false;

    return NextResponse.json(
      { 
        hasRequested,
        // On peut ajouter d'autres informations si nécessaire
        status: hasRequested ? 'pending' : 'none'
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Erreur lors de la vérification de la demande:', error);
    return NextResponse.json(
      { message: 'Erreur lors de la vérification de la demande' },
      { status: 500 }
    );
  }
} 