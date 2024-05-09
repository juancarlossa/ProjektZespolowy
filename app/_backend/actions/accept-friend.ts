'use server'

import { cookies } from 'next/headers'
import { createServerActionClient } from '@supabase/auth-helpers-nextjs'
import { revalidatePath } from 'next/cache'

export const addFriend = async (newFriend:string) => {

  const supabase = createServerActionClient({ cookies })
  const { data: { user } } = await supabase.auth.getUser()
  if (user === null) return

  await supabase.from('users').insert({ email_friends_list:[newFriend] })
  revalidatePath(`/`)
  console.log('added friend')
}