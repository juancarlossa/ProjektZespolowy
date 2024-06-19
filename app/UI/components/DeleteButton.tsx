import React from "react";
import { Button } from "@nextui-org/react";

export default function DeleteButton () {
  const DeleteIcon = () => {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
        className="icon icon-tabler icons-tabler-outline icon-tabler-x">
        <path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M18 6l-12 12" /><path d="M6 6l12 12" />
      </svg>
    )
  }
  return (
    <div className="flex gap-4 items-center">
      <Button type="submit" isIconOnly color="danger" aria-label="Like">
        <DeleteIcon />
      </Button>
    </div>
  );
}
