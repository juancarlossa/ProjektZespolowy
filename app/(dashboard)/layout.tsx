import type { Metadata } from "next";
import { Inter } from "next/font/google";
import SidebarChatList from "../UI/components/SidebarChatList";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from 'next/headers'
import { redirect } from "next/navigation";
import { getFriendsByUserId } from "../_backend/helpers/get-friends-by-user-id";
import { User } from "../types/user";
import Nav from "../UI/components/Navbar";
import { Button, Image } from "@nextui-org/react";
import Link from "next/link";


export const metadata: Metadata = {
  title: "Chatily",
  description: "Chatily - Projekt Zespołowy",
};

export default async function RootLayout ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const Home = () => {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="rgb(165 243 252)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-home"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M5 12l-2 0l9 -9l9 9l-2 0" /><path d="M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-7" /><path d="M9 21v-6a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v6" /></svg>

    )
  }

  const supabase = createServerComponentClient({ cookies })
  const { data: { user } } = await supabase.auth.getUser()

  if (user === null) {
    redirect('/login')
  }
  const friendList = await getFriendsByUserId(user.id)
  if (friendList === undefined) return ''

  const responses: any = []
  async function fetchImages (friendList: User[]) {
    friendList.map(async (friend) => {
      const response = await fetch(friend.img);
      responses.push(response.url);
    })
  }
  fetchImages(friendList)

  const friends: User[] = friendList
  return (
    <section className="flex justify-stretch items-stretch">
      <aside className="bg-black p-5 h-screen min-w-1/5 w-1/5 border-gray-700 border-1">
        <div className="border-b-1 border-gray-700">
          <h2 className="text-white font-bold text-2xl">{friends?.length} friends</h2>
        </div>
        <SidebarChatList sessionId={user.id} friends={friends} />
      </aside>
      <div className="w-4/5">
        {children}
      </div>
    </section>
  );
}
