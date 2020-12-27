import { GuildMember, PartialGuildMember } from 'discord.js'

export type GuildMemberHook = (
  newcomer?: GuildMember | PartialGuildMember,
) => void | Promise<void>
