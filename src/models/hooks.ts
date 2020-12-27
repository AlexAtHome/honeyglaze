import { Client, GuildMember, PartialGuildMember } from 'discord.js'

export type GuildMemberHook = (
  newcomer?: GuildMember | PartialGuildMember,
  client?: Client,
) => void | Promise<void>
