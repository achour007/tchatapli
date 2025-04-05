import { Message, Conversation, User } from '../types/chat';

export async function startNewConversation(
  senderId: string,
  receiverId: string,
  initialMessage: string
): Promise<Conversation> {
  try {
    const response = await fetch('/api/conversations', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        senderId,
        receiverId,
        initialMessage,
        isAnonymous: true, // Le premier message est toujours anonyme
      }),
    });

    if (!response.ok) {
      throw new Error('Erreur lors de la création de la conversation');
    }

    return response.json();
  } catch (error) {
    console.error('Erreur:', error);
    throw error;
  }
}

export async function sendMessage(
  conversationId: string,
  senderId: string,
  content: string
): Promise<Message> {
  try {
    const response = await fetch(`/api/conversations/${conversationId}/messages`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        senderId,
        content,
      }),
    });

    if (!response.ok) {
      throw new Error('Erreur lors de l\'envoi du message');
    }

    return response.json();
  } catch (error) {
    console.error('Erreur:', error);
    throw error;
  }
}

export async function getConversations(userId: string): Promise<Conversation[]> {
  try {
    const response = await fetch(`/api/conversations?userId=${userId}`);
    
    if (!response.ok) {
      throw new Error('Erreur lors de la récupération des conversations');
    }

    return response.json();
  } catch (error) {
    console.error('Erreur:', error);
    throw error;
  }
}

export async function getMessages(conversationId: string): Promise<Message[]> {
  try {
    const response = await fetch(`/api/conversations/${conversationId}/messages`);
    
    if (!response.ok) {
      throw new Error('Erreur lors de la récupération des messages');
    }

    return response.json();
  } catch (error) {
    console.error('Erreur:', error);
    throw error;
  }
}

export async function revealIdentity(conversationId: string, userId: string): Promise<void> {
  try {
    const response = await fetch(`/api/conversations/${conversationId}/reveal`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId,
      }),
    });

    if (!response.ok) {
      throw new Error('Erreur lors de la révélation de l\'identité');
    }
  } catch (error) {
    console.error('Erreur:', error);
    throw error;
  }
}

export async function requestRevealIdentity(
  conversationId: string,
  requesterId: string
): Promise<void> {
  try {
    const response = await fetch(`/api/conversations/${conversationId}/request-reveal`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        requesterId,
      }),
    });

    if (!response.ok) {
      throw new Error('Erreur lors de la demande de révélation d\'identité');
    }
  } catch (error) {
    console.error('Erreur:', error);
    throw error;
  }
}

export async function respondToRevealRequest(
  conversationId: string,
  requestId: string,
  accepted: boolean
): Promise<void> {
  try {
    const response = await fetch(`/api/conversations/${conversationId}/respond-reveal`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        requestId,
        accepted,
      }),
    });

    if (!response.ok) {
      throw new Error('Erreur lors de la réponse à la demande de révélation');
    }
  } catch (error) {
    console.error('Erreur:', error);
    throw error;
  }
}

export async function checkRevealRequest(
  conversationId: string,
  userId: string
): Promise<boolean> {
  try {
    const response = await fetch(
      `/api/conversations/${conversationId}/check-reveal-request?userId=${userId}`
    );
    
    if (!response.ok) {
      throw new Error('Erreur lors de la vérification de la demande de révélation');
    }

    const data = await response.json();
    return data.hasRequested;
  } catch (error) {
    console.error('Erreur:', error);
    return false;
  }
} 