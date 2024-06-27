'use client'
import React, { useRef } from "react";
import { Button, Input } from "@nextui-org/react";
import { updateEmail, updateUsername } from "@/app/_backend/actions/update-email";
import { updateTelefon } from "@/app/_backend/actions/update-telefon";
import { updateName } from "@/app/_backend/actions/update-name";
import { updateSurname } from "@/app/_backend/actions/update-surname";
import { updatePicture } from "@/app/_backend/actions/update-picture";

type Props = {
  email: string
  username: string
  telefon: string
  uname: string
  surname: string
  picture: string
}

export default function InputText ({ email, username, telefon, uname, surname, picture }: Props) {
  const variants = ["flat", "bordered", "underlined", "faded"];
  const formRef = useRef<HTMLFormElement>(null)

  const InputEmail = () => {
    return (
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
    )
  }

  const InputUsername = () => {
    return (
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
    )
  }

  const InputTelefon = () => {
    return (
      <form
        ref={formRef}
        action={async (formData) => {
          await updateTelefon(formData)
          formRef.current?.reset()
        }}
        className='flex-1 border-t border-gray-300 px-4 py-4 mb-2 sm:mb-0'
      >
        <div className="w-full flex flex-col gap-4">
          <div className="flex w-full flex-row md:flex-nowrap mb-6 md:mb-0 gap-4">
            <h1 className="mt-2 text-lg font-medium text-gray-900">Telefon: </h1>
            <Input defaultValue={telefon} name='telefon' variant="underlined" placeholder="Enter your telefon" />
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
    )
  }

  const InputName = () => {
    return (
      <form
        ref={formRef}
        action={async (formData) => {
          await updateName(formData)
          formRef.current?.reset()
        }}
        className='flex-1 border-t border-gray-300 px-4 py-4 mb-2 sm:mb-0'
      >
        <div className="w-full flex flex-col gap-4">
          <div className="flex w-full flex-row md:flex-nowrap mb-6 md:mb-0 gap-4">
            <h1 className="mt-2 text-lg font-medium text-gray-900">Name: </h1>
            <Input defaultValue={uname} name='name' variant="underlined" placeholder="Enter your name" />
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
    )
  }

  const InputSurname = () => {
    return (
      <form
        ref={formRef}
        action={async (formData) => {
          await updateSurname(formData)
          formRef.current?.reset()
        }}
        className='flex-1 border-t border-gray-300 px-4 py-4 mb-2 sm:mb-0'
      >
        <div className="w-full flex flex-col gap-4">
          <div className="flex w-full flex-row md:flex-nowrap mb-6 md:mb-0 gap-4">
            <h1 className="mt-2 text-lg font-medium text-gray-900">Surname: </h1>
            <Input defaultValue={surname} name='surname' variant="underlined" placeholder="Enter your surname" />
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
    )
  }

  const InputPicture = () => {
    return (
      <form
        ref={formRef}
        action={async (formData) => {
          await updatePicture(formData)
          formRef.current?.reset()
        }}
        className='flex-1 border-t border-gray-300 px-4 py-4 mb-2 sm:mb-0'
      >
        <div className="w-full flex flex-col gap-4">
          <div className="flex w-full flex-row md:flex-nowrap mb-6 md:mb-0 gap-4">
            <h1 className="mt-2 text-lg font-medium text-gray-900">Picture: </h1>
            <Input defaultValue={picture} name='picture' variant="underlined" placeholder="Enter your surname" />
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
    )
  }

  return (
    <section>
      <InputEmail />
      <InputUsername />
      <InputTelefon />
      <InputName />
      <InputSurname />
      <InputPicture />
    </section>
  );
}