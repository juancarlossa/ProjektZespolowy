'use server'

import { cookies } from 'next/headers'
import { createServerActionClient } from '@supabase/auth-helpers-nextjs'
import { revalidatePath } from 'next/cache'

export async function updateEmail (formData: FormData) {

  const email = formData.get('email')
  const supabase = createServerActionClient({ cookies })
  const { data: { user } } = await supabase.auth.getUser()
  if (user === null) return
    await supabase
      .from('users')
      .update({ email: email })
      .eq('uuid', user.id)

  console.log(email)
  console.log(user!.email)
  }

export async function updateUsername (formData: FormData) {

  const username = formData.get('username')
  const supabase = createServerActionClient({ cookies })
  const { data: { user } } = await supabase.auth.getUser()
  if (user === null) return
    await supabase
      .from('users')
      .update({ username: username })
      .eq('uuid', user.id)

  console.log(username)
  }