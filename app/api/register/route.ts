import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    
    // Extraction des données du formulaire
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    const pseudo = formData.get('pseudo') as string;
    const dateNaissance = formData.get('dateNaissance') as string;
    const sexe = formData.get('sexe') as string;
    const ville = formData.get('ville') as string;
    const bio = formData.get('bio') as string;
    const photo = formData.get('photo') as File;
    const interets = JSON.parse(formData.get('interets') as string);
    const langues = JSON.parse(formData.get('langues') as string);

    // Validation des champs obligatoires
    if (!email || !password || !pseudo || !dateNaissance || !sexe) {
      return NextResponse.json(
        { message: 'Les champs obligatoires sont manquants' },
        { status: 400 }
      );
    }

    // Validation de l'email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { message: 'Format d\'email invalide' },
        { status: 400 }
      );
    }

    // Validation du pseudo
    if (pseudo.length < 3 || pseudo.length > 20) {
      return NextResponse.json(
        { message: 'Le pseudo doit contenir entre 3 et 20 caractères' },
        { status: 400 }
      );
    }

    // Validation du mot de passe
    if (password.length < 8) {
      return NextResponse.json(
        { message: 'Le mot de passe doit contenir au moins 8 caractères' },
        { status: 400 }
      );
    }

    // Validation de l'âge
    const birthDate = new Date(dateNaissance);
    const today = new Date();
    const age = today.getFullYear() - birthDate.getFullYear();
    if (age < 18) {
      return NextResponse.json(
        { message: 'Vous devez avoir au moins 18 ans pour vous inscrire' },
        { status: 400 }
      );
    }

    // Validation du sexe
    if (!['H', 'F'].includes(sexe)) {
      return NextResponse.json(
        { message: 'Le sexe doit être H ou F' },
        { status: 400 }
      );
    }

    // Validation de la bio
    if (bio && bio.length > 200) {
      return NextResponse.json(
        { message: 'La bio ne doit pas dépasser 200 caractères' },
        { status: 400 }
      );
    }

    // Validation de la photo
    if (photo) {
      const validTypes = ['image/jpeg', 'image/png', 'image/gif'];
      if (!validTypes.includes(photo.type)) {
        return NextResponse.json(
          { message: 'Format de photo non supporté. Utilisez JPG, PNG ou GIF' },
          { status: 400 }
        );
      }
      if (photo.size > 5 * 1024 * 1024) { // 5MB max
        return NextResponse.json(
          { message: 'La photo ne doit pas dépasser 5MB' },
          { status: 400 }
        );
      }
    }

    // TODO: Ajouter la logique pour sauvegarder l'utilisateur dans la base de données
    // TODO: Gérer le stockage de la photo
    // TODO: Hasher le mot de passe avant de le stocker
    // TODO: Vérifier si l'email est déjà utilisé
    // TODO: Vérifier si le pseudo est déjà utilisé

    return NextResponse.json(
      { message: 'Inscription réussie' },
      { status: 201 }
    );
  } catch (error) {
    console.error('Erreur lors de l\'inscription:', error);
    return NextResponse.json(
      { message: 'Une erreur est survenue lors de l\'inscription' },
      { status: 500 }
    );
  }
} 