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
import InputText from "@/app/UI/components/Input";

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
      <div className="flex flex-col items-center w-full py-12 sm:px-6 lg:px-8 bg-gray-100">
        <div className="bg-white shadow sm:rounded-lg p-6 w-full max-w-md">
          <div className="flex flex-row">
            <InputText
              email={user.email!} username={user.email!.split('@')[0]}
            />
          </div>
          <div className="mt-4 flex items-center">
            <h2 className="text-lg font-medium text-gray-900">Profile picture: </h2>
            <Avatar src={user.user_metadata.avatar_url} alt="" className="ml-4 rounded-full" isBordered size="md" />
          </div>
        </div>
      </div>
    </>
  )
}