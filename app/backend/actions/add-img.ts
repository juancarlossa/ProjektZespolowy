'use server'

import { createServerActionClient, createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from 'next/headers'

export async function addImageToTable () {
  const supabase = createServerComponentClient({ cookies })
  const { data: { user } } = await supabase.auth.getUser()
  if (user === null ) return

  const img: string = user.user_metadata.avatar_url
  await supabase
    .from('users')
    .update({ img })
    .eq('uuid', user.id)
}