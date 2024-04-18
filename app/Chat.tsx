'use client'
import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:3001'); // Reemplaza con la URL de tu servidor

const Chat: React.FC = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    // Escucha los mensajes entrantes
    socket.on('chat message', (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });
    console.log('received')
    // Limpiar efectos cuando el componente se desmonta
    return () => {
      socket.disconnect();
    };
  }, []);

  const sendMessage = () => {
    socket.emit('chat message', newMessage);
    console.log('sent')
    setNewMessage('');
  };

  return (
    <div>
      <h1>Chat</h1>
      <input
        type="text"
        className='text-black'
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
      />
      <button className='className="text-white bg-[#24292F] hover:bg-[#24292F]/90 focus:ring-4 focus:outline-none focus:ring-[#24292F]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center focus:ring-gray-500 me-2 mb-2"' onClick={sendMessage}>Enviar</button>

      <div className='bg-slate-400 w-[200px] h-[200px]'>
        {messages.map((message, index) => (
          <div key={index}>{message}</div>
        ))}
      </div>
    </div>
  );
};

export default Chat;
