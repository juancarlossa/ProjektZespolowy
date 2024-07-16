import React from "react";
import { User } from "@nextui-org/react";

type Props = {
  userImg: string
}

export default function App ({ userImg }: Props) {
  return (
    <User
      name="Jane Doe"
      description="Product Designer"
      avatarProps={{
        src: userImg
      }}
    />
  );
}
