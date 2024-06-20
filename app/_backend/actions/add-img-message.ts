'use server'
import { cookies } from 'next/headers'
import { createServerActionClient } from '@supabase/auth-helpers-nextjs'
import { v4 as uuidv4 } from 'uuid'

export const uploadImage = async (formData: FormData): Promise<string | null> => {
  const supabase = createServerActionClient({ cookies })
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return null

  const file = formData.get('image') as File
  if (!file) return null

  const fileName = `${uuidv4()}.${file.type.split('/')[1]}`

  const { data, error } = await supabase.storage
    .from('images')
    .upload(fileName, file)

  if (error) {
    console.error('Error uploading image:', error)
    return null
  }

  const { data: publicUrlData } = supabase.storage
    .from('images')
    .getPublicUrl(fileName)

  return publicUrlData.publicUrl
}