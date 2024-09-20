'use server'

import { cookies } from 'next/headers'
import { createServerActionClient } from '@supabase/auth-helpers-nextjs'
import { revalidatePath } from 'next/cache'

export async function updateTelefon (formData: FormData) {

  const telefon = formData.get('telefon')
  const supabase = createServerActionClient({ cookies })
  const { data: { user } } = await supabase.auth.getUser()
  if (user === null) return

  await supabase
    .from('users')
    .update({ telefon: telefon })
    .eq('uuid', user.id)

}

export async function getTelefon (): Promise<string> {

  const supabase = createServerActionClient({ cookies })
  const { data: { user } } = await supabase.auth.getUser()
  if (user === null) return ''
    const {data: nameData} = await supabase
      .from('users')
      .select('telefon')
      .eq('uuid', user.id)
      .single()

  if (nameData) {
    const telefon = nameData.telefon;
    return String(telefon);
  }

  return '';

}
