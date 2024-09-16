'use server';

import { cookies } from 'next/headers';
import { createServerActionClient } from '@supabase/auth-helpers-nextjs';
import { pusherServer } from '../helpers/pusher';
import { User } from '@/app/types/user';
import { randomUUID } from 'crypto';

export const addMessage = async (formData: FormData, chatId: string, chatPartnerId:string) => {
  const message = formData.get('message');
  const file = formData.get("file") as File;

  console.log("\n\n\n\n\n\n\n");
  console.log("debug");
  console.log(message);
  console.log(message !== null);
  console.log(file);
  console.log((file.size) && true);
  console.log(!(file.size) && true);
  console.log(false || (message === null && !file.size));
  console.log("\n\n\n\n\n\n\n");


  const supabase = createServerActionClient({ cookies });
  const { data: { user } } = await supabase.auth.getUser();

  if (user === null) return;
  const { data: chatUser }: { data: User | null } = await supabase
    .from('users')
    .select('*')
    .eq('uuid', user.id)
    .single();
  if (chatUser === null) return;
  if (file.size === 0 && !message) return;

  const { data: newMessage } = await supabase
    .from('messages')
    .insert({
      message: message || null,
      id_user: user?.id,
      id_receiver: chatPartnerId,
      email:user?.email,
      chat_id:chatId,
      user_img: chatUser.img
    })
    .select("id")
    .single();

  const msg = { created_at: new Date(), message: message , id_user: user?.id, email:user?.email, id: randomUUID() }
  pusherServer.trigger(chatId, 'incoming-message', msg);
  pusherServer.trigger(chatPartnerId, 'new_message', {
    ...msg,
    senderImg: chatUser.img,
    senderName: chatUser.email
  });

  if(file.size === 0) return;

  const fileExtension = file.name.split(".")[1];
  const { data: fileLocation } = await supabase
    .storage
    .from('fileStorage')
    .upload(`chatFiles/${randomUUID()}.${fileExtension}`, file);

  if(!fileLocation) return;

  await supabase
    .from("files")
    .insert({
      message_id: (newMessage?.id),
      extension: fileExtension.toUpperCase(),
      name: file.name.split(".")[0],
      type: file.type.split("/")[0],
      link: fileLocation.path
    });
}
