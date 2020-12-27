import { GuildMember, PartialGuildMember } from 'discord.js'
import chalk from 'chalk'
import { joinHooksList } from '../lists/lists'
import { Logger } from '../utils/logger'

export type JoinHook = (
  newcomer?: GuildMember | PartialGuildMember,
) => void | Promise<void>

/**
 * Adds a hook that runs when someone joins the server.
 *
 * Usage:
 *
 * ```ts
 * class Fun {
 *   @Join()
 *   async greetNewcomer(guildMember: GuildMember): Promise<void> {
 *     const dm = await guildMember.user.createDM()
 *     dm.send('Oh hey! Welcome to the server!')
 *   }
 * }
 * ```
 *
 * *NOTICE:* In order to get your join-hook working, you have to enable
 * "Server Members Intent" for your bot at https://discord.com/developers
 */
export function Join(): MethodDecorator {
  return function <JoinHook>(
    _target: unknown,
    propertyKey: string | symbol,
    descriptor: TypedPropertyDescriptor<JoinHook>,
  ): void {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    joinHooksList.push(descriptor.value as any)
    Logger.log(`${chalk.magenta('@Join')} ${propertyKey.toString()} ✔️`)
  }
}
