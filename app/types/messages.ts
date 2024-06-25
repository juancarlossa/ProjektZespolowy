import { Tables } from "./supabase"


type MessageEntity = Tables<'messages'>
type UserEntity = Tables<'users'>

export type Message = MessageEntity & {
  user: UserEntity
}
