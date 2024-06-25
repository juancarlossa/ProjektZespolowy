'use server'

import { cookies } from 'next/headers'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { Database } from '@/app/types/supabase'

const supabase = createServerComponentClient<Database>({ cookies })

export const getFriendsByUserId = async (userId: string) => {
  const { data: { user } } = await supabase.auth.getUser()
  if (user === null) return

  const friend = await getEmailFriendsListByUserId(userId)

  const { data: friendsList } = await supabase
    .from('users')
    .select('*')
    .in('email', [friend])
  if (friendsList === null) return
  if(friendsList === undefined) return  

  return friendsList
}

//Traernos la lista 'email_friendds_list' a partir del uuid. la funcion retorna una lista
export const getEmailFriendsListByUserId = async (userId: string) => {
  const { data: { user } } = await supabase.auth.getUser()
  if (user === null) return

  const { data: friendsList } = await supabase
    .from('users')
    .select('email_friends_list')
    .eq('uuid', userId)
  if (friendsList === null) return

  const emailFriendsList: string[] = [];
  friendsList?.map((friend) => ( friend.email_friends_list ? emailFriendsList.push(...friend.email_friends_list) : ''))

  return emailFriendsList
}

//Traernos 
export const getFriendIdByEmail = async (email: string) => {
  const { data: { user } } = await supabase.auth.getUser()
  if (user === null) return

  const { data: friends } = await supabase
    .from('users')
    .select('uuid')
    .eq('email', email)
    .single()
  if (friends === null) return
  //single garantiza un solo resultado -> convertir a string por ejemplo
  
  const friend:string = friends?.uuid
  return friend
}