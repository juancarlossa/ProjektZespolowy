'use client'
import { pusherClient } from '@/app/_backend/helpers/pusher'
import { formatTime, toPusherKey } from '@/app/_backend/helpers/utils'
import { Message } from '@/app/types/messages'
import { User } from '@/app/types/user'
import { FC, useEffect, useRef, useState } from 'react'

interface MessagesProps {
  initialMessages: Message[]
  sessionId: string
  sessionImg: string | null | undefined
  chatPartner: User
  chatId: string
}

export const Messages: FC<MessagesProps> = ({
  initialMessages,
  sessionId,
  chatPartner,
  sessionImg,
  chatId
}) => {
  const [messages, setMessages] = useState<Message[]>(initialMessages)
  const scrollDownRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    pusherClient.subscribe(
      //toPusherKey(`${chatId}`)
      chatId
    )
    const messageHandler = (message: Message) => {
      setMessages((prev) => [...prev, message])
    }
    pusherClient.bind('incoming-message', messageHandler)

    return () => {
      pusherClient.unsubscribe(
        //toPusherKey(`${chatId}`)
        chatId
      )
      pusherClient.unbind('incoming-message', messageHandler)
    }
  }, [chatId])

  const scrollToBottom = () => {
    scrollDownRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages]);

  return (
    <div
      id='messages'
      className='flex relative mx-0 h-auto max-h-max flex-col justify-end gap-4 p-3 overflow-scroll scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch'
    >
      {messages.map((message, index) => {
        const isCurrentUser = message.id_user === sessionId
        const hasNextMessageFromSameUser =
          messages[index - 1]?.id_user === messages[index].id_user

        return (
          <div
            className='chat-message'
            key={`${message.id}-${message.created_at}`}>
            <div className={isCurrentUser ? 'flex items-end justify-end' : 'flex items-end'}>
              <div
                className={isCurrentUser ?
                  'flex flex-col space-y-2 text-base max-w-xs mx-2 order-1 items-end' :
                  'flex flex-col space-y-2 text-base max-w-xs mx-2 order-2 items-start'
                }>
                <span
                  className={isCurrentUser ? 'px-4 py-2 rounded-lg inline-block bg-indigo-600 text-white' :
                    !isCurrentUser ? 'px-4 py-2 rounded-lg inline-block bg-gray-200 text-gray-900' :
                      !hasNextMessageFromSameUser && isCurrentUser ? 'rounded-br-none px-4 py-2 rounded-lg inline-block bg-indigo-600 text-white' :
                        !hasNextMessageFromSameUser && !isCurrentUser ? 'rounded-bl-none px-4 py-2 rounded-lg inline-block bg-gray-200 text-gray-900' : ''}>
                  {message.message}{' '}
                  <span className='ml-2 text-xs text-gray-400'>{message.created_at ? formatTime(message.created_at) : ''}</span>
                </span>
              </div>

              <div
                className={isCurrentUser ? 'relative w-6 h-6 order-2 my-auto' :
                  !isCurrentUser ? 'relative w-6 h-6 order-1 my-auto' :
                    hasNextMessageFromSameUser ? 'invisible my-auto' : ''
                }>
                <img
                  src={
                    isCurrentUser ? (sessionImg as string) : chatPartner.img!
                  }
                  alt='Profile picture'
                  referrerPolicy='no-referrer'
                  className='rounded-full'
                />
              </div>
            </div>
          </div>
        )
      })}
      <div ref={scrollDownRef} />
    </div>
  )
}
