'use server'

import { createServerActionClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { v4 as uuidv4 } from 'uuid'

export const uploadFile = async (formData: FormData) => {
  try {
    // Pobranie pliku i identyfikatora czatu z formData
    const file = formData.get('file') as File
    const chatId = formData.get('chatId') as string

    // Sprawdzenie, czy plik został dostarczony
    if (!file) {
      console.error('No file provided')
      return
    }

    // Sprawdzenie, czy identyfikator czatu został dostarczony
    if (!chatId) {
      console.error('No chat ID provided')
      return
    }

    // Utworzenie klienta Supabase
    const supabase = createServerActionClient({ cookies })

    // Pobranie danych użytkownika
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return

    // Generowanie unikalnej nazwy pliku
    const fileName = `${uuidv4()}-${file.name}`

    // Przesyłanie pliku do storage Supabase
    const { data, error } = await supabase.storage.from('images').upload(fileName, file)

    if (error) {
      console.error('Error uploading file:', error)
      return
    }

    // Pobranie publicznego URL przesłanego pliku
    const fileUrl = data?.publicUrl
    if (!fileUrl) {
      console.error('Failed to get public URL for the uploaded file')
      return
    }

    // Zapisanie URL pliku w bazie danych jako wiadomość
    const { error: dbError } = await supabase.from('messages').insert({
      message: fileUrl,
      id_user: user.id,
      chat_id: chatId,
      type: 'file'
    })

    if (dbError) {
      console.error('Error inserting message into database:', dbError)
      return
    }

    console.log('File uploaded:', fileUrl)
    return fileUrl
  } catch (error) {
    console.error('Unexpected error:', error)
  }
}

  