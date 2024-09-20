import { Tables } from "./supabase"


type MessageEntity = Tables<'messages'>
type FilesEntity = Tables<'files'>
type UserEntity = Tables<'users'>

export type Message = MessageEntity & {
  user: UserEntity,
  files: FilesEntity[]
}
