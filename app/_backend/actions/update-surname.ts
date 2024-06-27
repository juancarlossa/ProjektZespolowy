'use server'

import { cookies } from 'next/headers'
import { createServerActionClient } from '@supabase/auth-helpers-nextjs'
import { revalidatePath } from 'next/cache'

export async function updateSurname (formData: FormData) {

  const surname = formData.get('surname')
  const supabase = createServerActionClient({ cookies })
  const { data: { user } } = await supabase.auth.getUser()
  if (user === null) return
    await supabase
      .from('users')
      .update({ surname: surname })
      .eq('uuid', user.id)

  console.log(surname)
  }

export async function getSurname (): Promise<string> {

  const supabase = createServerActionClient({ cookies })
  const { data: { user } } = await supabase.auth.getUser()
  if (user === null) return ''
    const {data: nameData} = await supabase
      .from('users')
      .select('surname')
      .eq('uuid', user.id)
      .single()

  if (nameData) {
    const surname = nameData.surname;
    console.log(surname);
    return String(surname);
  }

  return '';
  }