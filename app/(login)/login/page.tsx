import { AuthButton } from './components/AuthButton'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'

export default function Login () {
  async function AuthButtonServer () {
    const supabase = createServerComponentClient({ cookies })
    const { data: { user } } = await supabase.auth.getUser()

    console.log(JSON.stringify(user?.email))

    return <AuthButton user={user} />
  }

  return (
    <section className="grid place-content-center min-h-screen">
      <div className='bg-gray-200 p-8 rounded-lg justify-center items-center'>
        <h1 className="text-xl font-bold mb-4 text-gray-900">Login in Chatily</h1>
        <AuthButtonServer />
      </div>
    </section>
  )
}
