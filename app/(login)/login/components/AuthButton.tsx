'use client'

import { type Session, createClientComponentClient, User } from '@supabase/auth-helpers-nextjs'
import { useRouter } from 'next/navigation'

import { GithubIcon, GoogleIcon } from '@/app/UI/icons/icons'
import { handleSignInGithub, handleSignInGoogle } from '@/app/_backend/supabase-requests'

export function AuthButton ({ user }: { user: User | null }) {
  const supabase = createClientComponentClient()
  const router = useRouter()

  const SignInButtonGithub = () => {
    return (
      <button onClick={handleSignInGithub} type="button" className="text-white bg-[#24292F] hover:bg-[#24292F]/90 focus:ring-4 focus:outline-none focus:ring-[#24292F]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center focus:ring-gray-500 ">
        <GithubIcon />
        Sign in with Github
      </button>
    )
  }
  const SignInButtonGoogle = () => {
    return (
      <button onClick={handleSignInGoogle} type="button" className="text-white bg-[#2a39e6] hover:bg-[#2a39e6]/90 focus:ring-4 focus:outline-none focus:ring-[#24292F]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center focus:ring-gray-500 ">
        <GoogleIcon />
        <p className='pl-2'>Sign in with Google</p>
      </button>
    )
  }
  const SignOutButton = () => {
    const handleSignOut = async () => {
      await supabase.auth.signOut()
      router.refresh()
    }
    return (
      <button type="button" className="text-white bg-[#24292F] hover:bg-[#24292F]/90 focus:ring-4 focus:outline-none focus:ring-[#24292F]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center focus:ring-gray-500 " onClick={handleSignOut}>Sign Out</button>
    )
  }

  return (
    <>
      {
        user === null
          ? <>
            <SignInButtonGithub /><SignInButtonGoogle />
          </>
          : <SignOutButton />
      }

    </>
  )
}
