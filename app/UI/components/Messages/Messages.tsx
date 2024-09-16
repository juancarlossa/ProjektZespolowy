'use client'
import { pusherClient } from '@/app/_backend/helpers/pusher'
import { formatTime, toPusherKey } from '@/app/_backend/helpers/utils'
import { Message } from '@/app/types/messages'
import { User } from '@/app/types/user'
import { FC, useEffect, useRef, useState } from 'react'
import { XIcon } from '../../icons/xIcon'
import { deleteMessage } from '@/app/_backend/actions/delete-message'
import { EditIcon } from '../../icons/editIcon'
import { editMessage } from '@/app/_backend/actions/edit-message'

import MessageContainer from './MessageContainer';
import getSignedUrlFromStorage, { getPublicUrlFromStorage } from '@/app/_backend/actions/getFilesFromStorage';


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
  const [messages, setMessages] = useState<Message[]>(initialMessages.sort((a, b) => a.id - b.id));
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

  useEffect(() => {
    scrollDownRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);


  const handleDownload = async (message: Message) => {
    const link = await getSignedUrlFromStorage(String(message.files[0].link));
    if(!link) return;
    const req = await fetch(link);
    const blob = await req.blob();
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.setAttribute("download", message.files[0].name + "." + message.files[0].extension.toLowerCase());
    a.click();
  }

  return (
    <div
      id='messages'
      className='flex relative mx-0 h-auto max-h-max flex-col justify-end p-3 overflow-scroll scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch'
    >
      {messages.map((message, i) => {
        const isCurrentUser = message.id_user === sessionId;

        const time = <span className='ml-2 text-xs text-gray-400'>
          {message.created_at ? formatTime(message.created_at) : ''}
        </span>;

        const File = () => <>
          <div className={`w-8 h-8 cursor-pointer mr-3`}
            onClick={() => handleDownload(message)}
          >
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier"></g><g id="SVGRepo_tracerCarrier" ></g><g id="SVGRepo_iconCarrier"> <path d="M8 22.0002H16C18.8284 22.0002 20.2426 22.0002 21.1213 21.1215C22 20.2429 22 18.8286 22 16.0002V15.0002C22 12.1718 22 10.7576 21.1213 9.8789C20.3529 9.11051 19.175 9.01406 17 9.00195M7 9.00195C4.82497 9.01406 3.64706 9.11051 2.87868 9.87889C2 10.7576 2 12.1718 2 15.0002L2 16.0002C2 18.8286 2 20.2429 2.87868 21.1215C3.17848 21.4213 3.54062 21.6188 4 21.749" stroke="#1C274C"></path> <path d="M12 2L12 15M12 15L9 11.5M12 15L15 11.5" stroke="#1C274C" ></path> </g></svg>
          </div>
          <p className='underline'>
            {message.files[0].name + "." + message.files[0].extension.toLowerCase()}
          </p>
          { time }
        </>;

        const Image = () => <div className={`flex flex-col ${isCurrentUser ? "items-end" : "items-start"}`}>
          <img src={`https://nblkzwwjdjchfnzaydjf.supabase.co/storage/v1/object/fileStorage/${message.files[0].link}`}
            className='rounded-lg my-2 h-64 w-auto cursor-pointer'
            onClick={() => handleDownload(message)}
          />
          { time }
        </div>;

        return (
          <div className='chat-message'
            key={i}
          >
            {
              message.files && message.files.length !== 0 &&
              <MessageContainer isFile={true}
                isCurrentUser={isCurrentUser}
                messageId={message.id}
                imgSrc={ isCurrentUser ? (sessionImg as string) : chatPartner.img!}
              >
                { message.files[0].type === "image" ? <Image /> : <File /> }
              </MessageContainer>
            }

            {
              message.message &&
              <MessageContainer isFile={false}
                isCurrentUser={isCurrentUser}
                messageId={message.id}
                imgSrc={ isCurrentUser ? (sessionImg as string) : chatPartner.img!}
              >
                { message.message }
                { time }
              </MessageContainer>
            }
          </div>
        )
      })}
      <div ref={scrollDownRef} />
    </div>
  )
}