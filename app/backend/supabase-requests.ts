import { type Session, createClientComponentClient } from '@supabase/auth-helpers-nextjs'
  
  const supabase = createClientComponentClient()

  //OAuth Google i Github
  export const handleSignInGithub = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'github',
      options: {
        redirectTo: 'http://localhost:3000/auth/callback'
      }
    })
  }

  export const handleSignInGoogle = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: 'http://localhost:3000/auth/callback'
      }
    })
  }

  