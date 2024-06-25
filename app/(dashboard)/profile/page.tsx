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

export default async function Profile() {
  const supabase = createServerComponentClient({ cookies })
  const { data: { session } } = await supabase.auth.getSession()
  const { data: { user } } = await supabase.auth.getUser()

  if (user === null) {
    redirect('/login')
  }

  let friendList = await getFriendsByUserId(user.id)
  if (friendList === undefined) return ''

  // Format the date
  const joiningDate = new Date(user.created_at).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <>
      <Nav userImg={user.user_metadata.avatar_url} />
      <div className="min-h-screen flex flex-col justify-center py-12 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-100 to-purple-200">
        <div className="bg-white p-6 rounded-lg shadow-md sm:mx-auto sm:w-full sm:max-w-md">
          <h1>Email: {user.email}</h1>
          <h1>Username: {user.email!.split('@')[0]}</h1>
          <h1>Joining date: {joiningDate}</h1>
          <div className="flex flex-row justify-between w-40 mt-4">
            <h2>Profile picture: </h2>
            <Avatar src={user.user_metadata.avatar_url} alt="" className='rounded-full' isBordered size='md' />
          </div>
        </div>
        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <p className="text-center mt-4 p-2 bg-white rounded-lg shadow">
            After the next update, you will be able to edit your profile!
          </p>
        </div>
      </div>
      <Toaster />
    </>
  )
}
