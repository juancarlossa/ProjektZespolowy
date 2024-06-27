'use server'

import { cookies } from 'next/headers'
import { createServerActionClient } from '@supabase/auth-helpers-nextjs'
import { revalidatePath } from 'next/cache'

export async function updateName (formData: FormData) {

  const name = formData.get('name')
  const supabase = createServerActionClient({ cookies })
  const { data: { user } } = await supabase.auth.getUser()
  if (user === null) return
    await supabase
      .from('users')
      .update({ name: name })
      .eq('uuid', user.id)

  console.log(name)
  }

export async function getName (): Promise<string> {

  const supabase = createServerActionClient({ cookies })
  const { data: { user } } = await supabase.auth.getUser()
  if (user === null) return ''
    const {data: nameData} = await supabase
      .from('users')
      .select('name')
      .eq('uuid', user.id)
      .single()

  if (nameData) {
    const name = nameData.name;
    console.log(name);
    return String(name);
  }

  return '';
  }