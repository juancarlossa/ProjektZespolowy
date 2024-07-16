'use server'

import { cookies } from 'next/headers'
import { createServerActionClient } from '@supabase/auth-helpers-nextjs'
import { revalidatePath } from 'next/cache'

export const deleteFriend = async (friendEmail:string) => {
  const email = friendEmail

  if (email === null) return
  else if (email === '') return

  const supabase = createServerActionClient({ cookies })
  const { data: { user } } = await supabase.auth.getUser()
  if (user === null) return

  const { data: friends } = await supabase 
    .from('users')
    .select('email_friends_list')
    .eq('uuid', user.id)

  function getFriendsList() {
    const emailList: string[] = [];
    if (email != null) {
      friends?.forEach(friend => {
        if (friend.hasOwnProperty('email_friends_list') && (friend.email_friends_list != null)) {
          emailList.push(...friend.email_friends_list);
        }
      });
      const parsedEmail = email.toString()
      const index = emailList.indexOf(parsedEmail)
      if (index > -1) {
        emailList.splice(index, 1) // Elimina el email de la lista
      }

      return emailList
    } else if (email == null) {
      return emailList
    }
  }

  await supabase
  .from('users')
  .update({email_friends_list: getFriendsList()})
  .eq('uuid', user.id)

  revalidatePath(`/`)
  console.log('deleted friend: ' + getFriendsList())
}