"use client"
import React, { useRef } from "react";
import { Button, Input } from "@nextui-org/react";
import { addMessage } from "@/app/_backend/actions/add-message";

export function FormMessage () {
  const formRef = useRef<HTMLFormElement>(null)

  return (
    <form
      ref={formRef}
      className="w-full flex flex-row flex-wrap gap-4"
    >
      <Input
        name="message"
        type="text"
        color="primary"
        label="Write a message"
        placeholder="Write a message"
        className="max-w-[220px]"
        defaultValue=""
      />
      <Button
        type="submit"
        color="primary">test</Button>
    </form>
  );
}