'use server'

import { cookies } from 'next/headers'
import { createServerActionClient } from '@supabase/auth-helpers-nextjs'
import { revalidatePath } from 'next/cache'

export const editMessage = async (messageId:number) => {

  const supabase = createServerActionClient({ cookies })
  const { data: { user } } = await supabase.auth.getUser()
  if (user === null) return

  await supabase
  .from('messages')
  .update({message: "Edited message"})
  .eq('id', messageId)

  revalidatePath(`/`)
}