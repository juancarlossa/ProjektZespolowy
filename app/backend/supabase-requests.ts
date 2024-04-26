import { type Session, createClientComponentClient } from '@supabase/auth-helpers-nextjs'
//import { useRouter } from 'next/navigation'
  
  const supabase = createClientComponentClient()
  //const router = useRouter()  
  
  export const githubLogin = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'github',
      options: {
        redirectTo: 'http://localhost:3000/auth/callback'
      }
    })
  }