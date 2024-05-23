'use client'

import { pusherClient } from '@/app/_backend/helpers/pusher'
import { chatHrefConstructor } from '@/app/_backend/helpers/utils'
import { Message } from '@/app/types/messages'
import { User } from '@/app/types/user'
import { usePathname, useRouter } from 'next/navigation'
import { FC, useEffect, useState } from 'react'
import { Toaster, toast } from 'react-hot-toast'
import UnseenChatToast from './UnseenChatToast'
import { AddFriendForm } from './AddFriendForm'
import Link from 'next/link'
import { UserAvatar } from './Avatar'
import { Button } from '@nextui-org/react'

interface SidebarChatListProps {
  friends: User[]
  sessionId: string
}

interface ExtendedMessage extends Message {
  senderImg: string
  senderName: string
}

const SidebarChatList: FC<SidebarChatListProps> = ({ friends, sessionId }) => {
  const router = useRouter()
  const pathname = usePathname()
  const [unseenMessages, setUnseenMessages] = useState<Message[]>([])
  const [activeChats, setActiveChats] = useState(friends)


  useEffect(() => {
    pusherClient.subscribe(sessionId)

    const newFriendHandler = (newFriend: User) => {
      console.log("received new user", newFriend)
      setActiveChats((prev) => [...prev, newFriend])
    }

    const chatHandler = (message: ExtendedMessage) => {
      const shouldNotify =
        pathname !==
        `/chat/${chatHrefConstructor(sessionId, message.id_user)}`
      if (!shouldNotify) return

      // Si la url es la del chat, no notifica
      toast.custom((t) => (
        <UnseenChatToast
          t={t}
          sessionId={sessionId}
          senderId={message.id_user}
          senderImg={message.senderImg}
          senderMessage={message.message}
          senderName={message.email}
        />
      ))

      setUnseenMessages((prev) => [...prev, message])
    }

    pusherClient.bind('new_message', chatHandler)
    pusherClient.bind('new_friend', newFriendHandler)

    return () => {
      pusherClient.unsubscribe(sessionId)

      pusherClient.unbind('new_message', chatHandler)
      pusherClient.unbind('new_friend', newFriendHandler)
    }
  }, [pathname, sessionId])

  useEffect(() => {
    if (pathname?.includes('chat')) {
      setUnseenMessages((prev) => {
        return prev.filter((msg) => !pathname.includes(msg.id_user))
      })
    }
  }, [pathname])

  return (
    <ul role='list' className='flex flex-col justify-between max-h-[25rem] overflow-y-auto space-y-1'>
      <div>
        <AddFriendForm />
        <Toaster />
        {activeChats.sort().map((friend) => {
          const unseenMessagesCount = unseenMessages.filter((unseenMsg) => {
            return unseenMsg.id_user === friend.uuid
          }).length

          return (
            <li key={friend.id} className='pt-3'>
              <Link
                href={
                  `/chat/${chatHrefConstructor(
                    sessionId,
                    friend.uuid
                  )}`}
                className='justify-between hover:text-gray-700 text-indigo-600 bg-gray-50 group flex items-center gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold'>
                {friend.email.split('@')[0]}
                {unseenMessagesCount > 0 ? (
                  <div className='bg-indigo-600 font-medium text-xs text-white w-4 h-4 rounded-full flex justify-center items-center'>
                    {unseenMessagesCount}
                  </div>
                ) : null}
                <UserAvatar userImg={friend.img} />
              </Link>
            </li>
          )
        })}
      </div>
    </ul>
  )
}

export default SidebarChatList