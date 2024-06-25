'use client'
import React, { useRef } from "react";
import { Button, Input } from "@nextui-org/react";
import { updateEmail, updateUsername } from "@/app/_backend/actions/update-email";

type Props = {
  email: string
  username: string
}

export default function InputText ({ email, username }: Props) {
  const variants = ["flat", "bordered", "underlined", "faded"];
  const formRef = useRef<HTMLFormElement>(null)
  return (
    <section>
      <form
        ref={formRef}
        action={async (formData) => {

          await updateEmail(formData)

          formRef.current?.reset()
        }}
        className='flex-1 border-t border-gray-300 px-4 py-4 mb-2 sm:mb-0'
      >
        <div className="w-full flex flex-col gap-4">
          <div className="flex w-full flex-row md:flex-nowrap mb-6 md:mb-0 gap-4">
            <h1 className="text-lg font-medium text-gray-900">Email: </h1>
            <Input defaultValue={email} name='email' variant="underlined" placeholder="Enter your email" />
            <Button
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

      <form
        ref={formRef}
        action={async (formData) => {
          await updateUsername(formData)
          formRef.current?.reset()
        }}
        className='flex-1 border-t border-gray-300 px-4 py-4 mb-2 sm:mb-0'
      >
        <div className="w-full flex flex-col gap-4">
          <div className="flex w-full flex-row md:flex-nowrap mb-6 md:mb-0 gap-4">
            <h1 className="mt-2 text-lg font-medium text-gray-900">Username: </h1>
            <Input defaultValue={username} name='username' variant="underlined" placeholder="Enter your email" />
            <Button
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
    </section>
  );
}