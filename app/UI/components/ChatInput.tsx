'use client'

import { FC, useRef, useState } from 'react'
import TextareaAutosize from 'react-textarea-autosize'
import { User } from '@/app/types/user'
import { Button, Input } from '@nextui-org/react'
import { addMessage } from '@/app/_backend/actions/add-message'
import { PictureIcon } from '../icons/icons'
import { ImageUploader } from './ImageUploader'

interface ChatInputProps {
  chatPartner: User
  chatId: string
}

export const ChatInput: FC<ChatInputProps> = ({ chatPartner, chatId }) => {
  const textareaRef = useRef<HTMLTextAreaElement | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const formRef = useRef<HTMLFormElement>(null)

  function InputUi () {
    const variants = ["flat", "bordered", "underlined", "faded"];
    return (
      <div className="w-full flex flex-col gap-4">
        <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
          <Input
            name='message'
            type="text"
            variant='bordered'
            size='lg'
            color='primary'
            placeholder="Type a message"
          />
        </div>
      </div>
    );
  }

  return (
    <form
      ref={formRef}
      action={async (formData) => {
        setIsLoading(true)
        await addMessage(formData, chatId, chatPartner.uuid)
        setIsLoading(false)
        formRef.current?.reset()
      }}
      className='flex-1 border-t border-gray-300 px-4 py-4 mb-2 sm:mb-0'
    >
      <div className='flex flex-row'>
        <InputUi />
        <div className='flex-shrink-0 my-auto mx-3 space-x-4 flex flex-row'>
          <ImageUploader />
          <Button
            isLoading={isLoading}
            type='submit'
            color='primary'
            className='rounded-full'
            size='md'
            variant='ghost'
          >
            Post
          </Button>
        </div>
      </div>
    </form>
  )
}