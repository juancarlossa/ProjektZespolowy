import { AddFriendForm } from "@/app/UI/components/AddFriendForm";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from 'next/headers'
import { getFriendsByUserId } from "../_backend/helpers/get-friends-by-user-id";
import { User } from "../types/user";
import toast, { Toaster } from "react-hot-toast";
import { redirect } from "next/navigation";
import Nav from "../UI/components/Navbar";

export default async function Home () {
  const supabase = createServerComponentClient({ cookies })
  const { data: { session } } = await supabase.auth.getSession()
  const { data: { user } } = await supabase.auth.getUser()

  if (user === null) {
    redirect('/login')
  }
  let friendList = await getFriendsByUserId(user.id)
  if (friendList === undefined) return ''

  const friends: User[] = friendList

  return (
    <>
      <Nav userImg={user.user_metadata.avatar_url} />
      <div className="flex w-full h-full flex-col justify-center py-12 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-100 to-purple-200">
        <div className="sm:mx-auto sm:w-full sm:max-w-md bg-white p-8 rounded-lg shadow-md">
          <h1 className="text-4xl font-bold text-center text-gray-800">Welcome to Chatily!</h1>
          <p className="text-center mt-4 text-gray-600">Start chatting with your friends now!</p>

          <div className="mt-6">
            <AddFriendForm />
          </div>

          <p className="text-center mt-4 text-gray-600">Here you can add a friend by entering their email.</p>
        </div>

        <div className="mt-12 sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="text-3xl font-bold text-center text-gray-800">About Chatily</h2>
          <p className="text-center mt-4 p-4 bg-white rounded-lg shadow-md text-gray-700">
            Chatily is a great application that allows you to freely exchange messages and inform your friends about your availability. The chat is clear and visually appealing, and sending messages works more smoothly than in any other chat application available on the market. We encourage you to test it out!
          </p>
        </div>
      </div>
      <Toaster />
    </>
  );
}
