import { useState } from 'react'
import FileUpload from './FileUpload'

const Chat = ({ chatId }) => {
  const [messages, setMessages] = useState([])

  // Funkcja obsługująca przesłanie pliku
  const handleFileUpload = async (formData) => {
    // Dodanie identyfikatora czatu do formData
    formData.append('chatId', chatId)

    try {
      // Przesłanie pliku do API
      const response = await fetch('/api/uploadFile', {
        method: 'POST',
        body: formData
      })

      // Sprawdzenie, czy odpowiedź jest poprawna
      if (!response.ok) {
        throw new Error('File upload failed')
      }

      // Odczytanie URL przesłanego pliku z odpowiedzi
      const { fileUrl } = await response.json()

      // Aktualizacja stanu wiadomości
      setMessages((prevMessages) => [
        ...prevMessages,
        { message: fileUrl, type: 'file' }
      ])
    } catch (error) {
      console.error('Error uploading file:', error)
      // Można dodać tutaj obsługę błędów, np. wyświetlenie komunikatu użytkownikowi
    }
  }

  return (
    <div>
      <div>
        {/* Renderowanie wiadomości */}
        {messages.map((msg, index) => (
          <div key={index}>
            {msg.type === 'file' ? (
              <a href={msg.message} target="_blank" rel="noopener noreferrer">
                File
              </a>
            ) : (
              <span>{msg.message}</span>
            )}
          </div>
        ))}
      </div>
      {/* Komponent do przesyłania plików */}
      <FileUpload onFileUpload={handleFileUpload} />
    </div>
  )
}

export default Chat

