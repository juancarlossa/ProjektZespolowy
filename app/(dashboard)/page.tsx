
import { AddFriendForm } from "@/app/UI/components/AddFriendForm";
import { FormMessage } from "@/app/UI/components/FormMessage";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from 'next/headers'
import { redirect } from "next/navigation";
import { getFriendsByUserId } from "../_backend/helpers/get-friends-by-user-id";
import { User } from "../types/user";
import toast, { Toaster } from "react-hot-toast";

export default async function Home () {
  const supabase = createServerComponentClient({ cookies })
  const { data: { session } } = await supabase.auth.getSession()
  const { data: { user } } = await supabase.auth.getUser()
  if (user === null) return
  if (session === null) {
    redirect('/login')
  }
  let friendList = await getFriendsByUserId(user.id)
  if (friendList === undefined) return ''

  const friends: User[] = friendList
  //const friendsList: string[] | undefined = await getEmailFriendsListByUserId(user.id);

  return (
    <div className="flex w-full min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8 bg-gray-100">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <AddFriendForm />
        <FormMessage />
      </div>
    </div>
  );
}
