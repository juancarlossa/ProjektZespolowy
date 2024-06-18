import { AddFriendForm } from "@/app/UI/components/AddFriendForm";
import { FormMessage } from "@/app/UI/components/FormMessage";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from 'next/headers'
import { getFriendsByUserId } from "../../_backend/helpers/get-friends-by-user-id";
import { User } from "../../types/user";
import toast, { Toaster } from "react-hot-toast";
import { redirect } from "next/navigation";
import Nav from "../../UI/components/Navbar";
import { Avatar } from "@nextui-org/react";

export default async function Profile () {
  const supabase = createServerComponentClient({ cookies })
  const { data: { session } } = await supabase.auth.getSession()
  const { data: { user } } = await supabase.auth.getUser()

  if (user === null) {
    redirect('/login')
  }
  let friendList = await getFriendsByUserId(user.id)
  if (friendList === undefined) return ''
  return (
    <>
      <Nav userImg={user.user_metadata.avatar_url} />
      <div className="flex w-full flex-col justify-center py-12 sm:px-6 lg:px-8 bg-gray-100">
        <h1>Email: {user.email}</h1>
        <h1>Username: {user.email!.split('@')[0]}</h1>
        <div className="flex flex-row justify-between w-40">
          <h2>Profile picture: </h2>
          <Avatar src={user.user_metadata.avatar_url} alt="" className='rounded-full' isBordered size='md' />
        </div>
      </div>
    </>
  )
}