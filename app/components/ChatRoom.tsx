'use client';

import { useEffect, useState, useRef } from 'react';
import { io, Socket } from 'socket.io-client';

interface Message {
  room: string;
  message: string;
  user: string;
}

export default function ChatRoom() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [message, setMessage] = useState('');
  const [room, setRoom] = useState('general');
  const [user, setUser] = useState('Anonymous');
  const socketRef = useRef<Socket>();

  useEffect(() => {
    // Initialisation de la connexion Socket.IO avec le chemin correct
    socketRef.current = io({
      path: '/api/socket',
      addTrailingSlash: false,
    });

    // Gestion des messages entrants
    socketRef.current.on('message', (data: Message) => {
      setMessages((prev) => [...prev, data]);
    });

    // Rejoindre la room par défaut
    socketRef.current.emit('join', room);

    return () => {
      socketRef.current?.disconnect();
    };
  }, [room]);

  const sendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() && socketRef.current) {
      const messageData = {
        room,
        message,
        user,
      };
      socketRef.current.emit('message', messageData);
      setMessage('');
    }
  };

  return (
    <div className="flex flex-col h-screen max-w-4xl mx-auto p-4">
      <div className="flex-1 overflow-y-auto mb-4 p-4 border rounded-lg">
        {messages.map((msg, index) => (
          <div key={index} className="mb-2">
            <span className="font-bold">{msg.user}: </span>
            <span>{msg.message}</span>
          </div>
        ))}
      </div>
      
      <form onSubmit={sendMessage} className="flex gap-2">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message..."
          className="flex-1 p-2 border rounded"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Send
        </button>
      </form>
    </div>
  );
} 