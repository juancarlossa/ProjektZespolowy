import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { notFound } from 'next/navigation'
import { User } from '@/app/types/user'
import { Avatar } from '@nextui-org/react'
import { addImageToTable } from '@/app/_backend/actions/add-img'
import { Messages } from '@/app/UI/components/Messages'
import { Message } from '@/app/types/messages'
import { ChatInput } from '@/app/UI/components/ChatInput'

interface PageProps {
  params: {
    chatId: string
  }
}

const page = async ({ params }: PageProps) => {
  const supabase = createServerComponentClient({ cookies })
  const { chatId } = params
  const { data: { user } } = await supabase.auth.getUser()
  if (user === null) return

  const [userId1, userId2] = chatId.split('--')
  if (user.id !== userId1 && user.id !== userId2) {
    notFound()
  }
  addImageToTable()
  const chatPartnerId = user.id === userId1 ? userId2 : userId1

  const { data: chatPartner }: { data: User | null } = await supabase
    .from('users')
    .select('*')
    .eq('uuid', chatPartnerId)
    .single()
  if (chatPartner === null) return

  const { data: chatUser }: { data: User | null } = await supabase
    .from('users')
    .select('*')
    .eq('uuid', user.id)
    .single()
  if (chatUser === null) return

  const { data: messages }: { data: Message[] | null } = await supabase
    .from('messages')
    .select('*')
    .eq('chat_id', chatId)
  if (messages === null) return


  return (
    <section className='h-screen max-h-screen flex flex-col'>
      <div className='flex flex-row justify-start items-center space-x-4 my-5'>
        <Avatar
          isBordered
          src={chatPartner.img!}
          alt={`${chatPartner.email} profile picture`}
          className='rounded-full my-auto ml-4'
          size='md'
        />
        <span className='text-gray-700 mr-3 font-semibold text-xl'>{chatPartner.email}</span>
      </div>

      <div className='mt-auto relative overflow-auto'>
        <Messages
          chatId={chatId}
          sessionImg={chatUser.img}
          chatPartner={chatPartner}
          initialMessages={messages}
          sessionId={user.id}
        />
      </div>
      <div className='mt-0'>
        <ChatInput chatPartner={chatPartner} chatId={chatId} />
      </div>
    </section>
  )
}

export default page