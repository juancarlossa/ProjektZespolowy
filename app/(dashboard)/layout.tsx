import type { Metadata } from "next";
import { Inter } from "next/font/google";
import SidebarChatList from "../UI/components/SidebarChatList";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from 'next/headers'
import { redirect } from "next/navigation";
import { getFriendsByUserId } from "../_backend/helpers/get-friends-by-user-id";
import { User } from "../types/user";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Chatily",
  description: "Chatily - Projekt Zespołowy",
};

export default async function RootLayout ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const supabase = createServerComponentClient({ cookies })
  const { data: { user } } = await supabase.auth.getUser()
  if (user === null) return
  if (user === null) {
    redirect('/login')
  }
  let friendList = await getFriendsByUserId(user.id)
  if (friendList === undefined) return ''

  const friends: User[] = friendList
  return (
    <section className="flex justify-stretch items-stretch">
      <aside className="bg-cyan-50 p-5 h-screen min-w-1/5 w-1/5 border-cyan-200 border-1">
        <div className="border-b-1 border-cyan-200">
          <h2 className="text-slate-600 font-bold text-2xl">{friends?.length} friend</h2>
        </div>
        <SidebarChatList sessionId={user.id} friends={friends} />
      </aside>
      <div className="w-4/5">
        {children}
      </div>
    </section>
  );
}