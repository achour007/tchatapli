import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    // Validation des champs
    if (!email || !password) {
      return NextResponse.json(
        { message: 'Email et mot de passe requis' },
        { status: 400 }
      );
    }

    // TODO: Vérifier les identifiants dans la base de données
    // Pour l'instant, on simule une connexion réussie
    // À remplacer par la vérification réelle des identifiants

    // Simulation d'une connexion réussie
    return NextResponse.json(
      { 
        message: 'Connexion réussie',
        // Vous pouvez ajouter d'autres données utilisateur ici
        user: {
          email,
          // autres données utilisateur...
        }
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Erreur lors de la connexion:', error);
    return NextResponse.json(
      { message: 'Une erreur est survenue lors de la connexion' },
      { status: 500 }
    );
  }
} 