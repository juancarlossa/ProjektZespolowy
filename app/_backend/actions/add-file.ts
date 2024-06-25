'use server'

import { createServerActionClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { v4 as uuidv4 } from 'uuid'

export const uploadFile = async (formData: FormData) => {
  //const file = formData.get('file') as File
  //if (!file) return

  try {
    const file = formData.get('file') as File
    const chatId = formData.get('chatId') as string
    if (!file) {
      console.error('No file provided')
      return
    }
    if (!chatId) {
      console.error('No chat ID provided')
      return
    }

  const supabase = createServerActionClient({ cookies })
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return

  const fileName = `${uuidv4()}-${file.name}`
  const { data, error } = await supabase.storage.from('images').upload(fileName, file)

  if (error) {
    console.error('Error uploading file:', error)
    return
  }

  const fileUrl = data?.publicUrl

  // Możesz teraz zapisać URL pliku w bazie danych jako wiadomość lub jako osobny rekord
  await supabase.from('messages').insert({
    message: fileUrl,
    id_user: user.id,
    chat_id: formData.get('chatId'),
    type: 'file'
  })

  console.log('File uploaded:', fileUrl)
  return fileUrl
}
  