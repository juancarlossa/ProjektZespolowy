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
import { getName } from "@/app/_backend/actions/update-name";
import { getSurname } from "@/app/_backend/actions/update-surname";
import { getTelefon } from "@/app/_backend/actions/update-telefon";
import { getPicture } from "@/app/_backend/actions/update-picture";

export default async function Profile () {
  const supabase = createServerComponentClient({ cookies })
  const { data: { session } } = await supabase.auth.getSession()
  const { data: { user } } = await supabase.auth.getUser()

  if (user === null) {
    redirect('/login')
  }
  let friendList = await getFriendsByUserId(user.id)
  if (friendList === undefined) return ''

  const uname = await getName()
  const surname = await getSurname()
  const telefon = await getTelefon()
  const picture = await getPicture()
  const joiningDate = new Date(user.created_at).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <>
      <Nav userImg={user.user_metadata.avatar_url} />
      <div className="flex flex-col items-center w-full py-12 sm:px-6 lg:px-8 bg-gray-100">
        <h1 className="my-5 font-bold text-3xl text-slate-600">Update your profile</h1>
        <div className="bg-white shadow sm:rounded-lg p-6 w-full max-w-md">
          <div className="flex flex-col">
            <InputText
              email={user.email!}
              username={user.email!.split('@')[0]}
              telefon={telefon}
              uname={uname}
              surname={surname}
              picture={picture}
            />
          </div>
          <div className="mt-4 flex items-center">
            <h2 className="text-lg font-medium text-gray-900">Profile picture: </h2>
            <Avatar src={user.user_metadata.avatar_url} alt="" className="ml-4 rounded-full" isBordered size="md" />
          </div>
          <h1 className="mt-8 font-light font italic">Created at: {joiningDate}</h1>
        </div>
      </div>
    </>
  )
}