import { Tables } from "./supabase"

type UserEntity = Tables<'users'>

export type User = UserEntity
