"use client"
import React, { useRef } from "react";
import { Button, Input } from "@nextui-org/react";
import { addFriend } from "@/app/_backend/actions/add-friend";

export function AddFriendForm () {
  const formRef = useRef<HTMLFormElement>(null)

  return (
    <form
      ref={formRef}
      action={async (formData) => {
        await addFriend(formData)
        formRef.current?.reset()
      }}
      className="w-full flex flex-row gap-3 items-center py-5"
    >
      <Input
        name="email"
        type="email"
        color="secondary"
        label="Add a friend"
        placeholder="Enter an email"
        className="max-w-[220px]"
        defaultValue=""
      />
      <Button
        type="submit"
        color="secondary">Add a friend</Button>
    </form>
  );
}
