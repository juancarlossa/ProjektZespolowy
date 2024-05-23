import Link from "next/link";
import { Avatar } from "@nextui-org/react";

type UserAvatar = {
  userImg: string
}

export function UserAvatar ({ userImg }: UserAvatar) {
  const avatar = userImg ? userImg : 'https://assets.puzzlefactory.pl/puzzle/382/253/original.jpg'
  return (
    <Avatar
      isBordered
      src={avatar}
      alt={`${userImg} profile picture`}
      className='rounded-full'
      size='md'
    />
  )
}