const adjectives = [
  'Mystérieux', 'Secret', 'Discret', 'Anonyme', 'Inconnu',
  'Énigmatique', 'Masqué', 'Invisible', 'Caché', 'Confidentiel'
];

const nouns = [
  'Chat', 'Hibou', 'Renard', 'Loup', 'Panda',
  'Phénix', 'Dragon', 'Lion', 'Tigre', 'Aigle'
];

export function generateAnonymousName(userId: string): string {
  // Utiliser l'ID de l'utilisateur pour générer un nom cohérent
  const userIdNumber = parseInt(userId.replace(/[^0-9]/g, ''), 10) || 0;
  
  const adjectiveIndex = userIdNumber % adjectives.length;
  const nounIndex = Math.floor(userIdNumber / adjectives.length) % nouns.length;
  
  return `${adjectives[adjectiveIndex]} ${nouns[nounIndex]}`;
}

export function isAnonymousName(name: string): boolean {
  const parts = name.split(' ');
  if (parts.length !== 2) return false;
  
  return adjectives.includes(parts[0]) && nouns.includes(parts[1]);
} 