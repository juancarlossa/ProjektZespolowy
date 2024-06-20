import { useState } from 'react'
import FileUpload from './FileUpload'

const Chat = ({ chatId }) => {
  const [messages, setMessages] = useState([])

  const handleFileUpload = async (formData) => {
    formData.append('chatId', chatId)
    const response = await fetch('/api/uploadFile', {
      method: 'POST',
      body: formData
    })
    const fileUrl = await response.json()
    setMessages((prevMessages) => [...prevMessages, { message: fileUrl, type: 'file' }])
  }

  return (
    <div>
      <div>
        {messages.map((msg, index) => (
          <div key={index}>
            {msg.type === 'file' ? (
              <a href={msg.message} target="_blank" rel="noopener noreferrer">File</a>
            ) : (
              <span>{msg.message}</span>
            )}
          </div>
        ))}
      </div>
      <FileUpload onFileUpload={handleFileUpload} />
    </div>
  )
}

export default Chat
