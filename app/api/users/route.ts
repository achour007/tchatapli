import { NextResponse } from 'next/server';
import { UserModel } from '@/app/models/User';
import connectDB from '@/app/lib/mongodb';
import bcrypt from 'bcryptjs';

// Récupérer tous les utilisateurs (avec filtres optionnels)
export async function GET(request: Request) {
  try {
    await connectDB();
    const { searchParams } = new URL(request.url);
    
    // Construire le filtre
    const filter: any = {};
    
    if (searchParams.get('sexe')) {
      filter.sexe = searchParams.get('sexe');
    }
    
    if (searchParams.get('ville')) {
      filter.ville = searchParams.get('ville');
    }
    
    if (searchParams.get('age')) {
      const age = parseInt(searchParams.get('age') || '0');
      const dateLimit = new Date();
      dateLimit.setFullYear(dateLimit.getFullYear() - age);
      filter.dateNaissance = { $lte: dateLimit };
    }
    
    if (searchParams.get('interets')) {
      const interets = searchParams.get('interets')?.split(',');
      filter.interets = { $in: interets };
    }

    const users = await UserModel.find(filter)
      .select('-password') // Exclure le mot de passe
      .limit(50); // Limiter le nombre de résultats

    return NextResponse.json(
      users.map(user => user.toUserObject()),
      { status: 200 }
    );
  } catch (error) {
    console.error('Erreur lors de la récupération des utilisateurs:', error);
    return NextResponse.json(
      { message: 'Erreur serveur' },
      { status: 500 }
    );
  }
}

// Créer un nouvel utilisateur
export async function POST(request: Request) {
  try {
    await connectDB();
    const userData = await request.json();
    
    // Validation des données
    if (!userData.email || !userData.pseudo || !userData.password || !userData.dateNaissance || !userData.sexe) {
      return NextResponse.json(
        { message: 'Données utilisateur incomplètes' },
        { status: 400 }
      );
    }

    // Vérifier si l'email existe déjà
    const existingEmail = await UserModel.findOne({ email: userData.email });
    if (existingEmail) {
      return NextResponse.json(
        { message: 'Cet email est déjà utilisé' },
        { status: 400 }
      );
    }

    // Vérifier si le pseudo existe déjà
    const existingPseudo = await UserModel.findOne({ pseudo: userData.pseudo });
    if (existingPseudo) {
      return NextResponse.json(
        { message: 'Ce pseudo est déjà utilisé' },
        { status: 400 }
      );
    }

    // Hasher le mot de passe
    const hashedPassword = await bcrypt.hash(userData.password, 10);

    // Créer le nouvel utilisateur
    const newUser = new UserModel({
      ...userData,
      password: hashedPassword,
      dateNaissance: new Date(userData.dateNaissance)
    });

    // Vérifier si l'utilisateur est majeur
    if (!newUser.isAdult()) {
      return NextResponse.json(
        { message: 'Vous devez être majeur pour vous inscrire' },
        { status: 400 }
      );
    }

    await newUser.save();

    // Retourner l'utilisateur sans le mot de passe
    const userObject = newUser.toUserObject();
    return NextResponse.json(userObject, { status: 201 });
  } catch (error) {
    console.error('Erreur lors de la création de l\'utilisateur:', error);
    return NextResponse.json(
      { message: 'Erreur serveur' },
      { status: 500 }
    );
  }
} 