'use server';

import { cookies } from 'next/headers';
import { createServerActionClient } from '@supabase/auth-helpers-nextjs';
import { revalidatePath } from 'next/cache';

export const getUnacceptedFriends = async () => {

  const supabase = createServerActionClient({ cookies });
  const { data: { user } } = await supabase.auth.getUser();
  if (user === null) return;

  console.log(user?.email)

  const { data } = await supabase
  .from('users')
  .select('*')

  if(data === null) return;
  const unacceptedFriends = data.map(((row) => {
    for(const col of row.email_friends_list){
      if(col === user.email) return row
    }
  }));

  revalidatePath(`/`);

  return unacceptedFriends.filter(v => v);
}