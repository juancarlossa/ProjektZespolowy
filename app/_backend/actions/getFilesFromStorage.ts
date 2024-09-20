'use server';

import { cookies } from 'next/headers'
import { createServerActionClient } from '@supabase/auth-helpers-nextjs'


export default async function getSignedUrlFromStorage (link: string): Promise<string | undefined> {
  if(!link) return;

  const supabase = createServerActionClient({ cookies })

  const { data } = await supabase
    .storage
    .from("fileStorage")
    .createSignedUrl(String(link), 60);

  if(!data) return;

  return data.signedUrl
}


export async function getPublicUrlFromStorage (link: string): Promise<string | undefined> {
  if(!link) return;

  const supabase = createServerActionClient({ cookies });

  const { data } = supabase
    .storage
    .from("fileStorage")
    .getPublicUrl(String(link));

  if(!data) return;
  return data.publicUrl
}