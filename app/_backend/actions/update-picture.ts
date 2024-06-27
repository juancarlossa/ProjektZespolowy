'use server'

import { cookies } from 'next/headers'
import { createServerActionClient } from '@supabase/auth-helpers-nextjs'
import { revalidatePath } from 'next/cache'

export async function updatePicture (formData: FormData) {

  const name = formData.get('picture')
  const supabase = createServerActionClient({ cookies })
  const { data: { user } } = await supabase.auth.getUser()
  if (user === null) return
    await supabase
      .from('users')
      .update({ img: name })
      .eq('uuid', user.id)

  console.log(name)
  }

export async function getPicture (): Promise<string> {

  const supabase = createServerActionClient({ cookies })
  const { data: { user } } = await supabase.auth.getUser()
  if (user === null) return ''
    const {data: nameData} = await supabase
      .from('users')
      .select('img')
      .eq('uuid', user.id)
      .single()

  if (nameData) {
    const name = nameData.img;
    console.log(name);
    return String(name);
  }

  return '';
  }