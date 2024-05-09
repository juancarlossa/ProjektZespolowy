'use server'

import { cookies } from 'next/headers'
import { createServerActionClient } from '@supabase/auth-helpers-nextjs'
import { pusherServer } from '../helpers/pusher'
import { User } from '@/app/types/user'
import { randomUUID } from 'crypto'

export const addMessage = async (formData: FormData, chatId: string, chatPartnerId:string) => {
  const message = formData.get('message')

  if (message === null) return
  else if (message === '') return

  const supabase = createServerActionClient({ cookies })
  const { data: { user } } = await supabase.auth.getUser()
  if (user === null) return

  const { data: chatUser }: { data: User | null } = await supabase
    .from('users')
    .select('*')
    .eq('uuid', user.id)
    .single()
  if (chatUser === null) return

  await supabase.from('messages').insert({ 
    message, 
    id_user: user?.id,
    id_receiver: chatPartnerId, 
    email:user?.email, 
    chat_id:chatId,
    user_img: chatUser.img
  })

  const msg = { created_at: new Date(), message: message , id_user: user?.id, email:user?.email, id: randomUUID() }
  //revalidatePath(`/`)
  pusherServer.trigger(chatId, 'incoming-message', msg)
  pusherServer.trigger(chatPartnerId, 'new_message', {
    ...msg,
    senderImg: chatUser.img,
    senderName: chatUser.email
  })
  console.log('added message: ', user.id)
}

