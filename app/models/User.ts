import mongoose from 'mongoose';
import { User } from '../types/chat';

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  pseudo: {
    type: String,
    required: true,
    unique: true,
    minlength: 3,
    maxlength: 20,
  },
  password: {
    type: String,
    required: true,
  },
  dateNaissance: {
    type: Date,
    required: true,
  },
  sexe: {
    type: String,
    required: true,
    enum: ['H', 'F'],
  },
  ville: String,
  bio: {
    type: String,
    maxlength: 200,
  },
  photo: String,
  interets: [String],
  langues: [String],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  lastActive: {
    type: Date,
    default: Date.now,
  },
  isOnline: {
    type: Boolean,
    default: false,
  }
});

// Méthode pour vérifier si un utilisateur est majeur
userSchema.methods.isAdult = function(): boolean {
  const today = new Date();
  const birthDate = new Date(this.dateNaissance);
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  
  return age >= 18;
};

// Convertir le document Mongoose en objet User
userSchema.methods.toUserObject = function(): User {
  return {
    id: this._id.toString(),
    email: this.email,
    pseudo: this.pseudo,
    dateNaissance: this.dateNaissance.toISOString(),
    sexe: this.sexe,
    ville: this.ville,
    bio: this.bio,
    photo: this.photo,
    interets: this.interets,
    langues: this.langues,
  };
};

export const UserModel = mongoose.models.User || mongoose.model('User', userSchema); 